# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](httpss://nodejs.org/en/) (v18 or later)
- [npm](httpss://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env` in the root of your project and add the following, replacing `<your-api-key>` with your actual Gemini API key:
    ```
    GEMINI_API_KEY=<your-api-key>
    ```

### Running the Application

You'll need to run two separate processes for the application to work correctly: one for the Next.js frontend and another for the Genkit AI flows.

1.  **Run the Next.js development server:**
    Open a terminal and run the following command:
    ```bash
    npm run dev
    ```
    Your application will be available at `http://localhost:9002`.

2.  **Run the Genkit development server:**
    In a separate terminal, run this command to start Genkit and watch for file changes:
    ```bash
    npm run genkit:watch
    ```

Now, both the frontend and the AI backend are running, and you can start exploring the application and testing for bugs.
