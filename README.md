# 🏠 Hostel Management System

A simple **3-tier application** built with:

- **Frontend:** React (React Router, Axios)
- **Backend:** Python Flask (REST API, MySQL connection pooling)
- **Database:** MySQL

---

## 📂 Project Overview
This project is a basic hostel management system that allows administrators to:

- ➕ Add new students  
- ✏️ Edit student details  
- 💰 Update payment status (fees paid)  
- 🗑️ Delete student records  
- 🔍 Search students by ID, name, room, or phone  

---

## 🛠️ Tech Stack
- **Frontend:** React + React Router  
- **Backend:** Flask (Python) with CORS enabled  
- **Database:** MySQL  

---

## 🗄️ Database Configuration
- **User:** `hostel`  
- **Password:** `admin@123`  
- **Database:** `hostel_db`  
- **Table:** `students`  

### Students Table Schema
```sql
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    room VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    fees_paid TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🚀 How to Run
Backend (Flask)
bash
cd backend
python -m flask run --host=0.0.0.0 --port=5000
Frontend (React)
bash
cd frontend
npm install
npm start
🔗 API Endpoints
GET /api/students → Fetch all students

POST /api/students → Add a new student

PUT /api/students/<id> → Update student details

PUT /api/students/<id>/pay → Mark fees as paid

DELETE /api/students/<id> → Delete a student

📌 Notes
Ensure MySQL is running and accessible at 127.0.0.1:3306.

Update .env file if you want to change DB credentials.

Add .gitignore to exclude node_modules/, .env, and other unnecessary files.
