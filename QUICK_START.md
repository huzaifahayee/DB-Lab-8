# ⚡ Quick Start Guide

> Get the Rozgar Pakistan app running in 5 minutes!

---

## Prerequisites

Before starting, make sure you have:

- [x] **SQL Server** + SQL Server Management Studio (SSMS)
- [x] **Node.js** v18+ ([Download](https://nodejs.org/))

---

## Step 1: Database Setup (2 min)

1. Open **SQL Server Management Studio**
2. Connect to your local server
3. Open and execute (F5) these files **in order**:

```
📄 01_Setup_Database.sql
📄 02_Task1_sp_LoginUser.sql
📄 03_Task2_CRUD_Procedures.sql
```

4. **Verify:** Run this query:
```sql
USE RozgarDB;
SELECT * FROM Users;
```
Should show 2 users ✅

---

## Step 2: Start Backend (1 min)

Open **Terminal / Command Prompt**:

```bash
cd backend
npm install
npm start
```

**Expected output:**
```
✅ Connected to SQL Server successfully!
✅ API URL: http://localhost:5000
```

> ⚠️ **Connection failed?** Update password in `server.js` line ~30

**Keep this terminal open!** ⬆️

---

## Step 3: Start Frontend (1 min)

Open **NEW Terminal** (keep backend running):

```bash
cd frontend
npm install
npm start
```

**Expected:** Browser opens at `http://localhost:3000` ✅

---

## Step 4: Login & Use

**Demo Credentials:**

| Field | Value |
|-------|-------|
| Email | `ali.raza@email.com` |
| Password | `password123` |

**Now you can:**
- 👀 View work experience
- ➕ Add new experience
- ✏️ Edit entries
- 🗑️ Delete entries

---

## Quick Fixes

| Problem | Solution |
|---------|----------|
| Cannot connect to SQL Server | Check SQL Server is running in Services |
| Login failed for 'sa' | Update password in `backend/server.js` |
| npm command not found | Install Node.js from [nodejs.org](https://nodejs.org/) |
| Port already in use | Close other terminals or restart computer |

---

## Task Files Reference

| Task | File |
|------|------|
| **Task 1** (SQL) | `02_Task1_sp_LoginUser.sql` |
| **Task 2** (SQL) | `03_Task2_CRUD_Procedures.sql` |
| **Task 3** (React) | `04_Task3_Login.jsx` |
| **Task 4** (React) | `05_Task4_ExperienceTable.jsx` |
| **Task 5** (Node) | `06_Task5_dbConfig.js` |
| **Task 6** (Node) | `07_Task6_Backend_POST_API.js` |
| **Task 7** (React) | `08_Task7_useEffect_READ.jsx` |
| **Task 8** (React) | `09_Task8_handleSave_CREATE.jsx` |

---

## Need More Help?

📖 See the full documentation in [README.md](README.md)

---

<p align="center">
  <b>Happy Coding! 🚀</b>
</p>
