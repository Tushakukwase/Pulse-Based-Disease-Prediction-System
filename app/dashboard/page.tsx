'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Link from 'next/link';
import { ChevronLeft, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const [selectedDosha, setSelectedDosha] = useState('Vata');
  const [pulseHistory, setPulseHistory] = useState([
    { time: '8:00 AM', rate: 68, dosha: 'Vata' },
    { time: '12:00 PM', rate: 75, dosha: 'Pitta' },
    { time: '4:00 PM', rate: 72, dosha: 'Vata' },
    { time: '8:00 PM', rate: 70, dosha: 'Vata' },
  ]);

  const [doshaDistribution, setDoshaDistribution] = useState([
    { name: 'Vata', value: 45, fill: '#60a5fa' },
    { name: 'Pitta', value: 30, fill: '#f87171' },
    { name: 'Kapha', value: 25, fill: '#34d399' },
  ]);

  const doshaInfo = {
    Vata: {
      icon: '🌬️',
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      description: 'Air and ether elements. Associated with movement, creativity, and nervous activity.',
      traits: ['Irregular pulse', 'Variable energy', 'Quick thinking', 'Sensitive nature'],
    },
    Pitta: {
      icon: '🔥',
      color: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      description: 'Fire and water elements. Governs metabolism, digestion, and transformation.',
      traits: ['Strong pulse', 'High energy', 'Sharp intellect', 'Assertive nature'],
    },
    Kapha: {
      icon: '💧',
      color: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      description: 'Water and earth elements. Provides structure, stability, and immunity.',
      traits: ['Heavy pulse', 'Steady energy', 'Calm nature', 'Strong immunity'],
    },
  };

  const currentDosha = doshaInfo[selectedDosha as keyof typeof doshaInfo];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-background py-8 px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Health Dashboard</h1>
          <p className="text-lg text-muted-foreground">Monitor your pulse trends and dosha balance</p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Latest Pulse Rate */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Current Pulse Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">72</div>
              <p className="text-sm text-muted-foreground mt-1">BPM • Normal range</p>
              <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>Stable</span>
              </div>
            </CardContent>
          </Card>

          {/* Dominant Dosha */}
          <Card className={`border-2 ${currentDosha.borderColor} ${currentDosha.color}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Dominant Dosha</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-5xl">{currentDosha.icon}</div>
                <div>
                  <div className="text-3xl font-bold">{selectedDosha}</div>
                  <p className="text-sm text-muted-foreground">Current constitution</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Status */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">Balanced</div>
              <p className="text-sm text-muted-foreground mt-1">Risk Level • Low</p>
              <div className="mt-4 w-full bg-muted rounded-full h-2 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pulse Rate Trend */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Pulse Rate Trend</CardTitle>
              <CardDescription>Throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pulseHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[60, 90]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rate" stroke="#7c3aed" strokeWidth={2} dot={{ fill: '#7c3aed', r: 5 }} name="BPM" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Dosha Distribution */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Dosha Distribution</CardTitle>
              <CardDescription>Constitutional balance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={doshaDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Dosha Details */}
        <Card className={`border-2 ${currentDosha.borderColor} ${currentDosha.color} mb-8`}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{currentDosha.icon}</span>
              <div>
                <CardTitle className="text-2xl">{selectedDosha} Profile</CardTitle>
                <CardDescription>{currentDosha.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentDosha.traits.map((trait, idx) => (
                <div key={idx} className="bg-white/50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-foreground">{trait}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dosha Selector */}
        <Card className="border border-border mb-8">
          <CardHeader>
            <CardTitle>Switch Dosha View</CardTitle>
            <CardDescription>Explore different constitutional types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              {Object.entries(doshaInfo).map(([dosha, info]) => (
                <Button
                  key={dosha}
                  onClick={() => setSelectedDosha(dosha)}
                  variant={selectedDosha === dosha ? 'default' : 'outline'}
                  className={`flex items-center gap-2 ${
                    selectedDosha === dosha
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <span className="text-2xl">{info.icon}</span>
                  <span>{dosha}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11">
            <Link href="/pulse-input">New Analysis</Link>
          </Button>
          <Button variant="outline" className="flex-1 border-border hover:bg-muted h-11 bg-transparent">
            Export Data
          </Button>
        </div>

        {/* Footer Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Daily Tracking',
              description: 'Monitor your pulse multiple times daily for better insights',
            },
            {
              title: 'Seasonal Changes',
              description: 'Doshas naturally shift with seasons and life circumstances',
            },
            {
              title: 'Holistic Health',
              description: 'Combine results with lifestyle, diet, and stress management',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/40 backdrop-blur-sm border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
