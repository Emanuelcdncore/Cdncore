# Implementation Guide: Contact Form with SMTP Email Sending

This document describes the complete process for fixing the "Form fills but does not send email" issue, implementing a secure and professional solution using `Nodemailer` and SMTP.

> **Status:** Frontend ✅ | Backend ✅ | Docker ✅ | SMTP Password ⚠️ needs real password  
> **Last Updated:** 2026-02-18

---

## 1. Problem Diagnosis
The form on the frontend was submitting data, but the server (Backend) had no logic to process the request or send the email. The "bridge" between the website and the email server was missing.

## 2. Architecture

```
[Frontend Form]  -- fetch POST -->  [Backend /api/contact]  -- SMTP -->  [Email Server]
  (React/Next.js)                    (Node.js + Express)                (mail.cdnglobal.eu)
  Port: 3000                         Port: 4000                         Port: 587
  Static Export                      Docker Container                   social@cdnglobal.eu
```

---

## 3. Project Structure

```
website_tv/
├── Website/                          # Frontend (Next.js static export)
│   ├── src/
│   │   ├── app/contact/page.tsx      # Contact form (UPDATED ✅)
│   │   └── lib/contactApi.ts         # API module (CREATED ✅)
│   └── .env.example                  # Frontend env template
│
├── Server/                           # Backend (Node.js/Express) (CREATED ✅)
│   ├── server.js                     # Main entry point
│   ├── routes/contact.js             # Contact route + rate limiting
│   ├── services/emailService.js      # Nodemailer SMTP service
│   ├── utils/validation.js           # Sanitization + validation
│   ├── Dockerfile                    # Multi-stage Docker build
│   ├── .dockerignore                 # Docker build exclusions
│   ├── .gitignore                    # Git exclusions
│   ├── .env                          # SMTP credentials (⚠️ needs real password)
│   ├── .env.example                  # Template for credentials
│   └── package.json                  # Dependencies
│
└── docker-compose.yml                # Docker Compose for backend (CREATED ✅)
```

---

## 4. Security Features Implemented

| Feature | Where | Description |
|---------|-------|-------------|
| Input Sanitization | Frontend + Backend | Strips HTML tags from all inputs (XSS prevention) |
| Email Validation | Frontend + Backend | Regex pattern + header injection check |
| Rate Limiting | Backend | Max 5 requests per 15 minutes per IP |
| Hardcoded Destination | Backend | Email recipient is always `SMTP_USER`, never from client |
| Helmet Headers | Backend | Sets secure HTTP headers automatically |
| CORS Whitelist | Backend | Only allows requests from cdncore.eu/cdncore.pt/localhost |
| Non-root Docker User | Docker | Container runs as non-root user |
| Body Size Limit | Backend | JSON body limited to 10KB |

---

## 5. How to Run

### Local Development

```bash
# Terminal 1: Start backend
cd Server
cp .env.example .env
# Edit .env and set the real SMTP_PASS
npm install
npm run dev

# Terminal 2: Start frontend
cd Website
npm run dev
```

### Production (Docker)

```bash
# From the project root (website_tv/)
# Make sure Server/.env has the real SMTP password

# Build and start
docker compose up -d --build

# Check status
docker compose ps

# View logs
docker compose logs -f backend
```

---

## 6. SMTP Configuration

The server needs a `.env` file with the SMTP credentials:

```ini
PORT=4000
SMTP_HOST=mail.cdnglobal.eu
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=social@cdnglobal.eu
SMTP_PASS=<REAL PASSWORD HERE>
```

### ⚠️ Action Required
The only thing missing is the **real SMTP password** for `social@cdnglobal.eu`. 
Edit `Server/.env` and replace `COLOCA_AQUI_A_PASSWORD` with the actual password.

---

## 7. API Endpoint Reference

### `POST /api/contact`

**Request:**
```json
{
  "nome": "First Last",
  "email": "user@example.com",
  "empresa": "Company Name",
  "telefone": "+351 123 456 789",
  "mensagem": "Hello, I'd like to know more about..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Error Responses:**
- `400` — Missing/invalid fields
- `429` — Rate limited (too many requests)
- `500` — SMTP send failure

### `GET /api/health`
Returns server health status.

---

## 8. Email Template

The email sent to `social@cdnglobal.eu` includes:
- CDNCORE branded header with gradient
- Sender's name, company, email, phone
- Formatted message body
- Reply-To set to the sender's email (for easy replies)
- Plain text fallback for basic email clients

---

## 9. Frontend Features

- **Loading spinner** during submission
- **Success state** — Green button for 4 seconds
- **Error banner** — Red message when API call fails
- **Button disabled** during submission (prevents double-submit)
- **Error auto-clear** when user interacts with form

---

## 10. Security Checklist
- [x] `.env` is in `.gitignore` — passwords never committed
- [x] Rate Limiting — 5 requests per 15 minutes per IP
- [x] Hardcoded destination — server controls email recipient
- [x] Input sanitization — HTML tags stripped on both sides
- [x] CORS — Only whitelisted domains can call the API
- [x] Helmet — Security headers set automatically
- [x] Non-root Docker user
- [ ] **Configure SPF/DKIM** on the email domain to avoid spam folder
- [ ] **Set real SMTP password** in `Server/.env`

---

## 11. Testing Checklist
- [ ] Fill form → Submit → Check email inbox
- [ ] Submit empty form → Validation errors appear
- [ ] Submit invalid email → Email validation error
- [ ] Submit 6 times rapidly → Rate limit error on 6th attempt
- [ ] Disconnect network → Error banner appears
- [ ] Enter `<script>alert('xss')</script>` in message → Tags stripped
- [ ] Access `/api/health` → Returns `{"status":"ok"}`
