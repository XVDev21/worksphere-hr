import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Plus, 
  Search, 
  Users, 
  User, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Input, Card, Modal } from '../components/UI';
import { Department } from '../types';

export const DepartmentManagement = () => {
  const { departments, addDepartment, updateDepartment, deleteDepartment } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Omit<Department, 'id'>>({
    name: '',
    head: '',
    employeeCount: 0
  });

  const handleOpenModal = (dept?: Department) => {
    if (dept) {
      setEditingDept(dept);
      setFormData({ ...dept });
    } else {
      setEditingDept(null);
      setFormData({ name: '', head: '', employeeCount: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDept) {
      updateDepartment({ ...formData, id: editingDept.id });
    } else {
      addDepartment(formData);
    }
    setIsModalOpen(false);
  };

  const filteredDepts = departments.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Department Management</h1>
          <p className="text-muted-foreground">Organize your company structure and assign leadership.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="h-12 px-6">
          <Plus size={20} className="mr-2" /> Create Department
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search by department or head..." 
            className="pl-10 bg-muted/50 border-none" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-muted-foreground">
            Total Departments: <span className="text-foreground font-bold">{departments.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map((dept) => (
          <motion.div
            key={dept.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border group-hover:border-primary/50">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Building2 size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenModal(dept)} className="p-2 rounded-md hover:bg-muted text-primary transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => deleteDepartment(dept.id)} className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1">{dept.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <User size={14} />
                <span>Head: <span className="text-foreground font-medium">{dept.head}</span></span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">
                    <Users size={12} /> Employees
                  </div>
                  <p className="text-xl font-bold">{dept.employeeCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">
                    <BarChart3 size={12} /> Budget
                  </div>
                  <p className="text-xl font-bold">92%</p>
                </div>
              </div>

              <Button variant="ghost" className="w-full justify-between group/btn">
                View Details <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingDept ? 'Edit Department' : 'Create Department'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Department Name" 
            placeholder="e.g. Engineering" 
            required 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          <Input 
            label="Department Head" 
            placeholder="e.g. John Doe" 
            required 
            value={formData.head} 
            onChange={e => setFormData({...formData, head: e.target.value})} 
          />
          <Input 
            label="Initial Employee Count" 
            type="number" 
            required 
            value={formData.employeeCount} 
            onChange={e => setFormData({...formData, employeeCount: parseInt(e.target.value)})} 
          />
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1">{editingDept ? 'Update' : 'Create'} Department</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
