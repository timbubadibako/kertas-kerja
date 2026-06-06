# KertasKerja Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the core ATS-friendly CV Editor with real-time preview and versioning support (mocked) without authentication.

**Architecture:** Split-screen layout using Next.js 15. A centralized Zustand store (`useCVStore`) manages the CV state. The UI follows a "Vibrant Professional" aesthetic with sidebar-driven form navigation.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS, Zustand, Lucide React, @react-pdf/renderer.

---

### Task 1: Project Setup & Zustand Store

**Files:**
- Create: `store/useCVStore.ts`
- Modify: `package.json`
- Create: `types/cv.ts`

- [ ] **Step 1: Install dependencies**
Run: `npm install zustand lucide-react @react-pdf/renderer`

- [ ] **Step 2: Define CV Types**
Create `types/cv.ts`:
```typescript
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  website: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  graduationDate: string;
}

export interface CVData {
  personal: PersonalInfo;
  work: WorkExperience[];
  education: Education[];
  skills: string[];
}
```

- [ ] **Step 3: Create Zustand Store**
Create `store/useCVStore.ts`:
```typescript
import { create } from 'zustand';
import { CVData, PersonalInfo } from '../types/cv';

interface CVState {
  data: CVData;
  activeSection: string;
  updatePersonal: (info: Partial<PersonalInfo>) => void;
  setActiveSection: (section: string) => void;
}

export const useCVStore = create<CVState>((set) => ({
  activeSection: 'personal',
  data: {
    personal: { fullName: '', email: '', phone: '', address: '', summary: '', website: '' },
    work: [],
    education: [],
    skills: []
  },
  updatePersonal: (info) => set((state) => ({
    data: { ...state.data, personal: { ...state.data.personal, ...info } }
  })),
  setActiveSection: (section) => set({ activeSection: section })
}));
```

- [ ] **Step 4: Commit**
`git add . && git commit -m "feat: setup zustand store and types"`

---

### Task 2: Base Layout & Sidebar

**Files:**
- Create: `components/layout/MainLayout.tsx`
- Create: `components/layout/Sidebar.tsx`
- Create: `components/layout/Header.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create Header**
`components/layout/Header.tsx` (Use "KertasKerja" branding).

- [ ] **Step 2: Create Sidebar**
`components/layout/Sidebar.tsx` (Indigo-600 icons, active state from Zustand).

- [ ] **Step 3: Create Main Layout**
`components/layout/MainLayout.tsx` (Split-screen 40/60).

- [ ] **Step 4: Update Page**
`app/page.tsx` to use `MainLayout`.

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: implement base layout and sidebar"`

---

### Task 3: Form Editor Sections

**Files:**
- Create: `components/editor/PersonalInfoForm.tsx`
- Create: `components/editor/SectionRenderer.tsx`

- [ ] **Step 1: Implement Personal Info Form**
Controlled inputs synced with `updatePersonal`.

- [ ] **Step 2: Implement Section Switcher**
Render component based on `activeSection`.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: add personal info form section"`

---

### Task 4: Real-time Preview (Web)

**Files:**
- Create: `components/preview/ResumePreview.tsx`
- Create: `components/preview/templates/ClassicATS.tsx`

- [ ] **Step 1: Create Classic ATS Template (HTML/Tailwind)**
Mocking the A4 paper look.

- [ ] **Step 2: Connect Preview to Zustand**
Ensure changes in form reflect in preview instantly.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: implement real-time resume preview"`

---

### Task 5: PDF Export

**Files:**
- Create: `components/preview/PDFExporter.tsx`

- [ ] **Step 1: Implement @react-pdf component**
Map `CVData` to `@react-pdf` primitives (Document, Page, Text, View).

- [ ] **Step 2: Add Download Button in Header**
Trigger PDF generation and download.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: add PDF export functionality"`
