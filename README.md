# 🗓️ Weekly Planner

A simple full-stack application designed to organize your week. This project uses a **FastAPI** backend to serve a **React** single-page application, with **PostgreSQL** handling the data persistence.

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/react-%2320232d.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)

---

## 📖 Summary
The Weekly Planner allows users to manage tasks across a 7-day view and between weeks. It features a robust API for task creation, deletion, and status updates, utilizing a relational database to maintain task order and assignments based on a `position` and `assigned_date` logic.

## 🛠️ Prerequisites
* **Node.js** (v18+)
* **Python** (3.10+)
* **PostgreSQL** instance

## 🚀 Getting Started

### 1. Database Configuration
Create a `.env` file in the `/backend` directory with the following variables:
```env
DB_USER=your_postgres_user
DB_PASSWORD=your_password
DB_NAME=your_db_name
```

### 2. Frontend Build
Navigate to the frontend folder to install dependencies and generate the production build:
```bash
cd frontend
npm install 
npm run build
```

### 3. Backend Setup
Create your virtual environment and install the required Python packages:
```bash
cd ../backend
python -m venv venv

# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 4. Running the App
Run the production server from the `/backend` folder:
```bash
fastapi run main.py
```
The application will be available at: `http://localhost:8000`

## 🛠️ Development Workflow

If you want to modify the code with live updates:
1. **Backend**: Run `fastapi dev main.py` in the `/backend` folder (Port 8000)
2. **Frontend**: Run `npm run dev` in the `/frontend` folder (Port 5173)
3. Access the app via the Vite port (`http://localhost:5173`). The frontend is configured to proxy `/api` requests to the backend.

## 📁 Project Structure

```Plaintext
├── backend/
│   ├── main.py          # Entry point & Static file serving
│   ├── database.py      # SQLAlchemy engine & Session setup
│   ├── models/          # SQLAlchemy Models (Task)
│   ├── schemas/         # Pydantic schemas
│   └── routers/         # API Endpoints (/api/tasks)
└── frontend/
    ├── src/             # React & Tailwind components
    └── dist/            # Compiled production assets (created after build)
```

## 📦 requirements.txt

```text
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.12.1
certifi==2026.1.4
click==8.3.1
colorama==0.4.6
dnspython==2.8.0
email-validator==2.3.0
fastapi==0.129.0
fastapi-cli==0.0.23
fastapi-cloud-cli==0.13.0
fastar==0.8.0
greenlet==3.3.1
h11==0.16.0
httpcore==1.0.9
httptools==0.7.1
httpx==0.28.1
idna==3.11
Jinja2==3.1.6
markdown-it-py==4.0.0
MarkupSafe==3.0.3
mdurl==0.1.2
psycopg2-binary==2.9.11
pydantic==2.12.5
pydantic-extra-types==2.11.0
pydantic-settings==2.13.0
pydantic_core==2.41.5
Pygments==2.19.2
python-dotenv==1.2.1
python-multipart==0.0.22
PyYAML==6.0.3
rich==14.3.2
rich-toolkit==0.19.4
rignore==0.7.6
sentry-sdk==2.53.0
shellingham==1.5.4
SQLAlchemy==2.0.46
starlette==0.52.1
typer==0.24.0
typing-inspection==0.4.2
typing_extensions==4.15.0
urllib3==2.6.3
uvicorn==0.41.0
watchfiles==1.1.1
websockets==16.0
```