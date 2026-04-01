import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Input, Card, Modal } from '../components/UI';
import { AttendanceRecord } from '../types';

export const AttendanceManagement = () => {
  const { attendance, addAttendance } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [formData, setFormData] = useState<Omit<AttendanceRecord, 'id'>>({
    employeeId: '',
    employeeName: '',
    date: new Date().toISOString().split('T')[0],
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    status: 'Present'
  });

  const filteredAttendance = attendance.filter(a => 
    a.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAttendance(formData);
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-500/10 text-green-500';
      case 'Absent': return 'bg-destructive/10 text-destructive';
      case 'Late': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle2 size={16} />;
      case 'Absent': return <XCircle size={16} />;
      case 'Late': return <AlertCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
          <p className="text-muted-foreground">Monitor daily check-ins, check-outs, and punctuality.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="h-12 px-6">
          <Plus size={20} className="mr-2" /> Log Attendance
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-0 overflow-hidden border-border">
          <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search by employee name..." 
                className="pl-10 bg-muted/50 border-none" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Filter size={16} className="mr-2" /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Employee</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Check In</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Check Out</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAttendance.map((a) => (
                  <tr key={a.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${a.employeeName}`} className="w-8 h-8 rounded-full border border-border" alt={a.employeeName} />
                        <span className="font-bold text-sm">{a.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{new Date(a.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium">{a.checkIn}</td>
                    <td className="px-6 py-4 text-sm font-medium">{a.checkOut}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(a.status)}`}>
                        {getStatusIcon(a.status)}
                        {a.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Attendance Calendar</h3>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded-md hover:bg-muted"><ChevronLeft size={18} /></button>
                <button className="p-1 rounded-md hover:bg-muted"><ChevronRight size={18} /></button>
              </div>
            </div>
            <div className="text-center mb-4">
              <p className="text-sm font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-muted-foreground uppercase mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className={`h-8 flex items-center justify-center rounded-md text-xs cursor-pointer hover:bg-primary hover:text-white transition-colors ${i + 1 === 25 ? 'bg-primary text-white font-bold' : 'bg-muted/50'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-medium">Present</span>
                </div>
                <span className="font-bold">142</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <AlertCircle size={16} />
                  </div>
                  <span className="text-sm font-medium">Late</span>
                </div>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                    <XCircle size={16} />
                  </div>
                  <span className="text-sm font-medium">Absent</span>
                </div>
                <span className="font-bold">8</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Log Attendance"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Employee Name" 
            required 
            value={formData.employeeName} 
            onChange={e => setFormData({...formData, employeeName: e.target.value})} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Date" 
              type="date" 
              required 
              value={formData.date} 
              onChange={e => setFormData({...formData, date: e.target.value})} 
            />
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Check In" 
              placeholder="09:00 AM" 
              required 
              value={formData.checkIn} 
              onChange={e => setFormData({...formData, checkIn: e.target.value})} 
            />
            <Input 
              label="Check Out" 
              placeholder="06:00 PM" 
              required 
              value={formData.checkOut} 
              onChange={e => setFormData({...formData, checkOut: e.target.value})} 
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1">Log Attendance</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
