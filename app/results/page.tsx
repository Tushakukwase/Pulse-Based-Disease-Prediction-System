'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { ChevronLeft, Download, AlertCircle } from 'lucide-react';

interface AnalysisResult {
  dosha: 'Vata' | 'Pitta' | 'Kapha';
  doshaPercentage: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  healthTendencies: string[];
  suggestions: string[];
  explanation: string;
}

function analyzePulse(
  pulseRate: number,
  rhythm: string,
  strength: string,
  temperature: string,
  stressLevel: string
): AnalysisResult {
  let doshaScores = {
    Vata: 0,
    Pitta: 0,
    Kapha: 0,
  };

  // Pulse Rate analysis
  if (pulseRate < 60) {
    doshaScores.Kapha += 30;
    doshaScores.Vata -= 10;
  } else if (pulseRate > 90) {
    doshaScores.Pitta += 35;
  } else {
    doshaScores.Vata += 20;
    doshaScores.Pitta += 10;
    doshaScores.Kapha += 10;
  }

  // Rhythm analysis
  if (rhythm === 'irregular') {
    doshaScores.Vata += 40;
  } else {
    doshaScores.Kapha += 20;
    doshaScores.Pitta += 10;
  }

  // Strength analysis
  if (strength === 'weak') {
    doshaScores.Kapha += 25;
    doshaScores.Vata += 20;
  } else if (strength === 'strong') {
    doshaScores.Pitta += 35;
  } else {
    doshaScores.Vata += 15;
    doshaScores.Pitta += 15;
    doshaScores.Kapha += 15;
  }

  // Temperature analysis
  if (temperature === 'cool') {
    doshaScores.Kapha += 25;
    doshaScores.Vata += 15;
  } else if (temperature === 'warm') {
    doshaScores.Pitta += 40;
  } else {
    doshaScores.Vata += 20;
    doshaScores.Pitta += 10;
  }

  // Stress level analysis
  if (stressLevel === 'high') {
    doshaScores.Pitta += 20;
    doshaScores.Vata += 20;
  } else if (stressLevel === 'low') {
    doshaScores.Kapha += 15;
  } else {
    doshaScores.Vata += 10;
  }

  // Normalize scores
  const total = Math.abs(doshaScores.Vata) + Math.abs(doshaScores.Pitta) + Math.abs(doshaScores.Kapha);
  const normalized = {
    Vata: Math.max(0, (doshaScores.Vata / total) * 100),
    Pitta: Math.max(0, (doshaScores.Pitta / total) * 100),
    Kapha: Math.max(0, (doshaScores.Kapha / total) * 100),
  };

  // Determine dominant dosha
  const dominantDosha = Object.entries(normalized).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0] as 'Vata' | 'Pitta' | 'Kapha';

  const doshaPercentage = Math.round(normalized[dominantDosha]);

  // Determine risk level
  const riskFactors =
    (stressLevel === 'high' ? 1 : 0) +
    (pulseRate > 100 || pulseRate < 50 ? 1 : 0) +
    (rhythm === 'irregular' ? 1 : 0) +
    (temperature === 'warm' ? 1 : 0);

  const riskLevel = riskFactors >= 3 ? 'High' : riskFactors === 2 ? 'Medium' : 'Low';

  // Get health tendencies and suggestions based on dosha
  let healthTendencies: string[] = [];
  let suggestions: string[] = [];
  let explanation: string = '';

  if (dominantDosha === 'Vata') {
    healthTendencies = ['Anxiety and nervousness', 'Sleep disturbances', 'Dry skin', 'Joint stiffness', 'Irregular digestion'];
    suggestions = [
      'Establish regular routines for meals and sleep',
      'Practice grounding exercises like yoga',
      'Stay warm in cool weather',
      'Include warming, nourishing foods',
      'Practice meditation and deep breathing',
    ];
    explanation =
      'Your pulse suggests a Vata-dominant constitution. Vata is associated with movement, creativity, and nervous system activity. Balance is achieved through routine, warmth, and grounding practices.';
  } else if (dominantDosha === 'Pitta') {
    healthTendencies = ['Inflammation', 'Heat-related issues', 'Excessive appetite', 'Irritability', 'Acid reflux'];
    suggestions = [
      'Avoid excessive heat and intense activities during hot hours',
      'Include cooling foods like coconut, cucumber, and melons',
      'Practice cooling breathing techniques',
      'Maintain emotional balance through stress management',
      'Stay hydrated with cool water',
    ];
    explanation =
      'Your pulse indicates a Pitta-dominant constitution. Pitta governs metabolism and digestion. Balance is achieved through cooling, calming practices and foods that pacify heat.';
  } else {
    healthTendencies = ['Sluggish digestion', 'Weight gain tendency', 'Congestion', 'Lethargy', 'Water retention'];
    suggestions = [
      'Engage in regular, stimulating exercise',
      'Eat lighter, warmer, and spicier foods',
      'Maintain an early morning routine',
      'Practice stimulating breathing exercises',
      'Stay active and socially engaged',
    ];
    explanation =
      'Your pulse suggests a Kapha-dominant constitution. Kapha provides structure and stability. Balance is achieved through stimulating, warming practices and lighter foods.';
  }

  return {
    dosha: dominantDosha,
    doshaPercentage,
    riskLevel: riskLevel as 'Low' | 'Medium' | 'High',
    healthTendencies,
    suggestions,
    explanation,
  };
}

