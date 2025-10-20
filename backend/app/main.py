from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .core.database import engine, Base
from .auth.routes import router as auth_router
from .routes.transactions import router as transactions_router
from .routes.budgets import router as budgets_router
from .routes.ai import router as ai_router

# Import all models to ensure they're registered
from .models.user import User
from .models.transaction import Transaction
from .models.budget import Budget

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Finance Tracker API",
    description="A personal finance management API with AI assistant",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(transactions_router)
app.include_router(budgets_router)
app.include_router(ai_router)


@app.get("/")
def read_root():
    """Root endpoint"""
    return {"message": "Finance Tracker API is running!"}


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}