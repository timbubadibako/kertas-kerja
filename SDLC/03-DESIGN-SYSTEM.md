# Design & Technical System - KertasKerja

## 1. UI/UX Strategy
- **Layout:** Split-screen (Desktop). Left side: Form (Accordion style); Right side: Real-time A4 Preview.
- **Theme:** Clean, Minimalist, Corporate-professional.
- **Mobile:** Landing page is fully responsive; Editor provides a "Mobile Warning" or limited view.

## 2. CV Data Structure (JSONB)
```json
{
  "personal": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "website": ""
  },
  "summary": "",
  "experience": [
    {
      "company": "",
      "position": "",
      "startDate": "",
      "endDate": "",
      "description": ["bullet 1", "bullet 2"]
    }
  ],
  "education": [
    {
      "school": "",
      "degree": "",
      "graduationDate": ""
    }
  ],
  "skills": [],
  "projects": []
}
```

## 3. Component Architecture
- `Editor/`: All form-related components.
- `Preview/`: PDF rendering components.
- `Dashboard/`: Version management (List, Clone, Delete).
- `Shared/`: UI components (Button, Input, Modal).

## 4. API Routes
- `POST /api/checkout`: Initialize payment session.
- `POST /api/ai/analyze`: Send JD and CV to Gemini.
- `GET /api/webhooks/payment`: Handle payment success notifications.
