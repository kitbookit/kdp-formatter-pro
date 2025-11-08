# 📚 KDP Formatter Pro

Professional book formatting tool for Amazon Kindle Direct Publishing (KDP). Transform your manuscripts into KDP-compliant PDFs with just a few clicks.

## ✨ Features

- **Multiple Format Support**: DOCX, TXT, and PDF input files
- **7 KDP Standard Sizes**: 5x8, 5.5x8.5, 6x9, 7x10, 8x10, 8.5x11 inches
- **Dynamic Margins**: Automatically calculated based on page count (24-828 pages)
- **Customizable Options**:
  - Font family (Serif/Sans-serif)
  - Font size (9-14pt)
  - Page number positioning (center, outer, inner)
- **KDP Validation**: Built-in compliance checker with detailed reports
- **Professional Output**: Embedded fonts and proper formatting

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express + tRPC
- **Database**: MySQL with Drizzle ORM
- **Payments**: Stripe integration
- **Styling**: Tailwind CSS + Radix UI
- **Document Processing**: pdf-lib, mammoth, pdfkit

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/kdp_formatter

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Session
SESSION_SECRET=your-secret-key-here

# OAuth (optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# App
APP_URL=http://localhost:5000
```

## 🏗️ Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
# Build the project
pnpm build

# The output will be in the `dist` folder
# Deploy the `dist` folder to your hosting provider
```

## 📖 Usage

1. **Upload your manuscript** (DOCX, TXT, or PDF)
2. **Select KDP format** (e.g., 6x9 inches)
3. **Customize options** (font, page numbers, etc.)
4. **Format & Download** your KDP-ready PDF

## 💰 Pricing

- €4.99 per book formatting
- Pay-per-use model
- No subscription required
- 100% money-back guarantee

## 🛠️ Development

```bash
# Run type checking
pnpm check

# Format code
pnpm format

# Run tests
pnpm test
```

## 📝 Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and helpers
│   └── public/          # Static assets
├── server/              # Backend Express application
│   ├── _core/           # Core server functionality
│   ├── routers.ts       # tRPC routers
│   ├── db.ts            # Database operations
│   └── documentProcessor*.ts  # Document processing logic
├── drizzle/             # Database schema
└── shared/              # Shared types and constants
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🆘 Support

For support, email support@kdpformatter.store or visit our website.

## 🎯 Roadmap

- [ ] Batch processing
- [ ] More format options
- [ ] Cover designer integration
- [ ] Multi-language support
- [ ] Advanced typography options

---

Made with ❤️ for self-publishers worldwide
