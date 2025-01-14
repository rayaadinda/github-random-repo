# GitHub Random Repository Finder

A web application that helps you discover random GitHub repositories based on programming languages. Perfect for finding new projects to contribute to or learning from others' code.

## Features

- Search for random repositories by programming language
- View repository details including stars, forks, and issues
- Modern and responsive UI with dark mode support
- Real-time error handling with toast notifications
- Refresh functionality to find more repositories

## Tech Stack

- **Frontend Framework**: React + Vite
- **UI Components**: 
  - [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible components
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: 
  - [Lucide React](https://lucide.dev/) - Beautiful and consistent icons
  - [@primer/octicons-react](https://primer.style/octicons/) - Official GitHub icons
- **API Integration**: GitHub REST API
- **State Management**: React Hooks

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd github-random-repo
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your GitHub token:
```env
VITE_GITHUB_TOKEN=your_github_token_here
```

To get a GitHub token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `public_repo` scope
3. Copy the token and paste it in your `.env` file

4. Start the development server:
```bash
npm run dev
```



