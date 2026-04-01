import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
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
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-${color}-500/20`} style={{ backgroundColor: color }}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-500' : 'text-destructive'}`}>
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trendValue}%
        </div>
      )}
    </div>
    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
    <p className="text-3xl font-bold mt-1 tracking-tight">{value}</p>
  </Card>
);

export const DashboardOverview = () => {
  const { employees, payroll, attendance } = useApp();

  const chartData = [
    { name: 'Jan', employees: 45, payroll: 120000 },
    { name: 'Feb', employees: 52, payroll: 135000 },
    { name: 'Mar', employees: 58, payroll: 148000 },
    { name: 'Apr', employees: 65, payroll: 162000 },
    { name: 'May', employees: 72, payroll: 175000 },
    { name: 'Jun', employees: 80, payroll: 190000 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 40 },
    { name: 'HR', value: 15 },
    { name: 'Product', value: 20 },
    { name: 'Design', value: 15 },
    { name: 'Marketing', value: 10 },
  ];

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Approved leave request for', target: 'Emily Davis', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'Added new employee', target: 'Sarah Wilson', time: '4 hours ago' },
    { id: 3, user: 'System', action: 'Payroll processed for', target: 'March 2024', time: '1 day ago' },
    { id: 4, user: 'Michael Brown', action: 'Updated department', target: 'Engineering', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your workforce today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-muted-foreground">Current Period</p>
            <p className="text-sm font-bold">March 2024</p>
          </div>
          <div className="h-8 w-px bg-border mx-2"></div>
          <Activity className="text-primary animate-pulse" size={24} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Employees" value={employees.length} icon={Users} trend="up" trendValue="12" color="#2563eb" />
        <StatCard title="Monthly Payroll" value={`$${(payroll.reduce((acc, curr) => acc + curr.netSalary, 0) / 1000).toFixed(1)}k`} icon={CreditCard} trend="up" trendValue="8" color="#10b981" />
        <StatCard title="Attendance Rate" value="94.2%" icon={Clock} trend="down" trendValue="2" color="#f59e0b" />
        <StatCard title="Pending Leaves" value="12" icon={Calendar} trend="up" trendValue="5" color="#8b5cf6" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6" title="Workforce Growth" description="Employee count and payroll trends over the last 6 months.">
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="employees" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="payroll" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6" title="Department Distribution" description="Employee allocation across departments.">
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {departmentData.map((dept, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                    <span className="text-muted-foreground">{dept.name}</span>
                  </div>
                  <span className="font-bold">{dept.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6" title="Recent Activities" description="Latest updates from across the organization.">
          <div className="mt-4 space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Activity size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-bold">{activity.user}</span> {activity.action} <span className="text-primary font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6" title="Quick Actions" description="Commonly used HR tasks.">
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[
              { label: 'Add Employee', icon: Users, color: 'blue' },
              { icon: Calendar, label: 'Manage Leaves', color: 'purple' },
              { icon: CreditCard, label: 'Run Payroll', color: 'green' },
              { icon: Clock, label: 'View Attendance', color: 'orange' },
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center justify-center p-6 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group">
                <div className={`w-12 h-12 rounded-full bg-${action.color}-500/10 text-${action.color}-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon size={24} />
                </div>
                <span className="text-sm font-bold">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
