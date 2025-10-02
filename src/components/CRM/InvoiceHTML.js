import React from 'react';
import { exportovatFakturuJakoPDF } from '../../utils/FakturaGenerator';

const InvoiceHTML = ({ lead }) => {
  const invoiceNumber = `HF-${new Date().getFullYear()}-${String(lead.id).padStart(4, '0')}`;
  const invoiceDate = new Date().toLocaleDateString('cs-CZ');
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('cs-CZ');
  
  const amount = lead.value;
  const vatRate = 0.21;
  const vatAmount = Math.round(amount * vatRate);
  const totalAmount = amount + vatAmount;

  return (
    <div>
      <div id="faktura-obsah" style={{ width: '210mm', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: 'white' }}>
        {/* Hlavička */}
        <div style={{ 
          backgroundColor: '#F97316', 
          color: 'white', 
          padding: '20px', 
          marginBottom: '20px',
          borderRadius: '8px 8px 0 0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>HeatFlow</h1>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>Tepelná čerpadla a uhlíkové infra folie</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>FAKTURA</h2>
              <p style={{ margin: '5px 0', fontSize: '10px' }}>Číslo faktury: {invoiceNumber}</p>
              <p style={{ margin: '2px 0', fontSize: '10px' }}>Datum vystavení: {invoiceDate}</p>
              <p style={{ margin: '2px 0', fontSize: '10px' }}>Datum splatnosti: {dueDate}</p>
            </div>
          </div>
        </div>

        {/* Odběratel a Dodavatel */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '45%' }}>
            <h3 style={{ color: '#F97316', fontSize: '14px', marginBottom: '10px' }}>ODBĚRATEL:</h3>
            <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
              <p style={{ margin: '2px 0', fontWeight: 'bold' }}>{lead.name}</p>
              {lead.company && <p style={{ margin: '2px 0' }}>{lead.company}</p>}
              <p style={{ margin: '2px 0' }}>{lead.address}</p>
              <p style={{ margin: '2px 0' }}>Email: {lead.email}</p>
              <p style={{ margin: '2px 0' }}>Tel: {lead.phone}</p>
            </div>
          </div>
          
          <div style={{ width: '45%' }}>
            <h3 style={{ color: '#F97316', fontSize: '14px', marginBottom: '10px' }}>DODAVATEL:</h3>
            <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
              <p style={{ margin: '2px 0', fontWeight: 'bold' }}>HeatFlow s.r.o.</p>
              <p style={{ margin: '2px 0' }}>IČO: 12345678</p>
              <p style={{ margin: '2px 0' }}>DIČ: CZ12345678</p>
              <p style={{ margin: '2px 0' }}>Praha 1, Václavské náměstí 1</p>
              <p style={{ margin: '2px 0' }}>Email: info@heatflow.cz</p>
              <p style={{ margin: '2px 0' }}>Tel: +420 123 456 789</p>
            </div>
          </div>
        </div>

        {/* Předmět faktury */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#F97316', fontSize: '14px', marginBottom: '10px' }}>PŘEDMĚT FAKTURY:</h3>
          <p style={{ fontSize: '11px', lineHeight: '1.4' }}>{lead.description}</p>
        </div>

        {/* Tabulka */}
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          marginBottom: '20px',
          fontSize: '11px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#F97316', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #F97316' }}>Popis</th>
              <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #F97316' }}>Množství</th>
              <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #F97316' }}>Cena za jednotku</th>
              <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #F97316' }}>Celkem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{lead.description}</td>
              <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>1 ks</td>
              <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>{amount.toLocaleString('cs-CZ')} Kč</td>
              <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>{amount.toLocaleString('cs-CZ')} Kč</td>
            </tr>
          </tbody>
        </table>

        {/* Součty */}
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <div style={{ display: 'inline-block', minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '11px' }}>Mezisoučet:</span>
              <span style={{ fontSize: '11px' }}>{amount.toLocaleString('cs-CZ')} Kč</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '11px' }}>DPH (21%):</span>
              <span style={{ fontSize: '11px' }}>{vatAmount.toLocaleString('cs-CZ')} Kč</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              backgroundColor: '#F97316', 
              color: 'white', 
              padding: '10px', 
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              <span>CELKEM:</span>
              <span>{totalAmount.toLocaleString('cs-CZ')} Kč</span>
            </div>
          </div>
        </div>

        {/* Platební údaje */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#F97316', fontSize: '14px', marginBottom: '10px' }}>PLATEBNÍ ÚDAJE:</h3>
          <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
            <p style={{ margin: '2px 0' }}>Číslo účtu: 123456789/0100</p>
            <p style={{ margin: '2px 0' }}>Banka: Komerční banka, a.s.</p>
            <p style={{ margin: '2px 0' }}>Variabilní symbol: {lead.id.toString().padStart(4, '0')}</p>
            <p style={{ margin: '2px 0' }}>Specifický symbol: {invoiceNumber.replace(/[^0-9]/g, '')}</p>
          </div>
        </div>

        {/* Dodatečné informace */}
        <div style={{ marginBottom: '20px', fontSize: '10px', color: '#666' }}>
          <p style={{ margin: '2px 0' }}>Obchodní zástupce: {lead.salesRep}</p>
          <p style={{ margin: '2px 0' }}>Datum vystavení: {invoiceDate}</p>
          <p style={{ margin: '2px 0' }}>Splatnost: {dueDate}</p>
        </div>

        {/* Podpis */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '11px' }}>Podpis:</p>
              <div style={{ borderBottom: '1px solid #000', width: '150px', height: '20px' }}></div>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '11px' }}>Vystavil:</p>
              <p style={{ margin: '0', fontSize: '11px' }}>HeatFlow s.r.o.</p>
            </div>
          </div>
        </div>

        {/* Patička */}
        <div style={{ 
          borderTop: '2px solid #F97316', 
          paddingTop: '10px', 
          textAlign: 'center', 
          fontSize: '8px', 
          color: '#666',
          lineHeight: '1.3'
        }}>
          <p style={{ margin: '2px 0' }}>HeatFlow s.r.o. | IČO: 12345678 | DIČ: CZ12345678</p>
          <p style={{ margin: '2px 0' }}>Praha 1, Václavské náměstí 1 | Tel: +420 123 456 789 | Email: info@heatflow.cz</p>
          <p style={{ margin: '2px 0' }}>www.heatflow.cz | Bankovní spojení: 123456789/0100</p>
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => exportovatFakturuJakoPDF('faktura-obsah')}
          style={{
            backgroundColor: '#F97316',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Stáhnout PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceHTML;
