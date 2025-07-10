
# Mini URL Shortener API (oro-backend)

A simple RESTful API to shorten long URLs into short codes and redirect users to the original URLs.  
Built with Node.js, Express.js, and MongoDB.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [API Endpoints](#api-endpoints)  
- [Usage Examples](#usage-examples)  
- [Rate Limiting & Expiry](#rate-limiting--expiry)  
- [Analytics](#analytics)  
- [Error Handling](#error-handling)  
- [Future Improvements](#future-improvements)  
- [License](#license)

---

## Features

- Shorten any valid URL into a unique 6-character code  
- Redirect short URLs to the original URLs  
- URL expiry logic (default 7 days)  
- Click tracking for analytics  
- Rate limiting to prevent abuse  
- Input validation for URLs  
- Clean and modular code structure

---

## Tech Stack

- Node.js  
- Express.js  
- MongoDB (via Mongoose)  
- nanoid (unique code generation)  
- express-rate-limit (rate limiting)  
- validator (URL validation)  
- dotenv (environment variables)

---

## Getting Started

### Prerequisites

- Node.js (v14+)  
- npm  
- MongoDB instance (local or cloud like MongoDB Atlas)

### Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/oro-backend.git
cd oro-backend
Install dependencies:

bash

npm install
Create a .env file in the project root with the following variables:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
Start the server:

bash

npm run dev
The server should be running at http://localhost:5000.

Environment Variables
Variable	Description	Example
PORT	Port number for the Express app	5000
MONGO_URI	MongoDB connection string	mongodb+srv://user:pass@cluster0.mongodb.net/mydb
BASE_URL	Base URL for generated short URLs	http://localhost:5000

API Endpoints
Method	Endpoint	Description	Request Body	Response
POST	/shorten	Create a short URL	{ "url": "https://longurl.com" }	{ "shortUrl": "http://.../abc123" }
GET	/:code	Redirect to original URL	N/A	Redirect (302) to original URL
GET	/stats/:code	Get analytics about a short URL	N/A	URL info (clicks, expiry, etc.)

Usage Examples
1. Shorten URL
Request:

http
POST /shorten
Content-Type: application/json

{
  "url": "https://www.freecodecamp.org/news/learn-node-js-full-course/"
}
Response:

json

{
  "shortUrl": "http://localhost:5000/abc123"
}
2. Redirect
Navigate to:

bash
Copy
Edit
http://localhost:5000/abc123
This redirects to:

ruby
Copy
Edit
https://www.freecodecamp.org/news/learn-node-js-full-course/
3. Get Stats
Request:

http
Copy
Edit
GET /stats/abc123
Response:

json
Copy
Edit
{
  "originalUrl": "https://www.freecodecamp.org/news/learn-node-js-full-course/",
  "shortCode": "abc123",
  "createdAt": "2025-07-09T10:00:00.000Z",
  "expiryDate": "2025-07-16T10:00:00.000Z",
  "clicks": 10
}
Rate Limiting & Expiry
Requests are limited to 100 per 15 minutes per IP to prevent abuse.

Short URLs expire after 7 days by default. Accessing expired URLs returns a 410 Gone status.

Analytics
Each time a short URL is accessed, its clicks count increments.

You can query the /stats/:code endpoint to see usage statistics.

Error Handling
Invalid URLs receive a 400 Bad Request.

Nonexistent short codes return 404 Not Found.

Expired URLs return 410 Gone.

Server errors return 500 Internal Server Error.

Future Improvements
Add user authentication to manage URLs per user.

Implement custom short codes.

Add frontend UI.

Add detailed analytics (e.g., referrers, geolocation).

Dockerize the app for easier deployment.
****************************************************************************

####

✅ Implemented Features
🎯 Core Functionality
✅ RESTful API with clear routing

✅ Shortens long URLs into unique short codes

✅ Redirects users from short URL to original URL

✅ Stores original URL, short code, timestamp, and expiry date in MongoDB

🔐 Input Validation & Error Handling
✅ Validates URL format using validator

✅ Returns appropriate HTTP status codes (400, 404, 410, 500)

✅ Global error handling with try-catch and fallback middleware

🛠️ CRUD with MongoDB
✅ Create: Stores shortened URLs

✅ Read: Redirects and fetches stats

✅ Update: Tracks clicks for each access

✅ (Delete not required for this assignment)

⚡ Bonus Features
✅ Rate Limiting – Limits excessive requests using express-rate-limit

✅ Expiration Logic – URLs expire after a configurable number of days

✅ Analytics – Tracks number of times a short URL is accessed (clicks field)
