
To run the FastAPI application, follow these steps:

Step 1: Ensure Required Packages Are Installed
Make sure you have fastapi, uvicorn, and other required dependencies installed. If you have a requirements.txt file in your quiz_app directory, install the dependencies by running:

bash
Copy code
pip install -r requirements.txt
Your requirements.txt might look like this:

makefile
Copy code
fastapi==0.100.0
uvicorn==0.23.0
openai==0.27.0
python-dotenv==1.0.0
Step 2: Set Up the Environment Variables
Create a .env file in the quiz_app directory to store your OpenAI API key:
makefile
Copy code
OPENAI_API_KEY=your_openai_api_key_here
Replace your_openai_api_key_here with your actual OpenAI API key.

Step 3: Start the FastAPI Server
Navigate to your project directory (where app.py is located):

bash
Copy code
cd path/to/quiz_app
Then, run the following command to start the server:

bash
Copy code
python -m uvicorn app:app --reload
