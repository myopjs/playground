# Playground HR App

A React-based HR team management application built with Myop components. This application demonstrates how to build dynamic, customizable applications with authentication, CRUD operations, and analytics dashboards.

## Overview

The HR App is part of the Myop Playground monorepo and showcases:

- User authentication with session persistence
- Team member management (view, add, edit, delete)
- Main content component for team display
- Analytics dashboard with team insights
- Dynamic component customization via URL parameters
- Responsive design with mobile-first approach

## Features

### User Authentication
- Sign-in component with optional payload (email, password, name)
- Falls back to mock users when no payload provided
- Session persistence via localStorage

### Team Management
- **View Members**: Main content component displays team members
- **Add Members**: Full form with role selection, manager assignment, and skill tags
- **Edit Profiles**: Modal-based profile editing with instant updates
- **Delete Members**: Remove team members with confirmation notifications

### Analytics Dashboard
- Team composition metrics
- Skills distribution analysis with color-coded categories
- Experience and tenure range breakdowns
- Seniority level distribution
- Performance summary generation

### Dynamic Component Customization
Override any UI component via URL query parameters:
```
?signup=custom-id&sidebar=another-id
```

### Responsive Design
- Mobile-first approach with 792px breakpoint
- Collapsible sidebar on mobile
- Portal-based rendering for mobile modals
- Adaptive layouts for all views

## Project Structure

```
playground-hr-app/
├── src/
│   ├── main.tsx                    # React root with Router (basename: /hr-app)
│   ├── index.css                   # Global styles
│   ├── ui/                         # UI Components
│   │   ├── App.tsx                 # Main app container
│   │   ├── HomePage.tsx            # Header insights + main content + edit modal
│   │   ├── Analytics.tsx           # Analytics dashboard
│   │   ├── AddMember.tsx           # Add member form
│   │   ├── SideBar.tsx             # Navigation sidebar
│   │   ├── ProfilePopover.tsx      # User menu dropdown
│   │   └── Toast.tsx               # Notification component
│   ├── data/
│   │   ├── mockUsers.ts            # Auth mock users (5 users)
│   │   ├── teamMembers.ts          # Team data
│   │   └── analyticsData.ts        # Analytics data generation
│   └── utils/
│       ├── componentsIds.ts        # Myop component ID mappings
│       ├── queryParams.ts          # URL parameter handling
│       └── helpers.ts              # Shared utility functions (getInitials, getRandomAvatarColor)
├── package.json                    # Package configuration
├── vite.config.ts                  # Vite build config (base: /hr-app/)
├── tsconfig.json                   # TypeScript references
├── tsconfig.app.json               # App TypeScript config
├── tsconfig.node.json              # Node TypeScript config
└── index.html                      # HTML entry point
```

## Installation & Development

Run commands from the monorepo root or this package directory:

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at http://localhost:5173/hr-app/ |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Dependencies

### Production
- `@myop/react` (^0.0.30) - Myop component framework
- `react` (^19.2.0) - UI library
- `react-dom` (^19.2.0) - React DOM renderer
- `react-router-dom` (^7.11.0) - Routing

### Development
- `vite` (^7.2.4) - Build tool
- `typescript` (~5.9.3) - Type checking
- `eslint` (^9.39.1) - Linting
- `@vitejs/plugin-react` (^5.1.1) - React plugin for Vite

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Header insights + main content + edit profile modal |
| `/analytics` | Analytics | Team analytics dashboard |
| `/add-member` | AddMember | Form to add new team members |

## Myop Component Integration

The app uses the `@myop/react` package to render dynamic, customizable components:

```tsx
import {MyopComponent, preloadComponents} from '@myop/react';
import {useEffect} from "react";
import {COMPONENTS_IDS} from "../utils/componentsIds";

export const CustomComponent = () => {

    const [donePreload, setDonePreload] = useState<boolean>(false);

    // Preload components on startup
    useEffect(() => {
        Promise.resolve(preloadComponents([tableId, headerInsightsId, ...]))
            .then(() => setDonePreload(true));
    }, []);

    if (!donePreload) {
        return (<div/>)
    }

    // Render component with data and event handlers after preload
    return <MyopComponent
        componentId={COMPONENTS_IDS.tableId}
        data={data}
        on={handleCtaEvents}
    />
}
```

