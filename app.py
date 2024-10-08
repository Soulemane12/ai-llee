import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the OpenAI API key from environment variables
openai.api_key = os.getenv('OPENAI_API_KEY')

app = FastAPI()

# Set up static files and templates directory
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class ArticleRequest(BaseModel):
    article: str

def generate_summary(text: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Summarize the following text:\n\n{text}"}
        ],
        max_tokens=150
    )
    summary = response.choices[0].message['content'].strip()
    return summary

def generate_questions(text: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that creates questions."},
            {"role": "user", "content": f"Create a question from the following text:\n\n{text}"}
        ],
        max_tokens=50
    )
    question = response.choices[0].message['content'].strip()
    return question

def extract_correct_answer(question: str, context: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that provides correct answers."},
            {"role": "user", "content": f"Provide the correct answer for the following question based on this context:\n\nContext: {context}\n\nQuestion: {question}"}
        ],
        max_tokens=50
    )
    correct_answer = response.choices[0].message['content'].strip()
    return correct_answer

@app.get("/", response_class=RedirectResponse)
async def read_root():
    # Redirect the user to the convert-notes page when visiting the home page
    return RedirectResponse(url="/convert-notes")

@app.get("/convert-notes", response_class=HTMLResponse)
async def read_convert_notes(request: Request):
    return templates.TemplateResponse("convert-notes.html", {"request": request})

@app.post("/generate-quiz", response_class=JSONResponse)
async def generate_quiz(article_request: ArticleRequest):
    article = article_request.article

    if not article:
        raise HTTPException(status_code=400, detail="Article text is required.")

    summary = generate_summary(article)
    question = generate_questions(summary)
    answer = extract_correct_answer(question, article)

    return {
        "question": question,
        "answer": answer
    }

@app.post("/generate-flashcards", response_class=JSONResponse)
async def generate_flashcards(article_request: ArticleRequest):
    article = article_request.article

    if not article:
        raise HTTPException(status_code=400, detail="Article text is required.")

    summary = generate_summary(article)
    question = generate_questions(summary)
    answer = extract_correct_answer(question, article)

    return {
        "question": question,
        "answer": answer
    }
