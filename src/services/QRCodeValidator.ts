export class QRCodeValidator {
  static validateFormat(code: string): boolean {
    const pattern = /^.*\/HLTC$/;
    return pattern.test(code);
  }
}
