import os
import time
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "mysql")
DB_PORT = int(os.getenv("DB_PORT", 3306))
DB_USER = os.getenv("DB_USER", "hostel")
DB_PASSWORD = os.getenv("DB_PASSWORD", "admin@123")
DB_NAME = os.getenv("DB_NAME", "hostel_db")

CREATE_DATABASE_SQL = f"CREATE DATABASE IF NOT EXISTS {DB_NAME}"

CREATE_TABLE_SQL = f"""
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    room VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    fees_paid TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

def wait_for_mysql():
    """Waits until MySQL becomes available inside Docker."""
    while True:
        try:
            print("⏳ Waiting for MySQL to be ready...")
            conn = mysql.connector.connect(
                host=DB_HOST,
                user=DB_USER,
                password=DB_PASSWORD,
                port=DB_PORT
            )
            if conn.is_connected():
                print("✅ MySQL is ready!")
                return conn
        except:
            time.sleep(2)

def initialize_database():
    print("🔄 Starting database initialization...")

    conn = wait_for_mysql()
    cursor = conn.cursor()

    # Create database
    cursor.execute(CREATE_DATABASE_SQL)
    print(f"📦 Database '{DB_NAME}' ensured.")

    # Switch to DB
    conn.database = DB_NAME

    # Create table
    cursor.execute(CREATE_TABLE_SQL)
    print("📚 Table 'students' ensured.")

    cursor.close()
    conn.close()
    print("🎉 Database initialization completed.")

if __name__ == "__main__":
    initialize_database()
