
import { OnboardingUnit, TaskStatus, StaffContact } from './types';

export const LOCATIONS = ['Maui', 'Oahu', 'Big Island', 'Park City'];

// --- Staff Directory ---
export const STAFF_DIRECTORY: StaffContact[] = [
  { name: 'Violet Carlsberg', position: 'Head of Development', email: 'Violet@kbmresorts.com', department: 'Sales', location: 'Hawaii' },
  { name: 'Justin Brunold', position: 'Managing Partner', email: 'Justin@kbmresorts.com', department: 'Sales', location: 'Hawaii' },
  { name: 'Mei Chan', position: 'Senior Accountant', email: 'Mei@kbmresorts.com', department: 'Accounting', location: 'Hawaii' },
  { name: 'Lorry Vierra', position: 'Director of Accounting', email: 'Lorry@kbmresorts.com', department: 'Accounting' },
  { name: 'Kevin Norton', position: 'Director of Operations', email: 'Kevin@kbmresorts.com', department: 'Ops', location: 'Hawaii' },
  { name: 'Kyle Dempsey', position: 'Operations Manager', email: 'Kyle@kbmresorts.com', department: 'Ops', location: 'Hawaii' },
  { name: 'Rebecca Campbell', position: 'Operations Manager', email: 'Rebecca@kbmresorts.com', department: 'Ops', location: 'Park City' },
  { name: 'Janel Akana', position: 'Director of Homeowner Experience', email: 'Janel@kbmresorts.com', department: 'OwnerExperience', location: 'Hawaii' },
  { name: 'Jon Brunold', position: 'Guest Experience Ambassador', email: 'Jon@kbmresorts.com', department: 'OwnerExperience', location: 'Hawaii' },
  { name: 'Emily Butterfield', position: 'OTA & Revenue Manager', email: 'Emily@kbmresorts.com', department: 'Marketing' },
  { name: 'Marvin Lingon', position: 'OTA & Listing Specialist', email: 'marvin@kbmresorts.com', department: 'Marketing' },
  { name: 'Jerome Viasco', position: 'OTA & Listing Specialist', email: 'jerome@kbmresorts.com', department: 'Marketing' },
  { name: 'Brooke Cataquez', position: 'OTA & Listing Specialist', email: 'brooke@kbmresorts.com', department: 'Marketing' },
];

export const CONTACTS = {
  SALES: STAFF_DIRECTORY.filter(s => s.department === 'Sales'),
  ACCOUNTING: STAFF_DIRECTORY.filter(s => s.department === 'Accounting'),
  OPS_HI: STAFF_DIRECTORY.filter(s => s.department === 'Ops' && s.location === 'Hawaii'),
  OPS_PC: STAFF_DIRECTORY.filter(s => s.department === 'Ops' && s.location === 'Park City'),
  MARKETING: STAFF_DIRECTORY.filter(s => s.department === 'Marketing'),
};

const createTextTask = (id: string, label: string, assignee?: string, value = '', isSensitive = false) => ({
  id,
  label,
  value,
  notes: '',
  status: TaskStatus.PENDING,
  type: 'text' as const,
  assignee,
  isSensitive
});

const createDateTask = (id: string, label: string, assignee?: string, value = '') => ({
  id,
  label,
  value,
  notes: '',
  status: TaskStatus.PENDING,
  type: 'date' as const,
  assignee
});

const createBoolTask = (id: string, label: string, assignee?: string, value = 'No') => ({
  id,
  label,
  value,
  notes: '',
  status: TaskStatus.PENDING,
  type: 'boolean' as const,
  assignee
});

