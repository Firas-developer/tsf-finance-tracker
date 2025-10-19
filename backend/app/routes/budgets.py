from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from typing import List
from ..core.database import get_db
from ..auth.dependencies import get_current_active_user
from ..models.user import User
from ..models.budget import Budget
from ..models.transaction import Transaction, TransactionType
from ..schemas.budget import BudgetCreate, BudgetUpdate, BudgetResponse, BudgetWithSpending

router = APIRouter(prefix="/budgets", tags=["budgets"])


@router.post("", response_model=BudgetResponse, status_code=status.HTTP_201_CREATED)
def create_budget(
    budget: BudgetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new budget"""
    db_budget = Budget(
        **budget.dict(),
        user_id=current_user.id
    )
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget


@router.get("", response_model=List[BudgetWithSpending])
def get_budgets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all budgets for current user with spending info"""
    budgets = db.query(Budget).filter(Budget.user_id == current_user.id).all()
    
    result = []
    for budget in budgets:
        # Calculate spending for this budget period and category
        spent = db.query(func.coalesce(func.sum(Transaction.amount), 0)).filter(
            and_(
                Transaction.user_id == current_user.id,
                Transaction.type == TransactionType.EXPENSE,
                Transaction.category == budget.category,
                Transaction.date >= budget.start_date,
                Transaction.date <= budget.end_date
            )
        ).scalar()
        
        spent = float(spent)
        remaining = budget.amount - spent
        percentage = (spent / budget.amount * 100) if budget.amount > 0 else 0
        
        budget_dict = {
            **budget.__dict__,
            "spent": spent,
            "remaining": remaining,
            "percentage_used": round(percentage, 2)
        }
        result.append(budget_dict)
    
    return result


@router.get("/{budget_id}", response_model=BudgetWithSpending)
def get_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get a specific budget with spending info"""
    budget = db.query(Budget).filter(
        Budget.id == budget_id,
        Budget.user_id == current_user.id
    ).first()
    
    if not budget:
        raise HTTPException(status_code=404, detail="Budget not found")
    
    # Calculate spending
    spent = db.query(func.coalesce(func.sum(Transaction.amount), 0)).filter(
        and_(
            Transaction.user_id == current_user.id,
            Transaction.type == TransactionType.EXPENSE,
            Transaction.category == budget.category,
            Transaction.date >= budget.start_date,
            Transaction.date <= budget.end_date
        )
    ).scalar()
    
    spent = float(spent)
    remaining = budget.amount - spent
    percentage = (spent / budget.amount * 100) if budget.amount > 0 else 0
    
    return {
        **budget.__dict__,
        "spent": spent,
        "remaining": remaining,
        "percentage_used": round(percentage, 2)
    }


@router.put("/{budget_id}", response_model=BudgetResponse)
def update_budget(
    budget_id: int,
    budget_update: BudgetUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a budget"""
    db_budget = db.query(Budget).filter(
        Budget.id == budget_id,
        Budget.user_id == current_user.id
    ).first()
    
    if not db_budget:
        raise HTTPException(status_code=404, detail="Budget not found")
    
    # Update fields
    update_data = budget_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_budget, field, value)
    
    db.commit()
    db.refresh(db_budget)
    return db_budget


@router.delete("/{budget_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a budget"""
    db_budget = db.query(Budget).filter(
        Budget.id == budget_id,
        Budget.user_id == current_user.id
    ).first()
    
    if not db_budget:
        raise HTTPException(status_code=404, detail="Budget not found")
    
    db.delete(db_budget)
    db.commit()
    return None