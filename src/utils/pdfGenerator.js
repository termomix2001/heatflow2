import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePDF = (lead) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Použij courier - jediný font s plnou UTF-8 podporou
  doc.setFont("courier");

  const invoiceNumber = `HF-${new Date().getFullYear()}-${String(lead.id).padStart(4, '0')}`;
  const invoiceDate = new Date().toLocaleDateString('cs-CZ');
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('cs-CZ');
  
  const amount = lead.value;
  const vatRate = 0.21;
  const vatAmount = Math.round(amount * vatRate);
  const totalAmount = amount + vatAmount;

  // Logo a hlavička
  doc.setFillColor(249, 115, 22);
  doc.rect(0, 0, 210, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('HeatFlow', 20, 15);
  
  doc.setFontSize(9);
  doc.text('Tepelná čerpadla a uhlíkové infra folie', 20, 22);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.text('FAKTURA', 150, 15);
  
  doc.setFontSize(10);
  doc.text(`Číslo faktury: ${invoiceNumber}`, 150, 25);
  doc.text(`Datum vystavení: ${invoiceDate}`, 150, 30);
  doc.text(`Datum splatnosti: ${dueDate}`, 150, 35);

  doc.setDrawColor(249, 115, 22);
  doc.setLineWidth(0.5);
  doc.line(20, 42, 190, 42);

  doc.setFontSize(11);
  doc.setTextColor(249, 115, 22);
  doc.text('ODBĚRATEL:', 20, 52);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  let yPos = 58;
  doc.text(lead.name, 20, yPos);
  yPos += 5;
  
  if (lead.company) {
    doc.text(lead.company, 20, yPos);
    yPos += 5;
  }
  doc.text(lead.address, 20, yPos);
  yPos += 5;
  doc.text(`Email: ${lead.email}`, 20, yPos);
  yPos += 5;
  doc.text(`Tel: ${lead.phone}`, 20, yPos);

  doc.setFontSize(11);
  doc.setTextColor(249, 115, 22);
  doc.text('DODAVATEL:', 110, 52);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('HeatFlow s.r.o.', 110, 58);
  doc.text('IČO: 12345678', 110, 63);
  doc.text('DIČ: CZ12345678', 110, 68);
  doc.text('Praha 1, Václavské náměstí 1', 110, 73);
  doc.text('Email: info@heatflow.cz', 110, 78);
  doc.text('Tel: +420 123 456 789', 110, 83);

  doc.setDrawColor(249, 115, 22);
  doc.line(20, 95, 190, 95);

  doc.setFontSize(11);
  doc.setTextColor(249, 115, 22);
  doc.text('PŘEDMĚT FAKTURY:', 20, 105);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  
  const description = lead.description;
  const maxWidth = 170;
  const lines = doc.splitTextToSize(description, maxWidth);
  doc.text(lines, 20, 112);

  const tableY = 130;
  
  doc.autoTable({
    startY: tableY,
    head: [['Popis', 'Množství', 'Cena/ks', 'Celkem']],
    body: [
      [description, '1 ks', `${amount.toLocaleString('cs-CZ')} Kč`, `${amount.toLocaleString('cs-CZ')} Kč`]
    ],
    headStyles: {
      fillColor: [249, 115, 22],
      textColor: [255, 255, 255],
      fontSize: 10,
      font: 'courier'
    },
    bodyStyles: {
      fontSize: 10,
      font: 'courier'
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 30 },
      2: { cellWidth: 40 },
      3: { cellWidth: 40 }
    },
    margin: { left: 20, right: 20 }
  });

  const totalsY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Mezisoučet:', 130, totalsY);
  doc.text(`${amount.toLocaleString('cs-CZ')} Kč`, 170, totalsY, { align: 'right' });
  
  doc.text('DPH (21%):', 130, totalsY + 7);
  doc.text(`${vatAmount.toLocaleString('cs-CZ')} Kč`, 170, totalsY + 7, { align: 'right' });
  
  doc.setFillColor(249, 115, 22);
  doc.rect(125, totalsY + 12, 65, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('CELKEM:', 130, totalsY + 19);
  doc.text(`${totalAmount.toLocaleString('cs-CZ')} Kč`, 185, totalsY + 19, { align: 'right' });

  const paymentY = totalsY + 30;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setTextColor(249, 115, 22);
  doc.text('PLATEBNÍ ÚDAJE:', 20, paymentY);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Číslo účtu: 123456789/0100', 20, paymentY + 7);
  doc.text('Banka: Komerční banka, a.s.', 20, paymentY + 12);
  doc.text('Variabilní symbol: ' + lead.id.toString().padStart(4, '0'), 20, paymentY + 17);
  doc.text('Specifický symbol: ' + invoiceNumber.replace(/[^0-9]/g, ''), 20, paymentY + 22);

  doc.setFontSize(9);
  doc.text(`Obchodní zástupce: ${lead.salesRep}`, 20, paymentY + 30);
  doc.text(`Datum vystavení: ${invoiceDate}`, 20, paymentY + 35);
  doc.text(`Splatnost: ${dueDate}`, 20, paymentY + 40);

  doc.setFontSize(10);
  doc.text('Podpis:', 20, paymentY + 50);
  doc.line(20, paymentY + 53, 80, paymentY + 53);
  doc.text('Vystavil:', 20, paymentY + 58);

  const footerY = 280;
  doc.setDrawColor(249, 115, 22);
  doc.line(20, footerY, 190, footerY);
  
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text('HeatFlow s.r.o. | IČO: 12345678 | DIČ: CZ12345678', 105, footerY + 5, { align: 'center' });
  doc.text('Praha 1, Václavské náměstí 1 | Tel: +420 123 456 789', 105, footerY + 9, { align: 'center' });
  doc.text('www.heatflow.cz | Email: info@heatflow.cz', 105, footerY + 13, { align: 'center' });

  const fileName = `faktura-${lead.name.replace(/\s+/g, '-')}-${invoiceNumber}.pdf`;
  doc.save(fileName);
};

export const generateInvoiceNumber = (leadId) => {
  const year = new Date().getFullYear();
  const paddedId = String(leadId).padStart(4, '0');
  return `HF-${year}-${paddedId}`;
};

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