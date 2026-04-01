import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Download, 
  Filter, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Card, Button } from '../components/UI';

export const ReportsAnalytics = () => {
  const performanceData = [
    { name: 'Engineering', score: 88, target: 85 },
    { name: 'HR', score: 92, target: 85 },
    { name: 'Product', score: 85, target: 85 },
    { name: 'Design', score: 90, target: 85 },
    { name: 'Marketing', score: 82, target: 85 },
  ];

  const growthData = [
    { month: 'Oct', count: 120 },
    { month: 'Nov', count: 135 },
    { month: 'Dec', count: 150 },
    { month: 'Jan', count: 165 },
    { month: 'Feb', count: 180 },
    { month: 'Mar', count: 200 },
  ];

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive data visualization and workforce insights.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter size={18} className="mr-2" /> Filter Data
          </Button>
          <Button>
            <Download size={18} className="mr-2" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Turnover Rate', value: '4.2%', trend: 'down', trendValue: '1.5', icon: TrendingUp, color: 'blue' },
          { label: 'Avg. Performance', value: '88.5', trend: 'up', trendValue: '2.3', icon: Activity, color: 'green' },
          { label: 'Hiring Velocity', value: '18 Days', trend: 'up', trendValue: '4', icon: Users, color: 'purple' },
          { label: 'Engagement Score', value: '92%', trend: 'up', trendValue: '0.8', icon: BarChart3, color: 'orange' },
        ].map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500 flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-destructive'}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.trendValue}%
              </div>
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6" title="Department Performance" description="Average performance scores vs quarterly targets.">
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                />
                <Bar dataKey="score" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6" title="Workforce Growth" description="Monthly employee count trends over time.">
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-1" title="Diversity Index" description="Gender and age distribution.">
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Male', value: 45 },
                    { name: 'Female', value: 50 },
                    { name: 'Other', value: 5 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Male</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Female</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-muted-foreground">Other</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2" title="Revenue per Employee" description="Organizational efficiency metric.">
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { q: 'Q1 2023', val: 125000 },
                { q: 'Q2 2023', val: 132000 },
                { q: 'Q3 2023', val: 145000 },
                { q: 'Q4 2023', val: 158000 },
                { q: 'Q1 2024', val: 172000 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="q" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                />
                <Bar dataKey="val" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
