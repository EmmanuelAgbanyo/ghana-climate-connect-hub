# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/54da999e-0376-4133-b45d-69c81890ff7f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/54da999e-0376-4133-b45d-69c81890ff7f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Configuration

### Setting up the Google AI API Key

The chatbot functionality in this project uses the Google AI API. To enable the chatbot, you need to provide your own Google AI API key.

1.  **Create a `.env.local` file:**
    If you don't already have one, create a file named `.env.local` in the root directory of the project.

2.  **Add your API Key:**
    Open the `.env.local` file and add the following line, replacing `YOUR_ACTUAL_API_KEY` with your actual Google AI API key:
    ```
    VITE_GOOGLE_AI_API_KEY=YOUR_ACTUAL_API_KEY
    ```

3.  **Important Security Note:**
    The `.env.local` file is included in the project's `.gitignore` file by default. This is crucial for security, as it prevents your API key from being accidentally committed to the repository. **Never commit your `.env.local` file or your API key directly into the codebase.**

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/54da999e-0376-4133-b45d-69c81890ff7f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
