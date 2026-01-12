import os
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    APP_NAME: str = "Piyog AI Backend"
    API_V1_STR: str = "/api/v1"
    
    # AI Provider Selection: "gemini" or "deepseek"
    AI_PROVIDER: str = "gemini" 
    
    # API Keys
    GOOGLE_API_KEY: str | None = None
    DEEPSEEK_API_KEY: str | None = None
    
    class Config:
        env_file = ".env"
        extra = "ignore"

@lru_cache()
def get_settings():
    return Settings()
