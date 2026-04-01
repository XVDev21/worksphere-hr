import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  FileText,
  Printer,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Input, Card, Modal } from '../components/UI';
import { PayrollRecord } from '../types';

export const PayrollSystem = () => {
  const { payroll, updatePayroll } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPayroll = payroll.filter(p => 
    p.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProcess = (record: PayrollRecord) => {
    updatePayroll({ ...record, status: 'Paid' });
  };

  const handleViewPayslip = (record: PayrollRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const totalPayroll = payroll.reduce((acc, curr) => acc + curr.netSalary, 0);
  const pendingCount = payroll.filter(p => p.status === 'Pending').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll System</h1>
          <p className="text-muted-foreground">Manage employee salaries, bonuses, and deductions.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={18} className="mr-2" /> Export CSV
          </Button>
          <Button>
            <DollarSign size={18} className="mr-2" /> Run Payroll
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-primary text-white border-none shadow-xl shadow-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-sm font-medium text-white/80">Total Monthly Payroll</p>
          <p className="text-3xl font-bold mt-1">${totalPayroll.toLocaleString()}</p>
        </Card>
        <Card className="p-6 bg-orange-500 text-white border-none shadow-xl shadow-orange-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Clock size={24} />
            </div>
          </div>
          <p className="text-sm font-medium text-white/80">Pending Payments</p>
          <p className="text-3xl font-bold mt-1">{pendingCount} Records</p>
        </Card>
        <Card className="p-6 bg-green-500 text-white border-none shadow-xl shadow-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <p className="text-sm font-medium text-white/80">Payment Status</p>
          <p className="text-3xl font-bold mt-1">98.5% Complete</p>
        </Card>
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
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Month</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Base Salary</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Bonus</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Deductions</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Net Salary</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPayroll.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.employeeName}`} className="w-8 h-8 rounded-full border border-border" alt={p.employeeName} />
                      <span className="font-bold text-sm">{p.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{p.month}</td>
                  <td className="px-6 py-4 text-sm font-medium">${p.baseSalary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-500">+${p.bonus.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-destructive">-${p.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">${p.netSalary.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {p.status === 'Pending' && (
                        <Button size="sm" onClick={() => handleProcess(p)}>Pay Now</Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleViewPayslip(p)}>
                        <FileText size={16} />
                      </Button>
                    </div>
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
        title="Employee Payslip"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-border pb-6">
              <div>
                <h3 className="text-2xl font-bold text-primary">WorkSphere HR</h3>
                <p className="text-sm text-muted-foreground">123 Business Ave, San Francisco, CA</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">PAYSLIP #{selectedRecord.id.padStart(6, '0')}</p>
                <p className="text-sm text-muted-foreground">Month: {selectedRecord.month}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 py-6 border-b border-border">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Employee Details</p>
                <p className="font-bold">{selectedRecord.employeeName}</p>
                <p className="text-sm text-muted-foreground">ID: EMP-{selectedRecord.employeeId.padStart(4, '0')}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Payment Status</p>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  selectedRecord.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                }`}>
                  {selectedRecord.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Basic Salary</span>
                <span className="font-medium">${selectedRecord.baseSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bonus & Incentives</span>
                <span className="font-medium text-green-500">+${selectedRecord.bonus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Deductions (Tax, Insurance)</span>
                <span className="font-medium text-destructive">-${selectedRecord.deductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-border">
                <span className="font-bold text-lg">Net Salary</span>
                <span className="font-bold text-lg text-primary">${selectedRecord.netSalary.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <Button variant="outline" className="flex-1">
                <Printer size={18} className="mr-2" /> Print
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 size={18} className="mr-2" /> Share
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
