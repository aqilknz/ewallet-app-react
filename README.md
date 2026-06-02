# E-Wallet App - Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/license/mit)
<br>
Frontend project for E-Wallet dashboard by Ahmad Aqil Khairun Nadzar (Koda Batch 7 Fullstack Web Developer).

## Technologies Used

- [![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react&logoColor=white)](https://react.dev/)
- [![Vite](https://img.shields.io/badge/Vite-8.0.14-purple?logo=vite&logoColor=white)](https://vitejs.dev/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.2-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
- [![Redux](https://img.shields.io/badge/Redux_Persist-6.0.0-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
- [![Nginx](https://img.shields.io/badge/Nginx-Stable_Alpine-009639?logo=nginx&logoColor=white)](https://nginx.org/)
- [![Docker](https://img.shields.io/badge/Docker-29.5.2-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

## Features

- Mobile-First Responsive UI
- User Authentication (Login, Logout, Create PIN)
- Interactive Dashboard (Balance, Transaction History)
- Fund Transfer & Top Up Interfaces
- Profile Management
- Dockerized & CI/CD Ready (GitHub Container Registry)

## Usage Instruction

### Environment Setup

1. Create your environment file on the root directory named `.env`

```env
# Gunakan relative path jika menggunakan Nginx Reverse Proxy
VITE_API_URL=/ewallet
```

### Running the Application (Local Development)

1. Clone this repository

```bash
$ git clone https://github.com/aqilknz/ewallet-app-react.git
```

2. Install dependency

```bash
$ npm install
```

3. Run the development server

```bash
$ npm run dev
```

### Running with Docker (Production Ready)

1. Make sure Docker is running on your machine.
2. Build and start the container on port 200:

```bash
$ docker compose up -d
```

## Routes (Frontend Views)

| Path            | Description              |
| --------------- | ------------------------ |
| `/`             | Login Page               |
| `/dashboard`    | Main Dashboard & Balance |
| `/transfer`     | Transfer Fund Page       |
| `/transfer/:id` | Transfer Detail Page     |
| `/topup`        | Top Up Balance Page      |
| `/profile`      | User Profile & Settings  |

## Changelog

| Version | Description                                                                                                                        |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| latest  | Setup Docker multi-stage build, Nginx and setup GitHub Actions for GHCR deployment config by [aqilknz](https://github.com/aqilknz) |

## How to Contribute

- Fork this repository
- Create your changes
- Commit your changes (Please strictly follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard: `feat:`, `fix:`, `chore:`, `docs:`)
- Push to the branch
- Open a Pull Request

## License

This project is licensed under the MIT License

## Related Project

[Backend E-Wallet Repository](https://github.com/aqilknz/backend-ewallet)
