# EatSmart

Heart-healthy nutrition landing experience for the **Global Society of Medicine and Health**, built with [Next.js](https://nextjs.org/). Meal guidance and imagery are aligned with the project’s poster and educational goals—not a substitute for care from a licensed clinician.

## Authors

| Name | Role | LinkedIn |
|------|------|----------|
| **Mansoor Gabali** | Development & design | [Profile](https://www.linkedin.com/in/mg-mns-coding) |
| **Abdallah Mohamed** | Development & design | [Profile](https://www.linkedin.com/in/abdallah-mohamed-2a81b02ba) |

Optional env overrides (see `lib/team-links.ts`):

- `NEXT_PUBLIC_LINKEDIN_MANSOOR` — override Mansoor Gabali’s LinkedIn URL  
- `NEXT_PUBLIC_LINKEDIN_ABDULLAH` — override **Abdallah Mohamed**’s LinkedIn URL *(variable name kept for compatibility)*

## License

This project is licensed under the **Apache License, Version 2.0**—see [`LICENSE`](./LICENSE). Contributions you make to this repository are accepted under those terms unless stated otherwise in a pull request or signed agreement.

## Requirements

- Node.js 18+ (22+ recommended to match tooling)
- npm (or another compatible package manager)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |

## Legal

Site routes: **`/terms`** (Terms of Use) and **`/privacy`** (Privacy Policy). Source lives under `app/terms/page.tsx` and `app/privacy/page.tsx`.

---

© EatSmart authors. Licensed under Apache 2.0.
