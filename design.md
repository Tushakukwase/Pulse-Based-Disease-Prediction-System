# Design Document: Pulse-Based Disease Prediction System

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client-Side Application                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Landing   │  │ Pulse Input │  │   Results   │         │
│  │    Page     │  │    Form     │  │   Display   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Dashboard  │  │ UI Components│  │  Analytics  │         │
│  │   Monitor   │  │   Library    │  │   Engine    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                   Analysis Engine                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Dosha     │  │    Risk     │  │ Suggestion  │         │
│  │ Calculator  │  │ Assessment  │  │  Generator  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                  Data Visualization                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Charts    │  │  Progress   │  │   Health    │         │
│  │  (Recharts) │  │    Bars     │  │ Indicators  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend Framework
- **Next.js 16.0.10**: React-based framework with App Router
- **React 19.2.0**: Component-based UI library
- **TypeScript 5.x**: Type-safe JavaScript development

#### Styling and UI
- **Tailwind CSS 4.1.9**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **Radix UI**: Accessible primitive components
- **Lucide React**: Icon library

#### Data Visualization
- **Recharts 2.15.4**: React-based charting library
- **Custom Progress Components**: Health status indicators

#### Form Management
- **React Hook Form 7.60.0**: Form state management
- **Zod 3.25.76**: Schema validation

#### Development Tools
- **pnpm**: Fast package manager
- **ESLint**: Code linting
- **PostCSS**: CSS processing

## Component Architecture

### Page Components

#### 1. Landing Page (`app/page.tsx`)
```typescript
interface LandingPageProps {
  // No props - static content
}

interface LandingPageState {
  disclaimerAgreed: boolean;
}
```

**Responsibilities**:
- Display project introduction and medical disclaimer
- Handle disclaimer acknowledgment
- Navigate to pulse input form
- Show feature preview cards

#### 2. Pulse Input Page (`app/pulse-input/page.tsx`)
```typescript
interface PulseInputState {
  pulseRate: number[];
  rhythm: string;
  strength: string;
  temperature: string;
  stressLevel: string;
}
```

**Responsibilities**:
- Collect pulse measurement data
- Validate form inputs
- Navigate to results page with query parameters
- Provide educational information about measurements

#### 3. Results Page (`app/results/page.tsx`)
```typescript
interface AnalysisResult {
  dosha: 'Vata' | 'Pitta' | 'Kapha';
  doshaPercentage: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  healthTendencies: string[];
  suggestions: string[];
  explanation: string;
}
```

**Responsibilities**:
- Process analysis parameters from URL
- Execute dosha analysis algorithm
- Display comprehensive results
- Generate downloadable report

#### 4. Dashboard Page (`app/dashboard/page.tsx`)
```typescript
interface DashboardState {
  selectedDosha: string;
  pulseHistory: PulseHistoryEntry[];
  doshaDistribution: DoshaDistribution[];
}

interface PulseHistoryEntry {
  time: string;
  rate: number;
  dosha: string;
}
```

**Responsibilities**:
- Display health monitoring dashboard
- Show pulse trends and dosha distribution
- Provide dosha information switching
- Quick navigation to new analysis

### Core Algorithm Design

#### Dosha Analysis Engine

```typescript
function analyzePulse(
  pulseRate: number,
  rhythm: string,
  strength: string,
  temperature: string,
  stressLevel: string
): AnalysisResult {
  // Scoring algorithm implementation
}
```

**Algorithm Logic**:

1. **Initialize Dosha Scores**
   ```typescript
   let doshaScores = {
     Vata: 0,
     Pitta: 0,
     Kapha: 0,
   };
   ```

2. **Pulse Rate Analysis**
   - < 60 BPM: +30 Kapha, -10 Vata
   - > 90 BPM: +35 Pitta
   - 60-90 BPM: +20 Vata, +10 Pitta, +10 Kapha

3. **Rhythm Analysis**
   - Irregular: +40 Vata
   - Regular: +20 Kapha, +10 Pitta

4. **Strength Analysis**
   - Weak: +25 Kapha, +20 Vata
   - Strong: +35 Pitta
   - Normal: +15 each dosha

