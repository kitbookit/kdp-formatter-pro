import { PDFDocument, PDFPage, rgb, degrees } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

/**
 * KDP Formatter - Elabora documenti con margini perfetti per Amazon KDP
 * 
 * Specifiche KDP:
 * - Margini: 1 pollice (25.4 mm) su tutti i lati
 * - Formato pagina: 6" x 9" (standard per paperback)
 * - Risoluzione immagini: 300 DPI
 */

export interface KDPFormattingOptions {
  topMargin?: number; // in inches, default 1
  bottomMargin?: number; // in inches, default 1
  leftMargin?: number; // in inches, default 1
  rightMargin?: number; // in inches, default 1
  pageWidth?: number; // in inches, default 6
  pageHeight?: number; // in inches, default 9
}

const INCH_TO_POINTS = 72; // 1 inch = 72 points

/**
 * Applica i margini KDP standard a un PDF
 */
export async function applyKDPFormatting(
  inputPdfBuffer: Buffer,
  options: KDPFormattingOptions = {}
): Promise<Buffer> {
  const {
    topMargin = 1,
    bottomMargin = 1,
    leftMargin = 1,
    rightMargin = 1,
    pageWidth = 6,
    pageHeight = 9,
  } = options;

  try {
    // Carica il PDF
    const pdfDoc = await PDFDocument.load(inputPdfBuffer);
    const pages = pdfDoc.getPages();

    // Converti i margini da pollici a punti
    const topMarginPts = topMargin * INCH_TO_POINTS;
    const bottomMarginPts = bottomMargin * INCH_TO_POINTS;
    const leftMarginPts = leftMargin * INCH_TO_POINTS;
    const rightMarginPts = rightMargin * INCH_TO_POINTS;

    const pageWidthPts = pageWidth * INCH_TO_POINTS;
    const pageHeightPts = pageHeight * INCH_TO_POINTS;

    // Elabora ogni pagina
    for (const page of pages) {
      // Ottieni le dimensioni attuali della pagina
      const { width: currentWidth, height: currentHeight } = page.getSize();

      // Calcola il fattore di scala
      const scaleX = (pageWidthPts - leftMarginPts - rightMarginPts) / currentWidth;
      const scaleY = (pageHeightPts - topMarginPts - bottomMarginPts) / currentHeight;
      const scale = Math.min(scaleX, scaleY);

      // Applica la trasformazione per posizionare il contenuto con i margini
      page.scale(scale, scale);
      page.translateContent(leftMarginPts / scale, bottomMarginPts / scale);

      // Imposta le dimensioni della pagina a 6x9 pollici
      page.setSize(pageWidthPts, pageHeightPts);
    }

    // Salva il PDF elaborato
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('Error applying KDP formatting:', error);
    throw new Error('Failed to apply KDP formatting');
  }
}

/**
 * Crea un PDF da zero con i margini KDP
 */
export async function createKDPPDF(
  content: string,
  options: KDPFormattingOptions = {}
): Promise<Buffer> {
  const {
    topMargin = 1,
    bottomMargin = 1,
    leftMargin = 1,
    rightMargin = 1,
    pageWidth = 6,
    pageHeight = 9,
  } = options;

  try {
    const pdfDoc = await PDFDocument.create();

    // Converti i margini da pollici a punti
    const topMarginPts = topMargin * INCH_TO_POINTS;
    const bottomMarginPts = bottomMargin * INCH_TO_POINTS;
    const leftMarginPts = leftMargin * INCH_TO_POINTS;
    const rightMarginPts = rightMargin * INCH_TO_POINTS;

    const pageWidthPts = pageWidth * INCH_TO_POINTS;
    const pageHeightPts = pageHeight * INCH_TO_POINTS;

    // Crea la prima pagina
    let page = pdfDoc.addPage([pageWidthPts, pageHeightPts]);

    // Calcola l'area disponibile per il testo
    const contentWidth = pageWidthPts - leftMarginPts - rightMarginPts;
    const contentHeight = pageHeightPts - topMarginPts - bottomMarginPts;

    // Aggiungi il testo con i margini
    const fontSize = 12;
    const lineHeight = fontSize * 1.5;
    let y = pageHeightPts - topMarginPts;

    const lines = content.split('\n');
    for (const line of lines) {
      if (y < bottomMarginPts + fontSize) {
        // Crea una nuova pagina se necessario
        page = pdfDoc.addPage([pageWidthPts, pageHeightPts]);
        y = pageHeightPts - topMarginPts;
      }

      page.drawText(line, {
        x: leftMarginPts,
        y: y - fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      y -= lineHeight;
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('Error creating KDP PDF:', error);
    throw new Error('Failed to create KDP PDF');
  }
}

/**
 * Valida se un PDF è conforme alle specifiche KDP
 */
export async function validateKDPCompliance(
  pdfBuffer: Buffer
): Promise<{ compliant: boolean; issues: string[] }> {
  const issues: string[] = [];

  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();

    if (pages.length === 0) {
      issues.push('PDF has no pages');
      return { compliant: false, issues };
    }

    // Controlla le dimensioni delle pagine
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();

      // Verifica se le dimensioni sono approssimativamente 6x9 pollici (432x648 punti)
      const expectedWidth = 6 * INCH_TO_POINTS;
      const expectedHeight = 9 * INCH_TO_POINTS;

      const tolerance = 10; // punti
      if (Math.abs(width - expectedWidth) > tolerance || Math.abs(height - expectedHeight) > tolerance) {
        issues.push(`Page ${i + 1}: Incorrect dimensions (${(width / INCH_TO_POINTS).toFixed(2)}" x ${(height / INCH_TO_POINTS).toFixed(2)}")`);
      }
    }

    return {
      compliant: issues.length === 0,
      issues,
    };
  } catch (error) {
    return {
      compliant: false,
      issues: [`Error validating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`],
    };
  }
}

/**
 * Estrae il testo da un PDF
 */
export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    // Nota: pdf-lib non supporta l'estrazione di testo direttamente
    // Per questo useremmo una libreria come pdfjs-dist in produzione
    return 'Text extraction requires additional library (pdfjs-dist)';
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
}

export default {
  applyKDPFormatting,
  createKDPPDF,
  validateKDPCompliance,
  extractTextFromPDF,
};

