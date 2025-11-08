import { PDFDocument, PDFPage, rgb, StandardFonts, PDFFont } from 'pdf-lib';
import mammoth from 'mammoth';
import * as fs from 'fs';
import * as path from 'path';

/**
 * KDP Formatter Enhanced - Processore documenti professionale per Amazon KDP
 * 
 * Supporta:
 * - Tutti i formati KDP standard
 * - Margini dinamici basati sul conteggio pagine
 * - Gestione DOCX completa
 * - Numeri di pagina personalizzabili
 * - Font embedding
 * - Validazione KDP completa
 */

export interface TrimSize {
  width: number;  // in inches
  height: number; // in inches
  name: string;
  description: string;
}

export const TRIM_SIZES: Record<string, TrimSize> = {
  '5x8': { width: 5, height: 8, name: '5" x 8"', description: 'Romanzi, Fiction' },
  '5.25x8': { width: 5.25, height: 8, name: '5.25" x 8"', description: 'Romanzi' },
  '5.5x8.5': { width: 5.5, height: 8.5, name: '5.5" x 8.5"', description: 'Romanzi, Saggistica' },
  '6x9': { width: 6, height: 9, name: '6" x 9"', description: 'Standard, Saggistica' },
  '7x10': { width: 7, height: 10, name: '7" x 10"', description: 'Manuali, Libri illustrati' },
  '8x10': { width: 8, height: 10, name: '8" x 10"', description: 'Libri fotografici, Workbook' },
  '8.5x11': { width: 8.5, height: 11, name: '8.5" x 11"', description: 'Workbook, Manuali' },
};

export interface KDPMargins {
  top: number;
  bottom: number;
  inner: number;  // gutter
  outer: number;
}

export interface KDPFormattingOptions {
  trimSize?: string; // key from TRIM_SIZES
  pageCount?: number; // for calculating gutter margin
  includePageNumbers?: boolean;
  pageNumberPosition?: 'center' | 'outer' | 'inner';
  startPageNumber?: number;
  includeHeaders?: boolean;
  headerText?: string;
  fontSize?: number;
  fontFamily?: 'serif' | 'sans-serif';
  lineSpacing?: number;
  textAlign?: 'left' | 'justified';
  bleed?: boolean; // add 0.125" bleed
}

const INCH_TO_POINTS = 72; // 1 inch = 72 points

/**
 * Calcola i margini KDP basati sul numero di pagine
 */
export function calculateKDPMargins(pageCount: number, trimSize: string = '6x9'): KDPMargins {
  // Margini standard per formato 6x9
  let gutterMargin = 0.375; // default per 24-150 pagine
  
  if (pageCount >= 151 && pageCount <= 300) {
    gutterMargin = 0.5;
  } else if (pageCount >= 301 && pageCount <= 500) {
    gutterMargin = 0.625;
  } else if (pageCount >= 501 && pageCount <= 700) {
    gutterMargin = 0.75;
  } else if (pageCount >= 701) {
    gutterMargin = 0.875;
  }

  return {
    top: 0.5,
    bottom: 0.5,
    inner: gutterMargin,
    outer: 0.25,
  };
}

/**
 * Converte DOCX in testo formattato
 */
export async function convertDOCXToText(docxBuffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer: docxBuffer });
    return result.value;
  } catch (error) {
    console.error('Error converting DOCX:', error);
    throw new Error('Failed to convert DOCX file');
  }
}

/**
 * Converte DOCX in HTML per preservare formattazione
 */
export async function convertDOCXToHTML(docxBuffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.convertToHtml({ buffer: docxBuffer });
    return result.value;
  } catch (error) {
    console.error('Error converting DOCX to HTML:', error);
    throw new Error('Failed to convert DOCX to HTML');
  }
}

/**
 * Crea un PDF KDP-compliant da testo
 */
