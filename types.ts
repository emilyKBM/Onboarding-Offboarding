
export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  NA = 'NA',
}

export interface TaskItem {
  id: string;
  label: string; // e.g., "Purchase Date", "Wifi Password"
  value: string; // The input value
  notes: string;
  status: TaskStatus;
  type: 'text' | 'date' | 'boolean' | 'currency';
  assignee?: string; // e.g., "Mei", "Kevin"
  isSensitive?: boolean; // If true, requires Admin role to view
}

export type Department = 'Sales' | 'Accounting' | 'Ops' | 'OwnerExperience' | 'Marketing' | 'Tech';

export interface Section {
  id: string;
  title: string;
  department?: Department;
  tasks: TaskItem[];
}

export type UnitLocation = 'Maui' | 'Oahu' | 'Big Island' | 'Park City';
export type TransferType = 'Transfer' | 'Purchase' | 'Purchase/Transfer' | 'Out';

export interface TransitionDetails {
  salesRep: string;
  transferType: TransferType;
  effectiveDate: string;
  priorPM: string;
  inspectionStatus: string;
  contingencies: string;
  notes: string;
}

export interface OnboardingUnit {
  id: string;
  unitCode: string; // e.g., NAP-C32
  ownerName: string;
  location: UnitLocation;
  status: 'New' | 'Processing' | 'Live' | 'Stalled' | 'For Sale';
  progress: number; // 0-100
  sections: Section[];
  transitionDetails?: TransitionDetails; // Optional specific data for the spreadsheet view
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface StaffContact {
  name: string;
  position: string;
  email: string;
  department: Department;
  location?: string;
}

export type UserRole = 'Admin' | 'Staff';

export interface User {
  name: string;
  role: UserRole;
  avatarInitials: string;
}