// Template based on the PDF sections
export const UNIT_TEMPLATE_SECTIONS = [
  {
    id: 'sales-info',
    title: 'Sales & Header Info',
    department: 'Sales' as const,
    tasks: [
      createTextTask('sales-rep', 'Sales Rep', 'Violet', 'Violet'),
      createTextTask('realtor', 'Realtor Referred', 'Violet', 'N/A'),
      createDateTask('purchase-date', 'Purchase / Transfer Date', 'Justin', ''),
      createDateTask('access-date', 'Access Date', 'Justin', ''),
      createDateTask('live-date', 'Live Date', 'Violet', ''),
      createBoolTask('mgmt-fee', 'Mgmt Fee Waived (1st 7)', 'Justin', 'Yes'),
      createTextTask('insurance-policy', 'Insurance Policy #', 'Mei', '', true),
    ]
  },
  {
    id: 'owner-info',
    title: 'Owner Information',
    department: 'Sales' as const,
    tasks: [
      createTextTask('owner-name', 'Owner Name', 'Violet', ''),
      createTextTask('prop-ownership', 'Property Ownership Name', 'Violet', ''),
      createTextTask('address', 'Property Address', 'Violet', ''),
      createTextTask('email', 'Email', 'Violet', '', true),
      createTextTask('phone', 'Phone', 'Violet', '', true),
      createTextTask('bank-routing', 'Routing Number', 'Mei', '', true),
      createTextTask('bank-account', 'Account Number', 'Mei', '', true),
    ]
  },
  {
    id: 'rates',
    title: 'Rates & Revenue',
    department: 'Marketing' as const,
    tasks: [
      createBoolTask('rate-buckets', 'New Rate Buckets Created', 'Emily', 'No'),
      createBoolTask('rates-set', 'Initial Rates Set', 'Emily', 'No'),
      createBoolTask('yield-max', 'Sync to YieldMax', 'Emily', 'No'),
    ]
  },
  {
    id: 'unit-info',
    title: 'Unit Information',
    department: 'Ops' as const,
    tasks: [
      createTextTask('prior-pm', 'Prior PM', 'Violet', ''),
      createTextTask('tmk', 'TMK Number', 'Violet', ''),
      createTextTask('door-code', 'Kaba/Door Code', 'Kevin', '', true),
      createTextTask('bed-bath', 'Bed/Bath Count', 'Kevin', ''),
      createTextTask('wifi-user', 'Wifi Username', 'Kyle', '', true),
      createTextTask('wifi-pass', 'Wifi Password', 'Kyle', '', true),
    ]
  },
  {
    id: 'legal',
    title: 'Legal & Contracts',
    department: 'Accounting' as const,
    tasks: [
      createDateTask('pma-exec', 'PMA Executed', 'Mei', ''),
      createTextTask('contract-terms', 'Contract Terms', 'Lorry', '20% Mgmt Fee'),
      createBoolTask('w9', 'W9 Received', 'Mei', 'No'),
      createTextTask('get-number', 'General Excise Tax (GET)', 'Mei', '', true),
      createTextTask('tat-number', 'Transient Accommodations Tax (TAT)', 'Mei', '', true),
      createTextTask('stvr-license', 'STVR License Verified', 'Jon Brunold', ''),
    ]
  },
  {
    id: 'ops',
    title: 'Ops Action Items',
    department: 'Ops' as const,
    tasks: [
      createBoolTask('lock-changed', 'Lock Changed to Kaba', 'Kevin', 'No'),
      createBoolTask('lockbox', 'Lockbox Installed', 'Kyle', 'No'),
      createBoolTask('inventory', 'Inventory List Completed', 'Janel', 'No'),
      createTextTask('clean-upholstery', 'Upholstery Cleaned', 'Kyle', 'Pending'),
    ]
  },
  {
    id: 'go-live',
    title: 'Go Live Checklist',
    department: 'Marketing' as const,
    tasks: [
      createBoolTask('rentals-united', 'Rentals United Setup', 'Brooke', 'No'),
      createBoolTask('airbnb', 'Airbnb Live', 'Marvin', 'No'),
      createBoolTask('marriott', 'Marriott Live', 'Marvin', 'No'),
      createBoolTask('vrbo', 'Vrbo Live', 'Jerome', 'Pending'),
      createBoolTask('booking', 'Booking.com Live', 'Jerome', 'No'),
      createBoolTask('expedia', 'Expedia Live', 'Jerome', 'No'),
      createDateTask('owner-portal', 'Owner Portal Sent', 'Janel', ''),
    ]
  }
];

// Helper to generate a unit with standard fields
const createUnit = (id: string, code: string, owner: string, location: string, status: any, progress: number, notes: string, transferType: any = 'Transfer', priorPM = 'N/A', salesRep = 'Violet'): OnboardingUnit => ({
  id,
  unitCode: code,
  ownerName: owner,
  location: location as any,
  status: status,
  progress: progress,
  sections: UNIT_TEMPLATE_SECTIONS.map(s => ({
      ...s,
      tasks: s.tasks.map(t => {
        // If status is 'Live', check OTAs by default for mock purposes unless specified otherwise
        if (status === 'Live' && ['airbnb', 'marriott', 'vrbo'].includes(t.id)) {
           return { ...t, status: TaskStatus.COMPLETED, value: 'Yes' };
        }
        return t;
      })
  })),
  transitionDetails: {
    salesRep: salesRep,
    transferType: transferType,
    effectiveDate: '',
    priorPM: priorPM,
    inspectionStatus: status === 'Live' ? 'Completed' : 'Pending',
    contingencies: 'N/A',
    notes: notes
  }
});

// --- ONBOARDING UNITS (Not Live yet) ---
export const MOCK_UNITS: OnboardingUnit[] = [
  // Maui
  createUnit('9', 'KRV-2421', 'Virginia Harris & Joy', 'Maui', 'Processing', 40, 'Photos booked 11/26, need description & push live', 'Transfer', 'Outrigger'),
  createUnit('10', 'KRV-2121', 'Virginia Harris & Joy', 'Maui', 'Processing', 40, 'Photos booked 12/2/25, need description & push live', 'Transfer', 'Outrigger'),
  createUnit('11', 'VIR-107', 'Karen and Bret Paulson', 'Maui', 'Stalled', 20, 'Undergoing complete remodel; buildout needed', 'Purchase/Transfer', 'KBM'),
  createUnit('12', 'PKD-204', 'Kyle Schierbeck & Audrey Hunter', 'Maui', 'Stalled', 20, 'Remodel in process; buildout needed', 'Transfer', 'Maui Paradise Properties'),
  createUnit('13', 'MAH-109', 'Tanya and Bruce Moss', 'Maui', 'Processing', 30, 'content and tracking done. need wiki buildout, photos and push live to OTAs.', 'Transfer', 'On-Site Aqua-Aston'),
  createUnit('14', 'KBV-35G2', 'James (Jim) Colhoun', 'Maui', 'Processing', 30, 'content and tracking done. need wiki buildout, photos and push live to OTAs', 'Transfer', 'MPP'),
  
  // Oahu
  createUnit('16', 'KUL-W35', 'Don and Judy Cole', 'Oahu', 'Processing', 40, 'Need photos & built out in Wiki', 'Transfer', 'Self'),

  // Hawaii Island
  createUnit('19', 'HUA-149', 'Megdal Family Trust', 'Big Island', 'Stalled', 10, 'On hold; need work done on home before proceeding', 'Purchase/Transfer', 'N/A'),

  // Park City
  createUnit('20', 'CCT-2180', 'Lyndsay Hersch', 'Park City', 'Processing', 30, 'Remodeling; pending photos & push live', 'Transfer', 'N/A', 'Judy'),
  createUnit('22', 'CVC-308B', 'Kathryn Gregory', 'Park City', 'Processing', 80, 'Need to Flush on OTAS?', 'Transfer', 'Vacasa'),
  createUnit('24', 'HCT-26C', 'Elizabeth Darlington', 'Park City', 'Processing', 20, 'Need to reshoot once remodel is done', 'Transfer', 'N/A'),
  createUnit('25', 'PCO-184M', 'Chris Bardon', 'Park City', 'Processing', 50, 'Implementation process', 'Transfer', 'Marketing only', 'Judy'),
  createUnit('26', 'PCO-184G', 'Chris Bardon', 'Park City', 'Processing', 50, 'Implementation process', 'Transfer', 'Marketing only', 'Judy'),
];

