# ZOREN Landing Page

Landing page premium pour l'agence de branding ZOREN.

## Stack

- Next.js 16
- React 19 + TypeScript
- Tailwind CSS
- Framer Motion
- Lenis
- React Three Fiber + Drei

## Scripts

- `npm run dev` : demarrage local
- `npm run build` : build de production
- `npm run start` : lancement production
- `npm run lint` : linting

## GitHub Pages

Le projet est configure en export statique pour GitHub Pages.

- `npm run build` genere le site statique dans `out/`
- le workflow GitHub Actions `.github/workflows/deploy-pages.yml` publie automatiquement `main` sur GitHub Pages
- pour un repo de type `nom-utilisateur.github.io`, le site sort a la racine
- pour un repo standard, le sous-chemin `/<nom-du-repo>` est applique automatiquement
