
# 🧠 Easy Instructions Bot – OceanAI

Turn any messy idea or rough task into clear, step‑by‑step instructions with an AI-powered assistant.

This project is a React + Vite + TypeScript web app that uses an LLM (via OpenAI-style API) to generate simple, actionable instructions from natural language prompts.

> Example:  
> “Help me give a summary of my important mails for discussion” → the bot returns clean, structured, easy-to-follow steps.

---

## 🌐 Live Demo

Deployed here: **https://easy-instructions-bot-ocean-ai.vercel.app/**

> If the link is not working, make sure the latest code is deployed from this repo.

---

## ✨ Features

- 📝 **Instruction Generator** – Convert any vague request into clear, numbered steps.
- 👀 **Clean, modern UI** – Built with React, Tailwind CSS and shadcn‑ui for a smooth UX.
- ⚡ **Fast dev experience** – Vite + TypeScript setup for quick builds and hot reloads.
- ☁️ **Backend-ready** – Supabase folder is included so you can wire up auth, logging, or history if needed.
- 🔧 **Configurable prompts** – Easily tweak system instructions to change the bot’s behaviour (e.g., tone, detail level).

*(Exact behaviour depends on how you configure the model + prompts in the `src` folder.)*

---

## 🧱 Tech Stack

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn‑ui
- **Build tooling:** Vite, PostCSS
- **Optional backend:** Supabase (for data persistence / auth, if you connect it)

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/akshit040504/easy-instructions-bot-OceanAI.git
cd easy-instructions-bot-OceanAI
```

### 2. Install Dependencies

Using **npm**:

```bash
npm install
```

Or using **bun** (if you prefer bun and it’s configured):

```bash
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root (if not already present) and add your keys.

Typical variables (adjust to match your actual code):

```bash
# LLM / OceanAI-style API
VITE_OPENAI_API_KEY=your_api_key_here

# Optional: Supabase (if used in the project)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ Do **not** commit real keys to GitHub. Use `.gitignore` or environment variables in your deployment platform.

### 4. Run the Dev Server

```bash
npm run dev
```

By default, Vite runs on:

```text
http://localhost:5173
```

Open that in the browser to use the bot locally.

### 5. Build for Production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure (High-Level)

```text
.
├─ public/            # Static assets
├─ src/               # React + TS source code (UI, hooks, API calls)
├─ supabase/          # Supabase config/migrations (if you choose to use them)
├─ index.html         # App entry HTML
├─ package.json       # Scripts & dependencies
├─ tailwind.config.ts # Tailwind configuration
└─ vite.config.ts     # Vite configuration
```

Look inside `src/` for:

- Components for the chat / instructions UI
- API utilities that call the AI backend
- Any prompt templates or system messages controlling the bot

---

## 🌩 Deployment

This project is already set up nicely for modern hosting platforms.

### Deploy to Vercel

1. Push the repo to GitHub (already done in your case).
2. Go to Vercel and **Import Project** from this GitHub repo.
3. Configure the same environment variables on Vercel (Project → Settings → Environment Variables).
4. Deploy – Vercel will build and host the app automatically.

---

## 🧪 Useful Scripts

From `package.json` (may vary slightly):

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linting (if configured)
```

---

## 🙌 Contributing / Customising

Feel free to:

- Change the **prompting logic** to make the bot more strict, more friendly, or domain‑specific.
- Add features like **history**, **export to PDF/Markdown**, or **templates** for common tasks.
- Wire Supabase (or any backend) to persist user instructions, auth, etc.

If this is only for personal use or a portfolio project, you can keep it simple and just tweak the UI text and prompts to match your use‑case (e.g. “Instructions Bot”, “Task Breakdown Assistant”).

---

## 📜 License

This repository currently doesn’t declare a license file.  
If you plan to make it public/open-source, consider adding a license like **MIT** or **Apache‑2.0**.
