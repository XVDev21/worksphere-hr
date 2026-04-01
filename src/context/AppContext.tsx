import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, Department, PayrollRecord, AttendanceRecord, LeaveRequest } from '../types';
import { MOCK_EMPLOYEES, MOCK_DEPARTMENTS, MOCK_PAYROLL, MOCK_ATTENDANCE, MOCK_LEAVES } from '../mockData';

interface AppContextType {
  employees: Employee[];
  departments: Department[];
  payroll: PayrollRecord[];
  attendance: AttendanceRecord[];
  leaves: LeaveRequest[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  addDepartment: (dept: Omit<Department, 'id'>) => void;
  updateDepartment: (dept: Department) => void;
  deleteDepartment: (id: string) => void;
  addLeave: (leave: Omit<LeaveRequest, 'id'>) => void;
  updateLeave: (leave: LeaveRequest) => void;
  addAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  updatePayroll: (record: PayrollRecord) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [payroll, setPayroll] = useState<PayrollRecord[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem('ws_employees');
    const storedDepts = localStorage.getItem('ws_departments');
    const storedPayroll = localStorage.getItem('ws_payroll');
    const storedAttendance = localStorage.getItem('ws_attendance');
    const storedLeaves = localStorage.getItem('ws_leaves');

    setEmployees(storedEmployees ? JSON.parse(storedEmployees) : MOCK_EMPLOYEES);
    setDepartments(storedDepts ? JSON.parse(storedDepts) : MOCK_DEPARTMENTS);
    setPayroll(storedPayroll ? JSON.parse(storedPayroll) : MOCK_PAYROLL);
    setAttendance(storedAttendance ? JSON.parse(storedAttendance) : MOCK_ATTENDANCE);
    setLeaves(storedLeaves ? JSON.parse(storedLeaves) : MOCK_LEAVES);
  }, []);

  useEffect(() => {
    if (employees.length > 0) localStorage.setItem('ws_employees', JSON.stringify(employees));
    if (departments.length > 0) localStorage.setItem('ws_departments', JSON.stringify(departments));
    if (payroll.length > 0) localStorage.setItem('ws_payroll', JSON.stringify(payroll));
    if (attendance.length > 0) localStorage.setItem('ws_attendance', JSON.stringify(attendance));
    if (leaves.length > 0) localStorage.setItem('ws_leaves', JSON.stringify(leaves));
  }, [employees, departments, payroll, attendance, leaves]);

  const addEmployee = (emp: Omit<Employee, 'id'>) => {
    setEmployees([...employees, { ...emp, id: Date.now().toString() }]);
  };

  const updateEmployee = (emp: Employee) => {
    setEmployees(employees.map(e => e.id === emp.id ? emp : e));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const addDepartment = (dept: Omit<Department, 'id'>) => {
    setDepartments([...departments, { ...dept, id: Date.now().toString() }]);
  };

  const updateDepartment = (dept: Department) => {
    setDepartments(departments.map(d => d.id === dept.id ? dept : d));
  };

  const deleteDepartment = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  const addLeave = (leave: Omit<LeaveRequest, 'id'>) => {
    setLeaves([...leaves, { ...leave, id: Date.now().toString() }]);
  };

  const updateLeave = (leave: LeaveRequest) => {
    setLeaves(leaves.map(l => l.id === leave.id ? leave : l));
  };

  const addAttendance = (record: Omit<AttendanceRecord, 'id'>) => {
    setAttendance([...attendance, { ...record, id: Date.now().toString() }]);
  };

  const updatePayroll = (record: PayrollRecord) => {
    setPayroll(payroll.map(p => p.id === record.id ? record : p));
  };

  return (
    <AppContext.Provider value={{
      employees, departments, payroll, attendance, leaves,
      addEmployee, updateEmployee, deleteEmployee,
      addDepartment, updateDepartment, deleteDepartment,
      addLeave, updateLeave, addAttendance, updatePayroll
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
