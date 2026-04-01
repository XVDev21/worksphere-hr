import { Employee, Department, PayrollRecord, AttendanceRecord, LeaveRequest } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'John Doe', role: 'Software Engineer', department: 'Engineering', salary: 85000, status: 'Active', email: 'john.doe@worksphere.com', joinDate: '2023-01-15' },
  { id: '2', name: 'Jane Smith', role: 'HR Manager', department: 'Human Resources', salary: 75000, status: 'Active', email: 'jane.smith@worksphere.com', joinDate: '2022-05-20' },
  { id: '3', name: 'Michael Brown', role: 'Product Manager', department: 'Product', salary: 95000, status: 'Active', email: 'michael.brown@worksphere.com', joinDate: '2023-03-10' },
  { id: '4', name: 'Emily Davis', role: 'UI Designer', department: 'Design', salary: 70000, status: 'On Leave', email: 'emily.davis@worksphere.com', joinDate: '2023-06-01' },
  { id: '5', name: 'Robert Wilson', role: 'Backend Developer', department: 'Engineering', salary: 82000, status: 'Active', email: 'robert.wilson@worksphere.com', joinDate: '2022-11-12' },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Engineering', head: 'John Doe', employeeCount: 15 },
  { id: '2', name: 'Human Resources', head: 'Jane Smith', employeeCount: 5 },
  { id: '3', name: 'Product', head: 'Michael Brown', employeeCount: 8 },
  { id: '4', name: 'Design', head: 'Emily Davis', employeeCount: 6 },
  { id: '5', name: 'Marketing', head: 'Sarah Johnson', employeeCount: 10 },
];

export const MOCK_PAYROLL: PayrollRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'John Doe', month: 'March 2024', baseSalary: 85000, bonus: 5000, deductions: 2000, netSalary: 88000, status: 'Paid' },
  { id: '2', employeeId: '2', employeeName: 'Jane Smith', month: 'March 2024', baseSalary: 75000, bonus: 2000, deductions: 1500, netSalary: 75500, status: 'Paid' },
  { id: '3', employeeId: '3', employeeName: 'Michael Brown', month: 'March 2024', baseSalary: 95000, bonus: 0, deductions: 2500, netSalary: 92500, status: 'Pending' },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'John Doe', date: '2024-03-25', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present' },
  { id: '2', employeeId: '2', employeeName: 'Jane Smith', date: '2024-03-25', checkIn: '08:45 AM', checkOut: '05:45 PM', status: 'Present' },
  { id: '3', employeeId: '3', employeeName: 'Michael Brown', date: '2024-03-25', checkIn: '09:30 AM', checkOut: '06:30 PM', status: 'Late' },
];

export const MOCK_LEAVES: LeaveRequest[] = [
  { id: '1', employeeId: '4', employeeName: 'Emily Davis', type: 'Annual', startDate: '2024-04-01', endDate: '2024-04-10', status: 'Approved', reason: 'Family vacation' },
  { id: '2', employeeId: '1', employeeName: 'John Doe', type: 'Sick', startDate: '2024-03-20', endDate: '2024-03-21', status: 'Approved', reason: 'Flu' },
  { id: '3', employeeId: '5', employeeName: 'Robert Wilson', type: 'Annual', startDate: '2024-05-15', endDate: '2024-05-20', status: 'Pending', reason: 'Personal trip' },
];
