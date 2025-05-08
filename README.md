"""
# 🩺 Prescription Tracker

A full-stack application that allows users to upload, manage, and share medical prescriptions, reports, and insurance details—for themselves and their family members. Supports sharing via WhatsApp and Gmail, with OCR-based categorization for reports and insurance documents.

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [Future Enhancements](#future-enhancements)

---

## 📖 Project Overview

The Prescription Tracker is a centralized platform designed to digitize and manage personal and family medical records. It enables secure storage, intelligent categorization (via OCR), and seamless sharing of health records.

---

## ⚙️ Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (File Storage)
- Flask OCR Service (for reports/insurance)
- Gmail & WhatsApp APIs

**Frontend:**
- React.js + Tailwind CSS
- React Router
- Context API

---

## ✅ Features

- JWT-based user registration and login
- View and update personal profile (Aadhaar, phone, blood group, etc.)
- Add non-user family members
- Upload prescriptions via form (manual tagging)
- OCR-based categorization of reports and insurance
- Filter prescriptions by category, member, date, or tags
- Download prescriptions as PDF
- Share prescriptions via WhatsApp or Gmail (individually or in bulk)
- Upload and track insurance policies

---

## 📁 Folder Structure

### Backend

\`\`\`
PrescriptionTrackerBackend/
├── server.js
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
└── validators/
\`\`\`

### Frontend

\`\`\`
/frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── index.js
\`\`\`

---

## 🚀 Setup Instructions

### Backend

1. Clone the repo
2. Run \`cd PrescriptionTrackerBackend\`
3. Create a \`.env\` file (see below)
4. Run \`npm install\`
5. Start server with \`npm run dev\`

### Frontend

1. Navigate to \`/frontend\`
2. Run \`npm install\`
3. Start frontend with \`npm start\`

---

## 🔐 Environment Variables

### \`.env\` for Backend

\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
OCR_FLASK_URL=http://localhost:5001
EMAIL_SERVICE_CONFIG=your_email_config
WHATSAPP_API_TOKEN=your_token
\`\`\`

---

## 📡 API Routes

| Feature        | Endpoint                         | Method | Description                         |
|----------------|----------------------------------|--------|-------------------------------------|
| Auth           | \`/api/auth/register\`             | POST   | Register user                       |
|                | \`/api/auth/login\`                | POST   | Login user                          |
| Member         | \`/api/members/\`                  | GET    | List user’s members                 |
| Prescription   | \`/api/prescriptions/\`            | POST   | Add new prescription                |
|                | \`/api/prescriptions/filter\`      | GET    | Filter prescriptions                |
|                | \`/api/prescriptions/download/:id\`| GET    | Download prescription PDF           |
| Reports        | \`/api/reports/\`                  | POST   | Upload report                       |
|                | \`/api/reports/ocr/:id\`           | POST   | OCR-based tagging                   |
| Insurance      | \`/api/insurance/\`                | POST   | Add insurance                       |
|                | \`/api/insurance/ocr/:id\`         | POST   | OCR-based tagging                   |
| Sharing        | \`/api/share/:id\`                 | POST   | Share single record                 |
|                | \`/api/share/bulk\`                | POST   | Share multiple records              |

---

## 🧠 Future Enhancements

- Health summary PDF generation
- Doctor login and dashboard
- Integration with DigiLocker / NDHM
- Reminders for expiring insurance and follow-ups

---

## 📬 Feedback

Feel free to contribute, fork, or suggest improvements via GitHub Issues or Pull Requests!
"""
