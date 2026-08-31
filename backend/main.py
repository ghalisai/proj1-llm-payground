import os
from fastapi import FastAPI
from models.chat_response import ChatResponse
from models.chat_request import ChatRequest
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv


load_dotenv()
model = ChatOpenAI(model='gpt-oss-120b',
                       api_key=os.getenv('OPENROUTER_API_KEY'),
                       base_url="https://openrouter.ai/api/v1")
                       
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a concise research assistant.
Put the entire reply in the `answer` field.
Rules:
- No markdown bold (**). Use plain text.
- Use this layout exactly:
Summary:
<2-3 sentences>

Keep each bullet on its own line. If the question is not about a person or companies, still use Summary / Key facts / Details."""),
    ("human", "{question}"),
])
model = model.with_structured_output(ChatResponse)
chain = prompt | model

app = FastAPI(
    title="AskMe API",
    description="API for the AskMe app",
    version="1.0.0",
    root_path="/api/v1",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",

)
origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],)



@app.post("/askme", response_model=ChatResponse)
async def askme(request: ChatRequest):
    res = chain.invoke({"question":request.question})
    return ChatResponse(answer=res.answer)

