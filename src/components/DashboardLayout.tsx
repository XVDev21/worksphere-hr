import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Calendar, 
  Clock, 
  Building2, 
  BarChart3, 
  BrainCircuit, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  Sun,
  Moon,
  ChevronDown,
  User as UserIcon,
  FileText,
  PieChart,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { Button, Input, Modal } from '../components/UI';
import { UserAccountModal } from './modals/UserAccountModal';
import { MyPerformanceModal } from './modals/MyPerformanceModal';
import { SecuritySettingsModal } from './modals/SecuritySettingsModal';

const MOCK_FILES = [
  { id: 'f1', name: 'Employee Handbook.pdf', type: 'file' },
  { id: 'f2', name: 'Payroll Q1 2026.xlsx', type: 'file' },
  { id: 'f3', name: 'Health Insurance Policy.pdf', type: 'file' },
  { id: 'f4', name: 'Performance Review Template.docx', type: 'file' },
  { id: 'f5', name: 'Onboarding Guide.pdf', type: 'file' },
  { id: 'f6', name: 'Company Culture Deck.pptx', type: 'file' },
];

const MOCK_REPORTS = [
  { id: 'r1', name: 'Annual Turnover Report 2025', type: 'report' },
  { id: 'r2', name: 'Diversity & Inclusion Audit', type: 'report' },
  { id: 'r3', name: 'Monthly Attendance Summary', type: 'report' },
  { id: 'r4', name: 'Budget Allocation Q2', type: 'report' },
  { id: 'r5', name: 'Employee Satisfaction Survey', type: 'report' },
  { id: 'r6', name: 'Recruitment Pipeline Analysis', type: 'report' },
];

const SidebarItem = ({ icon: Icon, label, path, active, onClick }: any) => (
  <Link 
    to={path} 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeModal, setActiveModal] = useState<'account' | 'performance' | 'security' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { employees } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Users, label: 'Employees', path: '/dashboard/employees' },
    { icon: Building2, label: 'Departments', path: '/dashboard/departments' },
    { icon: CreditCard, label: 'Payroll', path: '/dashboard/payroll' },
    { icon: Clock, label: 'Attendance', path: '/dashboard/attendance' },
    { icon: Calendar, label: 'Leave Requests', path: '/dashboard/leaves' },
    { icon: BarChart3, label: 'Reports', path: '/dashboard/reports' },
    { icon: BrainCircuit, label: 'AI Insights', path: '/dashboard/ai' },
  ];

  const filteredResults = searchQuery.trim() === '' ? [] : [
    ...employees
      .filter(emp => emp.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(emp => ({ id: emp.id, name: emp.name, type: 'employee', sub: emp.role })),
    ...MOCK_FILES
      .filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(file => ({ id: file.id, name: file.name, type: 'file', sub: 'PDF Document' })),
    ...MOCK_REPORTS
      .filter(report => report.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(report => ({ id: report.id, name: report.name, type: 'report', sub: 'System Report' })),
  ].slice(0, 8);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Beta Banner */}
      <div className="bg-primary text-white text-center py-2 text-[10px] md:text-xs font-medium shrink-0 z-[60]">
        WorkSphere HR Beta: Preview Access. Features are showcased for demonstration purposes and may not reflect full production capabilities.
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-card border-r border-border z-50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="h-full flex flex-col p-6 overflow-hidden">
            <div className="flex items-center gap-3 mb-10 px-2 shrink-0">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">W</div>
              <span className="text-xl font-bold">WorkSphere <span className="text-primary">HR</span></span>
            </div>

            <nav className="flex-1 space-y-2">
              {menuItems.map((item) => (
                <SidebarItem 
                  key={item.path}
                  {...item}
                  active={location.pathname === item.path}
                  onClick={() => setIsSidebarOpen(false)}
                />
              ))}
            </nav>

            <div className="pt-6 border-t border-border mt-6 shrink-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold px-4 mb-4">Support</p>
              <SidebarItem icon={Bell} label="Help Center" path="#" active={false} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-20 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-30">
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-muted"
              >
                <Menu size={24} />
              </button>
              <div className="hidden md:flex items-center relative w-full max-w-md" ref={searchRef}>
                <Search className="absolute left-3 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search employees, files, reports..." 
                  className="pl-10 h-10 bg-muted/50 border-none focus-visible:ring-1" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                />
                
                <AnimatePresence>
                  {isSearchFocused && filteredResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-2">
                        {filteredResults.map((result) => (
                          <button
                            key={`${result.type}-${result.id}`}
                            className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors text-left"
                            onClick={() => {
                              setIsSearchFocused(false);
                              setSearchQuery('');
                              if (result.type === 'employee') navigate('/dashboard/employees');
                              if (result.type === 'report') navigate('/dashboard/reports');
                            }}
                          >
                            <div className={`p-2 rounded-lg ${
                              result.type === 'employee' ? 'bg-blue-500/10 text-blue-500' :
                              result.type === 'file' ? 'bg-orange-500/10 text-orange-500' :
                              'bg-purple-500/10 text-purple-500'
                            }`}>
                              {result.type === 'employee' ? <Users size={16} /> :
                               result.type === 'file' ? <FileText size={16} /> :
                               <PieChart size={16} />}
                            </div>
                            <div>
                              <p className="text-sm font-bold">{result.name}</p>
                              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{result.sub}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
                </button>
              </div>
              <div className="h-8 w-px bg-border mx-2"></div>
              
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted p-1 rounded-lg transition-colors"
                >
                  <img src={user?.avatar} className="w-8 h-8 rounded-full border border-border" alt="Avatar" />
                  <div className="hidden sm:block text-left mr-1">
                    <p className="text-xs font-bold leading-none">{user?.name}</p>
                    <p className="text-[10px] text-muted-foreground leading-none mt-1 capitalize">{user?.role}</p>
                  </div>
                  <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-2 border-b border-border bg-muted/30">
                        <div className="flex items-center gap-3 p-2">
                          <img src={user?.avatar} className="w-10 h-10 rounded-full border border-border" alt="Avatar" />
                          <div className="min-w-0">
                            <p className="text-sm font-bold truncate">{user?.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={() => { setIsUserDropdownOpen(false); setActiveModal('account'); }}
                          className="w-full flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors text-sm font-medium"
                        >
                          <UserIcon size={18} className="text-muted-foreground" />
                          User Account
                        </button>
                        <button 
                          onClick={() => { setIsUserDropdownOpen(false); setActiveModal('performance'); }}
                          className="w-full flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors text-sm font-medium"
                        >
                          <BarChart3 size={18} className="text-muted-foreground" />
                          My Performance
                        </button>
                        <button 
                          onClick={() => { setIsUserDropdownOpen(false); setActiveModal('security'); }}
                          className="w-full flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors text-sm font-medium"
                        >
                          <Shield size={18} className="text-muted-foreground" />
                          Security Settings
                        </button>
                      </div>
                      <div className="h-px bg-border mx-2"></div>
                      <div className="p-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors text-sm font-medium"
                        >
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'account'} 
        onClose={() => setActiveModal(null)} 
        title="User Account"
      >
        <UserAccountModal onClose={() => setActiveModal(null)} />
      </Modal>

      <Modal 
        isOpen={activeModal === 'performance'} 
        onClose={() => setActiveModal(null)} 
        title="My Performance"
      >
        <MyPerformanceModal />
      </Modal>

      <Modal 
        isOpen={activeModal === 'security'} 
        onClose={() => setActiveModal(null)} 
        title="Security Settings"
      >
        <SecuritySettingsModal />
      </Modal>
    </div>
  );
};
