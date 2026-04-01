import React from 'react';
import { motion } from 'motion/react';
import { 
  BrainCircuit, 
  Sparkles, 
  Search, 
  TrendingUp, 
  UserMinus, 
  AlertTriangle,
  Lock,
  Info
} from 'lucide-react';
import { Card, Button } from '../components/UI';

const FeatureCard = ({ title, desc, icon: Icon, disabled = true }: any) => (
  <Card className={`relative p-8 overflow-hidden group border-border ${disabled ? 'opacity-60 grayscale' : ''}`}>
    <div className="flex items-start justify-between mb-6">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon size={32} />
      </div>
      {disabled && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold uppercase tracking-widest">
          <Lock size={12} /> Disabled
        </div>
      )}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-8">{desc}</p>
    <Button variant="outline" className="w-full cursor-not-allowed" disabled={disabled}>
      Launch Feature
    </Button>
    {disabled && (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-card border border-border p-4 rounded-lg shadow-xl max-w-[200px] text-center">
          <Info size={24} className="mx-auto mb-2 text-primary" />
          <p className="text-xs font-bold">AI features are currently disabled in this preview environment</p>
        </div>
      </div>
    )}
  </Card>
);

export const AIFeatures = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">AI Insights & Intelligence</h1>
            <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={12} /> Enterprise AI
            </div>
          </div>
          <p className="text-muted-foreground">Leverage advanced machine learning to optimize your workforce management.</p>
        </div>
      </div>

      <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-2xl flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
          <AlertTriangle size={24} />
        </div>
        <div>
          <h3 className="font-bold text-destructive">AI Features Disabled</h3>
          <p className="text-sm text-destructive/80 mt-1">
            To ensure data privacy and security in this preview environment, all AI-powered interactions have been temporarily disabled. 
            In a production environment, these features provide real-time predictive analytics and automated decision support.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          title="Smart Resume Screening" 
          desc="Automatically rank and filter candidates based on job requirements and historical hiring success patterns." 
          icon={Search} 
        />
        <FeatureCard 
          title="Performance Insights" 
          desc="Analyze employee productivity and engagement to identify high-performers and areas for development." 
          icon={TrendingUp} 
        />
        <FeatureCard 
          title="Predictive Attrition Analysis" 
          desc="Identify employees at risk of leaving before they do, with actionable retention recommendations." 
          icon={UserMinus} 
        />
        <FeatureCard 
          title="Salary Benchmarking" 
          desc="Compare your compensation packages against industry standards using real-time market data." 
          icon={BrainCircuit} 
        />
        <FeatureCard 
          title="Cultural Sentiment Analysis" 
          desc="Monitor organizational health through automated analysis of feedback and communication patterns." 
          icon={Sparkles} 
        />
      </div>

      <Card className="p-10 text-center border-dashed border-2 border-border bg-muted/30">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <BrainCircuit size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Ready for the Future of HR?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          WorkSphere AI is designed to transform how you manage people. From predictive hiring to automated payroll compliance, our AI engine is built for the modern enterprise.
        </p>
        <Button size="lg" className="h-14 px-10 cursor-not-allowed" disabled>
          Contact Sales for AI Access
        </Button>
      </Card>
    </div>
  );
};
