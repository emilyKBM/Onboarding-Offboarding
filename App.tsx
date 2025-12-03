
import React, { useState, useEffect, createContext } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { MOCK_UNITS, MOCK_OFFBOARDING, MOCK_FOR_SALE, MOCK_ACTIVE, UNIT_TEMPLATE_SECTIONS, LOCATIONS } from './constants';
import { OnboardingUnit, TaskItem, TaskStatus, UnitLocation, User, UserRole } from './types';
import { UnitCard } from './components/UnitCard';
import { TaskRow } from './components/TaskRow';
import { AIAssistant } from './components/AIAssistant';
import { DocumentUploader } from './components/DocumentUploader';
import { TransitionsTable } from './components/TransitionsTable';
import { EmailDraftModal } from './components/EmailDraftModal';
import { ProcessFlowGuide } from './components/ProcessFlowGuide';
import { initializeGemini } from './services/geminiService';
import { LayoutDashboard, Plus, Search, ChevronLeft, Sparkles, CheckCircle2, PieChart, MapPin, FileText, LayoutGrid, Table as TableIcon, ArrowRightLeft, Tag, BookOpen, ShieldCheck, UserCircle, List, RefreshCw } from 'lucide-react';

// Context to pass user role down to components
export const UserContext = createContext<User | null>(null);

