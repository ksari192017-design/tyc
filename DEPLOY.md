Quick deploy instructions

- Local dev:

  ```bash
  npm install
  npm run dev
  # open http://localhost:3000 (or the port shown)
  ```

- Build for production:

  ```bash
  npm run build
  npm run preview # preview production build
  ```

- Netlify:
  1. Create a new site from Git in Netlify.
  2. Point it to this repo branch.
  3. Set Build command: `npm run build` and Publish directory: `dist`.
  4. Add an environment variable `VITE_GEMINI_API_KEY` in Netlify site settings (do NOT commit `.env`).

- Vercel:
  1. Import project into Vercel.
  2. Add environment variable `VITE_GEMINI_API_KEY` in the Vercel dashboard.
  3. Vercel will auto-detect the Vite app; build command `npm run build` and output `dist`.

Security note:
- Do not expose your API key in client-side bundles for production. Prefer using serverless functions (Vercel serverless or Netlify Functions) as a proxy to call the Google GenAI API so the key remains secret.
