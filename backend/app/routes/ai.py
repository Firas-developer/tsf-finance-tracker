from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..core.database import get_db
from ..core.config import settings
from ..auth.dependencies import get_current_active_user
from ..models.user import User
from ..models.transaction import Transaction, TransactionType
from ..schemas.ai import AIQuery, AIResponse
import os

router = APIRouter(prefix="/ai", tags=["ai"])

# Try to import and configure Gemini API
try:
    from google import genai
    from google.genai import types
    
    # Set API key as environment variable
    os.environ['GOOGLE_API_KEY'] = settings.gemini_api_key
    
    # Create client
    client = genai.Client(api_key=settings.gemini_api_key)
    GEMINI_AVAILABLE = True
    print("✅ Gemini AI configured successfully!")
except ImportError:
    GEMINI_AVAILABLE = False
    client = None
    print("⚠️  WARNING: google-genai package not installed!")
    print("   Run: pip install google-genai")
except Exception as e:
    GEMINI_AVAILABLE = False
    client = None
    print(f"⚠️  WARNING: Error configuring Gemini API: {e}")


@router.post("/assistant", response_model=AIResponse)
async def get_ai_advice(
    query: AIQuery,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get AI-powered financial advice using Gemini"""
    
    # Check if Gemini is available
    if not GEMINI_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="AI service is not available. Please install google-generativeai package: pip install google-generativeai"
        )
    
    try:
        # Get user's financial context
        total_income = db.query(func.coalesce(func.sum(Transaction.amount), 0)).filter(
            Transaction.user_id == current_user.id,
            Transaction.type == TransactionType.INCOME
        ).scalar()
        
        total_expense = db.query(func.coalesce(func.sum(Transaction.amount), 0)).filter(
            Transaction.user_id == current_user.id,
            Transaction.type == TransactionType.EXPENSE
        ).scalar()
        
        balance = float(total_income or 0) - float(total_expense or 0)
        
        # Create context for AI
        context = f"""You are a professional financial advisor assistant. The user is a software engineer using a finance tracking app.

User's Financial Summary:
- Total Income: ${float(total_income or 0):.2f}
- Total Expenses: ${float(total_expense or 0):.2f}
- Current Balance: ${balance:.2f}

User's Question: {query.query}

Please provide helpful, actionable financial advice. Be concise, professional, and encouraging.
Focus on practical tips for software engineers regarding budgeting, saving, and investing.
Keep your response under 200 words."""
        
        # Call Gemini API using the new google-genai package
        from google.genai import types
        
        # Create system instruction for the financial advisor
        system_instruction = f"""You are an expert AI financial advisor exclusively for FinanceTracker, a personal finance management application.

STRICT GUIDELINES - YOU MUST FOLLOW THESE:

1. **ONLY Answer Finance-Related Questions**:
   - Personal finance, budgeting, saving, investing, debt management
   - Income management, expense tracking, financial planning
   - Retirement planning, emergency funds, financial goals
   - Tax strategies, insurance, wealth building
   
2. **REJECT Non-Finance Questions**:
   - If asked about anything NOT related to personal finance, politely decline
   - Response format: "I'm a financial advisor for FinanceTracker. I can only help with personal finance questions like budgeting, saving, investing, and money management. Please ask me about your finances!"
   - Do NOT answer questions about: coding, general knowledge, entertainment, sports, politics, health (unless financial health), etc.

3. **Your Capabilities**:
   - Analyze user's financial data and provide personalized advice
   - Suggest budgeting strategies (50/30/20 rule, zero-based budgeting)
   - Recommend savings and investment approaches
   - Help with debt reduction strategies
   - Provide tips for expense reduction and income optimization
   - Guide on emergency fund creation
   - Advise on financial goal setting

4. **User's Current Financial Status** (in Indian Rupees):
   - Total Income: ₹{float(total_income or 0):.2f}
   - Total Expenses: ₹{float(total_expense or 0):.2f}
   - Current Balance: ₹{balance:.2f}

5. **Response Style - IMPORTANT**:
   - Write like a friendly human advisor, NOT like an AI
   - Use conversational, natural language
   - Avoid robotic phrases like "I'd be happy to help", "Here's what I suggest", "Let me break this down"
   - Write in flowing paragraphs like you're chatting with a friend
   - Use casual transitions: "So", "Well", "Actually", "You know what"
   - Be warm and relatable, not formal
   - Keep responses under 250 words
   - Use emojis sparingly (1-2 max) and naturally
   - Reference their actual numbers when relevant
   - Avoid corporate jargon
   - Don't start with greetings or end with "Hope this helps!"
   - Just dive straight into the advice
   
   **Formatting Rules**:
   - Use **bold** only for emphasis on key numbers or important terms (sparingly)
   - Avoid using bullet points (•) or numbered lists (1. 2. 3.)
   - Write in natural paragraphs instead
   - Don't use headers (# ## ###)
   - Keep it conversational and flowing

6. **Examples of VALID Questions**:
   - "How can I save 20% of my salary?"
   - "What's a good monthly budget for groceries in India?"
   - "Should I invest in stocks or mutual funds?"
   - "How do I reduce my expenses?"
   - "What's the best way to build an emergency fund?"
   - "How much should I save for retirement?"

**Important**: All amounts are in Indian Rupees (₹). Provide advice relevant to Indian financial context.

7. **Examples of INVALID Questions** (Politely Decline):
   - "What's the weather today?"
   - "Write me a Python script"
   - "Who won the game yesterday?"
   - "Tell me a joke"
   - "What's the capital of France?"

8. **Tone Examples**:

❌ BAD (Too AI-like):
"I'd be happy to help you with your savings goal! Here are some strategies:
1. First, create a budget
2. Then, automate your savings
3. Finally, track your progress
I hope this helps! Let me know if you have any questions."

✅ GOOD (Natural & Human):
"So you want to save more? Looking at your current balance of ₹X, here's what I'd do. Start by setting aside 20% of your income right when you get paid - treat it like a bill you can't skip. The rest is yours to spend guilt-free. Most people try to save what's left at the end of the month, but that never works. Pay yourself first, always."

Remember: You are ONLY a financial advisor. Stay focused on personal finance topics. Write like a real person having a conversation, not like a chatbot."""

        # Generate response using the new API
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
                max_output_tokens=500,
            ),
            contents=query.query
        )
        
        # Extract response text
        response_text = response.text if hasattr(response, 'text') else str(response)
        
        if not response_text:
            raise Exception("Empty response from AI service")
        
        return {
            "query": query.query,
            "response": response_text
        }
        
    except ImportError:
        raise HTTPException(
            status_code=503,
            detail="Google Generative AI package not installed. Run: pip install --upgrade google-generativeai"
        )
    except Exception as e:
        error_message = str(e)
        
        # Provide specific error messages
        if "API_KEY_INVALID" in error_message or "API key not valid" in error_message:
            raise HTTPException(
                status_code=401,
                detail="Invalid Gemini API key. Get a new key from: https://makersuite.google.com/app/apikey"
            )
        elif "404" in error_message or "not found" in error_message.lower():
            raise HTTPException(
                status_code=503,
                detail="Gemini model not available. Try upgrading: pip install --upgrade google-generativeai"
            )
        elif "PERMISSION_DENIED" in error_message:
            raise HTTPException(
                status_code=403,
                detail="API key doesn't have permission. Enable Gemini API in Google Cloud Console"
            )
        elif "RESOURCE_EXHAUSTED" in error_message or "quota" in error_message.lower():
            raise HTTPException(
                status_code=429,
                detail="API quota exceeded. Please try again later or upgrade your plan"
            )
        else:
            # Log the full error for debugging
            print(f"❌ Gemini API Error: {error_message}")
            raise HTTPException(
                status_code=500,
                detail=f"AI service error: {error_message}"
            )