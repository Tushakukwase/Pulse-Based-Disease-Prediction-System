'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-background flex flex-col items-center justify-center px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Header Icon/Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-3xl font-bold">
            ♥
          </div>
        </div>

        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Pulse-Based Disease <span className="text-primary">Prediction</span> System
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore AI-inspired healthcare using traditional Ayurvedic pulse concepts
          </p>
        </div>

        {/* Description Section */}
        <div className="bg-white/60 backdrop-blur-sm border border-border rounded-xl p-6 space-y-4 text-left">
          <h2 className="text-lg font-semibold text-foreground">About Nadi Pariksha</h2>
          <p className="text-muted-foreground leading-relaxed">
            This educational prototype is inspired by the ancient Ayurvedic practice of <span className="font-semibold">Nadi Pariksha</span> (pulse diagnosis) and the conceptual reference to "The Secret of Pulse." The system analyzes wrist pulse characteristics to explore the three Doshas: Vata, Pitta, and Kapha, which form the foundation of Ayurvedic medicine.
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-red-600 font-bold text-xl mt-1">⚠</div>
            <div className="text-left">
              <h3 className="font-semibold text-red-800">Medical Disclaimer</h3>
              <p className="text-sm text-red-700">
                This is NOT a medical diagnostic tool. Results are for educational purposes only. Always consult with qualified healthcare professionals for medical advice and diagnosis.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-8">
            <input
              type="checkbox"
              id="disclaimer"
              checked={disclaimerAgreed}
              onChange={(e) => setDisclaimerAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
            <label htmlFor="disclaimer" className="text-sm text-muted-foreground cursor-pointer">
              I understand this is for educational purposes only
            </label>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/pulse-input" className="block">
          <Button
            disabled={!disclaimerAgreed}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg h-12"
          >
            Start Pulse Analysis
          </Button>
        </Link>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          {[
            {
              icon: '📊',
              title: 'Smart Analysis',
              description: 'AI-powered pulse interpretation',
            },
            {
              icon: '🧘',
              title: 'Dosha Detection',
              description: 'Identify Vata, Pitta, or Kapha',
            },
            {
              icon: '💡',
              title: 'Health Insights',
              description: 'Personalized wellness suggestions',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/40 backdrop-blur-sm border border-border rounded-lg p-4 hover:bg-white/60 transition-colors"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-xs text-muted-foreground border-t border-border pt-6">
          This prototype was created for educational and research purposes. Use responsibly and always consult medical professionals.
        </p>
      </div>
    </main>
  );
}
