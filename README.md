# Stadion Tracker Frontend

Dit is de frontend van het Stadion Tracker project, gebouwd met [Next.js](https://nextjs.org) en TypeScript.

## Features

- Profielpagina’s voor gebruikers, teams en stadions
- Volgen/ontvolgen van gebruikers, teams en stadions
- Posts met afbeeldingen uploaden
- Like & comment functionaliteit
- Notificatiesysteem
- Responsive design (PWA-ready)
- Geoptimaliseerde afbeeldingen met Next.js `<Image />`
- Uitgebreide zoekfunctionaliteit

## Gebruikte technologieën

- **Next.js** (App Router, Server Actions)
- **React** & **TypeScript**
- **SCSS** (Sass)
- **JWT-authenticatie**
- **REST API** (backend)
- **Vercel** (of andere hosting)
- **Lucide-react** (iconen)
- **dotenv** (environment variables)
- **Postman** (API testen)
- **ESLint & Prettier** (code quality)

## Installatie

1. **Clone deze repository:**

   ```bash
   git clone https://github.com/jouw-gebruikernaam/stadion-tracker-frontend.git
   cd stadion-tracker-frontend
   ```

2. **Installeer dependencies:**

   ```bash
   npm install
   # of
   yarn install
   ```

3. **Maak een `.env.local` bestand aan:**

   ```
   API_BASE_URL=https://jouw-backend-url/
   API_KEY=...
   ```

4. **Start de development server:**

   ```bash
   npm run dev
   # of
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in je browser.

## Development tips

- **Gebruik VS Code** voor de beste ervaring.
- **Check de `src/lib/actions/` map** voor alle server actions.
- **Gebruik de Next.js `<Image />` component** voor alle afbeeldingen.
- **Gebruik Postman** om je backend API te testen.
- **Gebruik de Network tab** in je browser DevTools om trage requests te debuggen.

## Deployment

Deploy eenvoudig op [Vercel](https://vercel.com/) of een andere Next.js-geschikte host.

## Licentie

MIT

---

**Vragen of feedback? Maak een issue aan of stuur een pull request!**
