from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from ..models.budget import BudgetPeriod


class BudgetBase(BaseModel):
    category: str
    amount: float = Field(gt=0, description="Amount must be greater than 0")
    period: BudgetPeriod
    start_date: datetime
    end_date: datetime


class BudgetCreate(BudgetBase):
    pass


class BudgetUpdate(BaseModel):
    category: Optional[str] = None
    amount: Optional[float] = Field(None, gt=0)
    period: Optional[BudgetPeriod] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


class BudgetResponse(BudgetBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class BudgetWithSpending(BudgetResponse):
    spent: float
    remaining: float
    percentage_used: float