5. **Temperature Analysis**
   - Cool: +25 Kapha, +15 Vata
   - Warm: +40 Pitta
   - Normal: +20 Vata, +10 Pitta

6. **Stress Level Analysis**
   - High: +20 Pitta, +20 Vata
   - Low: +15 Kapha
   - Medium: +10 Vata

7. **Score Normalization and Risk Assessment**
   ```typescript
   const total = Math.abs(doshaScores.Vata) + 
                 Math.abs(doshaScores.Pitta) + 
                 Math.abs(doshaScores.Kapha);
   
   const normalized = {
     Vata: Math.max(0, (doshaScores.Vata / total) * 100),
     Pitta: Math.max(0, (doshaScores.Pitta / total) * 100),
     Kapha: Math.max(0, (doshaScores.Kapha / total) * 100),
   };
   ```

## Data Models

### Dosha Information Model
```typescript
interface DoshaInfo {
  icon: string;
  color: string;
  borderColor: string;
  textColor: string;
  description: string;
  traits: string[];
}

const doshaInfo: Record<string, DoshaInfo> = {
  Vata: {
    icon: '🌬️',
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    description: 'Air and ether elements. Associated with movement, creativity, and nervous activity.',
    traits: ['Irregular pulse', 'Variable energy', 'Quick thinking', 'Sensitive nature'],
  },
  // ... Pitta and Kapha definitions
};
```

### Health Recommendations Model
```typescript
interface HealthRecommendations {
  [key: string]: {
    healthTendencies: string[];
    suggestions: string[];
    explanation: string;
  };
}
```

## User Interface Design

### Design System

#### Color Palette
```css
:root {
  --primary: oklch(0.45 0.25 260);      /* Deep purple */
  --secondary: oklch(0.5 0.18 190);     /* Teal */
  --accent: oklch(0.55 0.22 180);       /* Cyan */
  --background: oklch(0.98 0.002 240);  /* Light gray */
  --foreground: oklch(0.2 0.01 240);    /* Dark gray */
  --muted: oklch(0.92 0.01 240);        /* Light muted */
  --border: oklch(0.92 0.01 240);       /* Border gray */
}
```

#### Typography
- **Primary Font**: Geist (sans-serif)
- **Monospace Font**: Geist Mono
- **Heading Scale**: 5xl (48px) → 4xl (36px) → 2xl (24px) → xl (20px) → lg (18px)
- **Body Text**: Base (16px), sm (14px), xs (12px)

#### Spacing System
- **Base Unit**: 4px (0.25rem)
- **Common Spacing**: 2, 3, 4, 6, 8, 12, 16, 20, 24, 32px
- **Layout Spacing**: 48px, 64px, 96px for major sections

### Component Design Patterns

#### Card Components
```typescript
interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'dosha' | 'risk';
}
```

**Usage Patterns**:
- Information display cards
- Form containers
- Result presentation
- Dashboard widgets

#### Form Components
```typescript
interface FormFieldProps {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}
```

**Form Patterns**:
- Slider inputs for numeric values
- Select dropdowns for categorical data
- Checkbox for agreements
- Button groups for actions

#### Chart Components
```typescript
interface ChartProps {
  data: any[];
  width?: string | number;
  height?: string | number;
  responsive?: boolean;
}
```

**Chart Types**:
- Line charts for trends
- Bar charts for distributions
- Progress bars for percentages
- Donut charts for proportions

### Responsive Design

#### Breakpoint Strategy
```css
/* Mobile First Approach */
.container {
  @apply px-4;                    /* Mobile: 16px padding */
  @apply md:px-6;                 /* Tablet: 24px padding */
  @apply lg:px-8;                 /* Desktop: 32px padding */
  @apply max-w-6xl mx-auto;       /* Max width with centering */
}
```

#### Grid Layouts
```css
.grid-responsive {
  @apply grid grid-cols-1;        /* Mobile: Single column */
  @apply md:grid-cols-2;          /* Tablet: Two columns */
  @apply lg:grid-cols-3;          /* Desktop: Three columns */
  @apply gap-4 md:gap-6;          /* Responsive gaps */
}
```

