/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import PDFDocument from 'pdfkit';

// Step 1: Generate PDF dynamically
export function generatePDF(filePath: string, userData: any) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Example content - dynamic data
    doc.fontSize(16).text(`Hello ${userData.name},`, 100, 100);
    doc.text(`Your order #${userData.orderId} has been confirmed.`, 100, 130);
    doc.text(`Total: $${userData.amount}`, 100, 160);

    doc.end();

    writeStream.on('finish', () => resolve(undefined));
    writeStream.on('error', reject);
  });
}

// Step 2: Convert PDF to Base64
export function getBase64(filePath: string) {
  const file = fs.readFileSync(filePath);
  return file.toString('base64');
}
