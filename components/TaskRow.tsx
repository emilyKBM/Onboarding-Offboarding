
import React, { useContext, useState } from 'react';
import { TaskItem, TaskStatus } from '../types';
import { Check, X, Minus, MessageSquare, Lock, Eye, EyeOff } from 'lucide-react';
import { UserContext } from '../App';

interface TaskRowProps {
  task: TaskItem;
  onUpdate: (updatedTask: TaskItem) => void;
  onEmailClick: () => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task, onUpdate, onEmailClick }) => {
  const user = useContext(UserContext);
  const [isRevealed, setIsRevealed] = useState(false);
  
  const handleStatusChange = (newStatus: TaskStatus) => {
    onUpdate({ ...task, status: newStatus });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onUpdate({ ...task, value: e.target.value });
  };

  const getStatusButtonClass = (status: TaskStatus) => {
    const base = "p-1.5 rounded-md transition-colors ";
    if (task.status === status) {
      switch (status) {
        case TaskStatus.COMPLETED: return base + "bg-green-100 text-green-700 ring-2 ring-green-500 ring-offset-1";
        case TaskStatus.IN_PROGRESS: return base + "bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500 ring-offset-1";
        case TaskStatus.NA: return base + "bg-gray-100 text-gray-500 ring-2 ring-gray-400 ring-offset-1";
        default: return base + "bg-white text-gray-400 hover:bg-gray-50";
      }
    }
    return base + "bg-white text-gray-300 hover:bg-gray-50 hover:text-gray-500";
  };

  const isMasked = task.isSensitive && user?.role !== 'Admin';
  const shouldMask = task.isSensitive && !isRevealed;

  return (
    <div className="group grid grid-cols-12 gap-4 items-start py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-lg">
      
      {/* Label */}
      <div className="col-span-4 pt-2 flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 block truncate" title={task.label}>
          {task.label}
        </label>
        {task.isSensitive && (
          <Lock size={12} className="text-amber-500" title="Sensitive Information" />
        )}
        {task.assignee && (
           <div className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold" title={`Assigned to ${task.assignee}`}>
              {task.assignee.charAt(0)}
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className="col-span-5 relative">
        {task.type === 'boolean' ? (
          <select
            value={task.value}
            onChange={handleValueChange}
            className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 py-1.5 px-2 border"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Pending">Pending</option>
          </select>
        ) : (
          <div className="relative">
            <input
              type={shouldMask ? "password" : (task.type === 'date' ? 'date' : 'text')}
              value={task.value}
              onChange={handleValueChange}
              disabled={isMasked}
              placeholder={isMasked ? "Restricted Access" : "Enter info..."}
              className={`w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-1.5 px-3 border ${isMasked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900'}`}
            />
            {task.isSensitive && user?.role === 'Admin' && (
              <button 
                onClick={() => setIsRevealed(!isRevealed)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
              >
                {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Status Actions */}
      <div className="col-span-3 flex justify-end items-center gap-1">
        <button
          onClick={() => handleStatusChange(TaskStatus.COMPLETED)}
          className={getStatusButtonClass(TaskStatus.COMPLETED)}
          title="Mark Complete"
        >
          <Check size={14} />
        </button>
        <button
          onClick={() => handleStatusChange(TaskStatus.IN_PROGRESS)}
          className={getStatusButtonClass(TaskStatus.IN_PROGRESS)}
          title="In Progress"
        >
          <div className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin-slow" style={{ animationDuration: '3s'}} />
        </button>
        <button
          onClick={() => handleStatusChange(TaskStatus.NA)}
          className={getStatusButtonClass(TaskStatus.NA)}
          title="Not Applicable"
        >
          <X size={14} />
        </button>
        
         <button 
           onClick={onEmailClick}
           className="p-1.5 text-gray-300 hover:text-indigo-500 ml-1 hover:bg-indigo-50 rounded-md transition-colors"
           title="Request Missing Item"
         >
            <MessageSquare size={14} />
         </button>
      </div>
    </div>
  );
};
