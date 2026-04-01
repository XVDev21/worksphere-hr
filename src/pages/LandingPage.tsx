import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  Clock, 
  BarChart3, 
  ShieldCheck, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Sun,
  Moon
} from 'lucide-react';
import { Button, Input } from '../components/UI';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">W</div>
          <span className="text-xl font-bold text-foreground">WorkSphere <span className="text-primary">HR</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-muted">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4"
        >
          <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2">Features</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2">Pricing</a>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2">About</Link>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2">Contact</a>
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full">Login</Button>
            </Link>
            <Link to="/register" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          WorkSphere HR Beta: Preview Access
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Manage Your <span className="text-primary">Workforce</span> with Precision
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-lg">
          WorkSphere HR is back in Beta for preview access. Features are showcased for demonstration purposes and may not reflect full production capabilities.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/register">
            <Button size="lg" className="h-14 px-8 text-lg">Start Free Trial <ChevronRight className="ml-2" size={20} /></Button>
          </Link>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg">Watch Demo</Button>
        </div>
        <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-8 h-8 rounded-full border-2 border-background" alt="User" />
            ))}
          </div>
          <span>Joined by 10,000+ companies worldwide</span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
        <img 
          src="https://picsum.photos/seed/hr-dashboard/800/600" 
          className="relative rounded-2xl shadow-2xl border border-border z-10" 
          alt="Dashboard Preview" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-xl shadow-xl border border-border animate-bounce duration-[3000ms] z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs font-bold">Payroll Processed</p>
              <p className="text-[10px] text-muted-foreground">Successfully for 245 employees</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    { icon: <Users className="text-blue-500" />, title: "Employee Management", desc: "Centralized database for all employee records, documents, and history." },
    { icon: <CreditCard className="text-green-500" />, title: "Automated Payroll", desc: "Calculate salaries, taxes, and deductions automatically with one click." },
    { icon: <Calendar className="text-purple-500" />, title: "Leave Management", desc: "Streamlined leave requests and approvals with real-time balance tracking." },
    { icon: <Clock className="text-orange-500" />, title: "Attendance Tracking", desc: "Monitor work hours, shifts, and overtime with integrated timekeeping." },
    { icon: <BarChart3 className="text-pink-500" />, title: "Advanced Analytics", desc: "Gain deep insights into workforce trends, turnover, and performance." },
    { icon: <ShieldCheck className="text-teal-500" />, title: "Secure & Compliant", desc: "Enterprise-grade security and compliance with local labor laws." },
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Scale</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Powerful features designed to help HR teams focus on what matters most: people.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 bg-background border border-border rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    { name: "Basic", price: "49", desc: "Perfect for startups and small teams.", features: ["Up to 20 Employees", "Basic Payroll", "Attendance Tracking", "Email Support"] },
    { name: "Professional", price: "99", desc: "The ideal choice for growing businesses.", features: ["Up to 100 Employees", "Advanced Payroll", "Leave Management", "Performance Reviews", "Priority Support"], popular: true },
    { name: "Enterprise", price: "Custom", desc: "Tailored solutions for large organizations.", features: ["Unlimited Employees", "Custom Integrations", "Dedicated Account Manager", "Advanced Security", "24/7 Phone Support"] },
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground">Choose the plan that's right for your company's size and needs.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div key={i} className={`relative p-8 rounded-2xl border ${p.popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-border shadow-sm'} bg-background`}>
              {p.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</span>}
              <h3 className="text-xl font-bold mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{p.desc}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">{p.price === 'Custom' ? '' : '$'}{p.price}</span>
                {p.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="text-primary" size={18} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={p.popular ? 'primary' : 'outline'} className="w-full h-12">Get Started</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">Have questions about WorkSphere? Our team is here to help you find the perfect solution for your HR needs.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Email Us</p>
                  <p className="text-sm text-muted-foreground">support@worksphere.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Call Us</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Visit Us</p>
                  <p className="text-sm text-muted-foreground">123 Business Ave, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background p-8 rounded-2xl border border-border shadow-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Full Name" placeholder="John Doe" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <Input label="Email Address" type="email" placeholder="john@example.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="How can we help you?"
                    required
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full h-12">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">W</div>
            <span className="text-lg font-bold">WorkSphere <span className="text-primary">HR</span></span>
          </div>
          <p className="text-muted-foreground max-w-sm mb-6">Empowering organizations to build better workplaces through innovative HR technology and human-centric design.</p>
          <div className="flex gap-4">
            {['twitter', 'linkedin', 'github', 'facebook'].map(s => (
              <div key={s} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-colors">
                <span className="sr-only">{s}</span>
                <div className="w-4 h-4 bg-current opacity-50"></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>© 2026 WorkSphere HR. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <div className="bg-primary text-white text-center py-2 text-xs font-medium sticky top-0 z-[60]">
        WorkSphere HR is back in Beta for preview access. Features are showcased for demonstration purposes and may not reflect full production capabilities.
      </div>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
};