// --- OFFBOARDING UNITS (Leaving) ---
export const MOCK_OFFBOARDING: OnboardingUnit[] = [
  createUnit('off-1', 'KPL-28', 'Karen & Bob Marley', 'Maui', 'Live', 100, 'Leaving Program - last c/o 12/31/2025', 'Out', 'KBM'),
  createUnit('off-2', 'HKH-516', 'Sophia & Brian Matheson', 'Maui', 'Live', 100, 'Leaving Program - last c/o 1/22/2026', 'Out', 'KBM'),
  createUnit('off-3', 'HKH-332', 'Jacob Raabe', 'Maui', 'Live', 100, 'Leaving Our Program, self managing - last c/o 11/30/25', 'Out', 'KBM'),
  createUnit('off-4', 'WCV-2004', 'Owner', 'Big Island', 'Live', 100, 'Leaving our Program; honoring all reservations through 2025', 'Out', 'KBM'),
];

// --- FOR SALE UNITS ---
export const MOCK_FOR_SALE: OnboardingUnit[] = [
  createUnit('fs-1', 'KGV-20T8', 'Mihaela Stoops', 'Maui', 'For Sale', 0, 'Listing Agent: Mihaela Stoops', 'Transfer', 'KBM'),
  createUnit('fs-2', 'HKK-829', 'Susan Jackson', 'Maui', 'For Sale', 0, 'Listing Agent: Susan Jackson', 'Transfer', 'KBM'),
  createUnit('fs-3', 'FST-4163', 'TBD', 'Maui', 'For Sale', 0, '', 'Transfer', 'KBM'),
  createUnit('fs-4', 'HKH-424', 'Pamela Reader', 'Maui', 'For Sale', 0, 'Listing Agent: Pamela Reader. New Owners required to honor bookings.', 'Transfer', 'KBM'),
  createUnit('fs-5', 'Montage 2204', 'TBD', 'Maui', 'For Sale', 0, '', 'Transfer', 'KBM'),
  createUnit('fs-6', 'HKK-104', 'Susan Jackson', 'Maui', 'For Sale', 0, 'Listing Agent: Susan Jackson', 'Transfer', 'KBM'),
];

const defaultActiveTransition = {
    salesRep: 'Violet',
    transferType: 'Transfer' as const,
    effectiveDate: '2024-01-01',
    priorPM: 'N/A',
    inspectionStatus: 'Completed',
    contingencies: 'N/A',
    notes: 'Active Unit'
};

