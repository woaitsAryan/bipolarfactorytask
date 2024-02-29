# Bipolar factory internship task

This project consists of a Next.js frontend and a FastAPI backend. Hosted at https://bipolar.aryanbharti.com/

## Running the Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Populate the `.env` file with the backend URL using the format in `.env.sample`

3. Install the dependencies and start the Next.js server:

    ```bash
    npm install
    npm run dev
    ```

The frontend will now be running at `http://localhost:3000`.

## Running the Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    pip3 install -r requirements.txt
    ```
3. Populate the `.env` file with using the format in `.env.sample`

4. Start the FastAPI server:

    ```bash
    uvicorn main:app
    ```

The backend will now be running at `http://localhost:8000`.
