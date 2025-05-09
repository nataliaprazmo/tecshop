# TecSklep

The application was created for the purpose of conducting research on the impact of microinteractions on user experience in user interfaces. It is a simple tech e-commerce store consisting of only five views:

-   home page
-   login and registration page
-   product list page
-   shopping cart
-   product details page

---

## Technologies

#### Design & Frontend

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![react-feather](https://img.shields.io/badge/react--feather-0066ff?style=for-the-badge&logoColor=white)

#### Database & Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Fastify](https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

#### Acknowledges

-   **TypeScript** for enabling static typing across the fullstack codebase
-   **Prisma** for seamless database modeling and type-safe querying
-   **react-feather** for minimalist, SVG-based icon components

---

## 🛠️ Getting started

### Prerequisites

Before you begin, ensure the following tools are installed on your machine:

-   [Node.js (v20 or later)](https://nodejs.org/)
-   [npm (comes with Node.js)](https://www.npmjs.com/)
-   [Docker](https://www.docker.com/)
-   [Docker Compose](https://docs.docker.com/compose/)

### **1️⃣ Clone the Repository**

```bash
  git clone https://
  cd mgr_app
```

### **2️⃣ Install Dependencies**

**Backend**

```bash
  cd back
  npm install
```

**Frontend**

```bash
  cd ../front
  npm install
```

### **3️⃣ Set Up the Database with Docker**

From the project root:

```bash
docker compose up
```

Wait for the database container to initialize.

### **4️⃣ Initialize Prisma (Backend)**

```bash
cd ../back
npx prisma migrate dev --name init
npx prisma generate
npm run seed
```

### **5️⃣ Start Development Servers 🚀**

**Backend** (from `back/`):

```bash
  npm run dev
```

**Frontend** (from `front/`):

```bash
npm run dev
```

🌐 Now open `http://localhost:3000` in your browser.

### **6️⃣ Build for Production 🚀**

You can build and start either the backend or frontend by switching to the respective directory:

```
# In either back/ or front/
npm run build
npm run start
```

#### Conclusion

You now have the full application running locally — both frontend and backend connected and ready for development or testing.

---

<br/>
<div style="display: flex; flex-direction: column; gap: 16px; justify-content: center; align-items: center;">
    <img alt="Demo" src="./demo/demo.PNG" >
    <img alt="Demo2" src="./demo/demo2.PNG" >
    <img alt="Demo2" src="./demo/demo3.PNG" >
</div>
