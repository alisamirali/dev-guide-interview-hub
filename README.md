# DevGuide - Interview Hub

DevGuide - Interview Hub is a modern web application designed to help developers test and improve their web development knowledge through interactive exams. The platform offers comprehensive quizzes across different technologies and difficulty levels.

## Features

### Multiple Technology Tracks

- **HTML**: Markup language for structuring web content
- **CSS**: Styles the appearance and layout of web pages
- **JavaScript**: Programming language of the web for interactivity
- **TypeScript**: Typed superset of JavaScript for safer code
- **React**: Library for building component-based user interfaces
- **Angular**: Framework for building scalable web applications
- **Vue.js**: Progressive JavaScript framework for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Sass**: CSS preprocessor with variables and nesting
- **Bootstrap**: Popular CSS framework for responsive design
- **Node.js**: JavaScript runtime for building server-side apps
- **Express.js**: Fast, unopinionated web framework for Node.js
- **NestJS**: Progressive Node.js framework for building efficient server-side applications
- **Git**: Distributed version control for source code

### Difficulty Levels

- **Beginner**: Perfect for those just starting out
- **Intermediate**: For developers with some experience
- **Advanced**: Challenge yourself with complex concepts

### User-Friendly Interface

- Neobrutalist / editorial design inspired by Gumroad's visual style
- Light/dark mode with persistent theme preference via localStorage
- Responsive layout for all devices
- Real-time progress tracking with hard-shadow card UI
- Immediate feedback on answers
- Floating back-to-top button
- Tech pill navigation bar for quick section jumping

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI)
- **Fonts**: Syne (headings) + DM Sans (body) via Google Fonts
- **Icons**: Lucide React + React Icons
- **Routing**: React Router v6
- **State Management**: React Context API
- **Build Tool**: Vite
- **Package Manager**: npm / bun

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository

```bash
git clone https://github.com/alisamirali/codewise-exam-hub.git
cd codewise-exam-hub
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

| Script              | Description               |
| ------------------- | ------------------------- |
| `npm run dev`       | Start development server  |
| `npm run build`     | Build for production      |
| `npm run build:dev` | Build in development mode |
| `npm run lint`      | Run ESLint                |
| `npm run preview`   | Preview production build  |

## Project Structure

```
dev-guide-interview-hub/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # shadcn/ui base components
│   │   ├── Footer.tsx
│   │   ├── QuestionItem.tsx
│   │   ├── QuizCard.tsx
│   │   ├── QuizProgress.tsx
│   │   └── ResultSummary.tsx
│   ├── context/             # React context providers
│   │   ├── QuizContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/                # Quiz questions and type definitions
│   │   ├── quizData.ts
│   │   └── quizTypes.ts
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   │   ├── quizCardUtils.tsx # Per-technology colors, icons, button styles
│   │   └── utils.ts
│   ├── pages/               # Page components
│   │   ├── Index.tsx
│   │   ├── QuizPage.tsx
│   │   └── NotFound.tsx
│   ├── index.css            # Global styles & neobrutalist design tokens
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── index.html               # HTML template
└── package.json             # Project dependencies
```

## Contributing

We welcome contributions to DevGuide - Interview Hub! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape DevGuide - Interview Hub
- Special thanks to the web development community for continuous inspiration

---

Built with ❤️ by the DevGuide Team
