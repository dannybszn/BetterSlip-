// Documentation search index - contains all searchable content
const SEARCH_INDEX = [
    // Getting Started
    {
        title: "Overview",
        content: "Welcome to BetterSlip documentation. Learn how to use our AI-Native Betting Copilot for smarter sports betting decisions.",
        url: "/documentation/index.html",
        category: "Getting Started"
    },
    {
        title: "Quick Start Guide",
        content: "Get started with BetterSlip in minutes. Set up your account, connect sportsbooks, and place your first profitable bet.",
        url: "/documentation/getting-started.html",
        category: "Getting Started"
    },
    {
        title: "Account Setup",
        content: "Complete guide to setting up your BetterSlip account, connecting sportsbooks, and configuring your betting preferences.",
        url: "/documentation/account-setup.html",
        category: "Getting Started"
    },
    {
        title: "Your First Bet",
        content: "Step-by-step guide to placing your first profitable arbitrage bet using BetterSlip's tools and strategies.",
        url: "/documentation/first-bet.html",
        category: "Getting Started"
    },
    
    // Core Features
    {
        title: "Arbitrage Finder",
        content: "Find risk-free arbitrage opportunities across multiple sportsbooks. Guaranteed profits regardless of game outcome.",
        url: "/documentation/tools/arbitrage.html",
        category: "Core Features"
    },
    {
        title: "Positive EV",
        content: "Identify positive expected value betting opportunities using AI-powered probability models and market analysis.",
        url: "/documentation/tools/positive-ev.html",
        category: "Core Features"
    },
    {
        title: "Best Odds",
        content: "Compare odds across 90+ sportsbooks to always get the best price on your bets. Maximize returns on every wager.",
        url: "/documentation/tools/best-odds.html",
        category: "Core Features"
    },
    {
        title: "AI Parlay Builder",
        content: "Build intelligent parlays using AI analysis. Find correlated bets and optimize parlay combinations for maximum profit.",
        url: "/documentation/tools/ai-parlay.html",
        category: "Core Features"
    },
    {
        title: "Low Holds",
        content: "Find low-hold betting opportunities where sportsbooks have minimal edge. Perfect for high-volume betting strategies.",
        url: "/documentation/tools/low-holds.html",
        category: "Core Features"
    },
    {
        title: "Middles",
        content: "Discover middle betting opportunities where you can win both sides of a bet or minimize losses.",
        url: "/documentation/tools/middles.html",
        category: "Core Features"
    },
    {
        title: "Smart Money",
        content: "Track where professional bettors and syndicates are putting their money. Tail smart money picks at the best available odds across 90+ sportsbooks.",
        url: "/documentation/tools/smart-money.html",
        category: "Core Features"
    },
    {
        title: "Prop Trends",
        content: "Track historical player performance, calculate hit rates, and monitor live progress across 90+ sportsbooks to find the best prop bets based on real data.",
        url: "/documentation/tools/prop-trends.html",
        category: "Core Features"
    },
    {
        title: "Fantasy / DFS Tools",
        content: "Professional Fantasy & DFS tools for PrizePicks, Underdog, and 8+ platforms. Build optimal lineups with Fantasy Builder, find middling opportunities with Fantasy Middles, and spot outlier projections with Fantasy Outliers. Data-driven picks with 57%+ average hit rate on green plays.",
        url: "/documentation/tools/fantasy.html",
        category: "Core Features"
    },
    
    // Tools & Calculators
    {
        title: "Betting Calculators",
        content: "Professional betting calculators for arbitrage, hedging, kelly criterion, and more. Make precise calculations for optimal betting.",
        url: "/documentation/tools/calculators.html",
        category: "Tools & Calculators"
    },
    {
        title: "Bet Tracker",
        content: "Track all your bets, analyze performance, and optimize your betting strategy with comprehensive analytics.",
        url: "/documentation/tools/bet-tracker.html",
        category: "Tools & Calculators"
    },
    {
        title: "Promo Converter",
        content: "Convert sportsbook promotions and bonuses into guaranteed profit. Maximize value from every offer.",
        url: "/documentation/tools/promo-converter.html",
        category: "Tools & Calculators"
    },
    {
        title: "Parlay Shopper",
        content: "Find the best odds for parlays across multiple sportsbooks. Build optimal parlay combinations.",
        url: "/documentation/tools/parlay-shopper.html",
        category: "Tools & Calculators"
    },
    
    // Advanced Features
    {
        title: "Alerts & Notifications",
        content: "Set up real-time alerts for arbitrage opportunities, line movements, and betting opportunities that match your criteria.",
        url: "/documentation/alerts.html",
        category: "Advanced Features"
    },
    {
        title: "Filters & Preferences",
        content: "Customize your betting experience with advanced filters for sports, leagues, bet types, and profit thresholds.",
        url: "/documentation/filters.html",
        category: "Advanced Features"
    },
    {
        title: "Analytics Dashboard",
        content: "Comprehensive analytics for your betting performance. Track ROI, CLV, profit trends, and optimize your strategy.",
        url: "/documentation/analytics.html",
        category: "Advanced Features"
    },
    {
        title: "Mobile App",
        content: "Access BetterSlip on the go with our mobile app. Place bets, receive alerts, and track performance from anywhere.",
        url: "/documentation/mobile-app.html",
        category: "Advanced Features"
    },
    
    // Account & Billing
    {
        title: "Plans & Pricing",
        content: "Explore BetterSlip pricing plans. Bronze, Gold, and Platinum tiers with transparent pricing and no hidden fees.",
        url: "/documentation/plans.html",
        category: "Account & Billing"
    },
    {
        title: "Billing & Payments",
        content: "Manage your subscription, payment methods, and billing preferences. Support for cards, PayPal, and crypto.",
        url: "/documentation/billing.html",
        category: "Account & Billing"
    },
    {
        title: "Account Settings",
        content: "Configure your account preferences, security settings, API access, and notification preferences.",
        url: "/documentation/account-settings.html",
        category: "Account & Billing"
    },
    {
        title: "Support & FAQ",
        content: "Get help with common questions, troubleshooting, and contact support for assistance.",
        url: "/documentation/support.html",
        category: "Account & Billing"
    }
];

// Export for use in search.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEARCH_INDEX;
}