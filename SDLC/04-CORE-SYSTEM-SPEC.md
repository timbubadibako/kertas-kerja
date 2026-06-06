# Design Specification: KertasKerja Core System

## 1. Executive Summary
KertasKerja is an ATS-friendly CV maker. This specification focuses on the **Core Editor** and **Dashboard** systems, intentionally delaying Authentication/Auth-related features to prioritize the functional MVP.

## 2. Aesthetic & UI Direction
- **Theme Name:** "Vibrant Professional"
- **Color Palette:**
  - Base: White/Slate-50
  - Accents: Indigo-600 (Primary), Emerald-500 (Education), Orange-500 (Work), Purple-500 (Skills).
- **Typography:** Plus Jakarta Sans (Main UI), Times New Roman/Arial (PDF Preview for ATS compatibility).
- **Layout:** Fixed Header + Sidebar Navigation + Split-pane Editor (40/60 ratio).

## 3. Component Architecture

### 3.1. Sidebar Navigation
- Vertical icon bar on the far left.
- Items: Personal Info, Work Experience, Education, Skills, Projects, AI Analyzer (Disabled for now).

### 3.2. Form Editor (`/Editor`)
- Dynamic form sections that switch based on Sidebar selection.
- Real-time input updates to the central store.

### 3.3. CV Preview (`/Preview`)
- A4-simulated container with shadow.
- Renders the `cv_data` using a dedicated "Classic ATS" template.
- Tech: `@react-pdf/renderer` for client-side PDF generation.

## 4. State Management (Zustand)
Store name: `useCVStore`
```typescript
interface CVData {
  personal: { fullName, email, phone, address, summary, website },
  work: Array<{ company, position, startDate, endDate, description: string[] }>,
  education: Array<{ school, degree, graduationDate }>,
  skills: string[],
  projects: Array<{ title, description, link }>
}

interface CVStore {
  data: CVData;
  updatePersonal: (data: Partial<CVData['personal']>) => void;
  addWork: () => void;
  removeWork: (index: number) => void;
  // ... other mutators
}
```

## 5. Implementation Roadmap (Post-Auth Delay)

### Phase 1: Foundation (No-Auth)
- Setup Next.js 15 project structure.
- Initialize Zustand Store with sample data.
- Basic Layout (Header + Sidebar).

### Phase 2: The Editor
- Build all form sections (Personal, Work, Edu, Skills).
- Implement the split-pane layout with responsiveness checks.

### Phase 3: The Preview
- Build the "Classic ATS" template using Tailwind (for web) and `@react-pdf` (for download).
- Sync state between Editor and Preview.

### Phase 4: Data Persistence (Mocked)
- Save to `localStorage` instead of Supabase for now to maintain progress without login.

## 6. Testing Strategy
- Manual verification of PDF text-selection (must be pure text, not image).
- Validation of form state updates.