// Detailed Active Units (Units that were recently onboarded and are now live, with specific docs)
const DETAILED_ACTIVE_UNITS: OnboardingUnit[] = [
  {
    id: 'active-1',
    unitCode: 'BVK-O-1604',
    ownerName: 'Raynard Kanemori (Kanemori Family Trust)',
    location: 'Oahu',
    status: 'Live',
    progress: 100,
    sections: UNIT_TEMPLATE_SECTIONS.map(s => ({
      ...s,
      tasks: s.tasks.map(t => {
        const completedTask = { ...t, status: TaskStatus.COMPLETED };
        if (t.id === 'get-number' || t.id === 'tat-number') return { ...completedTask, value: '062-892-2880-01' };
        if (t.id === 'wifi-user') return { ...completedTask, value: 'MySpectrumWiFi08-2G' };
        if (t.id === 'wifi-pass') return { ...completedTask, value: 'yellowpear700' };
        if (t.id === 'address') return { ...completedTask, value: '92-104 Waialii Place #O-1604' };
        if (t.id === 'email') return { ...completedTask, value: 'raykanemori@gmail.com' };
        if (t.id === 'phone') return { ...completedTask, value: '4254060368' };
        if (t.id === 'bank-account') return { ...completedTask, value: '8638818628' };
        if (t.id === 'bank-routing') return { ...completedTask, value: '125008547' };
        if (t.id === 'contract-terms') return { ...completedTask, value: '20% Mgmt Fee' };
        if (t.id === 'pma-exec') return { ...completedTask, value: '2024-02-09' };
        if (t.id === 'live-date') return { ...completedTask, value: '2024-05-02' };
        if (t.id === 'insurance-policy') return { ...completedTask, value: 'NF033HI0101049' };
        return completedTask;
      })
    })),
    transitionDetails: defaultActiveTransition
  },
  {
    id: 'active-2',
    unitCode: 'BVK-B-308',
    ownerName: 'Kevin O. Nip & Jin Won Nip',
    location: 'Oahu',
    status: 'Live',
    progress: 100,
    sections: UNIT_TEMPLATE_SECTIONS.map(s => ({
      ...s,
      tasks: s.tasks.map(t => {
        const completedTask = { ...t, status: TaskStatus.COMPLETED };
        if (t.id === 'get-number' || t.id === 'tat-number') return { ...completedTask, value: '167-298-6624-01' };
        if (t.id === 'address') return { ...completedTask, value: '92-102 Waialii Pl Unit B-308, Kapolei, HI 96707' };
        if (t.id === 'email') return { ...completedTask, value: 'kon@selectivestone.net' };
        if (t.id === 'phone') return { ...completedTask, value: '(808) 223-4141' };
        if (t.id === 'bank-account') return { ...completedTask, value: '0052132215' };
        if (t.id === 'bank-routing') return { ...completedTask, value: '121301028' };
        if (t.id === 'contract-terms') return { ...completedTask, value: '20% Mgmt Fee' };
        if (t.id === 'pma-exec') return { ...completedTask, value: '2024-03-06' };
        if (t.id === 'prior-pm') return { ...completedTask, value: 'Ola Properties (Joe Eads)' };
        if (t.id === 'live-date') return { ...completedTask, value: '2024-06-15' };
        if (t.id === 'insurance-policy') return { ...completedTask, value: 'HPX1000147643' };
        return completedTask;
      })
    })),
    transitionDetails: { ...defaultActiveTransition, priorPM: 'Ola Properties (Joe Eads)' }
  },
   {
    id: 'active-3',
    unitCode: 'KUL-E113',
    ownerName: 'Maila Kondo',
    location: 'Oahu',
    status: 'Live',
    progress: 100,
    sections: UNIT_TEMPLATE_SECTIONS.map(s => ({
      ...s,
      tasks: s.tasks.map(t => {
        const completedTask = { ...t, status: TaskStatus.COMPLETED };
        if (t.id === 'get-number' || t.id === 'tat-number') return { ...completedTask, value: '044-039-4240-01' };
        if (t.id === 'address') return { ...completedTask, value: '57-086 Eleku Kuilima Pl. 113, Kahuku, HI' };
        if (t.id === 'email') return { ...completedTask, value: 'mailakondo@pm.me' };
        if (t.id === 'phone') return { ...completedTask, value: '81-90-9238-9983' };
        if (t.id === 'bank-account') return { ...completedTask, value: '38207326' };
        if (t.id === 'bank-routing') return { ...completedTask, value: '121301015' };
        if (t.id === 'contract-terms') return { ...completedTask, value: '25% Mgmt Fee' };
        if (t.id === 'pma-exec') return { ...completedTask, value: '2024-02-07' };
        if (t.id === 'live-date') return { ...completedTask, value: '2024-02-07' };
        if (t.id === 'insurance-policy') return { ...completedTask, value: '820 195 515' };
        return completedTask;
      })
    })),
    transitionDetails: defaultActiveTransition
  },
  {
    id: 'active-4',
    unitCode: 'KUL-E117',
    ownerName: 'Terry H. Fisher',
    location: 'Oahu',
    status: 'Live',
    progress: 100,
    sections: UNIT_TEMPLATE_SECTIONS.map(s => ({
      ...s,
      tasks: s.tasks.map(t => {
        const completedTask = { ...t, status: TaskStatus.COMPLETED };
        if (t.id === 'get-number' || t.id === 'tat-number') return { ...completedTask, value: '114-877-0304-02' };
        if (t.id === 'address') return { ...completedTask, value: '57-077 Eleku Kuilima Pl #117, Kahuku, HI 96731' };
        if (t.id === 'email') return { ...completedTask, value: 'tensa.carlson@gmail.com' };
        if (t.id === 'phone') return { ...completedTask, value: '(808) 277-8412' };
        if (t.id === 'bank-account') return { ...completedTask, value: '000002160315' };
        if (t.id === 'bank-routing') return { ...completedTask, value: '121301772' };
        if (t.id === 'contract-terms') return { ...completedTask, value: '25% Mgmt Fee' };
        if (t.id === 'pma-exec') return { ...completedTask, value: '2023-03-09' };
        if (t.id === 'stvr-license') return { ...completedTask, value: '2025-STR-462 (Exp: 10/17/2026)' };
        if (t.id === 'live-date') return { ...completedTask, value: '2023-04-03' };
        if (t.id === 'insurance-policy') return { ...completedTask, value: '91-B1-3217-7' };
        return completedTask;
      })
    })),
    transitionDetails: defaultActiveTransition
  },
   // Adding active units from the spreadsheet that were marked as Live
  createUnit('1', 'NAP-A24', 'Andy & Maria Silvert', 'Maui', 'Live', 100, 'Effective marketing start Feb 1 2026', 'Transfer', 'Long Term/FEMA'),
  createUnit('2', 'KBV-24G3', 'Dan Large', 'Maui', 'Live', 100, 'Only Owner stay Oct 6-16', 'Transfer', 'MPP'),
  createUnit('3', 'NAP-C32', 'Andrew Dunn', 'Maui', 'Live', 100, 'Updated transition on 11/1/25', 'Transfer', 'Maui Beachfront Rentals'),
  createUnit('4', 'HKK-443', 'Jeffry & Victoria Hansen', 'Maui', 'Live', 100, 'Need updated photos', 'Transfer', 'Outrigger'),
  createUnit('5', 'KRV-2314', 'Rick and Cheryl Wood', 'Maui', 'Live', 100, 'No future res OTB after 1/6/26', 'Transfer', 'Outrigger'),
  createUnit('6', 'HKH-305', 'Jeffry & Victoria Hansen', 'Maui', 'Live', 100, 'No future res OTB 12/29/25', 'Transfer', 'Outrigger'),
  createUnit('7', 'MKV-A606', 'Nancy Price', 'Maui', 'Live', 100, 'MRR sending future res OTB after 11/15', 'Transfer', 'MRR'),
  createUnit('8', 'WBV-PH505', 'Darrin & Amanda Grabek', 'Maui', 'Live', 100, 'Need photos and push live to OTAs', 'Purchase/Transfer', 'Private Paradise Villas'),
  createUnit('15', 'KUL-W11', 'Devin & Nikisha Arp', 'Oahu', 'Live', 100, 'Transferring', 'Transfer', 'Self'),
  createUnit('17', 'FVW-L32', 'Gage and Troy Jarvis', 'Big Island', 'Live', 100, 'Need updated STVR', 'Transfer', 'N/A'),
  createUnit('18', 'HLI-7A', 'Jennifer and Jarrod Jodoin', 'Big Island', 'Live', 100, 'Need updated STVR', 'Transfer', 'Self-Managed'),
  createUnit('21', 'PEA-1114', 'Jennifer & Sam Raabe', 'Park City', 'Live', 100, 'No future res to honor', 'Transfer', 'I Love Vacations'),
  createUnit('23', 'BCT-501', 'Laurie and Richard Rebd', 'Park City', 'Live', 100, 'No future res to honor', 'Transfer', 'N/A'),
];

