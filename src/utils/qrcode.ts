import QRCode from 'qrcode';

/**
 * Generates a real, scannable QR code as a data URL. Runs entirely client-side
 * (no API key, no network call).
 */
export async function generateQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    margin: 1,
    width: 240,
    color: { dark: '#111827', light: '#ffffff' },
  });
}
