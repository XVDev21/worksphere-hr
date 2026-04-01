import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Input, Card, Modal } from '../components/UI';
import { LeaveRequest } from '../types';

export const LeaveManagement = () => {
  const { leaves, addLeave, updateLeave } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Omit<LeaveRequest, 'id'>>({
    employeeId: '',
    employeeName: '',
    type: 'Annual',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
    reason: ''
  });

  const filteredLeaves = leaves.filter(l => 
    l.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLeave(formData);
    setIsModalOpen(false);
  };

  const handleStatusChange = (leave: LeaveRequest, status: 'Approved' | 'Rejected') => {
    updateLeave({ ...leave, status });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-500/10 text-green-500';
      case 'Rejected': return 'bg-destructive/10 text-destructive';
      case 'Pending': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">Review and manage employee time-off requests.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="h-12 px-6">
          <Plus size={20} className="mr-2" /> Request Leave
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Requests', value: leaves.filter(l => l.status === 'Pending').length, icon: Clock, color: 'orange' },
          { label: 'Approved Today', value: leaves.filter(l => l.status === 'Approved').length, icon: CheckCircle2, color: 'green' },
          { label: 'On Leave Now', value: 8, icon: User, color: 'blue' },
          { label: 'Leave Balance', value: 'Avg 18d', icon: Calendar, color: 'purple' },
        ].map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500 flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden border-border">
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
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Duration</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Reason</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeaves.map((l) => (
                <tr key={l.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${l.employeeName}`} className="w-8 h-8 rounded-full border border-border" alt={l.employeeName} />
                      <span className="font-bold text-sm">{l.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium">{l.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-medium">{new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.ceil((new Date(l.endDate).getTime() - new Date(l.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">{l.reason}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(l.status)}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {l.status === 'Pending' ? (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-green-500 hover:bg-green-500/10" onClick={() => handleStatusChange(l, 'Approved')}>
                          <CheckCircle2 size={16} />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => handleStatusChange(l, 'Rejected')}>
                          <XCircle size={16} />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm">
                        <FileText size={16} />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Request Leave"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Employee Name" 
            required 
            value={formData.employeeName} 
            onChange={e => setFormData({...formData, employeeName: e.target.value})} 
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Leave Type</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as any})}
              >
                <option value="Annual">Annual</option>
                <option value="Sick">Sick</option>
                <option value="Maternity">Maternity</option>
                <option value="Paternity">Paternity</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Start Date" 
              type="date" 
              required 
              value={formData.startDate} 
              onChange={e => setFormData({...formData, startDate: e.target.value})} 
            />
            <Input 
              label="End Date" 
              type="date" 
              required 
              value={formData.endDate} 
              onChange={e => setFormData({...formData, endDate: e.target.value})} 
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Reason</label>
            <textarea 
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Provide a reason for your leave request..."
              required
              value={formData.reason}
              onChange={e => setFormData({...formData, reason: e.target.value})}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