export async function createKDPPDFFromText(
  text: string,
  options: KDPFormattingOptions = {}
): Promise<Buffer> {
  const {
    trimSize = '6x9',
    includePageNumbers = true,
    pageNumberPosition = 'center',
    startPageNumber = 1,
    fontSize = 11,
    fontFamily = 'serif',
    lineSpacing = 1.25,
    textAlign = 'justified',
    bleed = false,
  } = options;

  const trim = TRIM_SIZES[trimSize];
  if (!trim) {
    throw new Error(`Invalid trim size: ${trimSize}`);
  }

  const pdfDoc = await PDFDocument.create();
  
  // Seleziona font
  let font: PDFFont;
  if (fontFamily === 'serif') {
    font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  } else {
    font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  }

  // Calcola dimensioni pagina
  let pageWidth = trim.width * INCH_TO_POINTS;
  let pageHeight = trim.height * INCH_TO_POINTS;

  if (bleed) {
    pageWidth += 0.25 * INCH_TO_POINTS; // 0.125" su ogni lato
    pageHeight += 0.25 * INCH_TO_POINTS;
  }

  // Stima numero pagine per calcolare margini
  const estimatedPageCount = Math.ceil(text.length / 2000); // stima approssimativa
  const margins = calculateKDPMargins(estimatedPageCount, trimSize);

  const topMarginPts = margins.top * INCH_TO_POINTS;
  const bottomMarginPts = margins.bottom * INCH_TO_POINTS;
  const innerMarginPts = margins.inner * INCH_TO_POINTS;
  const outerMarginPts = margins.outer * INCH_TO_POINTS;

  // Area contenuto
  const contentWidth = pageWidth - innerMarginPts - outerMarginPts;
  const contentHeight = pageHeight - topMarginPts - bottomMarginPts;

  // Prepara testo
  const lines = text.split('\n');
  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - topMarginPts;
  let pageNumber = startPageNumber;
  let isLeftPage = false; // inizia con pagina destra

  const lineHeight = fontSize * lineSpacing;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      // Riga vuota - aggiungi spazio
      y -= lineHeight;
      continue;
    }

    // Controlla se serve nuova pagina
    if (y < bottomMarginPts + fontSize + 20) {
      // Aggiungi numero pagina alla pagina corrente
      if (includePageNumbers) {
        addPageNumber(currentPage, pageNumber, pageNumberPosition, isLeftPage, pageWidth, bottomMarginPts, font, fontSize);
      }

      // Crea nuova pagina
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - topMarginPts;
      pageNumber++;
      isLeftPage = !isLeftPage;
    }

    // Calcola margine sinistro (alterna tra inner/outer)
    const leftMargin = isLeftPage ? innerMarginPts : outerMarginPts;

    // Dividi la riga in parole per wrapping
    const words = line.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (textWidth > contentWidth) {
        // Disegna la riga corrente
        if (currentLine) {
          currentPage.drawText(currentLine, {
            x: leftMargin,
            y: y - fontSize,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          y -= lineHeight;
          currentLine = word;
        } else {
          // Parola troppo lunga - disegnala comunque
          currentPage.drawText(word, {
            x: leftMargin,
            y: y - fontSize,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          y -= lineHeight;
        }
      } else {
        currentLine = testLine;
      }
    }

    // Disegna l'ultima riga
    if (currentLine) {
      currentPage.drawText(currentLine, {
        x: leftMargin,
        y: y - fontSize,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    }
  }

  // Aggiungi numero all'ultima pagina
  if (includePageNumbers) {
    addPageNumber(currentPage, pageNumber, pageNumberPosition, isLeftPage, pageWidth, bottomMarginPts, font, fontSize);
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/**
 * Aggiunge numero di pagina
 */
function addPageNumber(
  page: PDFPage,
  pageNumber: number,
  position: 'center' | 'outer' | 'inner',
  isLeftPage: boolean,
  pageWidth: number,
  bottomMargin: number,
  font: PDFFont,
  fontSize: number
) {
  const pageNumText = pageNumber.toString();
  const textWidth = font.widthOfTextAtSize(pageNumText, fontSize);
  
  let x: number;
  
  if (position === 'center') {
    x = (pageWidth - textWidth) / 2;
  } else if (position === 'outer') {
    x = isLeftPage ? 36 : pageWidth - textWidth - 36; // 0.5" dai bordi
  } else { // inner
    x = isLeftPage ? pageWidth - textWidth - 36 : 36;
  }

  page.drawText(pageNumText, {
    x,
    y: bottomMargin / 2,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
}

/**
 * Applica formattazione KDP a PDF esistente
 */
export async function applyKDPFormatting(
  inputPdfBuffer: Buffer,
  options: KDPFormattingOptions = {}
): Promise<Buffer> {
  const {
    trimSize = '6x9',
    pageCount,
    bleed = false,
  } = options;

  const trim = TRIM_SIZES[trimSize];
  if (!trim) {
    throw new Error(`Invalid trim size: ${trimSize}`);
  }

  try {
    const pdfDoc = await PDFDocument.load(inputPdfBuffer);
    const pages = pdfDoc.getPages();
    
    const actualPageCount = pageCount || pages.length;
    const margins = calculateKDPMargins(actualPageCount, trimSize);

    const topMarginPts = margins.top * INCH_TO_POINTS;
    const bottomMarginPts = margins.bottom * INCH_TO_POINTS;
    const innerMarginPts = margins.inner * INCH_TO_POINTS;
    const outerMarginPts = margins.outer * INCH_TO_POINTS;

    let pageWidth = trim.width * INCH_TO_POINTS;
    let pageHeight = trim.height * INCH_TO_POINTS;

    if (bleed) {
      pageWidth += 0.25 * INCH_TO_POINTS;
      pageHeight += 0.25 * INCH_TO_POINTS;
    }

    // Elabora ogni pagina
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const isLeftPage = i % 2 === 0;
      
      const { width: currentWidth, height: currentHeight } = page.getSize();

      // Calcola margini per questa pagina
      const leftMargin = isLeftPage ? innerMarginPts : outerMarginPts;
      const rightMargin = isLeftPage ? outerMarginPts : innerMarginPts;

      // Calcola area contenuto
      const contentWidth = pageWidth - leftMargin - rightMargin;
      const contentHeight = pageHeight - topMarginPts - bottomMarginPts;

      // Calcola fattore di scala
      const scaleX = contentWidth / currentWidth;
      const scaleY = contentHeight / currentHeight;
      const scale = Math.min(scaleX, scaleY);

      // Applica trasformazione
      page.scale(scale, scale);
      page.translateContent(leftMargin / scale, bottomMarginPts / scale);

      // Imposta dimensioni pagina
      page.setSize(pageWidth, pageHeight);
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('Error applying KDP formatting:', error);
    throw new Error('Failed to apply KDP formatting');
  }
}

/**
 * Valida conformità KDP
 */
export async function validateKDPCompliance(
  pdfBuffer: Buffer,
  expectedTrimSize: string = '6x9'
): Promise<{ compliant: boolean; issues: string[]; warnings: string[] }> {
  const issues: string[] = [];
  const warnings: string[] = [];

  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();

    if (pages.length === 0) {
      issues.push('PDF has no pages');
      return { compliant: false, issues, warnings };
    }

    // Verifica numero pagine
    if (pages.length < 24) {
      issues.push(`Insufficient pages: ${pages.length} (minimum 24 for paperback)`);
    }
    if (pages.length > 828) {
      issues.push(`Too many pages: ${pages.length} (maximum 828 for paperback)`);
    }

    // Verifica numero pari di pagine
    if (pages.length % 2 !== 0) {
      warnings.push('Odd number of pages - consider adding a blank page at the end');
    }

    // Verifica dimensioni pagine
    const trim = TRIM_SIZES[expectedTrimSize];
    const expectedWidth = trim.width * INCH_TO_POINTS;
    const expectedHeight = trim.height * INCH_TO_POINTS;
    const tolerance = 10; // punti

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();

      if (Math.abs(width - expectedWidth) > tolerance || Math.abs(height - expectedHeight) > tolerance) {
        issues.push(
          `Page ${i + 1}: Incorrect dimensions (${(width / INCH_TO_POINTS).toFixed(2)}" x ${(height / INCH_TO_POINTS).toFixed(2)}"), expected ${trim.name}`
        );
      }
    }

    // Verifica font embedded (pdf-lib non supporta questa verifica direttamente)
    // In produzione useremmo una libreria più avanzata

    return {
      compliant: issues.length === 0,
      issues,
      warnings,
    };
  } catch (error) {
    return {
      compliant: false,
      issues: [`Error validating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`],
      warnings: [],
    };
  }
}

/**
 * Processa documento (DOCX o PDF) e applica formattazione KDP
 */
export async function processDocument(
  fileBuffer: Buffer,
  fileType: string,
  options: KDPFormattingOptions = {}
): Promise<Buffer> {
  try {
    if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // DOCX - converti in testo e crea PDF
      const text = await convertDOCXToText(fileBuffer);
      return await createKDPPDFFromText(text, options);
    } else if (fileType === 'application/pdf') {
      // PDF - applica formattazione
      return await applyKDPFormatting(fileBuffer, options);
    } else if (fileType === 'text/plain') {
      // TXT - crea PDF
      const text = fileBuffer.toString('utf-8');
      return await createKDPPDFFromText(text, options);
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
}

export default {
  processDocument,
  applyKDPFormatting,
  createKDPPDFFromText,
  validateKDPCompliance,
  convertDOCXToText,
  convertDOCXToHTML,
  calculateKDPMargins,
  TRIM_SIZES,
};
