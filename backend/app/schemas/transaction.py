from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from ..models.transaction import TransactionType, TransactionCategory


class TransactionBase(BaseModel):
    type: TransactionType
    category: TransactionCategory
    amount: float = Field(gt=0, description="Amount must be greater than 0")
    description: Optional[str] = None
    date: datetime


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    type: Optional[TransactionType] = None
    category: Optional[TransactionCategory] = None
    amount: Optional[float] = Field(None, gt=0)
    description: Optional[str] = None
    date: Optional[datetime] = None


class TransactionResponse(TransactionBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class TransactionStats(BaseModel):
    total_income: float
    total_expense: float
    balance: float
    transaction_count: int