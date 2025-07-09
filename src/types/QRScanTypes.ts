export interface QRScan {
  id: number;
  code: string;
  isValid: boolean;
  timestamp: string;
  date: string;
  time: string;
}

export function createQRScan(code: string, isValid: boolean): QRScan {
  const now = new Date();
  return {
    id: now.getTime(),
    code,
    isValid,
    timestamp: now.toISOString(),
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
  };
}

export const NotificationType = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export const ViewType = {
  SCANNER: "scanner",
  HISTORY: "history",
} as const;

export type ViewType = (typeof ViewType)[keyof typeof ViewType];
