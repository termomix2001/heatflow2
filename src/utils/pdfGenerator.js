import jsPDF from 'jspdf';

// Utility funkce pro generování PDF faktury
export const generateInvoicePDF = (lead) => {
  const doc = new jsPDF();
  
  // Nastavení fontů a velikostí
  const primaryColor = '#DC2626'; // HeatFlow červená
  const secondaryColor = '#6B7280'; // Šedá
  const fontSize = {
    title: 20,
    header: 14,
    normal: 10,
    small: 8
  };

  // Generování čísla faktury
  const invoiceNumber = `HF-${new Date().getFullYear()}-${String(lead.id).padStart(4, '0')}`;
  const invoiceDate = new Date().toLocaleDateString('cs-CZ');
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('cs-CZ');
  
  // Výpočet částek
  const amount = lead.value;
  const vatRate = 0.21;
  const vatAmount = Math.round(amount * vatRate);
  const totalAmount = amount + vatAmount;

  // Logo a hlavička
  doc.setFillColor(220, 38, 38); // HeatFlow červená
  doc.rect(0, 0, 210, 30, 'F');
  
  // Logo text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(fontSize.title);
  doc.setFont('helvetica', 'bold');
  doc.text('HeatFlow', 20, 20);
  
  // Podtitul
  doc.setFontSize(fontSize.small);
  doc.setFont('helvetica', 'normal');
  doc.text('Tepelná čerpadla a uhlíkové infra folie', 20, 25);

  // Faktura číslo a datum
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(fontSize.header);
  doc.setFont('helvetica', 'bold');
  doc.text('FAKTURA', 150, 20);
  
  doc.setFontSize(fontSize.normal);
  doc.setFont('helvetica', 'normal');
  doc.text(`Číslo faktury: ${invoiceNumber}`, 150, 30);
  doc.text(`Datum vystavení: ${invoiceDate}`, 150, 35);
  doc.text(`Datum splatnosti: ${dueDate}`, 150, 40);

  // Oddělovač
  doc.setDrawColor(220, 38, 38);
  doc.setLineWidth(0.5);
  doc.line(20, 50, 190, 50);

  // Odběratel
  doc.setFontSize(fontSize.header);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor);
  doc.text('ODBĚRATEL:', 20, 65);
  
  doc.setFontSize(fontSize.normal);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(lead.name, 20, 75);
  if (lead.company) {
    doc.text(lead.company, 20, 80);
  }
  doc.text(lead.address, 20, 85);
  doc.text(`Email: ${lead.email}`, 20, 90);
  doc.text(`Tel: ${lead.phone}`, 20, 95);

  // Dodavatel
  doc.setFontSize(fontSize.header);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor);
  doc.text('DODAVATEL:', 110, 65);
  
  doc.setFontSize(fontSize.normal);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('HeatFlow s.r.o.', 110, 75);
  doc.text('IČO: 12345678', 110, 80);
  doc.text('DIČ: CZ12345678', 110, 85);
  doc.text('Praha 1, Václavské náměstí 1', 110, 90);
  doc.text('Email: info@heatflow.cz', 110, 95);
  doc.text('Tel: +420 123 456 789', 110, 100);

  // Oddělovač
  doc.setDrawColor(220, 38, 38);
  doc.line(20, 110, 190, 110);

  // Předmět faktury
  doc.setFontSize(fontSize.header);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor);
  doc.text('PŘEDMĚT FAKTURY:', 20, 125);
  
  doc.setFontSize(fontSize.normal);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  // Rozdělení dlouhého textu na řádky
  const description = lead.description;
  const maxWidth = 170;
  const lines = doc.splitTextToSize(description, maxWidth);
  doc.text(lines, 20, 135);

  // Tabulka s částkami
  const tableY = 155;
  
  // Hlavička tabulky
  doc.setFillColor(248, 250, 252);
  doc.rect(20, tableY, 170, 15, 'F');
  
  doc.setFontSize(fontSize.normal);
  doc.setFont('helvetica', 'bold');
  doc.text('Popis', 25, tableY + 10);
  doc.text('Množství', 100, tableY + 10);
  doc.text('Cena za jednotku', 130, tableY + 10);
  doc.text('Celkem', 160, tableY + 10);

  // Řádek s položkou
  doc.setFont('helvetica', 'normal');
  doc.text(description, 25, tableY + 25);
  doc.text('1 ks', 100, tableY + 25);
  doc.text(`${amount.toLocaleString('cs-CZ')} Kč`, 130, tableY + 25);
  doc.text(`${amount.toLocaleString('cs-CZ')} Kč`, 160, tableY + 25);

  // Součty
  const totalsY = tableY + 40;
  doc.setFont('helvetica', 'bold');
  doc.text('Mezisoučet:', 130, totalsY);
  doc.text(`${amount.toLocaleString('cs-CZ')} Kč`, 160, totalsY);
  
  doc.text(`DPH (21%):`, 130, totalsY + 10);
  doc.text(`${vatAmount.toLocaleString('cs-CZ')} Kč`, 160, totalsY + 10);
  
  // Celkem s rámečkem
  doc.setFillColor(220, 38, 38);
  doc.rect(125, totalsY + 15, 65, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(fontSize.header);
  doc.text('CELKEM:', 130, totalsY + 25);
  doc.text(`${totalAmount.toLocaleString('cs-CZ')} Kč`, 160, totalsY + 25);

  // Platební údaje
  const paymentY = totalsY + 40;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(fontSize.header);
  doc.setFont('helvetica', 'bold');
  doc.text('PLATEBNÍ ÚDAJE:', 20, paymentY);
  
  doc.setFontSize(fontSize.normal);
  doc.setFont('helvetica', 'normal');
  doc.text('Číslo účtu: 123456789/0100', 20, paymentY + 10);
  doc.text('Banka: Komerční banka, a.s.', 20, paymentY + 15);
  doc.text('Variabilní symbol: ' + lead.id.toString().padStart(4, '0'), 20, paymentY + 20);
  doc.text('Specifický symbol: ' + invoiceNumber.replace(/[^0-9]/g, ''), 20, paymentY + 25);

  // Dodatečné informace
  doc.setFontSize(fontSize.small);
  doc.text(`Obchodní zástupce: ${lead.salesRep}`, 20, paymentY + 35);
  doc.text(`Datum vystavení: ${invoiceDate}`, 20, paymentY + 40);
  doc.text(`Splatnost: ${dueDate}`, 20, paymentY + 45);

  // Podpis
  doc.setFontSize(fontSize.normal);
  doc.text('Podpis:', 20, paymentY + 60);
  doc.line(20, paymentY + 65, 80, paymentY + 65);
  doc.text('Vystavil:', 20, paymentY + 70);

  // Patička
  const footerY = 280;
  doc.setDrawColor(220, 38, 38);
  doc.line(20, footerY, 190, footerY);
  
  doc.setFontSize(fontSize.small);
  doc.setTextColor(secondaryColor);
  doc.text('HeatFlow s.r.o. | IČO: 12345678 | DIČ: CZ12345678', 20, footerY + 10);
  doc.text('Praha 1, Václavské náměstí 1 | Tel: +420 123 456 789 | Email: info@heatflow.cz', 20, footerY + 15);
  doc.text('www.heatflow.cz | Bankovní spojení: 123456789/0100', 20, footerY + 20);

  // Uložení PDF
  const fileName = `faktura-${lead.name.replace(/\s+/g, '-')}-${invoiceNumber}.pdf`;
  doc.save(fileName);
};

// Utility funkce pro generování čísla faktury
export const generateInvoiceNumber = (leadId) => {
  const year = new Date().getFullYear();
  const paddedId = String(leadId).padStart(4, '0');
  return `HF-${year}-${paddedId}`;
};

// Utility funkce pro výpočet částek
export const calculateAmounts = (baseAmount) => {
  const vatRate = 0.21;
  const vatAmount = Math.round(baseAmount * vatRate);
  const totalAmount = baseAmount + vatAmount;
  
  return {
    base: baseAmount,
    vat: vatAmount,
    total: totalAmount,
    vatRate: vatRate
  };
};
