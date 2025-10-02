const exportovatFakturuJakoPDF = async (lead) => {
    try {
        // URL PDF serveru (změň podle svého nastavení)
        const PDF_SERVER_URL = process.env.REACT_APP_PDF_SERVER_URL || 'http://localhost:3001';
        
        const response = await fetch(`${PDF_SERVER_URL}/api/generate-pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lead })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Získání PDF blob
        const pdfBlob = await response.blob();
        
        // Vytvoření download linku
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        
        // Název souboru s jménem zákazníka
        const customerName = lead.name.replace(/\s+/g, '-').toLowerCase();
        const invoiceNumber = `HF-${new Date().getFullYear()}-${String(lead.id).padStart(4, '0')}`;
        link.download = `faktura-${customerName}-${invoiceNumber}.pdf`;
        
        // Spuštění downloadu
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Vyčištění URL
        window.URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('Chyba při generování PDF:', error);
        alert('Došlo k chybě při generování PDF. Zkontrolujte, zda je PDF server spuštěn.');
    }
};

export { exportovatFakturuJakoPDF };
