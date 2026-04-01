export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'employee';
  avatar?: string;
  phone?: string;
  department?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
  email: string;
  joinDate: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: 'Paid' | 'Pending';
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Annual' | 'Sick' | 'Maternity' | 'Paternity' | 'Unpaid';
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}
