# QR Code Scanner Web App

A simple QR Code Scanner web application that utilizes the user's webcam to scan QR codes in real time and stores the scan results (valid/invalid) in the browser's `localStorage` for history tracking.

## Features

- Real-time QR code scanning via webcam
- Validation of QR code format (must match `XXXXXX/HLTC`)
- Scan history with filtering and search
- Dashboard statistics (total, valid, invalid scans)
- Responsive, modern UI using TailwindCSS
- Local data storage (no backend required)
- Export history as JSON
- Clear scan history

## Demo

> You can run the project locally (see instructions below).  
> Example valid QR format: `AB1234/HLTC`

## Tech Stack

- [Vue 3 Composition API](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [qr-scanner](https://github.com/nimiq/qr-scanner) (for webcam scanning)

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/raflyritonga/qrcode-scanner.git
cd qrcode-scanner
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Open the http://localhost:5173