// Bulk active units list extracted from PDF (subset of 268 total)
const BULK_ACTIVE_UNITS_DATA = [
  // Maui (West Side) - Hokulani
  { code: 'HKH-236', bed: '2', bath: '2' }, { code: 'HKH-229', bed: '2', bath: '2' }, { code: 'HKH-338', bed: '1', bath: '1' },
  { code: 'HKH-344', bed: '1', bath: '1' }, { code: 'HKH-406', bed: '2', bath: '2' }, { code: 'HKH-714', bed: '1', bath: '1' },
  { code: 'HKH-550', bed: '3', bath: '3' }, { code: 'HKH-216', bed: '1', bath: '1' }, { code: 'HKH-746', bed: '2', bath: '2' },
  { code: 'HKH-203', bed: '3', bath: '3' }, { code: 'HKH-238', bed: '1', bath: '1' }, { code: 'HKH-318', bed: '1', bath: '1' },
  { code: 'HKH-412', bed: '2', bath: '2' }, { code: 'HKH-620', bed: '2', bath: '2' }, { code: 'HKH-204', bed: '3', bath: '3' },
  { code: 'HKH-247', bed: '2', bath: '2' }, { code: 'HKH-150', bed: '3', bath: '3' }, { code: 'HKH-529', bed: '3', bath: '3' },
  { code: 'HKH-537', bed: '0', bath: '1' }, { code: 'HKH-442', bed: '2', bath: '1' }, { code: 'HKH-503', bed: '3', bath: '3' },
  { code: 'HKH-201', bed: '3', bath: '3' }, { code: 'HKH-520', bed: '2', bath: '2' }, { code: 'HKH-925', bed: '3', bath: '3' },
  { code: 'HKH-323', bed: '0', bath: '1' }, { code: 'HKH-545', bed: '2', bath: '2' }, { code: 'HKH-425', bed: '3', bath: '3' },
  { code: 'HKH-240', bed: '1', bath: '1' }, { code: 'HKH-603', bed: '3', bath: '3' }, { code: 'HKH-449', bed: '3', bath: '3' },
  { code: 'HKH-242', bed: '2', bath: '2' }, { code: 'HKH-501', bed: '3', bath: '3' }, { code: 'HKH-348', bed: '2', bath: '2' },
  { code: 'HKH-609', bed: '2', bath: '2' }, { code: 'HKH-434', bed: '2', bath: '2' }, { code: 'HKH-211', bed: '2', bath: '2' },
  { code: 'HKH-236', bed: '2', bath: '2' }, { code: 'HKH-305', bed: '2', bath: '2' }, { code: 'HKH-515', bed: '2', bath: '2' },
  { code: 'HKH-409', bed: '2', bath: '2' }, { code: 'HKH-451', bed: '3', bath: '3' }, { code: 'HKH-424', bed: '1', bath: '1' },
  
  // Maui (West Side) - Konea
  { code: 'HKK-234', bed: '2', bath: '2' }, { code: 'HKK-334', bed: '2', bath: '2' }, { code: 'HKK-424', bed: '1', bath: '1' },
  { code: 'HKK-706', bed: '2', bath: '1' }, { code: 'HKK-926', bed: '2', bath: '2' }, { code: 'HKK-524', bed: '1', bath: '1' },
  { code: 'HKK-201', bed: '2', bath: '3' }, { code: 'HKK-140', bed: '2', bath: '1' }, { code: 'HKK-445', bed: '2', bath: '2' },
  { code: 'HKK-648', bed: '2', bath: '2' }, { code: 'HKK-443', bed: '2', bath: '2' }, { code: 'HKK-812', bed: '2', bath: '2' },
  { code: 'HKK-450', bed: '3', bath: '3' }, { code: 'HKK-242', bed: '2', bath: '1' }, { code: 'HKK-203', bed: '2', bath: '2' },
  { code: 'HKK-225', bed: '2', bath: '2' }, { code: 'HKK-1029', bed: '3', bath: '3' }, { code: 'HKK-309', bed: '2', bath: '2' },
  { code: 'HKK-113', bed: '2', bath: '2' }, { code: 'HKK-209', bed: '2', bath: '2' }, { code: 'HKK-349', bed: '3', bath: '3' },
  { code: 'HKK-513', bed: '2', bath: '2' }, { code: 'HKK-343', bed: '2', bath: '2' }, { code: 'HKK-439', bed: '2', bath: '2' },
  { code: 'HKK-245', bed: '2', bath: '2' }, { code: 'HKK-922', bed: '1', bath: '1' }, { code: 'HKK-920', bed: '2', bath: '2' },
  { code: 'HKK-236', bed: '1', bath: '1' }, { code: 'HKK-816', bed: '1', bath: '1' }, { code: 'HKK-104', bed: '2', bath: '2' },
  { code: 'HKK-108', bed: '2', bath: '1' }, { code: 'HKK-229', bed: '2', bath: '2' }, { code: 'HKK-112', bed: '2', bath: '1' },
  { code: 'HKK-829', bed: '3', bath: '3' }, { code: 'HKK-537', bed: '0', bath: '1' }, { code: 'HKK-539', bed: '2', bath: '2' },
  { code: 'HKK-825', bed: '3', bath: '3' }, { code: 'HKK-832', bed: '1', bath: '1' }, { code: 'HKK-220', bed: '2', bath: '2' },
  { code: 'HKK-820', bed: '2', bath: '2' }, { code: 'HKK-213', bed: '2', bath: '2' }, { code: 'HKK-413', bed: '2', bath: '2' },
  { code: 'HKK-730', bed: '1', bath: '1' },

  // Maui (West Side) - Other
  { code: 'KRO-Q102', bed: '2', bath: '2' }, { code: 'KGV-14P6', bed: '2', bath: '2' }, { code: 'KBV-30G2', bed: '1', bath: '1' },
  { code: 'KGV-19P3', bed: '2', bath: '2' }, { code: 'MAH-611', bed: '2', bath: '2' }, { code: 'MON-5203', bed: '3', bath: '3.5' },
  { code: 'KGV-16P3', bed: '2', bath: '2' }, { code: 'NAP-C18', bed: '2', bath: '2' }, { code: 'KBV-14G4', bed: '2', bath: '3' },
  { code: 'KGV-24P7', bed: '2', bath: '2' }, { code: 'KBV-15B3', bed: '1', bath: '1.5' }, { code: 'KGV-14T6', bed: '2', bath: '2' },
  { code: 'MAH-419', bed: '2', bath: '2' }, { code: 'KBV-28G2', bed: '1', bath: '2' }, { code: 'KGV-19T1', bed: '1', bath: '2' },
  { code: 'KGV-21P2', bed: '2', bath: '2' }, { code: 'KBV-37B3', bed: '2', bath: '3' }, { code: 'KGV-19P2', bed: '2', bath: '2' },
  { code: 'KGV-16T4', bed: '1', bath: '2' }, { code: 'KGV-24P2', bed: '2', bath: '2' }, { code: 'MON-1304', bed: '3', bath: '3.5' },
  { code: 'KGV-17P7', bed: '2', bath: '2' }, { code: 'HKL-12A', bed: '3', bath: '3' }, { code: 'HKL-12B', bed: '3', bath: '3' },
  { code: 'NAP-C43', bed: '2', bath: '2' }, { code: 'MON-6401', bed: '3', bath: '3.5' }, { code: 'POA-504B', bed: '3', bath: '2.5' },
  { code: 'PLA-1155', bed: '5', bath: '4' }, { code: 'NAP-B43', bed: '1', bath: '1' }, { code: 'NAP-C42', bed: '2', bath: '2' },
  { code: 'KBV-16G4', bed: '2', bath: '3' }, { code: 'TPC-102C', bed: '3', bath: '3' }, { code: 'PRH-685', bed: '4', bath: '4.5' },
  { code: 'MON-1205', bed: '3', bath: '3.5' }, { code: 'KBV-32B2', bed: '2', bath: '2' }, { code: 'KBV-12B3', bed: '1', bath: '2' },
  { code: 'LLC-103', bed: '2', bath: '2' }, { code: 'HKL-5B', bed: '3', bath: '3' }, { code: 'KGV-21P3', bed: '2', bath: '2' },
  { code: 'PPS-1416', bed: '4', bath: '3.5' }, { code: 'PPS-1418', bed: '4', bath: '3.5' }, { code: 'KRV-722', bed: '3', bath: '2.5' },
  { code: 'KBV-26B1', bed: '1', bath: '1' }, { code: 'KGV-22T5', bed: '1', bath: '2' }, { code: 'KS-535', bed: '2', bath: '2' },
  { code: 'KRV-514', bed: '1', bath: '2' }, { code: 'KRV-2823', bed: '1', bath: '2' }, { code: 'WH2-1169', bed: '1', bath: '2' },
  { code: 'LOK-B203', bed: '2', bath: '2' }, { code: 'KS-260', bed: '2', bath: '2' }, { code: 'NAP-C37', bed: '2', bath: '2' },
  { code: 'SOK-292', bed: '3', bath: '3' }, { code: 'KGV-17T5', bed: '1', bath: '2' }, { code: 'KRV-724', bed: '1', bath: '2' },
  { code: 'KGV-14P3', bed: '2', bath: '2' }, { code: 'KS-815', bed: '2', bath: '2' }, { code: 'KGV-14V3', bed: '2', bath: '2' },
  { code: 'MON-2206', bed: '3', bath: '3.5' }, { code: 'PAS-2680', bed: '6', bath: '9' }, { code: 'VIR-508', bed: '2', bath: '2' },
  { code: 'PKC-403', bed: '3', bath: '2' }, { code: 'PKC-404', bed: '3', bath: '3' }, { code: 'KRV-1223', bed: '2', bath: '3' },
  { code: 'STR-1', bed: '3', bath: '4' }, { code: 'NAP-C31', bed: '2', bath: '2' }, { code: 'KPL-46', bed: '3', bath: '2.5' },
  { code: 'WH1-1218', bed: '0', bath: '1' }, { code: 'KRV-2912', bed: '2', bath: '3' }, { code: 'KBV-17G4', bed: '1', bath: '1' },
  { code: 'ICC-11', bed: '2', bath: '2' }, { code: 'KGV-20T8', bed: '1', bath: '2' }, { code: 'KPL-41', bed: '3', bath: '2.5' },
  { code: 'TPC-301C', bed: '3', bath: '3' }, { code: 'WH1-1211', bed: '1', bath: '2' }, { code: 'NAB-107', bed: '0', bath: '1' },
  { code: 'KRO-L201', bed: '2', bath: '2' }, { code: 'PWS-957', bed: '3', bath: '3' }, { code: 'WBV-PH412', bed: '3', bath: '3' },
  { code: 'RGT-117', bed: '3', bath: '2' }, { code: 'WH2-661', bed: '0', bath: '1' }, { code: 'LOK-B201', bed: '2', bath: '2' },
  { code: 'KRO-G201', bed: '2', bath: '2' }, { code: 'MAH-1219', bed: '2', bath: '2' }, { code: 'MEL-H207', bed: '1', bath: '1' },
  { code: 'KBV-24B2', bed: '2', bath: '3' }, { code: 'MAH-301', bed: '2', bath: '2' }, { code: 'NPG-C11', bed: '3', bath: '2.5' },
  { code: 'MKV-B247', bed: '0', bath: '1' }, { code: 'PKE-304', bed: '0', bath: '1' }, { code: 'WH1-211', bed: '1', bath: '2' },
  { code: 'WH1-615', bed: '0', bath: '1' }, { code: 'WH1-723', bed: '2', bath: '2' }, { code: 'PKD-104', bed: '1', bath: '1' },
  { code: 'MAS-2062', bed: '2', bath: '3' }, { code: 'MON-2604', bed: '3', bath: '3.5' }, { code: 'MKV-C152', bed: '0', bath: '1' },
  { code: 'MKV-C255', bed: '0', bath: '1' }, { code: 'MKV-B242', bed: '0', bath: '1' }, { code: 'CBI-108', bed: '1', bath: '1' },
  { code: 'NAP-B26', bed: '1', bath: '1' }, { code: 'KGV-22P2', bed: '2', bath: '2' }, { code: 'VIN-14', bed: '2', bath: '2' },
  { code: 'KGV-24T1', bed: '1', bath: '2' }, { code: 'PKA-201', bed: '1', bath: '1' }, { code: 'RCT-42', bed: '3', bath: '2.5' },
  { code: 'KGV-20T2', bed: '1', bath: '2' }, { code: 'KGV-17V3', bed: '1', bath: '2' }, { code: 'KGV-18T4', bed: '1', bath: '2' },
  { code: 'KBV-24G3', bed: '1', bath: '1.5' }, { code: 'NAP-A24', bed: '1', bath: '1' }, { code: 'MKV-A606', bed: '2', bath: '2' },
  { code: 'KRV-2314', bed: '2', bath: '3' }, { code: 'NAP-C32', bed: '2', bath: '2' }, { code: 'WBV-PH505', bed: '3', bath: '3' },
  { code: 'KRO-L201', bed: '2', bath: '2' }, { code: 'MAH-1006', bed: '1', bath: '1' }, { code: 'MON-6301', bed: '3', bath: '3.5' },
  { code: 'MAH-719', bed: '2', bath: '2' }, { code: 'KBV-34G4', bed: '1', bath: '1' }, { code: 'KRV-1622', bed: '2', bath: '3' },
  { code: 'HOL-102', bed: '1', bath: '1' }, { code: 'NAP-B13', bed: '1', bath: '1' }, { code: 'WKV-45C', bed: '1', bath: '1' },
  { code: 'GCH-181', bed: '1', bath: '2' }, { code: 'GCH-121', bed: '1', bath: '2' }, { code: 'MON-6302', bed: '3', bath: '3.5' },
  { code: 'KS-616', bed: '2', bath: '2' },

  // South Maui
  { code: 'GCH-134', bed: '3', bath: '2' }, { code: 'GCH-120', bed: '2', bath: '2' }, { code: 'MSR-F2', bed: '1', bath: '1' },
  { code: 'WBV-PH412', bed: '3', bath: '3' }, { code: 'WEV-2009', bed: '2', bath: '2' }, { code: 'POL-109', bed: '2', bath: '2' },
  { code: 'WEV-2103', bed: '2', bath: '2' },

  // Park City
  { code: 'BBL-351A', bed: '2', bath: '3' }, { code: 'BBL-351B', bed: '2', bath: '2' }, { code: 'TWL-12C', bed: '2', bath: '2.5' },
  { code: 'TWL-5B', bed: '3', bath: '2.5' }, { code: 'PNF-860', bed: '3', bath: '3' }, { code: 'POA-504B', bed: '3', bath: '2.5' },
  { code: 'PGE-2413', bed: '3', bath: '4.5' }, { code: 'VIN-17', bed: '4', bath: '4.5' }, { code: 'PSD-2071', bed: '5', bath: '5.5' },
  { code: 'PLA-1155', bed: '5', bath: '4' }, { code: 'PAC-2410', bed: '5', bath: '4.5' }, { code: 'BBL-351COMBO', bed: '4', bath: '5' },
  { code: 'ITT-22', bed: '4', bath: '4.5' }, { code: 'TPC-102C', bed: '3', bath: '3' }, { code: 'PRH-685', bed: '4', bath: '4.5' },
  { code: 'BCC-1101', bed: '3', bath: '3.5' }, { code: 'RPT-14T', bed: '4', bath: '4' }, { code: 'PLO-6599', bed: '5', bath: '5' },
  { code: 'PEA-1260', bed: '3', bath: '3' }, { code: 'MON-2206', bed: '3', bath: '3.5' }, { code: 'PEA-1009', bed: '4', bath: '4.5' },
  { code: 'AGC-8', bed: '3', bath: '2' }, { code: 'PAS-2680', bed: '6', bath: '9' }, { code: 'STR-1', bed: '3', bath: '4' },
  { code: 'IML-E4', bed: '2', bath: '2.5' }, { code: 'TPC-301C', bed: '3', bath: '3' }, { code: 'PWS-957', bed: '3', bath: '3' },
  { code: 'CBI-108', bed: '1', bath: '1' }, { code: 'VIN-14', bed: '2', bath: '2' }, { code: 'RCT-42', bed: '3', bath: '2.5' },
  { code: 'HCT-26C', bed: '4', bath: '2' }, { code: 'MON-1303', bed: '3', bath: '3.5' }, { code: 'BCT-501', bed: '3', bath: '2' },
  { code: 'LDD-32', bed: '4', bath: '3' }, { code: 'CVC-308B', bed: '3', bath: '3' }, { code: 'CCT-2180', bed: '3', bath: '3' },
  { code: 'PEA-1114', bed: '4', bath: '3' }, { code: 'PCO-184M', bed: '6', bath: '5.5' }, { code: 'PCO-184G', bed: '3', bath: '3.5' },

  // Big Island (Kona)
  { code: 'WCV-306', bed: '2', bath: '2' }, { code: 'MON-2604', bed: '3', bath: '3.5' }, { code: 'HLI-12A', bed: '2', bath: '2' },
  { code: 'HLI-19G', bed: '3', bath: '3' }, { code: 'WCV-305', bed: '3', bath: '2.5' }, { code: 'FVW-L32', bed: '2', bath: '2' },
  { code: 'HLI-7A', bed: '2', bath: '2' },

  // Oahu
  { code: 'BVK-B-308', bed: '2', bath: '2' }, { code: 'BVK-O-1604', bed: '2', bath: '2' }, { code: 'KUL-E117', bed: '1', bath: '1' },
  { code: 'KUL-E113', bed: '2', bath: '1' }, { code: 'KUL-W11', bed: '3', bath: '2' }, { code: 'KUL-W35', bed: '3', bath: '2' },
];

