# Massa Scaffold

A modern, production-ready starter kit for building decentralized applications on the Massa blockchain.

## Features

- 🚀 **Next.js 15** with App Router and Turbopack
- 🎨 **Tailwind CSS** for styling with dark theme
- 🔗 **RainbowKit** for wallet connection
- ⚡ **Wagmi** for Ethereum interactions
- 🔧 **TypeScript** for type safety
- 📱 **Responsive Design** with mobile-first approach
- 🎯 **Massa Network** integration ready

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd massa-scaffold
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
   ```
   
   Get your WalletConnect project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── counter/           # Counter demo page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ConnectWallet.tsx  # Wallet connection component
│   ├── Footer.tsx         # Footer component
│   ├── Navbar.tsx         # Navigation bar
│   └── WalletProvider.tsx # Wallet provider wrapper
└── config/               # Configuration files
    └── chains.ts         # Massa network configuration
```

## Massa Network Configuration

The project includes pre-configured Massa networks:

- **Testnet** (Default): `https://test.massa.net/api/v2`
- **Buildnet**: `https://build.massa.net/api/v2`
- **Mainnet**: `https://mainnet.massa.net/api/v2`

You can modify the network configuration in `src/config/chains.ts`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Styling
The project uses Tailwind CSS with a black/orange theme. You can customize colors in:
- `src/app/globals.css` - Global CSS variables
- Component files - Tailwind classes

### Wallet Integration
The wallet connection is handled by RainbowKit and Wagmi. You can customize:
- `src/components/ConnectWallet.tsx` - Wallet button styling
- `src/components/WalletProvider.tsx` - Provider configuration
- `src/config/chains.ts` - Network configuration

## Deployment

The project is ready for deployment on Vercel, Netlify, or any other hosting platform that supports Next.js.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- [Massa Documentation](https://docs.massa.net)
- [Massa Network](https://massa.net)
- [Next.js Documentation](https://nextjs.org/docs)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
