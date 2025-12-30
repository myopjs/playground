# Playground Stocks App

A sophisticated stock trading simulation application built with React and Myop components. This application demonstrates how to build dynamic, customizable React applications with real-time market data simulation and portfolio management.

## Overview

The Stocks App is part of the Myop Playground monorepo and showcases:

- Real-time stock market simulation with 10 mock stocks
- Interactive portfolio management with buy/sell functionality
- Dynamic component customization via URL parameters
- Responsive design with mobile, tablet, and desktop layouts

## Features

### Market View
- Display of 10 mock stocks with real-time price simulation
- Searchable and filterable stock list
- Stock details including symbol, name, price, daily change, and sector

### Stock Analysis
- Interactive price charts with 8 time ranges (1D, 5D, 1M, 3M, 6M, 1Y, 3Y, 5Y)
- Historical data generation with realistic price trends and volatility
- Price change and percentage calculations

### Portfolio Management
- Starting cash balance of $100,000
- Track holdings with average entry price
- Calculate unrealized gains/losses
- Daily portfolio performance tracking
- Total portfolio value display

### Trading Workflow
1. Click a stock to open the Trade Modal
2. Select "Buy" → Set quantity → Confirm purchase
3. Click a holding to sell → Confirm sale
4. Automatic portfolio recalculation after each transaction

### Responsive Design
- **Desktop (>900px)**: Side-by-side layout with stocks list and chart
- **Tablet (700-900px)**: Adjusted flex ratios
- **Mobile (<700px)**: Tab-based navigation (Home, Stocks, Portfolio)

### Dynamic Component Customization
Override any UI component via URL query parameters:
```
?stockList=custom-id&topBar=another-id&stockGraph=graph-id
```

## Project Structure

```
playground-stocks-app/
├── src/
│   ├── main.tsx              # React entry point
│   ├── ui/                   # UI Components
│   │   ├── App.tsx           # Main container & state management
│   │   ├── StocksList.tsx    # Market view component
│   │   ├── StockGraph.tsx    # Price chart component
│   │   ├── Portfolio.tsx     # Holdings display
│   │   ├── TradeModal.tsx    # Buy/sell interface
│   │   ├── TopBar.tsx        # Navigation header
│   │   ├── BottomNav.tsx     # Mobile navigation
│   │   ├── ConfirmationModal.tsx  # Buy confirmation dialog
│   │   ├── ConfirmationSellModal.tsx # Sell confirmation dialog
│   │   ├── Loader.tsx             # Loading spinner component
│   │   └── styles.css        # Global styles
│   └── utils/
│       ├── market.ts         # Stock & chart data utilities
│       ├── queryParams.ts    # URL parameter handling
│       └── componentsIds.ts  # Component ID mappings
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Installation & Development

Run commands from the monorepo root or this package directory:

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at http://localhost:5173/stocks/ |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Dependencies

### Production
- `@myop/react` (^0.0.30) - Myop component framework
- `react` (^19.2.0) - UI library
- `react-dom` (^19.2.0) - React DOM renderer
- `react-router-dom` (^7.11.0) - Routing

### Development
- `vite` (^7.3.0) - Build tool
- `typescript` (^5.6.2) - Type checking
- `@vitejs/plugin-react` (^4.3.4) - React plugin for Vite

## Myop Component Integration

The app uses the `@myop/react` package to render dynamic, customizable components. Each major UI section is rendered via `<MyopComponent>`:

```tsx
import { MyopComponent, preloadComponents } from '@myop/react';

// Preload components on startup
useEffect(() => {
  preloadComponents([
    { componentId: stockListId, preview: false },
    { componentId: stockGraphId, preview: false },
    // ...
  ]);
}, []);

// Render component with data and event handlers
<MyopComponent
  componentId={getComponentId(QUERY_PARAMS.stockList)}
  data={stocksListData}
  on={handleCtaEvent}
/>
```

### Data Flow
```
React App → myop_init_interface(data) → Myop Component
Myop Component → myop_cta_handler(action) → React App
```

## MyopComponent Reference

This section documents each `<MyopComponent>` used in the app, including the data structures they receive and the CTA (Call-to-Action) events they emit.

---

### 1. Stock List (`stockList`)

**Query Param:** `stockList`

**Data Structure:**
```typescript
{
  stocks: StockListItem[];        // Array of market stocks
  portfolioStocks: StockListItem[]; // Array of portfolio holdings
  selectedSymbol: string;         // Currently selected stock ticker
  showTabsAndSearch: boolean;     // Show search/filter UI
  isMobileView: boolean;          // Mobile layout flag
}

