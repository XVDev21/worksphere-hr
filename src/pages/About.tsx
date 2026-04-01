import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  Eye, 
  History, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  Award,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const About = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Beta Banner */}
      <div className="bg-primary text-white text-center py-2 text-xs font-medium sticky top-0 z-[60]">
        WorkSphere HR is back in Beta for preview access. Features are showcased for demonstration purposes and may not reflect full production capabilities.
      </div>

      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-8 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">W</div>
            <span className="text-lg font-bold">WorkSphere <span className="text-primary">HR</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={16} /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Our Journey & <span className="text-primary">Vision</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            WorkSphere HR was born out of a simple idea: that managing people should be as intuitive as talking to them. After a period of refinement, we're back in Beta to showcase the future of workforce management.
          </p>
        </motion.div>
      </section>

      {/* History Context */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
                <History size={14} /> Reintroduced in Beta
              </div>
              <h2 className="text-3xl font-bold mb-6">A Legacy Reimagined</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                WorkSphere HR originally launched as a comprehensive solution for mid-sized enterprises. Over the years, we've gathered invaluable feedback from HR professionals worldwide.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Today, we are reinstating the platform in Beta mode. This showcase version highlights our core architecture and new AI-driven modules, serving as a preview for the next generation of HR technology.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-primary">
                <span>2022: Initial Launch</span>
                <ChevronRight size={16} />
                <span>2024: Refinement Phase</span>
                <ChevronRight size={16} />
                <span>2026: Beta Showcase</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video bg-primary/5 rounded-2xl border border-border flex items-center justify-center overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/history/800/450" 
                  alt="WorkSphere History" 
                  className="object-cover w-full h-full opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm font-bold italic">"Building the foundation for the modern workplace since day one."</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 bg-background border border-border rounded-3xl shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-8">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower organizations by providing seamless, automated, and human-centric HR tools that eliminate administrative friction and allow teams to focus on growth and culture.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-10 bg-background border border-border rounded-3xl shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-8">
                <Eye size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the global standard for workforce management, where AI and human intelligence collaborate to create more engaging, productive, and equitable work environments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Platform Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our Beta showcase highlights the fundamental pillars of the WorkSphere ecosystem.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users size={20} />, title: "Unified Directory", desc: "One source of truth for all employee data." },
              { icon: <Zap size={20} />, title: "Instant Payroll", desc: "Automated calculations with zero margin for error." },
              { icon: <Shield size={20} />, title: "Compliance Guard", desc: "Stay ahead of local labor regulations automatically." },
              { icon: <Globe size={20} />, title: "Global Ready", desc: "Multi-currency and multi-region support built-in." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-background border border-border rounded-2xl">
                <div className="text-primary mb-4">{item.icon}</div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Minds Behind WorkSphere</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A diverse team of engineers, designers, and HR experts dedicated to redefining the workplace.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Alex Rivera", role: "Founder & CEO", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
              { name: "Sarah Chen", role: "CTO", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
              { name: "Marcus Thorne", role: "Head of Product", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
              { name: "Elena Vance", role: "Design Director", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" }
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold">{member.name}</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Experience the Future Today</h2>
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
              Join the Beta program and help us shape the next generation of WorkSphere HR. Your feedback is our most valuable asset.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-lg">Get Beta Access</Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-10 text-lg">Login to Preview</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white font-bold text-xs">W</div>
            <span className="font-bold text-foreground">WorkSphere HR <span className="text-primary">Beta</span></span>
          </div>
          <p>© 2026 WorkSphere HR. Showcase Version.</p>
        </div>
      </footer>
    </div>
  );
};
