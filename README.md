# Aplikacja do pracy magisterskiej

Aplikacja powstała na potrzeby przeprowadzenia badań nad wpływem mikrointerakcji na doświadczenia użytkownika w interfejsach użytkownika. Jest to prosty sklep internetowy z technologią, składa się jedynie z 5-ciu widoków:

-   strona główna
-   strona logowania i rejestracji
-   strona z listą produktów
-   koszyk
-   szczegóły produktu

## 🛠️ Run Locally

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
