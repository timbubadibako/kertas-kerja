# User Requirements Document (URD) - KertasKerja

## 1. Project Overview
**KertasKerja** is a Micro-SaaS platform designed to help job seekers create ATS-friendly CVs with ease. The primary value proposition is the ability to maintain multiple versions of a CV for different job applications and receive AI-driven feedback.

## 2. Target Audience
- Fresh graduates looking for their first job.
- Students applying for internships or scholarships.
- Professionals tailoring their CVs for specific roles.

## 3. User Personas
### 3.1. The "Aji" (The Free User)
- Needs a clean, professional CV quickly.
- Only needs one version for a general application.
- Wants a reliable PDF that won't get rejected by ATS scanners.

### 3.2. The "Budi" (The Power User)
- Applying for multiple roles (e.g., Backend Developer, Data Analyst, Internship).
- Needs to clone and tweak CVs frequently.
- Wants AI feedback to ensure keywords match job descriptions.
- Willing to pay a one-time small fee (Rp 50,000) for lifetime access.

## 4. Functional Requirements
### 4.1. Authentication
- Users must be able to sign up/login via Google or Magic Link (Supabase Auth).
- Persistent sessions for return users.

### 4.2. CV Management
- **Create:** Build a CV from scratch using a structured form.
- **Edit:** Real-time updates to the CV preview as the user types.
- **Duplicate (Premium):** Clone an existing CV version to create a new one.
- **Delete:** Remove unwanted CV versions.
- **Download:** Export CV as a text-based, ATS-friendly PDF.

### 4.3. Versioning Control
- Free Tier: Limited to **1 CV version**.
- Premium Tier: **Unlimited CV versions**.

### 4.4. AI ATS Ranking (Premium)
- User can paste a Job Description (JD).
- AI analyzes the current CV against the JD.
- Provides a score (0-100) and specific improvement suggestions (missing keywords, phrasing).

### 4.5. Monetization
- One-time payment (Lifetime Access).
- Integration with local payment gateways (Midtrans/Xendit) to unlock Premium features.

## 5. Non-Functional Requirements
- **Performance:** Real-time preview must be lag-free (using Zustand/React State).
- **Scalability:** Must handle multiple concurrent users via Supabase Serverless architecture.
- **Security:** User data (CVs) must be private and accessible only to the owner (RLS).
- **Mobile Friendly:** Landing page must be responsive, though CV editing is optimized for Desktop.
