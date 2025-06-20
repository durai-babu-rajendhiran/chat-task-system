# Chat Task System

A simple chat task management system with user authentication and chat tracking using MySQL.

---

## Database Setup

### 1. Create Database
```sql
CREATE DATABASE chat_system;
```
### Create users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
### Create chats Table
```sql
CREATE TABLE chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(255),
  message TEXT,
  timestamp DATETIME,
  status ENUM('completed', 'pending') DEFAULT 'pending'
);
```
## Features
✅ User Authentication

✅ Chat Message Storage

✅ Task Status Tracking (pending or completed)


### How to Use
## Clone the repository:
```
git clone https://github.com/durai-babu-rajendhiran/chat-task-system.git
```
Set up the database using the provided SQL queries.

Configure the database connection in your backend project.

### Run the project:
```
npm install
npm run dev
```
