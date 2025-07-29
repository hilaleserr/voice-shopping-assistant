import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()  # .env dosyasını yükle

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_user_input(user_text):
    model = genai.GenerativeModel("gemini-pro")
    prompt = f"""
Kullanıcının ürün arama isteğini analiz et ve filtre kriterlerini JSON formatında ver:

"{user_text}"

Format:
{{
  "category": "kategori_ismi",
  "color": "renk",
  "size": "beden",
  "material": "malzeme",
  "max_price": fiyat
}}
"""
    response = model.generate_content(prompt)
    return response.text
