# 📜 AI-Powered Video Script Generator

## 🚀 Overview

This project is an **AI-Powered Video Script Generator** built using **Django** for the backend and **HTML, TailwindCSS, and JavaScript** for the frontend. It utilizes **Gemini API** to generate scripts based on user prompts. Users can dynamically input text, upload files (documents, images), and provide links to enhance script generation.

Note: I used Gemini API because x.ai api is no longer available for free

---

## 🛠️ Features Implemented

- ✅ **AI-Generated Scripts** - Generates scripts dynamically based on user input using Gemini API.
- ✅ **Dynamic Input Support** - Accepts text, file uploads (documents, images), and links.
- ✅ **Save & Retrieve Scripts** - Users can save and revisit previously generated scripts.
- ✅ **User-Friendly Interface** - Designed with TailwindCSS for a modern UI.
- ✅ **Secure API Calls** - Uses Django's REST framework for handling API requests.
- ✅ **Environment Variable Management** - Uses `dotenv` to securely manage API keys.

### 🔥 Bonus Features (Planned/Implemented)

- ✅ **OCR for Image Inputs** - Extracts text from uploaded images.
- ✅ **Multi-Language Support** - AI can generate scripts in different languages.
- ✅ **Pagination for Script History** - Allows users to navigate through past scripts.
- ✅ **Export Options** - Users can download scripts in different formats (PDF, TXT).

---

## 🏗️ Project Setup & Installation

Follow these steps to set up and run the project locally.

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/LaKhWaN/ai_script_generator.git
cd ai_script_generator
```

### **2️⃣ Create a Virtual Environment (Recommended)**

```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate    # On Windows
```

### **3️⃣ Install Dependencies**

```bash
pip install -r requirements.txt
```

### **4️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and add:

```
GEMINI_API_KEY=your-gemini-api-key
```

### **5️⃣ Apply Migrations**

```bash
python manage.py migrate
```

### **6️⃣ Run the Django Development Server**

```bash
python manage.py runserver
```

The project will be available at: **`http://127.0.0.1:8000/`**

---

## 🔧 API Endpoints

| Method | Endpoint                  | Description                           |
| ------ | ------------------------- | ------------------------------------- |
| GET    | `/api/get_script/<pk:id>` | Fetch a generated script              |
| POST   | `/api/generate_script/`   | Generate a new script from user input |
| GET    | `/api/get_scripts/`       | Retrieve saved scripts                |

---

## ⚠️ Limitations

- 🚧 **API Limitations** - The Gemini API has a rate limit; heavy usage might cause delays.
- 🚧 **Free Tier Deployment Delays** - Using free services for deployment may introduce minor delays.
- 🚧 **OCR Feature Accuracy** - The accuracy of text extraction from images depends on image quality.

---

## 💡 Future Enhancements

- 🚀 **User Authentication** - Enable users to log in and manage their scripts.
- 🚀 **Improved AI Models** - Enhance AI responses using fine-tuned models.
- 🚀 **Collaboration Feature** - Allow multiple users to collaborate on script writing.

---

## 📝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📩 Contact

If you have any questions, feel free to reach out!

👤 **Upender Singh Lakhwan**  
📧 Email: upenderlakhwan@gmail.com  
🔗 GitHub: [LaKhWaN](https://github.com/LaKhWaN)
