import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Mail, 
  Calendar, 
  Building2, 
  UserCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Input, Card, Modal } from '../components/UI';
import { Employee } from '../types';

export const EmployeeManagement = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    name: '',
    role: '',
    department: '',
    salary: 0,
    status: 'Active',
    email: '',
    joinDate: new Date().toISOString().split('T')[0]
  });

  const handleOpenModal = (emp?: Employee) => {
    if (emp) {
      setEditingEmployee(emp);
      setFormData({ ...emp });
    } else {
      setEditingEmployee(null);
      setFormData({
        name: '',
        role: '',
        department: '',
        salary: 0,
        status: 'Active',
        email: '',
        joinDate: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      updateEmployee({ ...formData, id: editingEmployee.id });
    } else {
      addEmployee(formData);
    }
    setIsModalOpen(false);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
          <p className="text-muted-foreground">View, add, and manage your organization's workforce.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="h-12 px-6">
          <Plus size={20} className="mr-2" /> Add New Employee
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-10 bg-muted/50 border-none" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter size={18} /> Filter by:
          </div>
          <select 
            className="bg-muted/50 border-none rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
            value={filterDept}
            onChange={e => setFilterDept(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp) => (
          <motion.div
            key={emp.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group"
          >
            <Card className="p-0 overflow-hidden hover:shadow-lg transition-all duration-300 border-border group-hover:border-primary/50">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.name}`} 
                      className="w-14 h-14 rounded-full border-2 border-primary/10 bg-muted" 
                      alt={emp.name} 
                    />
                    <div>
                      <h3 className="font-bold text-lg">{emp.name}</h3>
                      <p className="text-sm text-muted-foreground">{emp.role}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    emp.status === 'Active' ? 'bg-green-500/10 text-green-500' : 
                    emp.status === 'On Leave' ? 'bg-orange-500/10 text-orange-500' : 
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {emp.status}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Building2 size={16} className="text-primary" />
                    <span>{emp.department}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail size={16} className="text-primary" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar size={16} className="text-primary" />
                    <span>Joined {new Date(emp.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm">
                    <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Salary</p>
                    <p className="font-bold">${emp.salary.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenModal(emp)}
                      className="p-2 rounded-md hover:bg-muted text-primary transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => deleteEmployee(emp.id)}
                      className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <Users size={40} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No employees found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Full Name" 
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
            <Input 
              label="Email Address" 
              type="email" 
              required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Role" 
              required 
              value={formData.role} 
              onChange={e => setFormData({...formData, role: e.target.value})} 
            />
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Department</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.department}
                onChange={e => setFormData({...formData, department: e.target.value})}
                required
              >
                <option value="">Select Dept</option>
                <option value="Engineering">Engineering</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Salary (Annual)" 
              type="number" 
              required 
              value={formData.salary} 
              onChange={e => setFormData({...formData, salary: parseInt(e.target.value)})} 
            />
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>
          </div>
          <Input 
            label="Join Date" 
            type="date" 
            required 
            value={formData.joinDate} 
            onChange={e => setFormData({...formData, joinDate: e.target.value})} 
          />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1">{editingEmployee ? 'Update' : 'Add'} Employee</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
