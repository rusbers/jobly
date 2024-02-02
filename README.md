## Project Overview

This project is a Job Listing app developed by me upon an existing codebase. I worked on this project after finishing the Advanced React course from [WDS](https://courses.webdevsimplified.com/), where Kyle Cook was the teacher. This project aims to replicate a real-world development scenario. The initial codebase is complex to simulate practical coding situations, emphasizing reading and building upon existing code, problem-solving, and task implementation without explicit instructions. The initial codebase includes the set up backend, and the front end has only the Task List Page, New Task Page, Error Page, and Not Found Page.

You can read the original project description provided by the course [here](./before-getting-started.md)

### Setup Instructions

#### Prerequisites

- Node.js installed on your machine
- SQLite for backend

#### Repository Structure

- **api folder:** Contains the backend code, handled separately for setting up the development environment.
- **client folder:** Houses the React-based application, utilizing Vite, TailwindCSS, React Router, React Hook Form, and Zod. To set it up, copy the .env file to .env.local and run `npm i` followed by `npm run dev`.

#### Key Folders

- **components:** UI components designed using Shadcn, with icons sourced from the lucide-react library.
- **constants:** Holds environment variables and configurations.
- **features:** This folder contains various application features, organized to facilitate future code refactoring. The imports are mainly from the index.ts file within each feature folder. There is a specific Eslint rule that causes import errors, which are resolved by the .vscode folder that has settings for VSCode.
- **other folders:** The hooks, layouts, pages, and utils folders house global functionalities, structured for seamless navigation.

### Backend Overview

The backend, managed separately, employs Prisma for database connections. To interact with it, follow these steps:

1. Install Sqlite on your machine
2. Run `npm i`
3. Copy the .env.example file to .env
4. Run `npx prisma db push`
5. Run `npm run dev`

### API Routes

- **User Routes:** Manage user sessions, login, signup, and logout functionalities.
  - `POST /users/login`: Takes email/password, returns user id/email, sets a session cookie valid for a week.
  - `POST /users/signup`: Similar to login, creates a new user, returns user id/email, sets a browser cookie.
  - `DELETE /users/logout`: Clears the browser cookie, logs the user out.
  - `GET /users/session`: Retrieves user id/email for an active session, useful for returning users.
- **Job Listing Routes:** Handle job listings, including creation, update, deletion, and payment processing via Stripe integration.
  - `GET /job-listings/published`: Retrieves all published job listings.
  - `GET /job-listings/my-listings`: Gets job listings for the logged-in user, even unpublished ones.
  - `POST /job-listings`: Creates a new job listing for the logged-in user, returns the new listing.
  - `PUT /job-listings/:id`: Updates the job listing (if authenticated and the owner), returns the updated listing.
  - `DELETE /job-listings/:id`: Deletes the specified job listing (if authenticated and the owner), returns the deleted listing.
  - `POST /job-listings/:id/create-publish-payment-intent`: Sets up a payment intent via Stripe for posting a job listing. Requires user authentication and ownership, returns the payment intent for Stripe integration. For more details, refer to Stripe's payment documentation.

### Stripe Setup

You need a Stripe account and a secret API key to enable payment processing. Store the secret API key in the .env file under `STRIPE_SECRET_KEY`.

### Webhook Setup

For webhook setup, this project offers three local-use versions of the Stripe CLI for testing. You'll need a Stripe account and proper login to access this. To test the webhook locally:

Run:

- `stripe login`
- `stripe listen --forward-to localhost:3000/stripe-webhooks/job-listing-order-complete`

Please note, if you want to use the local versions of the Stripe CLI, the use `./stripeWin` instead of `stripe`

After executing the stripe listen command, you'll receive a webhook signing secret in the terminal. Copy this secret to your .env file as ySTRIPE_ORDER_COMPLETE_WEBHOOK_SECRET`. This setup allows testing job publishing while the stripe CLI listen command is active.
