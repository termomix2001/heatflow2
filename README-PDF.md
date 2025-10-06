# PDF Server Setup

## 🚀 Spuštění PDF serveru

### 1. Instalace závislostí
```bash
cd server
npm install
```

### 2. Spuštění serveru
```bash
npm start
```

Nebo použijte batch soubor:
```bash
start-pdf-server.bat
```

### 3. Testování
Server běží na: `http://localhost:3001`

Test endpoint: `http://localhost:3001/api/health`

## 📄 Generování PDF

### API Endpoint
```
POST /api/generate-pdf
Content-Type: application/json

{
  "lead": {
    "id": 1,
    "name": "Jan Novák",
    "company": "Novák s.r.o.",
    "email": "jan@novak.cz",
    "phone": "+420 123 456 789",
    "address": "Praha 1, Václavské náměstí 1",
    "value": 50000,
    "description": "Instalace tepelného čerpadla",
    "salesRep": "Petr Prodejce"
  }
}
```

### Výsledek
- **Skutečný PDF** (ne obrázek)
- **Interaktivní** - lze označovat text
- **Vysoká kvalita** pro tisk
- **Název souboru**: `faktura-jan-novak-HF-2024-0001.pdf`

## 🔧 Konfigurace

### Environment Variables
```bash
PORT=3001
```

### CORS
Server je nakonfigurován pro komunikaci s React aplikací.

## 🎯 Výhody

✅ **Skutečný PDF** - ne obrázek  
✅ **Interaktivní** - lze označovat text  
✅ **Vysoká kvalita** - vektorová grafika  
✅ **České znaky** - plná podpora UTF-8  
✅ **Automatické pojmenování** - podle zákazníka  
✅ **Profesionální vzhled** - HTML/CSS template  

## 🚨 Poznámky

- PDF server musí běžet pro generování faktur
- Server používá Puppeteer pro generování PDF
- Všechny české znaky jsou podporovány
- PDF je optimalizován pro tisk

