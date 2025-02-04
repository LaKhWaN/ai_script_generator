from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import google.generativeai as genai
import markdown
from PIL import Image
import requests
from .models import ScriptsModel
from django.http import JsonResponse
import os

gemini_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=gemini_key)
model = genai.GenerativeModel("gemini-1.5-flash")

OCR_API_KEY = os.getenv('OCR_API_KEY')
OCR_URL = "https://api.ocr.space/parse/image"

def extract_text_from_pdf(pdf_file):
    payload = {
        "apikey": OCR_API_KEY,
        "isOverlayRequired": False,
        "filetype": "PDF",
        "scale": True,
        "OCREngine": 2
    }

    files = {"file": (pdf_file.name, pdf_file.read(), pdf_file.content_type)}

    response = requests.post(OCR_URL, files=files, data=payload)
    result = response.json()

    if result.get("ParsedResults"):
        return result["ParsedResults"][0]["ParsedText"]
    
    return None


def generate_gemini_script(prompt, file=None):
    full_prompt = (
        "Generate a video script of mentioned minutes (if not mentioned in the details below use 3 minutes) with all the basic"
        " requirements. If an image is attached, view the image and generate"
        " accordingly.\nThe details are mentioned below:\n" + prompt
    )
    
    if file:
        print("File received")
        response = model.generate_content([full_prompt, file])
        return response.text

    print("No file received")
    response = model.generate_content(full_prompt)
    return response.text

def home(request):
    return render(request, 'index.html')

@api_view(["POST"])
def generate_script(request):
    prompt = request.POST.get('prompt', '')
    file = request.FILES.get('file')

    extracted_text = ""

    if file:
        file_type = file.content_type

        if "pdf" in file_type:
            extracted_text = extract_text_from_pdf(file)
        elif "image" in file_type:
            img = Image.open(file)
            extracted_text = generate_gemini_script(prompt, img)
    
    final_prompt = extracted_text if extracted_text else prompt

    response_text = generate_gemini_script(final_prompt)

    html_markdown = markdown.markdown(response_text)
    sample_response = {
        "response": html_markdown
    }

    script = ScriptsModel.objects.create(title=prompt, content = html_markdown)
    print("[DEBUG] Saved in database sucessfully: ", script.id)
    return Response(sample_response)

@api_view(["GET"])
def get_saved_scripts(request):
    scripts = list(ScriptsModel.objects.values())
    return Response(scripts)

@api_view(['GET'])
def get_script(request, script_id):
    try:
        script = ScriptsModel.objects.get(id=script_id)
        return JsonResponse({
            "id": script.id,
            "title": script.title,
            "content": script.content
        })
    except ScriptsModel.DoesNotExist:
        return JsonResponse({"error": "Script not found"}, status=404)