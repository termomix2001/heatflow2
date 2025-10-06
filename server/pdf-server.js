const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// HTML template pro fakturu
const generateInvoiceHTML = (lead) => {
  const invoiceNumber = `HF-${new Date().getFullYear()}-${String(lead.id).padStart(4, '0')}`;
  const invoiceDate = new Date().toLocaleDateString('cs-CZ');
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('cs-CZ');
  
  const amount = lead.value;
  const vatRate = 0.21;
  const vatAmount = Math.round(amount * vatRate);
  const totalAmount = amount + vatAmount;

  return `
    <!DOCTYPE html>
    <html lang="cs">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Faktura ${invoiceNumber}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                font-size: 12px;
                line-height: 1.4;
                color: #333;
                background: white;
                width: 210mm;
                min-height: 297mm;
                margin: 0 auto;
                padding: 20mm;
            }
            
            .header {
                background: #F97316;
                color: white;
                padding: 20px;
                margin-bottom: 20px;
                border-radius: 8px 8px 0 0;
            }
            
            .header-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .company-name {
                font-size: 24px;
                font-weight: bold;
                margin: 0;
            }
            
            .company-subtitle {
                font-size: 12px;
                margin: 5px 0 0 0;
            }
            
            .invoice-title {
                font-size: 20px;
                font-weight: bold;
                text-align: right;
            }
            
            .invoice-details {
                text-align: right;
                font-size: 10px;
                margin-top: 10px;
            }
            
            .separator {
                border-top: 2px solid #F97316;
                margin: 20px 0;
            }
            
            .sections {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
            }
            
            .section {
                width: 45%;
            }
            
            .section-title {
                color: #F97316;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            
            .section-content {
                font-size: 11px;
                line-height: 1.4;
            }
            
            .section-content p {
                margin: 2px 0;
            }
            
            .section-content .name {
                font-weight: bold;
            }
            
            .subject {
                margin-bottom: 20px;
            }
            
            .subject-title {
                color: #F97316;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            
            .subject-content {
                font-size: 11px;
                line-height: 1.4;
            }
            
            .table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                font-size: 11px;
            }
            
            .table th {
                background: #F97316;
                color: white;
                padding: 10px;
                text-align: left;
                border: 1px solid #F97316;
            }
            
            .table td {
                padding: 10px;
                border: 1px solid #ddd;
            }
            
            .table .text-right {
                text-align: right;
            }
            
            .table .text-center {
                text-align: center;
            }
            
            .totals {
                text-align: right;
                margin-bottom: 20px;
            }
            
            .totals-content {
                display: inline-block;
                min-width: 200px;
            }
            
            .total-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
                font-size: 11px;
            }
            
            .total-final {
                display: flex;
                justify-content: space-between;
                background: #F97316;
                color: white;
                padding: 10px;
                border-radius: 4px;
                font-weight: bold;
                font-size: 12px;
            }
            
            .payment {
                margin-bottom: 20px;
            }
            
            .payment-title {
                color: #F97316;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            
            .payment-content {
                font-size: 11px;
                line-height: 1.4;
            }
            
            .payment-content p {
                margin: 2px 0;
            }
            
            .additional {
                margin-bottom: 20px;
                font-size: 10px;
                color: #666;
            }
            
            .additional p {
                margin: 2px 0;
            }
            
            .signature {
                margin-bottom: 20px;
            }
            
            .signature-content {
                display: flex;
                justify-content: space-between;
                align-items: end;
            }
            
            .signature-line {
                border-bottom: 1px solid #000;
                width: 150px;
                height: 20px;
            }
            
            .footer {
                border-top: 2px solid #F97316;
                padding-top: 10px;
                text-align: center;
                font-size: 8px;
                color: #666;
                line-height: 1.3;
            }
            
            .footer p {
                margin: 2px 0;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="header-content">
                <div>
                    <h1 class="company-name">HeatFlow</h1>
                    <p class="company-subtitle">Tepelná čerpadla a uhlíkové infra folie</p>
                </div>
                <div>
                    <h2 class="invoice-title">FAKTURA</h2>
                    <div class="invoice-details">
                        <p>Číslo faktury: ${invoiceNumber}</p>
                        <p>Datum vystavení: ${invoiceDate}</p>
                        <p>Datum splatnosti: ${dueDate}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="separator"></div>

        <div class="sections">
            <div class="section">
                <h3 class="section-title">ODBĚRATEL:</h3>
                <div class="section-content">
                    <p class="name">${lead.name}</p>
                    ${lead.company ? `<p>${lead.company}</p>` : ''}
                    <p>${lead.address}</p>
                    <p>Email: ${lead.email}</p>
                    <p>Tel: ${lead.phone}</p>
                </div>
            </div>
            
            <div class="section">
                <h3 class="section-title">DODAVATEL:</h3>
                <div class="section-content">
                    <p class="name">HeatFlow s.r.o.</p>
                    <p>IČO: 12345678</p>
                    <p>DIČ: CZ12345678</p>
                    <p>Praha 1, Václavské náměstí 1</p>
                    <p>Email: info@heatflow.cz</p>
                    <p>Tel: +420 123 456 789</p>
                </div>
            </div>
        </div>

        <div class="separator"></div>

        <div class="subject">
            <h3 class="subject-title">PŘEDMĚT FAKTURY:</h3>
            <div class="subject-content">
                <p>${lead.description}</p>
            </div>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Popis</th>
                    <th class="text-center">Množství</th>
                    <th class="text-right">Cena za jednotku</th>
                    <th class="text-right">Celkem</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${lead.description}</td>
                    <td class="text-center">1 ks</td>
                    <td class="text-right">${amount.toLocaleString('cs-CZ')} Kč</td>
                    <td class="text-right">${amount.toLocaleString('cs-CZ')} Kč</td>
                </tr>
            </tbody>
        </table>

        <div class="totals">
            <div class="totals-content">
                <div class="total-row">
                    <span>Mezisoučet:</span>
                    <span>${amount.toLocaleString('cs-CZ')} Kč</span>
                </div>
                <div class="total-row">
                    <span>DPH (21%):</span>
                    <span>${vatAmount.toLocaleString('cs-CZ')} Kč</span>
                </div>
                <div class="total-final">
                    <span>CELKEM:</span>
                    <span>${totalAmount.toLocaleString('cs-CZ')} Kč</span>
                </div>
            </div>
        </div>

        <div class="payment">
            <h3 class="payment-title">PLATEBNÍ ÚDAJE:</h3>
            <div class="payment-content">
                <p>Číslo účtu: 123456789/0100</p>
                <p>Banka: Komerční banka, a.s.</p>
                <p>Variabilní symbol: ${lead.id.toString().padStart(4, '0')}</p>
                <p>Specifický symbol: ${invoiceNumber.replace(/[^0-9]/g, '')}</p>
            </div>
        </div>

        <div class="additional">
            <p>Obchodní zástupce: ${lead.salesRep}</p>
            <p>Datum vystavení: ${invoiceDate}</p>
            <p>Splatnost: ${dueDate}</p>
        </div>

        <div class="signature">
            <div class="signature-content">
                <div>
                    <p>Podpis:</p>
                    <div class="signature-line"></div>
                </div>
                <div>
                    <p>Vystavil:</p>
                    <p>HeatFlow s.r.o.</p>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>HeatFlow s.r.o. | IČO: 12345678 | DIČ: CZ12345678</p>
            <p>Praha 1, Václavské náměstí 1 | Tel: +420 123 456 789 | Email: info@heatflow.cz</p>
            <p>www.heatflow.cz | Bankovní spojení: 123456789/0100</p>
        </div>
    </body>
    </html>
  `;
};

// API endpoint pro generování PDF
app.post('/api/generate-pdf', async (req, res) => {
  try {
    const { lead } = req.body;
    
    if (!lead) {
      return res.status(400).json({ error: 'Lead data is required' });
    }

    // Spuštění Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Nastavení viewport pro A4
    await page.setViewport({ width: 794, height: 1123 }); // A4 v pixelech
    
    // Generování HTML
    const html = generateInvoiceHTML(lead);
    
    // Nastavení obsahu stránky
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Generování PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    await browser.close();
    
    // Název souboru s jménem zákazníka
    const customerName = lead.name.replace(/\s+/g, '-').toLowerCase();
    const invoiceNumber = `HF-${new Date().getFullYear()}-${String(lead.id).padStart(4, '0')}`;
    const fileName = `faktura-${customerName}-${invoiceNumber}.pdf`;
    
    // Nastavení headers pro download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', pdf.length);
    
    res.send(pdf);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PDF Server is running' });
});

app.listen(PORT, () => {
  console.log(`PDF Server running on port ${PORT}`);
});

