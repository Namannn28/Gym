# FitAI

FitAI is a full-stack fitness and gym management platform. It provides tools for tracking workouts, monitoring nutrition, and interacting with an integrated AI coaching system built on Google's Generative AI.

## Architecture & Tech Stack

**Frontend**
- Next.js 15 (App Router)
- React, TypeScript
- Tailwind CSS, Shadcn UI
- Zustand (State Management)
- React Query (Data Fetching)
- Recharts (Analytics)

**Backend**
- Node.js, Express
- TypeScript
- PostgreSQL (Neon)
- Prisma ORM
- JWT Authentication

**Machine Learning / AI**
- Google Gemini API (`@google/generative-ai`)
- Custom LoRA Fine-Tuning Scripts (`transformers`, `peft`, `trl`)

## Features

- **Authentication**: JWT-based auth with secure password hashing.
- **Workout Logging**: Track exercises, sets, reps, and weights.
- **Exercise Library**: Browse and search a comprehensive database of exercises.
- **Nutrition & Hydration**: Log daily food intake and monitor water consumption goals.
- **Dashboard Analytics**: Visualize progress through interactive charts.
- **AI Coach**: Chat interface integrated with Gemini for personalized fitness and diet recommendations.
- **Marketplace**: Browse supplements and gym gear.

## Local Development Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database (e.g., Neon free tier)
- Google Gemini API Key

### 1. Database Setup

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DATABASE_URL="postgres://user:password@host/dbname?sslmode=require"
JWT_SECRET="your_secure_jwt_secret"
GEMINI_API_KEY="your_gemini_api_key"
```

### 2. Backend Initialization

Navigate to the backend directory, install dependencies, and run the database migrations and seed script:

```bash
cd backend
npm install
npx prisma db push
npm run seed
npm run dev
```

The backend server will start on `http://localhost:5000`.

### 3. Frontend Initialization

In a new terminal instance, navigate to the frontend directory and start the Next.js development server:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## Machine Learning Fine-Tuning

If you wish to fine-tune your own local model using the provided Kaggle datasets, refer to the `notebooks/` and `scripts/` directories.

1. Install Python dependencies: `pip install pandas`
2. Run data preparation: `python scripts/prepare_dataset.py`
3. Upload `dataset.jsonl` and `notebooks/FineTune_Fitness_Coach.ipynb` to a GPU-enabled environment (Google Colab / Kaggle).
4. Execute the notebook to generate a quantized LoRA adapter for `gemma-2b-it`.

## License

MIT