### Data Flow
```
React App → myop_init_interface(data) → Myop Component
Myop Component → myop_cta_handler(action) → React App
```

## MyopComponent Reference

This section documents each `<MyopComponent>` used in the app, including the data structures they receive and the CTA (Call-to-Action) events they emit.

---

### 1. Signup (`signup`)

**Query Param:** `signup`

**Data Structure:** None

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `signin` | `void` or `{ email: string; password: string; name: string }` | User clicked sign in (payload optional) |

---

### 2. Sidebar (`sidebar`)

**Query Param:** `sidebar`

**Data Structure:**
```typescript
{
  userData: {
    name: string;
    role: string;
    initials: string;
    profileImage: string | null;
  };
  activeNavItem: string;    // 'home' | 'analytics'
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `profile-clicked` | `{ userData: UserData }` | User clicked profile area (opens popover) |
| `nav-clicked` | `{ navId: string; navItem: NavItem }` | User clicked navigation item |
| `sidebar-toggled` | `{ expanded: boolean }` | Sidebar expand/collapse state changed |

---

### 3. Header Insights (`headerInsights`)

**Query Param:** `headerInsights`

**Data Structure:**
```typescript
{
  userName: string;
  stats: {
    experience: { value: string; label: string };
    members: { value: number; label: string };
    skills: { value: number; label: string };
    projects: { value: number; label: string };
  };
  isMobileView: boolean;
  action?: { action: string };  // e.g., { action: 'showShareCopied' }
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `action-clicked` | `{ action: 'viewHighlights' }` | User clicked to view analytics |
| `action-clicked` | `{ action: 'addMember' }` | User clicked to add member |
| `action-clicked` | `{ action: 'shareTeam' }` | User clicked to share team URL |
| `size-requested` | `{ height: number }` | Component requests size change |

---

### 4. Main Content (`mainContent`)

**Query Param:** `mainContent`

**Data Structure:**
```typescript
{
  members: TeamMember[];
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `member-clicked` | `{ member: TeamMember }` | User clicked a team member |
| `add-member` | `{}` | User clicked add member button |

---

### 5. Edit Profile (`editProfile`)

**Query Param:** `editProfile`

**Data Structure:**
```typescript
{
  profile: {
    id: string;
    initials: string;
    name: string;
    title: string;
    experience: string;
    tenure: string;
    location: string;
    skills: string[];
    profileImage: string | null;
    avatarColor: string;
    badge: string;
    email: string;
    phone: string;
    about: string;
    relationship: string;
    relationshipType: string;
    teamSize: number;
    tenureRank: number;
  };
  isEditing: boolean;
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `close` | None | User closed the modal |
| `delete` | `{ profile: { id, name, ... } }` | User deleted the profile |
| `save` | `{ profile: { id, name, title, ... } }` | User saved profile changes |

---

### 6. Profile Popover (`profilePopover`)

**Query Param:** `profilePopover`

**Data Structure:**
```typescript
{
  userData: {
    name: string;
    email: string;
    initials: string;
    profileImage: string | null;
  };
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `logout-clicked` | `{}` | User clicked logout |
| `click-outside` | `{}` | User clicked outside popover |
| `escape-pressed` | `{}` | User pressed Escape key |
| `drag-closed` | `{}` | User dragged to close (mobile) |

---

### 7. Analytics (`analytics`)

**Query Param:** `analytics`

**Data Structure:**
```typescript
{
  stats: Array<{ type: string; value: string; label: string; color: string }>;
  topSkills: Array<{ name: string; count: number }>;
  experienceDistribution: Array<{ label: string; value: number }>;
  tenureDistribution: Array<{ label: string; value: number }>;
  skillsDistribution: Array<{ name: string; percentage: number; members: string; color: string; colorClass: string }>;
  seniority: Array<{ level: string; range: string; count: number; color: string }>;
  performance: { title: string; description: string };
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `back-clicked` | `{}` | User clicked back button |

---

### 8. Add Profile (`addProfile`)

**Query Param:** `addProfile`

**Data Structure:**
```typescript
{
  managersList: Array<{ id: string; name: string }>;
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `cancel` | None | User cancelled adding member |
| `back` | None | User clicked back button |
| `submit` | `{ formData: FormData }` | User submitted new member form |

---

## Components to Implement

The following two components need to be implemented. Copy the type definitions below and use them as the API contract when building your Myop component.

### Signup Component

This component handles user sign-in. It should fire a `signin` CTA, optionally with user credentials.

```typescript
/**
 * Data structure passed to myop_init_interface(data)
 */
interface MyopInitData {}

/**
 * Actions and payloads for myop_cta_handler(action, payload)
 */
interface MyopCtaPayloads {
  'signin': void | { email: string; password: string; name: string };
}

declare function myop_init_interface(): MyopInitData;
declare function myop_init_interface(data: MyopInitData): void;

declare function myop_cta_handler<K extends keyof MyopCtaPayloads>(
  action: K,
  payload: MyopCtaPayloads[K]
): void;
```

**Behavior:**
- The component should provide a way for the user to sign in
- The `signin` CTA can be fired without a payload (the host app will assign a random mock user)
- Or it can be fired with `{ email, password, name }` to create a user from the provided data

---

### Main Content Component

This component displays team members and allows interaction with them. It receives an array of `TeamMember` objects and should fire CTAs when a member is clicked or when the user wants to add a new member.

```typescript
interface TeamMember {
  id: string;
  initials: string;
  name: string;
  title: string;
  location: string;
  tenure: string;
  experience: string;
  skills: string[];
  role: string;
  avatarColor: string;
  profileImage: string | null;
  email: string;
  phone: string;
  about: string;
  relationship: string;
  relationshipType: string;
}

/**
 * Data structure passed to myop_init_interface(data)
 */
interface MyopInitData {
  members: TeamMember[];
  isMobileView?: boolean;
}

/**
 * Actions and payloads for myop_cta_handler(action, payload)
 */
interface MyopCtaPayloads {
  'add-member': {};
  'member-clicked': { member: TeamMember };
}

declare function myop_init_interface(): MyopInitData;
declare function myop_init_interface(data: MyopInitData): void;

declare function myop_cta_handler<K extends keyof MyopCtaPayloads>(
  action: K,
  payload: MyopCtaPayloads[K]
): void;
```

**Behavior:**
- Receives `members` array and optional `isMobileView` flag via `myop_init_interface(data)`
- Should display the team members in a visual layout (table, cards, grid, etc.)
- Fire `member-clicked` with the full `TeamMember` object when a member is clicked (the host app opens an edit profile modal)
- Fire `add-member` when the user wants to add a new team member (the host app navigates to the add member page)

---

## Data Types

### UserData
```typescript
interface UserData {
  name: string;
  email: string;
  initials: string;
  profileImage: string | null;
}
```

### TeamMember
```typescript
interface TeamMember {
  id: string;
  initials: string;
  name: string;
  title: string;
  location: string;
  tenure: string;
  experience: string;
  skills: string[];
  role: string;
  avatarColor: string;
  profileImage: string | null;
  email: string;
  phone: string;
  about: string;
  relationship: string;
  relationshipType: string;
}
```

## State Management

### App.tsx
- `currentUser`: User authentication state (persisted to localStorage)
- `members`: Array of team members
- `isMobileView`: Responsive design state (breakpoint: 700px)
- `isSidebarExpanded`: Mobile sidebar toggle

### HomePage.tsx
- `selectedMember`: Member selected for profile modal
- `isProfileOpen`: Modal visibility state
- `toastOpen`: Toast notification state
- `headerInsightsHeight`: Dynamic header height

## Mock Data

### Users (5 predefined)
Mock users for authentication simulation with random selection via `getRandomUser()`. Each user has a profile image via pravatar.cc.

### Team Members
Diverse team covering roles: Managers, Designers, Researchers, Content specialists, Engineers, Strategists.

## Utility Functions

### queryParams.ts
- `getComponentId(key)` - Resolves component IDs from URL params or defaults to built-in component IDs
- `QUERY_PARAMS` - Object mapping component keys to their URL query parameter names

### componentsIds.ts
- `COMPONENTS_IDS` - Object mapping component keys to their default Myop component UUIDs

### helpers.ts
- `getInitials(name)` - Extracts initials from a full name (e.g., "John Doe" → "JD")
- `getRandomAvatarColor()` - Returns a random hex color from a predefined palette

### analyticsData.ts
- `generateAnalyticsData(members)` - Generates complete analytics data from team members array