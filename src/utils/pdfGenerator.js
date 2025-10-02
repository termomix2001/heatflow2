import jsPDF from 'jspdf';

// Utility funkce pro generování PDF faktury
export const generateInvoicePDF = (lead) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Nastavení pro české znaky
  doc.setLanguage('cs');
  
  // Funkce pro správné kódování českých znaků
  const encodeCzech = (text) => {
    if (!text) return '';
    return text
      .replace(/č/g, 'c')
      .replace(/Č/g, 'C')
      .replace(/ř/g, 'r')
      .replace(/Ř/g, 'R')
      .replace(/š/g, 's')
      .replace(/Š/g, 'S')
      .replace(/ž/g, 'z')
      .replace(/Ž/g, 'Z')
      .replace(/ý/g, 'y')
      .replace(/Ý/g, 'Y')
      .replace(/á/g, 'a')
      .replace(/Á/g, 'A')
      .replace(/í/g, 'i')
      .replace(/Í/g, 'I')
      .replace(/é/g, 'e')
      .replace(/É/g, 'E')
      .replace(/ó/g, 'o')
      .replace(/Ó/g, 'O')
      .replace(/ú/g, 'u')
      .replace(/Ú/g, 'U')
      .replace(/ů/g, 'u')
      .replace(/Ů/g, 'U')
      .replace(/ň/g, 'n')
      .replace(/Ň/g, 'N')
      .replace(/ť/g, 't')
      .replace(/Ť/g, 'T')
      .replace(/ď/g, 'd')
      .replace(/Ď/g, 'D');
  };
  
  // Nastavení fontů a velikostí
  const primaryColor = '#F97316'; // HeatFlow oranžová
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
  doc.setFillColor(249, 115, 22); // HeatFlow oranžová
  doc.rect(0, 0, 210, 25, 'F');
  
  // Logo text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('HeatFlow', 20, 18);
  
  // Podtitul
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(encodeCzech('Tepelná čerpadla a uhlíkové infra folie'), 20, 23);

  // Faktura číslo a datum
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('FAKTURA', 150, 18);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(encodeCzech(`Číslo faktury: ${invoiceNumber}`), 150, 28);
  doc.text(encodeCzech(`Datum vystavení: ${invoiceDate}`), 150, 33);
  doc.text(encodeCzech(`Datum splatnosti: ${dueDate}`), 150, 38);

  // Oddělovač
  doc.setDrawColor(249, 115, 22);
  doc.setLineWidth(0.5);
  doc.line(20, 45, 190, 45);

  // Odběratel
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(249, 115, 22);
  doc.text('ODBĚRATEL:', 20, 60);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(encodeCzech(lead.name), 20, 70);
  if (lead.company) {
    doc.text(encodeCzech(lead.company), 20, 75);
  }
  doc.text(encodeCzech(lead.address), 20, 80);
  doc.text(encodeCzech(`Email: ${lead.email}`), 20, 85);
  doc.text(encodeCzech(`Tel: ${lead.phone}`), 20, 90);

  // Dodavatel
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(249, 115, 22);
  doc.text('DODAVATEL:', 110, 60);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(encodeCzech('HeatFlow s.r.o.'), 110, 70);
  doc.text(encodeCzech('IČO: 12345678'), 110, 75);
  doc.text(encodeCzech('DIČ: CZ12345678'), 110, 80);
  doc.text(encodeCzech('Praha 1, Václavské náměstí 1'), 110, 85);
  doc.text(encodeCzech('Email: info@heatflow.cz'), 110, 90);
  doc.text(encodeCzech('Tel: +420 123 456 789'), 110, 95);

  // Oddělovač
  doc.setDrawColor(249, 115, 22);
  doc.line(20, 105, 190, 105);

  // Předmět faktury
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(249, 115, 22);
  doc.text('PŘEDMĚT FAKTURY:', 20, 120);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  // Rozdělení dlouhého textu na řádky
  const description = encodeCzech(lead.description);
  const maxWidth = 170;
  const lines = doc.splitTextToSize(description, maxWidth);
  doc.text(lines, 20, 130);

  // Tabulka s částkami
  const tableY = 150;
  
  // Hlavička tabulky
  doc.setFillColor(249, 115, 22);
  doc.rect(20, tableY, 170, 15, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(encodeCzech('Popis'), 25, tableY + 10);
  doc.text(encodeCzech('Množství'), 100, tableY + 10);
  doc.text(encodeCzech('Cena za jednotku'), 130, tableY + 10);
  doc.text(encodeCzech('Celkem'), 160, tableY + 10);

  // Řádek s položkou
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(description, 25, tableY + 25);
  doc.text('1 ks', 100, tableY + 25);
  doc.text(`${amount.toLocaleString('cs-CZ')} Kč`, 130, tableY + 25);
  doc.text(`${amount.toLocaleString('cs-CZ')} Kč`, 160, tableY + 25);

  // Součty
  const totalsY = tableY + 40;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(encodeCzech('Mezisoučet:'), 130, totalsY);
  doc.text(encodeCzech(`${amount.toLocaleString('cs-CZ')} Kč`), 160, totalsY);
  
  doc.text(encodeCzech(`DPH (21%):`), 130, totalsY + 10);
  doc.text(encodeCzech(`${vatAmount.toLocaleString('cs-CZ')} Kč`), 160, totalsY + 10);
  
  // Celkem s rámečkem
  doc.setFillColor(249, 115, 22);
  doc.rect(125, totalsY + 15, 65, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CELKEM:', 130, totalsY + 25);
  doc.text(`${totalAmount.toLocaleString('cs-CZ')} Kč`, 160, totalsY + 25);

  // Platební údaje
  const paymentY = totalsY + 40;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(249, 115, 22);
  doc.text('PLATEBNÍ ÚDAJE:', 20, paymentY);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(encodeCzech('Číslo účtu: 123456789/0100'), 20, paymentY + 10);
  doc.text(encodeCzech('Banka: Komerční banka, a.s.'), 20, paymentY + 15);
  doc.text(encodeCzech('Variabilní symbol: ' + lead.id.toString().padStart(4, '0')), 20, paymentY + 20);
  doc.text(encodeCzech('Specifický symbol: ' + invoiceNumber.replace(/[^0-9]/g, '')), 20, paymentY + 25);

  // Dodatečné informace
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(encodeCzech(`Obchodní zástupce: ${lead.salesRep}`), 20, paymentY + 35);
  doc.text(encodeCzech(`Datum vystavení: ${invoiceDate}`), 20, paymentY + 40);
  doc.text(encodeCzech(`Splatnost: ${dueDate}`), 20, paymentY + 45);

  // Podpis
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(encodeCzech('Podpis:'), 20, paymentY + 60);
  doc.line(20, paymentY + 65, 80, paymentY + 65);
  doc.text(encodeCzech('Vystavil:'), 20, paymentY + 70);

  // Patička
  const footerY = 280;
  doc.setDrawColor(249, 115, 22);
  doc.line(20, footerY, 190, footerY);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text(encodeCzech('HeatFlow s.r.o. | IČO: 12345678 | DIČ: CZ12345678'), 20, footerY + 10);
  doc.text(encodeCzech('Praha 1, Václavské náměstí 1 | Tel: +420 123 456 789 | Email: info@heatflow.cz'), 20, footerY + 15);
  doc.text(encodeCzech('www.heatflow.cz | Bankovní spojení: 123456789/0100'), 20, footerY + 20);

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
