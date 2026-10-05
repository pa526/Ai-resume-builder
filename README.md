# AI Resume Builder

> A full-stack resume platform that helps users turn their experience into polished, ATS-friendly resumes with AI-assisted writing, reusable templates, and a live preview workflow.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20App-16a34a?style=for-the-badge)](https://ai-resume-builder-nine-chi.vercel.app)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=flat-square&logo=react&logoColor=20232A)](./client)
[![Backend](https://img.shields.io/badge/Backend-Express%205-000000?style=flat-square&logo=express&logoColor=white)](./server)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![AI](https://img.shields.io/badge/AI-OpenAI--compatible%20API-412991?style=flat-square&logo=openai&logoColor=white)](https://platform.openai.com/)

## Overview

AI Resume Builder is a full-stack web application for creating, improving, importing, previewing, and sharing professional resumes. It combines a guided editor with AI-powered content enhancement so users can spend less time formatting and more time communicating their impact.

The application supports both **from-scratch resume creation** and **PDF resume import**. Imported resumes are converted to text in the browser and sent to the backend, where an AI model extracts structured profile, experience, project, education, and skills data into the application's resume schema.

## Why this project stands out

- **Product-focused UX:** landing page, authentication, dashboard, guided editor, and live resume preview form a complete user journey.
- **AI used where it matters:** professional summaries and job descriptions can be rewritten into concise, ATS-friendly copy using action verbs and quantifiable outcomes.
- **Structured domain model:** resume content is represented as separate personal information, summary, experience, projects, education, skills, template, and visibility fields rather than a single text blob.
- **Multiple presentation styles:** users can choose from Classic, Minimal, Modern, and Minimal Image templates and personalize accent colors.
- **Full-stack ownership:** the repository includes the React client, Express API, MongoDB models, JWT authentication, file upload handling, and image processing integration.
- **Shareable output:** resumes can be made public and viewed through a dedicated public route, while the editor also supports browser print/download workflows.

## Feature set

### Resume creation and editing

- Create multiple resumes from a personal dashboard.
- Rename and delete saved resumes.
- Edit content through guided sections:
  - Personal information
  - Professional summary
  - Work experience
  - Education
  - Projects
  - Skills
- Move between sections with a progress indicator and previous/next navigation.
- Save changes to MongoDB and keep the preview synchronized with editor state.

### AI-assisted writing

- Enhance a professional summary with AI-generated, concise, ATS-friendly copy.
- Enhance individual job descriptions with stronger action verbs, responsibilities, and measurable outcomes.
- Import an existing PDF resume and use AI extraction to map it into the application's structured resume format.
- Use an OpenAI-compatible client configuration, allowing the model/provider endpoint to be configured through environment variables.

### Design and sharing

- Live preview while editing.
- Four resume templates:
  - Classic
  - Minimal
  - Modern
  - Minimal Image
- Custom accent color selection.
- Optional profile image upload through ImageKit.
- Optional background removal during image processing.
- Toggle resumes between private and public visibility.
- Share public resumes through a dedicated `/view/:resumeId` route.
- Print the resume from the browser for PDF output or physical printing.

### Authentication and account flow

- User registration and login.
- Password hashing with `bcrypt`.
- JWT-based authentication with seven-day token expiry.
- Protected API routes for user data, resume management, and AI features.
- Redux Toolkit state management for the authenticated user and token.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router, Redux Toolkit, Axios |
| Styling | Tailwind CSS 4, custom CSS, Outfit font |
| UI | Lucide React, React Icons, React Hot Toast |
| Document import | `react-pdftotext` for browser-side PDF text extraction |
| Backend | Node.js, Express 5, CORS, dotenv |
| Database | MongoDB with Mongoose 9 |
| Authentication | JWT and bcrypt |
| AI integration | OpenAI Node SDK configured for an OpenAI-compatible endpoint |
| Image processing | Multer and ImageKit |
| Deployment | Frontend currently linked to a Vercel deployment; backend can be deployed as a separate Node service |

## Architecture

```text
┌──────────────────────────────┐
│ React + Vite client          │
│                              │
│ Landing page                 │
│ Auth screens                 │
│ Dashboard                   │
│ Guided resume editor         │
│ Live template preview        │
└──────────────┬───────────────┘
               │ Axios / JSON / multipart form data
               ▼
┌──────────────────────────────┐
│ Express API                  │
│                              │
│ /api/users                   │
│ /api/resumes                 │
│ /api/ai                      │
│ JWT middleware               │
│ Controllers + validation     │
└───────┬──────────────┬───────┘
        │              │
        ▼              ▼
┌───────────────┐  ┌────────────────────┐
│ MongoDB       │  │ AI provider         │
│ Users         │  │ Summary enhancement │
│ Resumes       │  │ Job-description AI  │
└───────────────┘  │ PDF data extraction │
                   └────────────────────┘
        │
        ▼
┌──────────────────────┐
│ ImageKit              │
│ Profile image storage  │
│ Transformations        │
└──────────────────────┘
```

## Repository structure

```text
.
├── client/
│   ├── public/                 # Static assets and favicon
│   ├── src/
│   │   ├── app/                # Redux store and auth slice
│   │   ├── components/         # Forms, navigation, preview, templates, home sections
│   │   ├── configs/            # Axios API client
│   │   ├── pages/              # Home, login, dashboard, builder, public preview
│   │   ├── assets/             # Local design assets and sample data
│   │   ├── App.jsx             # Application routes and session hydration
│   │   └── main.jsx            # React entry point
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── configs/                # Database, AI, ImageKit, and Multer configuration
│   ├── controllers/            # User, resume, and AI business logic
│   ├── middleware/             # JWT protection middleware
│   ├── models/                 # User and Resume Mongoose schemas
│   ├── routes/                 # Users, resumes, and AI API routes
│   ├── server.js               # Express application entry point
│   └── package.json
└── README.md
```

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+
- A MongoDB connection string
- An API key for an OpenAI-compatible AI provider
- An ImageKit private key if profile-image upload is enabled

### 1. Clone the repository

```bash
git clone https://github.com/pa526/Ai-resume-builder.git
cd Ai-resume-builder
```

### 2. Configure the backend

Create `server/.env`:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret

# OpenAI-compatible AI provider
GEMINI_API_KEY=your-provider-api-key
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=your-model-name

# ImageKit
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
```

`GEMINI_API_KEY` is the environment-variable name currently consumed by the server's OpenAI-compatible client. The provider endpoint and model are configurable through `OPENAI_BASE_URL` and `OPENAI_MODEL`.

### 3. Configure the frontend

Create `client/.env`:

```env
VITE_BASE_URL=http://localhost:3000
```

`VITE_BASE_URL` should point to the deployed backend URL in production. Do not commit either `.env` file or any secret values.

### 4. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 5. Start the application

Run the API in one terminal:

```bash
cd server
npm start
```

Run the Vite client in another terminal:

```bash
cd client
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## Available scripts

### Client

```bash
npm run dev       # Start Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

### Server

```bash
npm start         # Start the Express API
npm run server    # Start with nodemon when available
```

## API reference

All protected routes expect the JWT in the `Authorization` header.

### User routes

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/users/register` | No | Create an account and return a JWT |
| `POST` | `/api/users/login` | No | Authenticate a user and return a JWT |
| `GET` | `/api/users/data` | Yes | Load the current user |
| `GET` | `/api/users/resumes` | Yes | List the current user's resumes |

### Resume routes

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/resumes/create` | Yes | Create a blank resume |
| `GET` | `/api/resumes/get/:resumeId` | Yes | Load an owned resume for editing |
| `PUT` | `/api/resumes/update` | Yes | Save resume content and optional image data |
| `DELETE` | `/api/resumes/delete/:resumeId` | Yes | Delete an owned resume |
| `GET` | `/api/resumes/public/:resumeId` | No | View a resume marked public |

### AI routes

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/ai/enhance-pro-sum` | Yes | Improve a professional summary |
| `POST` | `/api/ai/enhance-job-desc` | Yes | Improve a job description |
| `POST` | `/api/ai/upload-resume` | Yes | Convert extracted PDF text into a structured resume |

## Data model

The `Resume` model is designed around the information recruiters expect to scan:

- `personal_info`: name, profession, contact details, location, LinkedIn, website, and profile image
- `professional_summary`: short positioning statement
- `experience`: company, position, dates, current-role flag, and description
- `project`: project name, type, and description
- `education`: institution, degree, field, graduation date, and GPA
- `skills`: list of core skills
- `template`: selected visual layout
- `accent_color`: user-selected theme color
- `public`: public/private sharing state

## Security and privacy considerations

- Passwords are hashed with `bcrypt` before storage.
- Protected routes verify JWT signatures before accessing user-specific data.
- Resume reads and deletes are scoped to the authenticated user.
- Public viewing is opt-in through the resume visibility flag.
- Secrets are loaded from environment variables rather than committed to source control.
- AI provider credentials remain server-side and are never required in the browser.

For a production deployment, the next hardening steps would include stricter request validation, rate limiting for AI endpoints, secure HTTP-only cookies or token rotation, centralized error handling, stronger CORS policy, automated tests, and monitoring.

## Engineering decisions

### Why a structured resume schema?

A structured schema keeps editing predictable and lets the application render the same content through multiple templates. It also makes PDF import useful: the AI extraction step produces fields the editor already understands instead of forcing users to manually reformat imported text.

### Why live preview?

Resume design is highly visual. Rendering the selected template beside the editor gives users immediate feedback on hierarchy, spacing, content density, and accent color without requiring a separate export step.

### Why an OpenAI-compatible interface?

The backend uses the OpenAI Node SDK with a configurable base URL. This keeps provider-specific configuration in environment variables and makes the AI layer easier to adapt without coupling the frontend to a single vendor.

## Product flow

1. A visitor explores the landing page and starts the app.
2. The user registers or logs in.
3. The dashboard loads their saved resumes.
4. The user creates a blank resume or imports an existing PDF.
5. The editor guides the user through each resume section.
6. AI enhancement improves summaries and experience descriptions when needed.
7. The live preview updates as the user edits content.
8. The user selects a template and accent color.
9. The resume is saved, printed/downloaded, or made public for sharing.

## Roadmap

- Add automated unit, integration, and end-to-end test coverage.
- Add server-side schema validation with clearer field-level error responses.
- Add resume duplication and version history.
- Add more template layouts and typography controls.
- Add export service support for consistent PDF generation across browsers.
- Add rate limiting, usage tracking, and retry handling for AI requests.
- Add password reset and email verification flows.
- Add accessibility audits and keyboard-first editor navigation.
- Add analytics around completion rate and template usage.

## Project status

This is an actively evolving portfolio project. The core end-to-end flow is implemented across the client and API, with the roadmap focused on production hardening, test automation, richer exports, and additional personalization.

## Author

Built by **pa526** as a full-stack AI product project.

- GitHub: [@pa526](https://github.com/pa526)
- Repository: [Ai-resume-builder](https://github.com/pa526/Ai-resume-builder)
- Live demo: [ai-resume-builder-nine-chi.vercel.app](https://ai-resume-builder-nine-chi.vercel.app)

## License

No license file is currently included in the repository. Add a `LICENSE` file before distributing or accepting external contributions under an open-source license.
