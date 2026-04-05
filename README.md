# Socially: A Modern Social Media Platform

[![Next.js](https://img.shields.io/badge/Framework-Next.js-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/UI-Shadcn_UI-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF)](https://clerk.com/)
[![UploadThing](https://img.shields.io/badge/Storage-UploadThing-FD5956)](https://uploadthing.com/)

Socially is a modern, responsive social media web application designed to connect users through a seamless and highly interactive interface. Built with a robust full-stack architecture using Next.js and TypeScript, Socially offers secure authentication, fast image uploading, and a beautifully designed UI that works flawlessly across desktops, tablets, and mobile devices.

---

## 🚀 Demo

Click the link below to see the demonstration of the Socially (a modern social media platform).

Link 👉 https://drive.google.com/file/d/1Yrvyikc8Qu4p-yVCIv5exD6e8q_bM0Ih/view?usp=sharing 👈

---

## ✨ Features

| Category | Features |
|---|---|
| Authentication | Secure sign up, sign in, and comprehensive account settings powered by Clerk. |
| Media Management | Fast and reliable image uploading and hosting using UploadThing. |
| Responsive Design | Fully optimized UI for smooth experiences on mobile, tablet, and desktop devices. |
| Modern UI/UX | Beautiful, accessible, theme toggle and customizable interface components built with Shadcn UI and Tailwind CSS. |
| Database | Scalable and serverless data storage using Neon PostgreSQL and Prisma ORM. |
| Type Safety | End-to-end type safety across the entire application using TypeScript. |
---

## 🛠️ Technologies Used

### Frontend & UI
* **Next.js:** React framework for server-side rendering, routing, and building full-stack web applications.
* **TypeScript:** For static typing to ensure robust and maintainable code.
* **Tailwind CSS:** Utility-first CSS framework for rapid and highly customizable styling.
* **Shadcn UI:** Reusable, accessible, and beautifully designed UI components.

### Backend & Database
* **PostgreSQL (Neon):** Serverless, highly scalable relational database.
* **Prisma ORM:** Modern database toolkit to query, migrate, and seamlessly model application data.

### Third-Party Services
* **Clerk:** For comprehensive user authentication and seamless account management.
* **UploadThing:** For efficient, secure, and developer-friendly file and image uploading.

---

## ⚙️ Installation & Setup

Clone the repository and navigate to the project folder to install dependencies.
```bash
  git clone https://github.com/MrTharinduDasantha/Socially.git
  cd Socially
```

**1. Install Dependencies**
Install all required packages for the application:
```bash
npm install
```

**2. Database Setup (Neon & Prisma)**
Sync your Prisma schema with your Neon PostgreSQL database:
```bash
npx prisma generate
npx prisma db push
```

**3. Environment Variables**
Create a .env file in the root directory of your project. Add the following configuration variables to connect to Clerk, your Neon database, and UploadThing:
```bash
# Clerk configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "Enter your clerk publishable key"
CLERK_SECRET_KEY = "Enter your clerk secret key"

# PostgreSQL database configuration (Neon)
DATABASE_URL = "Enter your PostgreSQL database url"
DIRECT_URL = "Enter your PostgreSQL direct url"

# Uploadthing configuration
UPLOADTHING_TOKEN = "Enter your uploadthing token"
```

**4. Run the Application**
Start the Next.js development server:
```bash
npm run dev
```

---

## 💻 Usage
**1. Sign Up / Sign In:** Use Clerk's authentication to create an account.

**2. Interact:** Like and comment on posts from your feed

**3. Create a Post":** Write your caption, upload an image (via Uploadthing), and publish.

**4. Follow Users:** Visit any user's profile and click "Follow" to see their posts.

**4. Manage Profile:** Edit your profile picture, bio, and personal details.

**5. Responsive Experience:** Access all features seamlessly on mobile, tablet, or desktop.

---

## 📸 Screenshots

![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%201.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%202.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%203.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%204.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%205.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%206.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%207.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%208.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%209.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%2010.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%2011.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20-%2012.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20(Mobile%20View)%20-%2013.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20(Mobile%20View)%20-%2014.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20(Mobile%20View)%20-%2015.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20(Mobile%20View)%20-%2016.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20(Mobile%20View)%20-%2017.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20(Mobile%20View)%20-%2018.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20(Mobile%20View)%20-%2019.png)
![image alt](https://github.com/MrTharinduDasantha/Socially/blob/8dcdbc912b08209ddd8f8c1ea3c8635f126f858a/public/website-images/Img%20(Mobile%20View)%20-%2020.png)

<h4 align="center"> Don't forget to leave a star ⭐️ </h4>
