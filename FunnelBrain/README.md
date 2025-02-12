# FunnelBrain AI - AI-Powered Ad Creative Management System

A modern Content Management System (CMS) designed for digital marketers to create, manage, and optimize ad creatives with intelligent analytics and collaborative design tools.

## Features

- 🎨 **AI-Assisted Creative Generation**: Create compelling ad designs with AI-powered suggestions
- 📊 **Real-time Analytics Dashboard**: Track performance metrics and campaign insights
- 🎯 **Multi-Platform Support**: Create ads for Facebook, Instagram, LinkedIn, and Twitter
- 🔄 **Flexible Template Management**: Use and customize pre-built templates or create your own
- 🤖 **AI Strategy Assistant**: Get intelligent recommendations for your ad campaigns
- 📱 **Responsive Design**: Fully responsive interface for all devices

## Tech Stack

- Frontend: React + TypeScript
- UI Components: shadcn/ui + Tailwind CSS
- State Management: TanStack Query
- Canvas Editing: Fabric.js
- Charts: Recharts
- Authentication: Passport.js
- Backend: Express.js + TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/funnelbrain-ai.git
cd funnelbrain-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5000 in your browser

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key
```

## Project Structure

```
├── client/             # Frontend React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── hooks/     # Custom React hooks
│   │   ├── lib/       # Utility functions
│   │   └── pages/     # Page components
├── server/            # Backend Express application
│   ├── routes.ts     # API routes
│   └── storage.ts    # Data storage layer
└── shared/           # Shared types and schemas
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
