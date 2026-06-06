# Software Requirements Specification (SRS) - KertasKerja

## 1. Introduction
This document specifies the technical requirements and architecture for KertasKerja, an ATS CV Maker.

## 2. System Architecture
- **Frontend:** Next.js 15 (App Router).
- **Styling:** Tailwind CSS.
- **State Management:** Zustand (for live CV editing).
- **Database & Auth:** Supabase (PostgreSQL + Auth + Storage).
- **PDF Generation:** `@react-pdf/renderer` (Client-side rendering).
- **AI:** Google Gemini API.
- **Payments:** Midtrans/Xendit (Future Integration).

## 3. Database Schema (PostgreSQL)

### 3.1. `profiles` Table
Stores user-specific metadata and subscription status.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid (PK) | References `auth.users` |
| `email` | text | User email |
| `is_premium` | boolean | Defaults to `false` |
| `created_at` | timestamp | |

### 3.2. `cv_versions` Table
Stores the actual CV data in JSONB format for flexibility.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid (PK) | Unique ID |
| `user_id` | uuid (FK) | References `profiles.id` |
| `name` | text | Name of the version (e.g., "Internship") |
| `content` | jsonb | The structured CV data |
| `template` | text | ID of the selected template |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

## 4. AI Integration Logic
- **Endpoint:** `/api/ai/analyze`
- **Input:** `cv_content` (JSON) + `job_description` (Text).
- **Prompting:** Structured prompt to Gemini to return JSON including `score`, `missing_keywords`, and `suggestions`.

## 5. PDF Rendering Strategy
- Use `@react-pdf/renderer` to create a declarative PDF structure.
- Fonts: Use standard ATS-friendly fonts (Arial, Times New Roman, or similar system-equivalent).
- Output: Direct download as `blob` from browser to avoid server load.

## 6. Security (Supabase RLS)
- `profiles`: Users can only read/update their own profile.
- `cv_versions`: Users can only read/write/delete their own versions where `user_id = auth.uid()`.
