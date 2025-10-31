# BookIt - Travel Experience Booking App

BookIt is a full-stack web application that allows users to explore and book travel experiences. Users can view details, select available time slots, apply promo codes, and complete bookings — all in a smooth, single-flow interface.

---

## 🚀 Live Demo

🔗 **Live Website:** [https://bookit-chi-orcin.vercel.app/](https://bookit-chi-orcin.vercel.app/)

---

## ✨ Features

- View a list of all available experiences.  
- Check detailed information about each experience.  
- Select available time slots.  
- Apply promo codes during checkout.  
- Confirm bookings with a success or failure message.  
- Responsive and mobile-friendly interface.  
- Fully connected backend with MongoDB.  

---

## 🧰 Tech Stack

### Frontend
- React (Vite)  
- Tailwind CSS  
- React Router  
- Fetch API  

### Backend
- Node.js  
- Express  
- MongoDB + Mongoose  
- dotenv  
- CORS  

---

## 📁 Folder Structure

```
bookit/
│
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components and pages both
│   │   └── App.jsx
│   └── package.json
│
├── backend/                 # Node.js Backend
│   ├── models/              # Mongoose Schemas
│   ├── routes/              # API Routes
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-link>
cd bookit
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```
PORT=3000
MongoDB_Url=your_mongodb_connection_string
```

Run the backend:

```bash
node index.js
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The app will start on:

- **Frontend:** http://localhost:5173  
- **Backend:** http://localhost:3000  

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /experiences | Get all experiences |
| GET | /experiences/:id | Get single experience details |
| POST | /bookings | Create a new booking |
| POST | /promo/validate | Validate promo code |

---

## 📦 Deliverables

- Home Page showing all experiences  
- Detail Page for each experience  
- Checkout Page with promo and booking confirmation  
- Result Page showing success or failure  
- Fully responsive frontend  
- MongoDB connected backend  
- Matches the given Figma design  

---

## 🌐 Deployment

- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas  

---

## 👨‍💻 Developer

**Mahipal Kumawat**  
B.Tech Physics, IIT Mandi  

---

## 📄 License

This project is created for educational  purposes only.
