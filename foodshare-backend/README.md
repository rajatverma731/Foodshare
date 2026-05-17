# FoodShare Backend (Express + MongoDB)

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and set your MongoDB URI and JWT secret
3. `npm run dev` (development) or `npm start` (production)

## API Endpoints

### Auth
- POST `/api/auth/register` — Register (name, email, password, role)
- POST `/api/auth/login` — Login (email, password)
- GET `/api/auth/me` — Get current user (auth required)

### Listings
- GET `/api/listings` — List all (query: search, category, status, page, limit)
- GET `/api/listings/:id` — Get single listing
- POST `/api/listings` — Create listing (auth required)
- PUT `/api/listings/:id` — Update listing (owner only)
- DELETE `/api/listings/:id` — Delete listing (owner only)

### Donation Requests
- POST `/api/requests` — Create request (auth required)
- GET `/api/requests/incoming` — Get requests for my listings (donor)
- GET `/api/requests/sent` — Get my sent requests (requester)
- PUT `/api/requests/:id` — Approve/reject request (donor only)

### Stats
- GET `/api/stats/platform` — Platform-wide stats
- GET `/api/stats/user` — User-specific stats (auth required)
