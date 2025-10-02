import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const exportovatFakturuJakoPDF = async (elementId) => {
    const input = document.getElementById(elementId);
    if (!input) {
        console.error(`Element s ID ${elementId} nebyl nalezen.`);
        return;
    }

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); 

    const imgWidth = 210; 
    const imgHeight = canvas.height * imgWidth / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('faktura-html.pdf');
};

export { exportovatFakturuJakoPDF };