const mapUnitToActive = (unitData: { code: string, bed: string, bath: string }): OnboardingUnit => {
  // Determine location based on code prefix
  let location = 'Maui';
  if (['BVK', 'KUL', 'O-16'].some(p => unitData.code.startsWith(p))) location = 'Oahu';
  else if (['WCV', 'HLI', 'FVW', 'HUA'].some(p => unitData.code.startsWith(p))) location = 'Big Island';
  else if (['BBL', 'TWL', 'PNF', 'POA', 'PGE', 'VIN', 'PSD', 'PLA', 'PAC', 'ITT', 'TPC', 'PRH', 'BCC', 'RPT', 'PLO', 'PEA', 'AGC', 'PAS', 'STR', 'IML', 'CBI', 'RCT', 'HCT', 'BCT', 'LDD', 'CVC', 'CCT', 'PCO'].some(p => unitData.code.startsWith(p))) location = 'Park City';

  return {
    id: `active-bulk-${unitData.code}`,
    unitCode: unitData.code,
    ownerName: 'Owner Record', // Placeholder
    location: location as any,
    status: 'Live',
    progress: 100,
    sections: UNIT_TEMPLATE_SECTIONS.map(s => ({
        ...s,
        tasks: s.tasks.map(t => {
            if (t.id === 'bed-bath') return { ...t, value: `${unitData.bed} Bed / ${unitData.bath} Bath`, status: TaskStatus.COMPLETED };
            return { ...t, status: TaskStatus.COMPLETED };
        })
    })),
    transitionDetails: {
        salesRep: 'KBM Team',
        transferType: 'Transfer',
        effectiveDate: '2024-01-01', // Default
        priorPM: 'N/A',
        inspectionStatus: 'Completed',
        contingencies: 'N/A',
        notes: 'Active Portfolio Unit'
    }
  };
};

// Create a Set of unit codes that are already accounted for in other categories to avoid duplication
// We normalize to uppercase and trim to be safe
const EXCLUDED_CODES = new Set([
  ...MOCK_UNITS.map(u => u.unitCode.toUpperCase().trim()),
  ...MOCK_OFFBOARDING.map(u => u.unitCode.toUpperCase().trim()),
  ...MOCK_FOR_SALE.map(u => u.unitCode.toUpperCase().trim()),
  ...DETAILED_ACTIVE_UNITS.map(u => u.unitCode.toUpperCase().trim())
]);

// Combine Detailed + Bulk (Deduping against ALL other lists)
const BULK_ACTIVE_UNITS = BULK_ACTIVE_UNITS_DATA
  .filter(bulk => !EXCLUDED_CODES.has(bulk.code.toUpperCase().trim()))
  .map(mapUnitToActive);

export const FULL_ACTIVE_PORTFOLIO = [...DETAILED_ACTIVE_UNITS, ...BULK_ACTIVE_UNITS];

// Export the full list as MOCK_ACTIVE for the App to use
export const MOCK_ACTIVE = FULL_ACTIVE_PORTFOLIO;
