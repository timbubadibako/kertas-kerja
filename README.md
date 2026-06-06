# KertasKerja (ATS-Friendly CV Maker)

"Udah 2026, Masih Kirim Satu CV Buat Semua Loker? Pantes Dicuekin Robot HRD."

KertasKerja is a modern Micro-SaaS built for job seekers who need to manage multiple tailored CVs without the hassle. It focuses on clean, ATS-friendly formats that machines love and humans appreciate.

## ✨ Features
- **Real-time Editor:** See your changes instantly in an A4-standard preview.
- **Versioning:** Clone your CV for different roles (Magang, Beasiswa, Full-time).
- **ATS-Friendly:** Text-based PDF exports (no images/bloat) for maximum scanner compatibility.
- **AI Ranking:** Analyze your CV against a Job Description to get a match score and keywords.

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS
- **Backend:** Supabase (Postgres, Auth)
- **State:** Zustand
- **PDF:** @react-pdf/renderer
- **AI:** Google Gemini API

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed
- Supabase account
- Google Gemini API Key

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
GEMINI_API_KEY=your_gemini_key
```

### 4. Run Locally
```bash
npm run dev
```

## 📂 Documentation
Full SDLC documentation is available in the `SDLC/` directory:
1. [User Requirements](SDLC/01-USER-REQUIREMENTS.md)
2. [SRS (Software Requirements Specification)](SDLC/02-SRS.md)
3. [Design System & Architecture](SDLC/03-DESIGN-SYSTEM.md)

---
Built with ☕ and 💻 by [Syifa Pajril Yaum]
