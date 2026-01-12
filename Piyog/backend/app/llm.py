from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from app.config import get_settings

settings = get_settings()

def get_llm():
    """
    Returns the configured Chat Model based on settings.
    """
    provider = settings.AI_PROVIDER.lower()
    
    if provider == "gemini":
        if not settings.GOOGLE_API_KEY:
            raise ValueError("GOOGLE_API_KEY is not set in environment variables.")
        return ChatGoogleGenerativeAI(
            model="gemini-flash-latest", 
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0.7
        )
    
    elif provider == "deepseek":
        if not settings.DEEPSEEK_API_KEY:
            raise ValueError("DEEPSEEK_API_KEY is not set in environment variables.")
        # DeepSeek is often compatible with OpenAI client, using their base URL
        return ChatOpenAI(
            model="deepseek-chat",
            api_key=settings.DEEPSEEK_API_KEY,
            base_url="https://api.deepseek.com/v1",
            temperature=0.7
        )
    
    else:
        raise ValueError(f"Unsupported AI Provider: {provider}")
