# TezRoute

### Railway Traffic Management DSS — integrates AI/OR models with a user-friendly dashboard to enhance train precedence decisions, throughput, and punctuality.

## Setup Instructions

### 1. **Clone the Repository**
```bash
git clone https://github.com/Sachin-0001/TezRoute.git
cd TezRoute
```
### 2. **Install Packages**
```bash
npm i
```
### 3. **Run the Application**
```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`

### 4. **Backend Setup (Optional)**
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac
pip install -r requirements.txt

# Start FastAPI backend
uvicorn app:app --reload --port 8000
```

## Features & Functionality

### **Core Dashboard Features**
- **Real-time Railway Network Map** - Interactive live map showing train positions, stations, and track status
- **System Overview Panel** - Real-time metrics including active trains, on-time performance, conflicts, and system efficiency
- **Live Train Schedule** - Dynamic schedule panel with arrival times, platform assignments, and train details
- **Recent Activities Feed** - Real-time activity log showing resolutions, delays, maintenance, and weather alerts

### **AI-Powered Decision Support**
- **RailAI Chat Assistant** - AI-powered chatbot for railway control advice using Google Gemini
- **Decision Support Panel** - AI-recommended conflict resolution options with impact analysis
- **Conflict Detection** - Automated prediction of track conflicts and train precedence issues
- **Smart Recommendations** - AI-scored decision options with safety checks and impact assessment

### **Analytics & Reporting**
- **Performance Analytics** - Comprehensive KPIs including on-time performance, delays, and system uptime
- **Interactive Charts** - Visual analytics with area charts, line graphs, and pie charts for incident analysis
- **Route Performance Analysis** - Detailed breakdown by railway lines with utilization and revenue metrics
- **Export Capabilities** - Download reports in JSON format for further analysis
- **Real-time KPI Tracking** - Live monitoring of key performance indicators

### **Alert & Incident Management**
- **Alert Center** - Real-time incident monitoring with priority-based categorization
- **Multi-level Escalation** - Automated escalation system with response time tracking
- **Affected Train Tracking** - Detailed impact assessment for each incident
- **Status Management** - Active, acknowledged, resolved, and monitoring states

### **Simulation & Testing**
- **Railway Simulation Engine** - Full railway station simulation with train movements and conflicts
- **Interactive Simulation Dashboard** - Real-time simulation control with step-by-step execution
- **Conflict Resolution Testing** - Safe testing environment for decision-making scenarios
- **Performance Metrics** - Simulation KPIs including waiting times, platform utilization, and completion rates

### **User Management System**
- **Secure Authentication** - JWT-based login with government ID verification
- **User Registration** - Complete user creation with validation
- **Profile Management** - User profile viewing and management
- **Session Management** - Secure logout and session handling

### **Network Visualization**
- **Interactive Railway Map** - SVG-based network visualization with train and station overlays
- **Real-time Train Tracking** - Live position updates with status indicators (on-time, delayed, conflict)
- **Station Information** - Detailed station data with capacity and type information
- **Track Status Display** - Visual representation of track conditions and conflicts

### **Technical Features**
- **Modern UI/UX** - Built with Next.js 15, React 18, and Tailwind CSS
- **Responsive Design** - Mobile-first responsive layout
- **Real-time Updates** - WebSocket-ready architecture for live data
- **Component Library** - Comprehensive UI component system with Radix UI
- **Database Integration** - MongoDB with Mongoose for user data
- **API Architecture** - RESTful API with FastAPI backend
- **Security** - Password hashing, JWT tokens, and secure cookies

### **Backend Simulation Engine**
- **Railway Simulator** - Python-based simulation with train physics and scheduling
- **Conflict Detection Algorithm** - Advanced algorithms for predicting train conflicts
- **Greedy Controller** - AI agent for automated conflict resolution
- **Data Logging** - Comprehensive logging system for simulation events
- **Configurable Topology** - JSON-based railway network configuration
- **Timetable Management** - CSV-based train schedule management

### **Pages & Navigation**
1. **Dashboard** (`/`) - Main control center with live map and metrics
2. **Decision Panel** (`/decision-panel`) - AI-powered conflict resolution
3. **Alerts** (`/alerts`) - Incident management and monitoring
4. **Simulation** (`/simulation`) - Railway simulation testing environment
5. **Reports** (`/reports`) - Analytics and performance reporting
6. **Network Map** (`/network-map`) - Full-screen railway network view
7. **Login** (`/login`) - User authentication
8. **Profile** (`/profile`) - User profile management
9. **Create User** (`/createUser`) - User registration

- **Authentication**: `/api/users/login`, `/api/users/signup`, `/api/users/logout`
- **User Management**: `/api/users/about` (profile data)
- **AI Chat**: `/api/hello` (RailAI chatbot)
- **Simulation**: `/init`, `/state`, `/conflicts`, `/greedy_actions`, `/actions`, `/step`

### **Dependencies**
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Radix UI, Recharts, Axios
- **Backend**: FastAPI, Python, LangChain, Pydantic, Uvicorn
- **Database**: MongoDB, Mongoose
- **AI/ML**: Google Generative AI (Gemini), LangChain tools
- **Authentication**: JWT, bcryptjs
- **Charts**: Recharts for data visualization

---