// --- Dashboard Page (Card View) ---
const Dashboard = ({ units, onAddUnit }: { units: OnboardingUnit[], onAddUnit: () => void }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewFilter, setViewFilter] = useState<'onboarding' | 'active' | 'offboarding' | 'forsale'>('onboarding');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredUnits = units.filter(u => {
    const matchesSearch = u.unitCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (viewFilter === 'onboarding') {
       return u.status !== 'For Sale' && 
              u.transitionDetails?.transferType !== 'Out' && 
              u.status !== 'Live' &&
              u.status !== 'Stalled';
    }
    if (viewFilter === 'active') {
       return u.status === 'Live' && u.transitionDetails?.transferType !== 'Out'; 
    }
    if (viewFilter === 'offboarding') {
       return u.transitionDetails?.transferType === 'Out';
    }
    if (viewFilter === 'forsale') {
       return u.status === 'For Sale';
    }
    
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage unit lifecycle and transitions.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto items-center">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search units..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
            />
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="Grid View"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              title="List View"
            >
              <List size={20} />
            </button>
          </div>

          <button 
            onClick={onAddUnit}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm shadow-indigo-200"
          >
            <Plus size={18} />
            <span>New Unit</span>
          </button>
        </div>
      </div>

      {/* Dashboard Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setViewFilter('onboarding')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative top-[1px] border-b-2 whitespace-nowrap ${
            viewFilter === 'onboarding' 
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <LayoutDashboard size={16} />
          Onboarding
        </button>
        <button
          onClick={() => setViewFilter('active')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative top-[1px] border-b-2 whitespace-nowrap ${
            viewFilter === 'active' 
              ? 'border-green-500 text-green-700 bg-green-50/50' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <CheckCircle2 size={16} />
          Active Portfolio
        </button>
        <button
          onClick={() => setViewFilter('offboarding')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative top-[1px] border-b-2 whitespace-nowrap ${
            viewFilter === 'offboarding' 
              ? 'border-red-500 text-red-600 bg-red-50/50' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <ArrowRightLeft size={16} />
          Offboarding
        </button>
        <button
          onClick={() => setViewFilter('forsale')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative top-[1px] border-b-2 whitespace-nowrap ${
            viewFilter === 'forsale' 
              ? 'border-yellow-500 text-yellow-700 bg-yellow-50/50' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Tag size={16} />
          For Sale
        </button>
      </div>

      <div className="flex-1 min-h-0">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-full pb-8">
            {filteredUnits.map(unit => (
              <UnitCard 
                key={unit.id} 
                unit={unit} 
                onClick={() => navigate(`/unit/${unit.id}`)} 
              />
            ))}
            {filteredUnits.length === 0 && (
               <div className="col-span-full text-center py-12 text-gray-400">
                 No units found matching your filter.
               </div>
            )}
          </div>
        ) : (
          <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
             <TransitionsTable units={filteredUnits} />
          </div>
        )}
      </div>
    </div>
  );
};

// --- Unit Detail Page ---
const UnitDetail = ({ 
  units, 
  onUpdateUnit 
}: { 
  units: OnboardingUnit[], 
  onUpdateUnit: (u: OnboardingUnit) => void 
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(UNIT_TEMPLATE_SECTIONS[0].id);
  const [showDocs, setShowDocs] = useState(false);
  const [emailDraft, setEmailDraft] = useState<{isOpen: boolean, taskId: string, taskLabel: string, assignee?: string}>({
     isOpen: false,
     taskId: '',
     taskLabel: '',
     assignee: undefined
  });
  
  // Find unit
  const unit = units.find(u => u.id === id);

  // Calculations
  const totalTasks = unit ? unit.sections.flatMap(s => s.tasks).filter(t => t.status !== TaskStatus.NA).length : 0;
  const completedTasks = unit ? unit.sections.flatMap(s => s.tasks).filter(t => t.status === TaskStatus.COMPLETED).length : 0;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Logic to determine current lifecycle state for dropdown
  const getCurrentLifecycleState = () => {
    if (!unit) return 'onboarding';
    if (unit.transitionDetails?.transferType === 'Out') return 'offboarding';
    if (unit.status === 'Live') return 'active';
    if (unit.status === 'For Sale') return 'forsale';
    if (unit.status === 'Stalled') return 'stalled';
    return 'onboarding';
  };

  // Handle lifecycle change (Onboarding -> Active, Active -> Offboarding, etc)
  const handleLifecycleChange = (newState: string) => {
    if (!unit) return;
    let updatedUnit = { ...unit };

    if (newState === 'active') {
       // Promote to Active
       updatedUnit.status = 'Live';
       updatedUnit.progress = 100;
       // Ensure it is not marked as leaving
       if (updatedUnit.transitionDetails) {
          updatedUnit.transitionDetails.transferType = 'Transfer'; 
       }
    } else if (newState === 'offboarding') {
       // Start Offboarding Process
       updatedUnit.status = 'Live'; // Typically stays live until fully offboarded
       if (!updatedUnit.transitionDetails) {
           updatedUnit.transitionDetails = {
              salesRep: 'Violet',
              transferType: 'Out',
              effectiveDate: new Date().toISOString().split('T')[0],
              priorPM: 'KBM',
              inspectionStatus: 'Pending',
              contingencies: 'N/A',
              notes: 'Transitioning out of program'
           };
       } else {
           updatedUnit.transitionDetails.transferType = 'Out';
       }
       // Reset progress to 0 so we can track offboarding checklist steps (if we had distinct offboarding tasks)
       // For now, just marks it as Offboarding
       updatedUnit.progress = 0; 
    } else if (newState === 'onboarding') {
       // Revert to Onboarding
       updatedUnit.status = 'Processing';
       if (updatedUnit.transitionDetails?.transferType === 'Out') {
          updatedUnit.transitionDetails.transferType = 'Transfer';
       }
       // Recalculate progress based on tasks
       // (Progress calc logic duplicates here, but for simplicity just set to current task state)
       const allTasks = unit.sections.flatMap(s => s.tasks).filter(t => t.status !== TaskStatus.NA);
       const done = allTasks.filter(t => t.status === TaskStatus.COMPLETED).length;
       updatedUnit.progress = allTasks.length > 0 ? Math.round((done / allTasks.length) * 100) : 0;
    } else if (newState === 'forsale') {
       updatedUnit.status = 'For Sale';
    } else if (newState === 'stalled') {
       updatedUnit.status = 'Stalled';
    }

    onUpdateUnit(updatedUnit);
  };

  // Update logic
  const handleTaskUpdate = (sectionId: string, updatedTask: TaskItem) => {
    if (!unit) return;
    
    const newSections = unit.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          tasks: section.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
        };
      }
      return section;
    });

    // Recalculate progress
    const allTasks = newSections.flatMap(s => s.tasks).filter(t => t.status !== TaskStatus.NA);
    const done = allTasks.filter(t => t.status === TaskStatus.COMPLETED).length;
    const newProgress = allTasks.length > 0 ? Math.round((done / allTasks.length) * 100) : 0;

    onUpdateUnit({
      ...unit,
      sections: newSections,
      progress: newProgress
    });
  };

  const handleAutoFill = (extractedData: { [key: string]: string }) => {
    if (!unit) return;

    const newSections = unit.sections.map(section => ({
      ...section,
      tasks: section.tasks.map(task => {
        if (extractedData[task.id]) {
          return {
            ...task,
            value: extractedData[task.id],
            status: TaskStatus.COMPLETED // Auto-complete found items
          };
        }
        return task;
      })
    }));

    const allTasks = newSections.flatMap(s => s.tasks).filter(t => t.status !== TaskStatus.NA);
    const done = allTasks.filter(t => t.status === TaskStatus.COMPLETED).length;
    const newProgress = allTasks.length > 0 ? Math.round((done / allTasks.length) * 100) : 0;

    onUpdateUnit({
      ...unit,
      sections: newSections,
      progress: newProgress
    });
  };

  const handleLocationChange = (newLocation: UnitLocation) => {
    if (!unit) return;
    onUpdateUnit({ ...unit, location: newLocation });
  };

  const handleEmailClick = (taskId: string, taskLabel: string, assignee?: string) => {
    setEmailDraft({ isOpen: true, taskId, taskLabel, assignee });
  };

  if (!unit) return <div className="p-10 text-center">Unit not found</div>;

  const currentLifecycle = getCurrentLifecycleState();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {unit.unitCode}
                </h1>
                
                {/* Lifecycle Switcher Dropdown */}
                <div className="relative group">
                    <select 
                        value={currentLifecycle}
                        onChange={(e) => handleLifecycleChange(e.target.value)}
                        className={`appearance-none pl-3 pr-8 py-1 rounded-full text-xs font-bold uppercase tracking-wider border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                            currentLifecycle === 'active' ? 'bg-green-100 text-green-700 border-green-200 focus:ring-green-500' :
                            currentLifecycle === 'offboarding' ? 'bg-red-100 text-red-700 border-red-200 focus:ring-red-500' :
                            currentLifecycle === 'forsale' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 focus:ring-yellow-500' :
                            currentLifecycle === 'stalled' ? 'bg-gray-200 text-gray-700 border-gray-300 focus:ring-gray-500' :
                            'bg-blue-100 text-blue-700 border-blue-200 focus:ring-blue-500'
                        }`}
                    >
                        <option value="onboarding">Onboarding</option>
                        <option value="active">Active Portfolio</option>
                        <option value="offboarding">Offboarding</option>
                        <option value="forsale">For Sale</option>
                        <option value="stalled">Stalled</option>
                    </select>
                     <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                         currentLifecycle === 'active' ? 'text-green-700' :
                         currentLifecycle === 'offboarding' ? 'text-red-700' :
                         currentLifecycle === 'forsale' ? 'text-yellow-700' :
                         'text-blue-700'
                     }`}>
                        <RefreshCw size={10} />
                     </div>
                </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
               <span className="font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {unit.ownerName}
                </span>
               <div className="flex items-center gap-1">
                 <MapPin size={14} />
                 <select 
                   value={unit.location} 
                   onChange={(e) => handleLocationChange(e.target.value as UnitLocation)}
                   className="bg-transparent border-none p-0 text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
                 >
                   {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                 </select>
               </div>
               {currentLifecycle === 'onboarding' && (
                  <span className="flex items-center gap-1"><PieChart size={14}/> Progress: <span className="font-medium text-gray-700">{percentage}%</span></span>
               )}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
           <button 
            onClick={() => setIsAIOpen(true)}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm"
           >
             <Sparkles size={18} />
             <span className="hidden sm:inline">Assistant</span>
           </button>
           <button 
             onClick={() => setShowDocs(!showDocs)}
             className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors shadow-sm ${showDocs ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
           >
             <FileText size={18} />
             <span className="hidden sm:inline">Documents</span>
           </button>
        </div>
      </div>

      {/* Content Layout */}
      <div className="flex gap-8 flex-1 min-h-0">
        {/* Sidebar Navigation */}
        <div className="w-64 flex-shrink-0 overflow-y-auto pr-2 hidden md:block">
          <nav className="space-y-1">
            {unit.sections.map(section => {
               const sectionCompleted = section.tasks.every(t => t.status === TaskStatus.COMPLETED || t.status === TaskStatus.NA);
               return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex justify-between items-center ${
                    activeSection === section.id
                      ? 'bg-white shadow-md text-indigo-600 border border-gray-100'
                      : 'text-gray-600 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  {section.title}
                  {sectionCompleted && <CheckCircle2 size={16} className="text-green-500" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          
          {/* Document Automation Zone (Collapsible) */}
          {showDocs && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex-shrink-0 animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">Document Automation</h3>
                  <p className="text-sm text-gray-500">Upload PMAs, Tax Forms, or Voided Checks to auto-fill fields.</p>
                </div>
              </div>
              <DocumentUploader unit={unit} onDataExtracted={handleAutoFill} />
            </div>
          )}

          {/* Tasks */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
               <h2 className="text-lg font-semibold text-gray-800">
                 {unit.sections.find(s => s.id === activeSection)?.title}
               </h2>
               <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Task List</div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-1">
                {/* Headers */}
                 <div className="grid grid-cols-12 gap-4 px-2 pb-2 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase">
                    <div className="col-span-4">Task / Label</div>
                    <div className="col-span-5">Information / Input</div>
                    <div className="col-span-3 text-right">Status</div>
                 </div>

                {unit.sections
                  .find(s => s.id === activeSection)
                  ?.tasks.map(task => (
                    <TaskRow 
                      key={task.id} 
                      task={task} 
                      onUpdate={(updated) => handleTaskUpdate(activeSection, updated)} 
                      onEmailClick={() => handleEmailClick(task.id, task.label, task.assignee)}
                    />
                  ))}
              </div>
              
              {/* Empty State Helper */}
              {unit.sections.find(s => s.id === activeSection)?.tasks.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No tasks in this section.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AIAssistant 
        unit={unit} 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
      />

      {emailDraft.isOpen && (
        <EmailDraftModal
          unit={unit}
          taskId={emailDraft.taskId}
          taskLabel={emailDraft.taskLabel}
          assignee={emailDraft.assignee}
          onClose={() => setEmailDraft({ ...emailDraft, isOpen: false })}
        />
      )}
    </div>
  );
};

const NavLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
};

interface AppProps {
  apiKey?: string;
}

// --- Main App Container ---
const App: React.FC<AppProps> = ({ apiKey }) => {
  const [units, setUnits] = useState<OnboardingUnit[]>([
    ...MOCK_UNITS,
    ...MOCK_OFFBOARDING,
    ...MOCK_FOR_SALE,
    ...MOCK_ACTIVE
  ]);

  // User State (Simulating login)
  const [currentUser, setCurrentUser] = useState<User>({
    name: 'Justin Brunold',
    role: 'Admin',
    avatarInitials: 'JB'
  });

  useEffect(() => {
    if (apiKey) {
      initializeGemini(apiKey);
    }
  }, [apiKey]);

  const handleAddUnit = () => {
    const newUnit: OnboardingUnit = {
      id: Date.now().toString(),
      unitCode: 'NEW-UNIT',
      ownerName: 'TBD',
      location: 'Maui',
      status: 'New',
      progress: 0,
      sections: UNIT_TEMPLATE_SECTIONS.map(s => ({
        ...s,
        tasks: s.tasks.map(t => ({...t, value: '', status: TaskStatus.PENDING}))
      })),
      transitionDetails: {
        salesRep: 'TBD',
        transferType: 'Transfer',
        effectiveDate: '',
        priorPM: '',
        inspectionStatus: 'N/A',
        contingencies: 'N/A',
        notes: ''
      }
    };
    setUnits([newUnit, ...units]);
  };

  const handleUpdateUnit = (updatedUnit: OnboardingUnit) => {
    setUnits(prev => prev.map(u => u.id === updatedUnit.id ? updatedUnit : u));
  };

  const toggleRole = () => {
    setCurrentUser(prev => ({
       ...prev,
       name: prev.role === 'Admin' ? 'Staff Member' : 'Justin Brunold',
       role: prev.role === 'Admin' ? 'Staff' : 'Admin',
       avatarInitials: prev.role === 'Admin' ? 'SM' : 'JB'
    }));
  };

  return (
    <UserContext.Provider value={currentUser}>
      <HashRouter>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
          {/* Top Nav */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2">
                  <div className="bg-indigo-600 p-2 rounded-lg">
                    <LayoutDashboard className="text-white" size={20} />
                  </div>
                  <span className="font-bold text-xl tracking-tight text-gray-900">FlowState</span>
                </Link>

                <nav className="hidden md:flex items-center gap-2">
                  <NavLink to="/" icon={LayoutGrid} label="Dashboard" />
                  <NavLink to="/guide" icon={BookOpen} label="Process Guide" />
                </nav>
              </div>

              <div className="flex items-center gap-4">
                {/* Role Toggler (For Demo) */}
                <button 
                  onClick={toggleRole}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    currentUser.role === 'Admin' 
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="Click to toggle permissions"
                >
                   {currentUser.role === 'Admin' ? <ShieldCheck size={14} /> : <UserCircle size={14} />}
                   {currentUser.role} View
                </button>

                 <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs border border-indigo-200">
                   {currentUser.avatarInitials}
                 </div>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard units={units} onAddUnit={handleAddUnit} />} />
            <Route path="/guide" element={<ProcessFlowGuide />} />
            <Route 
              path="/unit/:id" 
              element={<UnitDetail units={units} onUpdateUnit={handleUpdateUnit} />} 
            />
          </Routes>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
};

export default App;
