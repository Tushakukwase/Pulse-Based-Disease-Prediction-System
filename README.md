# Pulse-Based Disease Prediction System

An educational healthcare prototype inspired by the ancient Ayurvedic practice of Nadi Pariksha (pulse diagnosis). This system analyzes wrist pulse characteristics to explore the three Doshas (Vata, Pitta, and Kapha) and provides personalized wellness insights based on traditional Ayurvedic principles.

## ⚠️ Medical Disclaimer

**This is NOT a medical diagnostic tool.** This application is designed for educational and research purposes only. Results are for educational exploration of Ayurvedic concepts and should never be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

## 🌟 Features

- **Interactive Pulse Analysis**: Input pulse characteristics through an intuitive form
- **Dosha Identification**: AI-inspired analysis to determine dominant constitutional type
- **Health Insights**: Personalized wellness suggestions based on Ayurvedic principles
- **Data Visualization**: Interactive charts showing pulse trends and dosha distribution
- **Health Dashboard**: Monitor pulse patterns and constitutional balance over time
- **Educational Content**: Learn about Nadi Pariksha and the three Doshas
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Privacy-Focused**: All processing happens client-side with no data storage

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pulse-prediction-system.git
   cd pulse-prediction-system
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 16.0.10** - React framework with App Router
- **React 19.2.0** - Component-based UI library
- **TypeScript 5.x** - Type-safe JavaScript development

### Styling & UI Components
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **shadcn/ui** - Pre-built accessible components
- **Radix UI** - Primitive components for accessibility
- **Lucide React** - Beautiful icon library

### Data Visualization
- **Recharts 2.15.4** - React-based charting library
- **Custom Progress Components** - Health status indicators

### Form Management
- **React Hook Form 7.60.0** - Performant form library
- **Zod 3.25.76** - TypeScript-first schema validation

### Analytics & Monitoring
- **Vercel Analytics** - Privacy-friendly analytics
- **Web Vitals** - Performance monitoring

## 📁 Project Structure

```
pulse-prediction-system/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Health monitoring dashboard
│   ├── pulse-input/            # Pulse measurement form
│   ├── results/                # Analysis results display
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Landing page
├── components/                  # Reusable UI components
│   └── ui/                     # shadcn/ui components
├── lib/                        # Utility functions
│   └── utils.ts                # Common utilities
├── public/                     # Static assets
├── docs/                       # Documentation
│   ├── requirements.md         # Project requirements
│   └── design.md              # System design document
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── next.config.mjs          # Next.js configuration
```

## 🎯 How It Works

### 1. Pulse Input Collection
Users provide five key measurements:
- **Pulse Rate**: Heart rate in beats per minute (40-120 BPM)
- **Pulse Rhythm**: Regular or irregular heartbeat pattern
- **Pulse Strength**: Weak, normal, or strong pulse intensity
- **Body Temperature**: Cool, normal, or warm feeling
- **Stress Level**: Low, medium, or high stress assessment

### 2. Dosha Analysis Algorithm
The system uses a weighted scoring algorithm to analyze inputs:

```typescript
// Simplified algorithm overview
function analyzePulse(inputs) {
  let doshaScores = { Vata: 0, Pitta: 0, Kapha: 0 };
  
  // Pulse rate analysis
  if (pulseRate < 60) doshaScores.Kapha += 30;
  else if (pulseRate > 90) doshaScores.Pitta += 35;
  
  // Rhythm analysis
  if (rhythm === 'irregular') doshaScores.Vata += 40;
  
  // Additional scoring for strength, temperature, stress...
  
  return determineDominantDosha(doshaScores);
}
```

### 3. Results & Recommendations
Based on the analysis, users receive:
- **Dominant Dosha** with confidence percentage
- **Health Risk Level** assessment
- **Possible Health Tendencies** for the identified dosha
- **Lifestyle Suggestions** based on Ayurvedic principles
- **Downloadable Report** for personal records

## 🎨 Design System

### Color Palette
- **Primary**: Deep purple (`oklch(0.45 0.25 260)`)
- **Secondary**: Teal (`oklch(0.5 0.18 190)`)
- **Accent**: Cyan (`oklch(0.55 0.22 180)`)
- **Background**: Light gray (`oklch(0.98 0.002 240)`)

### Dosha Color Coding
- **Vata** (Air/Ether): Blue tones 🌬️
- **Pitta** (Fire/Water): Red/orange tones 🔥
- **Kapha** (Water/Earth): Green tones 💧

### Typography
- **Primary Font**: Geist (clean, modern sans-serif)
- **Monospace**: Geist Mono (for code and data)

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: Single-column layouts, touch-friendly controls
- **Tablet**: Two-column grids, optimized form layouts
- **Desktop**: Multi-column dashboards, enhanced visualizations

## 🔒 Privacy & Security

### Data Protection
- **No Server Storage**: All processing happens in the browser
- **No Personal Data**: No collection of identifiable information
- **Client-Side Only**: Analysis algorithms run locally
- **Session-Based**: Data cleared when browser is closed

### Security Measures
- **Input Validation**: Zod schema validation for all inputs
- **XSS Protection**: React's built-in security features
- **Type Safety**: TypeScript for compile-time error prevention
- **Secure Headers**: Next.js security best practices

## 🧪 Testing

### Running Tests
```bash
# Unit tests
pnpm test

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e
```

### Test Coverage
- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: User workflows and form submissions
- **Accessibility Tests**: Screen reader and keyboard navigation
- **Performance Tests**: Page load times and chart rendering

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Build static export
pnpm build && pnpm export

# Deploy to Netlify
netlify deploy --prod --dir=out
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Add JSDoc comments for complex functions
- Ensure accessibility compliance
- Test on multiple devices and browsers

## 📚 Educational Resources

### Ayurvedic Concepts
- **Nadi Pariksha**: Traditional pulse diagnosis technique
- **Tridosha Theory**: The three constitutional types
- **Vata**: Movement, creativity, nervous system
- **Pitta**: Metabolism, digestion, transformation
- **Kapha**: Structure, stability, immunity

### Further Reading
- "The Complete Guide to Ayurvedic Medicine" by Dr. Vasant Lad
- "Ayurvedic Pulse Diagnosis" by Dr. Vasant Lad
- "The Secret of Pulse" (conceptual reference)

## 🐛 Troubleshooting

### Common Issues

#### Development Server Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm dev
```

#### Build Errors
```bash
# Check TypeScript errors
pnpm type-check

# Fix linting issues
pnpm lint --fix
```

#### Styling Issues
```bash
# Rebuild Tailwind CSS
pnpm build:css
```

### Performance Issues
- Check browser console for errors
- Verify network connectivity
- Clear browser cache
- Disable browser extensions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ayurvedic Tradition**: Ancient wisdom of pulse diagnosis
- **Open Source Community**: Amazing libraries and tools
- **shadcn/ui**: Beautiful, accessible component library
- **Vercel**: Excellent hosting and analytics platform
- **Contributors**: Everyone who helps improve this project

## 📞 Support

### Getting Help
- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join community discussions
- **Email**: Contact the maintainers for urgent matters

### Reporting Issues
When reporting issues, please include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

**Remember**: This is an educational tool for exploring Ayurvedic concepts. Always consult qualified healthcare professionals for medical advice and diagnosis.

Made with ❤️ for educational exploration of traditional wellness practices.