interface StockListItem {
  symbol: string;
  name: string;
  price: number;
  change: number;           // Absolute price change
  changePercent: number;    // Percentage change
  updatedAt: string;        // Time string (HH:MM format)
  currency: string;         // Currency symbol ('$')
  quantity?: number;        // Only for portfolio stocks
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `stock_selected` | `{ symbol: string }` | User double-clicked a stock to view chart |
| `trade_clicked` | `{ symbol: string }` | User clicked trade button on a stock |

---

### 2. Top Bar (`topBar`)

**Query Param:** `topBar`

**Data Structure:**
```typescript
{
  portfolioName: string;          // "My Portfolio Demo"
  portfolioSubtitle: string;      // "Practice trading, no real money involved"
  cashAvailable: number;          // Available cash balance
  portfolioValue: number;         // Total portfolio value
  dailyChange: number;            // Today's change in dollars
  dailyChangePercent: number;     // Today's change percentage
  userInitials: string;           // User initials (e.g., "DU")
  userName: string;               // User display name
  isMobileView: boolean;          // Mobile layout flag
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `avatar_clicked` | None | User clicked avatar (opens profile popover) |

---

### 3. Stock Graph (`stockGraph`)

**Query Param:** `stockGraph`

**Data Structure:**
```typescript
{
  stockSymbol: string;
  stockName: string;
  timeRange: TimeRange;                    // Default selected range
  timeRanges: Record<TimeRange, TimeRangeData>;
  isMobileView: boolean;
}

// Or when no stock selected:
{ action: 'clear', isMobileView: boolean }

type TimeRange = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y';

interface TimeRangeData {
  chartData: ChartDataPoint[];
  currentPrice: number;
  priceChange: number;
  changePercent: number;
}

interface ChartDataPoint {
  time: number;    // Unix timestamp
  price: number;   // Price at that time
}
```

**CTA Handlers:** None (display only)

---

### 4. Portfolio (`portfolio`)

**Query Param:** `portfolio`

**Data Structure:**
```typescript
{
  cash: number;
  holdingsValue: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  dailyChange: number;
  dailyChangePercent: number;
  holdings: Holding[];
  isMobileView: boolean;
}

interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  gainLossPercent: number;
  gainLossValue: number;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `holding_clicked` | `{ holdingId, symbol, name, quantity, entryPrice, currentPrice, gainLossPercent, gainLossValue }` | User clicked a holding to sell |

---

### 5. Trade Modal (`tradeModal`)

**Query Param:** `tradeModal`

**Data Structure:**
```typescript
{
  stock: {
    symbol: string;
    name: string;
    currentPrice: number;
    changePercent: number;
    changeAmount: number;
    lastUpdated: string;     // Time string (HH:MM)
    sector: string;
  };
  account: {
    availableCash: number;
    ownedShares: number;
  };
  quantity: number;          // Default quantity (1)
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `close-clicked` | None | User closed the modal |
| `buy-clicked` | `{ quantity: number, price: number }` | User clicked buy button |
| `sell-clicked` | `{ quantity: number, price: number }` | User clicked sell button |

---

### 6. Confirmation Modal (`confirmationModal`)

**Query Param:** `confirmationModal`

**Data Structure:**
```typescript
{
  title: string;              // "Confirm Purchase" or "Confirm Sale"
  stockSymbol: string;
  stockName: string;
  pricePerShare: number;
  quantity: number;
  actionType: 'buy' | 'sell';
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `close-clicked` | None | User closed the modal |
| `cancel-clicked` | None | User cancelled the transaction |
| `confirm-clicked` | `{ actionType, stockSymbol, quantity, pricePerShare, totalCost }` | User confirmed purchase |

---

### 7. Confirmation Sell Modal (`confirmationSellModal`)

**Query Param:** `confirmationSellModal`

**Data Structure:**
```typescript
{
  stockSymbol: string;
  stockName: string;
  pricePerShare: number;
  quantity: number;
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `close-clicked` | None | User closed the modal |
| `cancel-clicked` | None | User cancelled the sale |
| `confirm-sale-clicked` | `{ stockSymbol, quantity, pricePerShare, totalProceeds }` | User confirmed sale |

---

### 8. Bottom Nav (`bottomNav`)

**Query Param:** `bottomNav`

**Data Structure:**
```typescript
{
  tabs: Array<{
    id: string;       // 'home' | 'stocks' | 'portfolio'
    label: string;    // Display label
    icon: string;     // Icon name ('home', 'trendingUp', 'briefcase')
  }>;
  activeTabId: string;  // Currently active tab
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `tab-changed` | `{ tabId: string, label: string }` | User switched tabs |

---

### 9. Footer (`footer`)

**Query Param:** `footer`

**Data Structure:** None

**CTA Handlers:** None (display only)

---

## Component Slots Summary

| Slot | Query Param | Description |
|------|-------------|-------------|
| Stock List | `stockList` | Main stocks market view |
| Top Bar | `topBar` | Navigation header |
| Stock Graph | `stockGraph` | Price chart |
| Portfolio | `portfolio` | Holdings display |
| Footer | `footer` | Footer component |
| Trade Modal | `tradeModal` | Buy/sell interface |
| Confirmation Modal | `confirmationModal` | Buy confirmation |
| Sell Modal | `confirmationSellModal` | Sell confirmation |
| Profile Popover | `profilePopover` | User profile dropdown |
| Bottom Nav | `bottomNav` | Mobile navigation |

## Data Types

### Stock
```typescript
interface Stock {
  ticker: string;
  name: string;
  price: number;
  changePct: number;
  high: number;
  low: number;
  volume: number;
  sector: string;
}
```

### Portfolio
```typescript
interface PortfolioData {
  cash: number;
  holdingsValue: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  dailyChange: number;
  dailyChangePercent: number;
  holdings: Holding[];
}
```

### Holding
```typescript
interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  gainLossPercent: number;
  gainLossValue: number;
}
```

## Utility Functions

### market.ts
- `getMockMarket()` - Generates 10 mock stocks with random prices
- `generateMockChartData()` - Creates historical price data
- `generateStockGraphDataAllRanges()` - Pre-generates all time range data
- `formatPrice()` - Currency formatting
- `formatChange()` - Percentage formatting

### queryParams.ts
- `getComponentId()` - Resolves component IDs from URL params or defaults