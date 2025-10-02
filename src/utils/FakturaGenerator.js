import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Funkce pro zachování českých znaků - bez nahrazování
const formatCzech = (text) => {
    if (!text) return '';
    return text; // Zachováme původní text s českými znaky
};

const exportovatFakturuJakoPDF = async (lead) => {
    try {
        // Zkusit server-side generování (pokud je dostupný)
        const PDF_SERVER_URL = process.env.REACT_APP_PDF_SERVER_URL || 'http://localhost:3001';
        
        try {
            const response = await fetch(`${PDF_SERVER_URL}/api/generate-pdf`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lead })
            });

            if (response.ok) {
                // Server je dostupný - použít server-side PDF
                const pdfBlob = await response.blob();
                const url = window.URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = url;
                
                const customerName = lead.name.replace(/\s+/g, '-').toLowerCase();
                const invoiceNumber = `HF-${new Date().getFullYear()}-${String(lead.id).padStart(4, '0')}`;
                link.download = `faktura-${customerName}-${invoiceNumber}.pdf`;
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                return;
            }
        } catch (serverError) {
            console.log('PDF server není dostupný, používá se client-side generování');
        }

        // Fallback: HTML2Canvas + jsPDF pro zachování českých znaků
        const element = document.getElementById('faktura-obsah');
        if (!element) {
            alert('Faktura nebyla nalezena. Zkuste to prosím znovu.');
            return;
        }

        // Vysoké rozlišení pro lepší kvalitu
        const canvas = await html2canvas(element, {
            scale: 3, // Vysoké rozlišení
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: element.scrollWidth,
            height: element.scrollHeight
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Výpočet rozměrů pro A4
        const imgWidth = 210; // A4 šířka v mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Přidání obrázku do PDF
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Název souboru s jménem zákazníka
        const customerName = lead.name.replace(/\s+/g, '-').toLowerCase();
        const invoiceNumber = `HF-${new Date().getFullYear()}-${String(lead.id).padStart(4, '0')}`;
        const fileName = `faktura-${customerName}-${invoiceNumber}.pdf`;
        doc.save(fileName);
        
    } catch (error) {
        console.error('Chyba při generování PDF:', error);
        alert('Došlo k chybě při generování PDF. Zkuste to prosím znovu.');
    }
};

export { exportovatFakturuJakoPDF };
