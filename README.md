# 💰 FinanceTracker - AI-Powered Personal Finance Manager

A modern, full-stack personal finance management application with AI-powered financial advice. Built for software engineers and tech professionals who want to take control of their money.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

## ✨ Features

### 🔐 Authentication & Security
- JWT-based user authentication
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- Session management

### 💸 Transaction Management
- Track income and expenses
- Categorize transactions (Food, Transport, Housing, etc.)
- Add descriptions and dates
- Edit and delete transactions
- Real-time statistics (total income, expenses, balance)

### 📊 Budget Planning
- Create monthly or yearly budgets
- Track spending against budget limits
- Visual progress indicators
- Budget alerts (90% threshold warnings)
- Category-based budget tracking

### 🤖 AI Financial Advisor
- Powered by Google Gemini AI
- Natural, conversational responses
- Context-aware advice based on your financial data
- Finance-specific guidance only
- Indian Rupee (₹) support

### 🎨 Beautiful UI/UX
- Dark gradient theme with glass morphism
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Modern, professional design
- Intuitive navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **PyMySQL** - MySQL database driver
- **Pydantic** - Data validation
- **Python-Jose** - JWT token handling
- **Passlib** - Password hashing
- **Google GenAI** - AI integration

### Database
- **MySQL** - Relational database (Railway hosted)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **MySQL Database** - Railway or local instance
- **Google Gemini API Key** - [Get it here](https://makersuite.google.com/app/apikey)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd finance-tracker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Mac/Linux

# Edit .env file with your credentials
```

**Backend `.env` Configuration:**
```env
DATABASE_URL=mysql://root:your-password@host:port/database
SECRET_KEY=your-super-secret-jwt-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GEMINI_API_KEY=your-gemini-api-key
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Mac/Linux
```

**Frontend `.env` Configuration:**
```env
VITE_API_URL=http://localhost:8000
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn app.main:app --reload
```
Backend will run at: http://localhost:8000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run at: http://localhost:5173

## 📱 Usage

1. **Open your browser** and go to http://localhost:5173
2. **Create an account** on the registration page
3. **Login** with your credentials
4. **Start tracking** your finances!

### Quick Tour:

- **Dashboard** - View your financial overview
- **Transactions** - Add, edit, or delete income/expenses
- **Budgets** - Set spending limits and track progress
- **AI Assistant** - Get personalized financial advice

## 🗄️ Database Schema

### Users Table
```sql
- id (Primary Key)
- email (Unique)
- full_name
- hashed_password
- is_active
- created_at
- updated_at
```

### Transactions Table
```sql
- id (Primary Key)
- user_id (Foreign Key)
- type (income/expense)
- category (salary, food, transport, etc.)
- amount
- description
- date
- created_at
- updated_at
```

### Budgets Table
```sql
- id (Primary Key)
- user_id (Foreign Key)
- category
- amount
- period (monthly/yearly)
- start_date
- end_date
- created_at
- updated_at
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user (returns JWT token)
- `GET /auth/me` - Get current user info

### Transactions
- `GET /transactions` - Get all transactions (with filters)
- `POST /transactions` - Create new transaction
- `GET /transactions/{id}` - Get specific transaction
- `PUT /transactions/{id}` - Update transaction
- `DELETE /transactions/{id}` - Delete transaction
- `GET /transactions/stats` - Get financial statistics

### Budgets
- `GET /budgets` - Get all budgets with spending info
- `POST /budgets` - Create new budget
- `GET /budgets/{id}` - Get specific budget
- `PUT /budgets/{id}` - Update budget
- `DELETE /budgets/{id}` - Delete budget

### AI Assistant
- `POST /ai/assistant` - Get AI financial advice

## 🎨 Features in Detail

### Transaction Categories

**Income:**
- Salary
- Freelance
- Investment
- Other Income

**Expenses:**
- Food
- Transport
- Housing
- Utilities
- Entertainment
- Healthcare
- Shopping
- Education
- Other Expense

### Budget Periods
- Monthly budgets
- Yearly budgets

### AI Assistant Capabilities
- Budgeting strategies
- Saving advice
- Investment guidance
- Expense reduction tips
- Financial goal planning
- India-specific financial advice

## 🔧 Configuration

### Environment Variables

**Backend:**
- `DATABASE_URL` - MySQL connection string
- `SECRET_KEY` - JWT secret key (generate a strong random string)
- `ALGORITHM` - JWT algorithm (HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time
- `GEMINI_API_KEY` - Google Gemini API key
- `FRONTEND_URL` - Frontend URL for CORS

**Frontend:**
- `VITE_API_URL` - Backend API URL

## 🐛 Troubleshooting

### Backend Issues

**Error: "No module named 'google.genai'"**
```bash
pip install google-genai
```

**Error: "Database connection failed"**
- Check your DATABASE_URL in .env
- Ensure MySQL server is running
- Verify credentials are correct

**Error: "Invalid API key"**
- Get a new Gemini API key from Google AI Studio
- Update GEMINI_API_KEY in .env

### Frontend Issues

**Error: "Module not found"**
```bash
npm install
```

**Error: "API connection failed"**
- Ensure backend is running on port 8000
- Check VITE_API_URL in .env
- Verify CORS settings in backend

**Blank screen or styling issues**
```bash
# Clear Vite cache
rmdir /s /q node_modules\.vite  # Windows
rm -rf node_modules/.vite       # Mac/Linux
npm run dev
```

## 📦 Build for Production

### Backend
```bash
cd backend
pip install -r requirements.txt
# Deploy to your preferred hosting (Railway, Heroku, AWS, etc.)
```

### Frontend
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to Vercel, Netlify, or any static host
```

## 🔒 Security Best Practices

1. **Change the SECRET_KEY** in production
2. **Use environment variables** for sensitive data
3. **Enable HTTPS** in production
4. **Regularly update dependencies**
5. **Implement rate limiting** for API endpoints
6. **Use strong passwords** for database

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for software engineers who want to master their finances.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent financial advice
- Railway for database hosting
- Tailwind CSS for beautiful styling
- FastAPI for the amazing Python framework
- React team for the excellent UI library

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Review the setup instructions
3. Check browser console for errors (F12)
4. Verify all environment variables are set correctly

## 🎯 Roadmap

Future enhancements planned:
- [ ] Data visualization with charts
- [ ] Export transactions to CSV/PDF
- [ ] Email notifications for budget alerts
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Financial goals tracking
- [ ] Mobile app (React Native)
- [ ] Dark/Light mode toggle

---

**Happy Finance Tracking! 💰📊**