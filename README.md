# Investing Platform – Frontend

Modern investment platform frontend built with **React + Vite + TypeScript**, featuring an Admin Dashboard and Customer Portal including KYC verification, task messaging, and reward tracking.

---

## Features

### Customer Portal

* User authentication (Login / Register)
* KYC submission (passport upload)
* Task / Offer system
* Submit proof links
* Reward tracking
* Status monitoring (Pending / Approved / Rejected)

### Admin Dashboard

* Manage users
* Send tasks / offers
* Review submissions
* Approve / Reject proofs
* KYC verification panel
* Reward distribution

---

## Tech Stack

* **React**
* **Vite**
* **TypeScript**
* **TailwindCSS**
* **Axios**
* **React Query**
* **JWT Auth**

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Aliromia21/InvestingWebsite.git
cd InvestingWebsite
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

Example file:

```
.env.example
```

---

## Run Development Server

```bash
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

## Build Production

```bash
npm run build
```

Output folder:

```
dist/
```

Preview build locally:

```bash
npm run preview
```

---

## Deployment Notes

When deploying behind **nginx** or similar servers, ensure SPA routing fallback:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Project Structure

```
src/
 ├── api/
 ├── components/
 │    ├── admin/
 │    └── customer/
 ├── hooks/
 ├── contexts/
 ├── pages/
 └── utils/
```

---

## Modules Overview

* **KYC System** – Passport upload & verification
* **Messaging / Tasks** – Admin → Customer offers
* **Rewards** – Approval-based payouts
* **User Management** – Admin control panel

---

## Contributing

Contributions are welcome.
Please open an issue before submitting major changes.

---

## License

Private / Internal Use – Not for redistribution without permission.

---

## 👨‍💻 Author

Developed by Ali Romia 
GitHub: https://github.com/Aliromia21

---
