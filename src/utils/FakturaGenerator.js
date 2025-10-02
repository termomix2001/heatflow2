import { jsPDF } from 'jspdf';

// Funkce pro nahrazení českých znaků
const replaceCzechChars = (text) => {
    if (!text) return '';
    return text
        .replace(/ě/g, 'e')
        .replace(/š/g, 's')
        .replace(/č/g, 'c')
        .replace(/ř/g, 'r')
        .replace(/ž/g, 'z')
        .replace(/ý/g, 'y')
        .replace(/á/g, 'a')
        .replace(/í/g, 'i')
        .replace(/é/g, 'e')
        .replace(/ů/g, 'u')
        .replace(/ú/g, 'u')
        .replace(/ň/g, 'n')
        .replace(/ť/g, 't')
        .replace(/ď/g, 'd')
        .replace(/ó/g, 'o');
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

        // Fallback: Client-side generování PDF
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Nastavení pro lepší kvalitu
        doc.setFont('helvetica');
        
        const invoiceNumber = `HF-${new Date().getFullYear()}-${String(lead.id).padStart(4, '0')}`;
        const invoiceDate = new Date().toLocaleDateString('cs-CZ');
        const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('cs-CZ');
        
        const amount = lead.value;
        const vatRate = 0.21;
        const vatAmount = Math.round(amount * vatRate);
        const totalAmount = amount + vatAmount;

        // Hlavička
        doc.setFillColor(249, 115, 22);
        doc.rect(0, 0, 210, 30, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.text('HeatFlow', 20, 20);
        
        doc.setFontSize(10);
        doc.text(replaceCzechChars('Tepelná čerpadla a uhlíkové infra folie'), 20, 26);

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text('FAKTURA', 150, 20);
        
        doc.setFontSize(10);
        doc.text(replaceCzechChars(`Číslo faktury: ${invoiceNumber}`), 150, 28);
        doc.text(replaceCzechChars(`Datum vystavení: ${invoiceDate}`), 150, 33);
        doc.text(replaceCzechChars(`Datum splatnosti: ${dueDate}`), 150, 38);

        // Oddělovač
        doc.setDrawColor(249, 115, 22);
        doc.setLineWidth(0.5);
        doc.line(20, 45, 190, 45);

        // Odběratel
        doc.setFontSize(12);
        doc.setTextColor(249, 115, 22);
        doc.text(replaceCzechChars('ODBĚRATEL:'), 20, 55);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(replaceCzechChars(lead.name), 20, 65);
        if (lead.company) {
            doc.text(replaceCzechChars(lead.company), 20, 70);
        }
        doc.text(replaceCzechChars(lead.address), 20, 75);
        doc.text(replaceCzechChars(`Email: ${lead.email}`), 20, 80);
        doc.text(replaceCzechChars(`Tel: ${lead.phone}`), 20, 85);

        // Dodavatel
        doc.setFontSize(12);
        doc.setTextColor(249, 115, 22);
        doc.text(replaceCzechChars('DODAVATEL:'), 110, 55);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(replaceCzechChars('HeatFlow s.r.o.'), 110, 65);
        doc.text(replaceCzechChars('IČO: 12345678'), 110, 70);
        doc.text(replaceCzechChars('DIČ: CZ12345678'), 110, 75);
        doc.text(replaceCzechChars('Praha 1, Václavské náměstí 1'), 110, 80);
        doc.text(replaceCzechChars('Email: info@heatflow.cz'), 110, 85);
        doc.text(replaceCzechChars('Tel: +420 123 456 789'), 110, 90);

        // Oddělovač
        doc.setDrawColor(249, 115, 22);
        doc.line(20, 100, 190, 100);

        // Předmět faktury
        doc.setFontSize(12);
        doc.setTextColor(249, 115, 22);
        doc.text(replaceCzechChars('PŘEDMĚT FAKTURY:'), 20, 110);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const description = replaceCzechChars(lead.description);
        const maxWidth = 170;
        const lines = doc.splitTextToSize(description, maxWidth);
        doc.text(lines, 20, 120);

        // Tabulka
        const tableY = 140;
        
        // Hlavička tabulky
        doc.setFillColor(249, 115, 22);
        doc.rect(20, tableY, 170, 15, 'F');
        
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text(replaceCzechChars('Popis'), 25, tableY + 10);
        doc.text(replaceCzechChars('Množství'), 100, tableY + 10);
        doc.text(replaceCzechChars('Cena za jednotku'), 130, tableY + 10);
        doc.text(replaceCzechChars('Celkem'), 160, tableY + 10);

        // Řádek s položkou
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(description, 25, tableY + 25);
        doc.text('1 ks', 100, tableY + 25);
        doc.text(`${amount.toLocaleString('cs-CZ')} Kč`, 130, tableY + 25);
        doc.text(`${amount.toLocaleString('cs-CZ')} Kč`, 160, tableY + 25);

        // Součty
        const totalsY = tableY + 40;
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(replaceCzechChars('Mezisoučet:'), 130, totalsY);
        doc.text(`${amount.toLocaleString('cs-CZ')} Kč`, 160, totalsY);
        
        doc.text(replaceCzechChars('DPH (21%):'), 130, totalsY + 10);
        doc.text(`${vatAmount.toLocaleString('cs-CZ')} Kč`, 160, totalsY + 10);
        
        // Celkem s rámečkem
        doc.setFillColor(249, 115, 22);
        doc.rect(125, totalsY + 15, 65, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text('CELKEM:', 130, totalsY + 25);
        doc.text(`${totalAmount.toLocaleString('cs-CZ')} Kč`, 160, totalsY + 25);

        // Platební údaje
        const paymentY = totalsY + 40;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setTextColor(249, 115, 22);
        doc.text(replaceCzechChars('PLATEBNÍ ÚDAJE:'), 20, paymentY);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(replaceCzechChars('Číslo účtu: 123456789/0100'), 20, paymentY + 10);
        doc.text(replaceCzechChars('Banka: Komerční banka, a.s.'), 20, paymentY + 15);
        doc.text(replaceCzechChars('Variabilní symbol: ' + lead.id.toString().padStart(4, '0')), 20, paymentY + 20);
        doc.text(replaceCzechChars('Specifický symbol: ' + invoiceNumber.replace(/[^0-9]/g, '')), 20, paymentY + 25);

        // Dodatečné informace
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(replaceCzechChars(`Obchodní zástupce: ${lead.salesRep}`), 20, paymentY + 35);
        doc.text(replaceCzechChars(`Datum vystavení: ${invoiceDate}`), 20, paymentY + 40);
        doc.text(replaceCzechChars(`Splatnost: ${dueDate}`), 20, paymentY + 45);

        // Podpis
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(replaceCzechChars('Podpis:'), 20, paymentY + 60);
        doc.line(20, paymentY + 65, 80, paymentY + 65);
        doc.text(replaceCzechChars('Vystavil:'), 20, paymentY + 70);

        // Patička
        const footerY = 280;
        doc.setDrawColor(249, 115, 22);
        doc.line(20, footerY, 190, footerY);
        
        doc.setFontSize(8);
        doc.setTextColor(107, 114, 128);
        doc.text(replaceCzechChars('HeatFlow s.r.o. | IČO: 12345678 | DIČ: CZ12345678'), 20, footerY + 10);
        doc.text(replaceCzechChars('Praha 1, Václavské náměstí 1 | Tel: +420 123 456 789 | Email: info@heatflow.cz'), 20, footerY + 15);
        doc.text(replaceCzechChars('www.heatflow.cz | Bankovní spojení: 123456789/0100'), 20, footerY + 20);

        // Název souboru s jménem zákazníka
        const customerName = lead.name.replace(/\s+/g, '-').toLowerCase();
        const fileName = `faktura-${customerName}-${invoiceNumber}.pdf`;
        doc.save(fileName);
        
    } catch (error) {
        console.error('Chyba při generování PDF:', error);
        alert('Došlo k chybě při generování PDF. Zkuste to prosím znovu.');
    }
};

export { exportovatFakturuJakoPDF };
