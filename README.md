# Myop Playground

A tutorial repository demonstrating how to integrate and use [Myop](https://myop.dev) components in React applications. This monorepo contains example applications that showcase the power of dynamic, customizable UI components.

## What is Myop?

Myop enables you to create dynamic UI components that can be customized and swapped at runtime without code changes. Build once, customize anywhere.

- **Dashboard**: [dashboard.myop.dev](https://dashboard.myop.dev) - Create and manage your Myop components
- **SDK**: [@myop/sdk](https://www.npmjs.com/package/@myop/sdk) - Core SDK for component integration

## Demo Applications

This repository includes two fully-functional demo applications:

### [Stocks Manager](https://playground.myop.dev/stocks/)

A stock trading simulation app featuring:
- Real-time market view with searchable stock list
- Interactive stock price charts with multiple time ranges
- Portfolio management with holdings tracking
- Buy/sell modals with confirmation flows
- Dynamic component overrides via URL parameters

### [Team Profiles Manager](https://playground.myop.dev/profiles/)

A team management app featuring:
- User authentication with session persistence
- Team members display (table/cards view)
- Add new team members with full profile details
- Profile editing with slide-in modals
- Analytics dashboard with team insights (dynamically updates with team changes)
- Navigation sidebar with user profile menu

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

Run individual apps in development mode:

```bash
# Stocks app
npm run dev:stocks

# Profiles app
npm run dev:profiles
```

### Build

Build all apps:

```bash
npm run build
```

Build individual apps:

```bash
npm run build:stocks
npm run build:profiles
```

### Preview Production Build

```bash
npm run start
```

## Project Structure

```
myop-playground/
├── packages/
│   ├── playground-stocks-app/    # Stocks trading demo
│   └── playground-profiles-app/  # Team profiles demo
├── scripts/
│   └── merge-builds.js           # Build merge utility
├── package.json                  # Workspace configuration
└── README.md
```

## Creating Components with Myop Dashboard

There are two recommended approaches for creating Myop components: using **AI-assisted development with MCP** (recommended for faster development) or using the **Dashboard editor** directly.

---

### Option A: Build with Claude + Figma MCP (Recommended)

Use Claude AI with MCP connectors to build components faster. Claude can read your Figma designs and automatically match your design language.

#### Step 1: Connect Figma MCP

Install the Figma MCP connector to give Claude access to your designs and design system.

- Follow the [Figma MCP setup guide](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)

#### Step 2: Connect Myop MCP

Install the Myop MCP connector so Claude can talk directly to Myop.

- MCP URL: `https://mcp.myop.dev/mcp`
- Add this URL as a custom connector in Claude's settings

#### Step 3: Build Your Component

1. Choose a component you want to build from your product or side project
2. Describe what you want to build or change in Claude
3. Add a Figma link — Claude will match your design language automatically

#### Step 4: Save and Test in Myop

When the component looks right, tell Claude:
> "Create a new component in Myop."

You can also specify which organization to upload the component to:
> "Create a new component in Myop in the 'My Team' organization."

Claude and Myop handle the handoff. In Myop, you can:
- Test different scenarios
- Validate data flow
- Run automated tests as needed

#### Step 5: Connect to Your App

1. In Myop, click **"Connect"**
2. Myop creates a short snippet to connect the component to your app
3. This is a one-time setup — share it with a developer or invite them to your workspace

---

### Option B: Build with Claude + Screenshot

Don't have Figma? You can still use Claude with screenshots or mockups.

#### Step 1: Connect Myop MCP

Install the Myop MCP connector:
- MCP URL: `https://mcp.myop.dev/mcp`

#### Step 2: Build Your Component

1. Describe what you want to build or change
2. Upload screenshots, mockups, or visual references
3. Claude will generate the component based on your input

#### Step 3: Save, Test, and Connect

Same as Option A — tell Claude to create the component in Myop, then test and connect it to your app.

---

### Option C: Build with Dashboard Editor

Use the Myop Dashboard directly to create components with the visual editor.

#### Step 1: Access the Dashboard

1. Go to [dashboard.myop.dev](https://dashboard.myop.dev)
2. Sign up or log in to your account

#### Step 2: Create a New Component

1. Click **"Build your own"** or **"New Component"**
2. Use the visual editor to design your component:
   - Add UI elements (buttons, text, images, inputs, etc.)
   - Style your component
   - Configure responsive behavior

#### Step 3: Define the Data Interface

Set up `myop_init_interface` to receive data from your application:

1. In the component editor, define the data schema your component expects
2. Map incoming data to UI elements
3. Example schema for a header component:
   ```json
   {
     "userName": "string",
     "stats": {
       "members": "number",
       "projects": "number"
     }
   }
   ```

#### Step 4: Configure Actions (CTA Handlers)

Set up `myop_cta_handler` to send events back to your application:

1. Select interactive elements (buttons, links, etc.)
2. Define action names and payloads
3. Example actions:
   - `button_clicked` → `{ buttonId: "submit" }`
   - `item_selected` → `{ itemId: "123", itemName: "..." }`

#### Step 5: Publish and Get Component ID

1. Click **"Publish"** to make your component available
2. Copy the **Component ID** (e.g., `your-component-id`)

### Step 6: Use in Playground Apps

Add the component ID as a query parameter to override the default component:

```
# Stocks app - override the stock list
http://localhost:5173/stocks/?stockList=your-component-id

# Profiles app - override the sidebar
http://localhost:5173/profiles/?sidebar=your-component-id
```


### Available Component Slots

**Stocks App:**
| Query Param | Component |
|-------------|-----------|
| `stockList` | Stocks list with search |
| `topBar` | Navigation header |
| `stockGraph` | Price chart |
| `portfolio` | Holdings table |
| `tradeModal` | Buy/sell modal |
| `confirmationModal` | Purchase confirmation |
| `confirmationSellModal` | Sale confirmation |
| `footer` | Footer disclaimer |

**Profiles App:**
| Query Param | Component |
|-------------|-----------|
| `signup` | Authentication page |
| `sidebar` | Navigation sidebar |
| `table` | Team members table |
| `cardsView` | Team members cards |
| `headerInsights` | Welcome header |
| `tableHeader` | View toggle controls |
| `editProfile` | Profile editor modal |
| `addProfile` | Add new member form |
| `analytics` | Analytics dashboard |
| `profilePopover` | User profile dropdown |



## Handle Data in Your Component

Your component receives data through `myop_init_interface`. Here's how data flows:

```
┌─────────────────┐       myop_init_interface(data)      ┌──────────────────┐
│                 │ ──────────────────────────────────▶  │                  │
│   React App     │                                      │  Myop Component  │
│                 │ ◀──────────────────────────────────  │                  │
└─────────────────┘       myop_cta_handler(action)       └──────────────────┘
```

**Example: Stocks List receives:**
```typescript
{
  stocks: [
    { symbol: "AAPL", name: "Apple Inc.", price: 178.50, change: 2.35 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: -1.20 }
  ],
  selectedSymbol: "AAPL"
}
```

**Example: Stocks List emits:**
```typescript
// When user clicks a stock
myop_cta_handler("stock_selected", { symbol: "GOOGL" })

// When user clicks trade button
myop_cta_handler("trade_clicked", { symbol: "AAPL" })
```

### Tips for Component Development

1. **Check the app README** - Each playground app has detailed data structures in its README
2. **Use browser DevTools** - Inspect network requests to see data being passed
3. **Start simple** - Override one component at a time
4. **Test incrementally** - Verify data binding before adding complex interactions

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- @myop/sdk

## Resources

- [Myop Dashboard](https://dashboard.myop.dev) - Create and manage components
- [@myop/sdk on npm](https://www.npmjs.com/package/@myop/sdk) - SDK documentation
- [Myop.dev](https://myop.dev) - Learn more about Myop

## License

MIT
