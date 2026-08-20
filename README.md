# ArtAqua / PostModerna Website

Modern Nuxt 4 website for ArtAqua, the PostModerna bathroom and sanitary equipment showroom in Skopje.

The site is mostly static, with localized Macedonian and English routes and a server API contact form that sends email through SMTP.

## Tech Stack

- Nuxt 4
- Vue 3
- TypeScript
- Nuxt UI and Tailwind CSS utilities
- `@nuxtjs/i18n` for Macedonian and English routing/content
- Nodemailer for the contact form backend

## Routes

| Route | Language | Purpose |
| --- | --- | --- |
| `/` | Macedonian | Homepage |
| `/en` | English | Homepage |
| `/products` | Macedonian | Product category overview |
| `/en/products` | English | Product category overview |
| `/contact` | Macedonian | Contact information and form |
| `/en/contact` | English | Contact information and form |

## Setup

Install dependencies with npm:

```bash
npm install
```

Copy `.env.example` to `.env` and fill in the local SMTP settings.

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

## Development

Start the local development server:

```bash
npm run dev
```

Run quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

## Environment Variables

```env
NUXT_PUBLIC_SITE_URL=https://artaqua.com.mk

NUXT_SMTP_HOST=smtp.gmail.com
NUXT_SMTP_PORT=465
NUXT_SMTP_SECURE=true
NUXT_SMTP_USER=your-smtp-user@example.com
NUXT_SMTP_PASS=your-app-password
NUXT_MAIL_FROM="ArtAqua Website <your-smtp-user@example.com>"
NUXT_CONTACT_TO=info@artaqua.com.mk
```

For Gmail, use an App Password, not your normal Gmail password.

The current implementation uses Gmail SMTP. A company/domain SMTP server can be used later without changing the contact form architecture. SMTP credentials and recipient configuration are private runtime config values and must not be committed.

## Deployment Notes

The public pages can be prerendered, but the contact form requires a server/API-capable Nuxt deployment because it posts to `POST /api/contact`.

Do not deploy this as a purely static-only site unless the contact form is replaced with another server-capable form provider.

## Docker 

The application can be built and run as a production Docker container.

### Build the Docker image

`docker build -t yourusername/artaqua:latest .`

### Run without environment variables

This starts the website, but the contact form will not be able to send email without the required SMTP configuration.

`docker run --rm -p 3000:3000 yourusername/artaqua:latest`

The website will then be available at: `http://localhost:3000`

### Run with local environment variables

Create a .env file using .env.example and fill in the required SMTP values.

Then run:

`docker run --rm -p 3000:3000 --env-file .env yourusername/artaqua:latest`

This provides the container with the SMTP configuration at runtime without storing the secrets inside the Docker image.

### Docker Hub

The GitHub Actions workflow automatically builds and publishes the production Docker image to Docker Hub when changes are pushed to the master branch.

The image is published as: `nikolakoko/artaqua:latest`

A commit-specific SHA tag is also generated for each production image.
