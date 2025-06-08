
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CalculatorType {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface CalculatorCardProps {
  type: CalculatorType;
  isActive: boolean;
  onClick: () => void;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ type, isActive, onClick }) => {
  const Icon = type.icon;

  return (
    <button
      onClick={onClick}
      className={`
        relative p-6 rounded-xl transition-all duration-300 text-left group
        ${isActive 
          ? 'bg-white/20 border-2 border-white/40 shadow-lg transform scale-105' 
          : 'bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:transform hover:scale-102'
        }
        backdrop-blur-sm
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          p-3 rounded-lg bg-gradient-to-r ${type.color} 
          ${isActive ? 'shadow-lg' : 'group-hover:shadow-md'} 
          transition-shadow duration-300
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-100 transition-colors">
            {type.title}
          </h3>
          <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
            {type.description}
          </p>
        </div>
      </div>
      
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl animate-pulse"></div>
      )}
    </button>
  );
};

export default CalculatorCard;