export default function ResultsPage() {
  const searchParams = useSearchParams();

  const pulseRate = parseInt(searchParams.get('pulseRate') || '72');
  const rhythm = searchParams.get('rhythm') || '';
  const strength = searchParams.get('strength') || '';
  const temperature = searchParams.get('temperature') || '';
  const stressLevel = searchParams.get('stressLevel') || '';

  const result = analyzePulse(pulseRate, rhythm, strength, temperature, stressLevel);

  const doshaColors = {
    Vata: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: '🌬️' },
    Pitta: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: '🔥' },
    Kapha: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: '💧' },
  };

  const riskColors = {
    Low: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700' },
    Medium: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-700' },
    High: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-700' },
  };

  const doshaColor = doshaColors[result.dosha];
  const riskColor = riskColors[result.riskLevel];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-background py-8 px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link href="/pulse-input" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Pulse Input</span>
        </Link>

        {/* Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Your Pulse Analysis Results</h1>
          <p className="text-lg text-muted-foreground">Based on your physiological inputs</p>
        </div>

        {/* Medical Disclaimer */}
        <div className="mb-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-700 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-yellow-800 font-medium">Educational Purpose Only</p>
            <p className="text-xs text-yellow-700">
              These results are for educational exploration. Always consult qualified healthcare professionals for medical advice.
            </p>
          </div>
        </div>

        {/* Main Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Dominant Dosha Card */}
          <Card className={`border-2 ${doshaColor.border} ${doshaColor.bg}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-4xl">{doshaColor.icon}</span>
                <span>Dominant Dosha</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-5xl font-bold text-foreground">{result.dosha}</div>
                <p className="text-muted-foreground mt-1">Primary constitutional type detected</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Confidence Level</span>
                  <span className="text-sm font-bold text-foreground">{result.doshaPercentage}%</span>
                </div>
                <Progress value={result.doshaPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Health Risk Level Card */}
          <Card className={`border-2 ${riskColor.border} ${riskColor.bg}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-4xl">⚠️</span>
                <span>Health Risk Level</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className={`text-5xl font-bold ${riskColor.text}`}>{result.riskLevel}</div>
                <p className="text-muted-foreground mt-1">Based on your measurements</p>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Pulse Rate: {pulseRate} BPM</p>
                <p>• Rhythm: {rhythm.charAt(0).toUpperCase() + rhythm.slice(1)}</p>
                <p>• Stress Level: {stressLevel.charAt(0).toUpperCase() + stressLevel.slice(1)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Explanation Card */}
        <Card className="border border-border mb-8">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle>Your Dosha Profile</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-foreground leading-relaxed">{result.explanation}</p>
          </CardContent>
        </Card>

        {/* Health Tendencies */}
        <Card className="border border-border mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Possible Health Tendencies</CardTitle>
            <CardDescription>Common imbalances associated with this dosha</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.healthTendencies.map((tendency, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-muted/40 p-3 rounded-lg">
                  <span className="text-primary text-xl mt-0.5">→</span>
                  <span className="text-foreground text-sm">{tendency}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle Suggestions */}
        <Card className="border border-border mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Lifestyle Suggestions</CardTitle>
            <CardDescription>Ayurvedic-inspired wellness recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.suggestions.map((suggestion, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-border/50">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-foreground pt-1">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11"
          >
            <Link href="/pulse-input">Recheck Pulse</Link>
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-border hover:bg-muted h-11 bg-transparent"
            onClick={() => {
              const reportText = `
PULSE-BASED DISEASE PREDICTION SYSTEM - ANALYSIS REPORT

MEDICAL DISCLAIMER:
This is an educational prototype and NOT a medical diagnostic tool.
Always consult qualified healthcare professionals for medical advice.

ANALYSIS RESULTS:
- Dominant Dosha: ${result.dosha}
- Confidence Level: ${result.doshaPercentage}%
- Health Risk Level: ${result.riskLevel}

INPUT MEASUREMENTS:
- Pulse Rate: ${pulseRate} BPM
- Pulse Rhythm: ${rhythm.charAt(0).toUpperCase() + rhythm.slice(1)}
- Pulse Strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}
- Body Temperature: ${temperature.charAt(0).toUpperCase() + temperature.slice(1)}
- Stress Level: ${stressLevel.charAt(0).toUpperCase() + stressLevel.slice(1)}

DOSHA PROFILE:
${result.explanation}

POSSIBLE HEALTH TENDENCIES:
${result.healthTendencies.map((t) => `- ${t}`).join('\n')}

LIFESTYLE SUGGESTIONS:
${result.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Generated: ${new Date().toLocaleString()}
              `;

              const blob = new Blob([reportText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'pulse-analysis-report.txt';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-white/40 backdrop-blur-sm border border-border rounded-lg text-center text-xs text-muted-foreground">
          <p>
            This prototype was created for educational and research purposes. Use responsibly and always consult medical professionals for any health concerns.
          </p>
        </div>
      </div>
    </main>
  );
}
