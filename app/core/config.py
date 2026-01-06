from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    DATABASE_URL: str = Field("sqlite:///./tunorient.db", env="DATABASE_URL")
    SECRET_KEY: str = Field("change-me", env="SECRET_KEY")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(60 * 24, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    ALGORITHM: str = Field("HS256", env="ALGORITHM")

    model_config = {
        "env_file": ".env",
        "extra": "allow",
    }

settings = Settings()