'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function PulseInputPage() {
  const [pulseRate, setPulseRate] = useState([72]);
  const [rhythm, setRhythm] = useState('');
  const [strength, setStrength] = useState('');
  const [temperature, setTemperature] = useState('');
  const [stressLevel, setStressLevel] = useState('');

  const isFormValid = rhythm && strength && temperature && stressLevel;

  const handleAnalyze = () => {
    if (isFormValid) {
      const queryParams = new URLSearchParams({
        pulseRate: pulseRate[0].toString(),
        rhythm,
        strength,
        temperature,
        stressLevel,
      });
      window.location.href = `/results?${queryParams.toString()}`;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-background py-8 px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Pulse Input Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Enter your pulse characteristics for personalized analysis
          </p>
        </div>

        {/* Form Card */}
        <Card className="border border-border shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
            <CardTitle>Pulse Assessment Form</CardTitle>
            <CardDescription>Provide your physiological measurements below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-8">
            {/* Pulse Rate Slider */}
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <label className="text-sm font-semibold text-foreground">Pulse Rate (BPM)</label>
                  <p className="text-xs text-muted-foreground">Range: 40–120 beats per minute</p>
                </div>
                <div className="text-3xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
                  {pulseRate[0]}
                </div>
              </div>
              <Slider
                value={pulseRate}
                onValueChange={setPulseRate}
                min={40}
                max={120}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>40 BPM</span>
                <span>80 BPM (Normal)</span>
                <span>120 BPM</span>
              </div>
            </div>

            {/* Pulse Rhythm */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground block">Pulse Rhythm</label>
              <Select value={rhythm} onValueChange={setRhythm}>
                <SelectTrigger className="bg-white border border-border">
                  <SelectValue placeholder="Select pulse rhythm..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular - Steady and consistent</SelectItem>
                  <SelectItem value="irregular">Irregular - Variable beats</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pulse Strength */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground block">Pulse Strength</label>
              <Select value={strength} onValueChange={setStrength}>
                <SelectTrigger className="bg-white border border-border">
                  <SelectValue placeholder="Select pulse strength..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weak">Weak - Light and delicate</SelectItem>
                  <SelectItem value="normal">Normal - Moderate and balanced</SelectItem>
                  <SelectItem value="strong">Strong - Forceful and prominent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Body Temperature Feeling */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground block">Body Temperature Feeling</label>
              <Select value={temperature} onValueChange={setTemperature}>
                <SelectTrigger className="bg-white border border-border">
                  <SelectValue placeholder="Select body temperature..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cool">Cool - Feeling cold or chilly</SelectItem>
                  <SelectItem value="normal">Normal - Neutral temperature</SelectItem>
                  <SelectItem value="warm">Warm - Feeling hot or feverish</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stress Level */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground block">Stress Level</label>
              <Select value={stressLevel} onValueChange={setStressLevel}>
                <SelectTrigger className="bg-white border border-border">
                  <SelectValue placeholder="Select stress level..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Calm and relaxed</SelectItem>
                  <SelectItem value="medium">Medium - Moderate stress</SelectItem>
                  <SelectItem value="high">High - Significant stress or anxiety</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Button
                onClick={handleAnalyze}
                disabled={!isFormValid}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11"
              >
                Analyze Pulse
              </Button>
              <Link href="/" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-border hover:bg-muted bg-transparent"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-8 bg-white/40 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground">About These Measurements</h3>
          <div className="grid gap-4 text-sm">
            <div className="flex gap-3">
              <span className="text-2xl">♡</span>
              <div>
                <p className="font-medium text-foreground">Pulse Rate</p>
                <p className="text-muted-foreground">Your heart rate measurement in beats per minute</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">〜</span>
              <div>
                <p className="font-medium text-foreground">Pulse Rhythm</p>
                <p className="text-muted-foreground">Whether your pulse beats are regular or have variations</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">💪</span>
              <div>
                <p className="font-medium text-foreground">Pulse Strength</p>
                <p className="text-muted-foreground">The force and intensity of each pulse beat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