## State Management

### Client-Side State Architecture

#### Page-Level State
- **Local useState**: Form inputs, UI toggles, temporary data
- **URL Parameters**: Analysis results, navigation state
- **Local Storage**: User preferences, disclaimer acceptance

#### State Flow Diagram
```
Landing Page
     ↓ (disclaimer agreed)
Pulse Input Form
     ↓ (form submitted)
Results Page ← (URL params)
     ↓ (navigation)
Dashboard
```

### Data Persistence Strategy

#### Session Storage
- Form draft data
- Analysis parameters
- Navigation history

#### Local Storage
- User preferences
- Dashboard settings
- Historical data (mock)

#### No Server Storage
- All processing client-side
- No user accounts or profiles
- Privacy-focused approach

## Security Considerations

### Input Validation
```typescript
const pulseInputSchema = z.object({
  pulseRate: z.number().min(40).max(120),
  rhythm: z.enum(['regular', 'irregular']),
  strength: z.enum(['weak', 'normal', 'strong']),
  temperature: z.enum(['cool', 'normal', 'warm']),
  stressLevel: z.enum(['low', 'medium', 'high']),
});
```

### XSS Prevention
- TypeScript type safety
- React's built-in XSS protection
- Sanitized user inputs
- No dangerouslySetInnerHTML usage

### Privacy Protection
- No personal data collection
- Client-side only processing
- No external API calls for analysis
- Minimal analytics tracking

## Performance Optimization

### Code Splitting
```typescript
// Dynamic imports for heavy components
const Dashboard = dynamic(() => import('./dashboard/page'), {
  loading: () => <LoadingSpinner />,
});
```

### Image Optimization
- Next.js Image component
- WebP format support
- Responsive image loading
- Lazy loading implementation

### Bundle Optimization
- Tree shaking for unused code
- Dynamic imports for routes
- Optimized dependencies
- Minimal bundle size

### Caching Strategy
- Static asset caching
- Component memoization
- Computed value caching
- Browser caching headers

## Testing Strategy

### Unit Testing
```typescript
describe('analyzePulse', () => {
  it('should identify Vata dosha for irregular pulse', () => {
    const result = analyzePulse(75, 'irregular', 'weak', 'cool', 'high');
    expect(result.dosha).toBe('Vata');
  });
});
```

### Integration Testing
- Form submission workflows
- Navigation between pages
- Chart rendering
- Report generation

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast ratios
- ARIA labels and roles

### Performance Testing
- Page load times
- Chart rendering performance
- Mobile device testing
- Network throttling tests

## Deployment Architecture

### Build Process
```bash
# Production build
pnpm build

# Static export (if needed)
pnpm export

# Development server
pnpm dev
```

### Hosting Strategy
- **Vercel**: Recommended for Next.js apps
- **Netlify**: Alternative static hosting
- **GitHub Pages**: For open-source deployment
- **CDN**: Global content delivery

### Environment Configuration
```typescript
// next.config.mjs
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Additional production optimizations
};
```

## Monitoring and Analytics

### Performance Monitoring
- **Vercel Analytics**: Built-in performance tracking
- **Web Vitals**: Core web vitals monitoring
- **Error Boundaries**: React error handling

### User Analytics
```typescript
// Minimal privacy-focused analytics
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Health Monitoring
- Application uptime monitoring
- Error rate tracking
- Performance regression detection
- User experience metrics

## Maintenance and Updates

### Version Control Strategy
- **Git Flow**: Feature branches, develop, main
- **Semantic Versioning**: Major.Minor.Patch
- **Release Notes**: Documented changes
- **Rollback Strategy**: Quick revert capability

### Code Quality
- **ESLint**: Code linting rules
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Code Reviews**: Pull request process

### Documentation
- **README**: Setup and development guide
- **API Documentation**: Component interfaces
- **User Guide**: Application usage
- **Deployment Guide**: Production setup

This design document provides a comprehensive blueprint for implementing the Pulse-Based Disease Prediction System with modern web technologies while maintaining focus on educational value and user safety.