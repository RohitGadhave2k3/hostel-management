from datetime import datetime
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import pooling, IntegrityError
from dotenv import load_dotenv

# Load .env
load_dotenv()

# Database config
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "127.0.0.1"),
    "user": os.getenv("DB_USER", "hostel"),
    "password": os.getenv("DB_PASSWORD", "admin@123"),
    "database": os.getenv("DB_NAME", "hostel_db"),
    "port": int(os.getenv("DB_PORT", 3306)),
}

# Create connection pool
POOL_NAME = "hostel_pool"
POOL_SIZE = 5

try:
    cnxpool = pooling.MySQLConnectionPool(
        pool_name=POOL_NAME,
        pool_size=POOL_SIZE,
        **DB_CONFIG
    )
except mysql.connector.Error as e:
    raise SystemExit(f"Failed to initialize MySQL pool: {e}")

app = Flask(__name__)
CORS(app)  # 👈 Enable CORS for React frontend
app.secret_key = os.getenv("FLASK_SECRET", "dev-secret-change-me")

def get_conn():
    return cnxpool.get_connection()

# ---------------------------------------------------------
# 1️⃣ GET ALL STUDENTS (React calls this)
# ---------------------------------------------------------
@app.route("/api/students", methods=["GET"])
def get_students():
    keyword = request.args.get("keyword", "")
    conn = get_conn()
    cursor = conn.cursor(dictionary=True)

    try:
        if keyword:
            like = f"%{keyword}%"
            sql = """
            SELECT * FROM students
            WHERE CAST(id AS CHAR) LIKE %s 
            OR name LIKE %s 
            OR room LIKE %s 
            OR phone LIKE %s
            ORDER BY created_at DESC
            """
            cursor.execute(sql, (like, like, like, like))
        else:
            cursor.execute("SELECT * FROM students ORDER BY created_at DESC")

        students = cursor.fetchall()
    finally:
        cursor.close()
        conn.close()

    return jsonify({"students": students})


# ---------------------------------------------------------
# 2️⃣ ADD STUDENT
# ---------------------------------------------------------
@app.route("/api/students", methods=["POST"])
def add_student():
    data = request.json

    try:
        sid = int(data["id"])
        name = data["name"].strip()
        room = data["room"].strip()
        phone = data.get("phone")
        email = data.get("email")
    except Exception:
        return jsonify({"error": "Invalid input"}), 400

    conn = get_conn()
    cursor = conn.cursor()

    try:
        query = "INSERT INTO students (id, name, room, phone, email) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(query, (sid, name, room, phone, email))
        conn.commit()
        return jsonify({"message": "Student added successfully"}), 201
    except IntegrityError as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 409
    finally:
        cursor.close()
        conn.close()


# ---------------------------------------------------------
# 3️⃣ EDIT STUDENT
# ---------------------------------------------------------
@app.route("/api/students/<int:sid>", methods=["PUT"])
def edit_student(sid):
    data = request.json
    name = data.get("name")
    room = data.get("room")
    phone = data.get("phone")
    email = data.get("email")

    conn = get_conn()
    cursor = conn.cursor()

    try:
        update_sql = """
            UPDATE students 
            SET name=%s, room=%s, phone=%s, email=%s 
            WHERE id=%s
        """
        cursor.execute(update_sql, (name, room, phone, email, sid))
        conn.commit()
        return jsonify({"message": "Student updated"})
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()


# ---------------------------------------------------------
# 4️⃣ PAY FEES
# ---------------------------------------------------------
@app.route("/api/students/<int:sid>/pay", methods=["PUT"])
def pay_fees(sid):
    conn = get_conn()
    cursor = conn.cursor()

    try:
        cursor.execute("UPDATE students SET fees_paid = 1 WHERE id = %s", (sid,))
        conn.commit()
        return jsonify({"message": "Fees marked as paid"})
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()


# ---------------------------------------------------------
# 5️⃣ DELETE STUDENT
# ---------------------------------------------------------
@app.route("/api/students/<int:sid>", methods=["DELETE"])
def delete_student(sid):
    conn = get_conn()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM students WHERE id=%s", (sid,))
        conn.commit()
        return jsonify({"message": "Student deleted"})
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()


# ---------------------------------------------------------
# START SERVER
# ---------------------------------------------------------
if __name__ == "__main__":
    debug = os.getenv("FLASK_DEBUG", "0") == "1"
    app.run(host="0.0.0.0", port=5000, debug=debug)
