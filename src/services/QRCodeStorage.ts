import { type QRScan, createQRScan } from "../types/QRScanTypes";

export class QRCodeStorage {
  private static STORAGE_KEY = "qr_scan_history";

  static getHistory(): QRScan[] {
    try {
      const history = localStorage.getItem(this.STORAGE_KEY);
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  }

  static saveQRCode(code: string, isValid: boolean): QRScan {
    const scan = createQRScan(code, isValid);
    const history = this.getHistory();
    history.unshift(scan);
    if (history.length > 1000) history.splice(1000);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    return scan;
  }

  static clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static exportHistory(): void {
    const history = this.getHistory();
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileName = `qr_scan_history_${
      new Date().toISOString().split("T")[0]
    }.json`;
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", exportFileName);
    link.click();
  }
}
