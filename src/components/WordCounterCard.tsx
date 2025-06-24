
import React from 'react';

interface WordCounterCardProps {
  title: string;
  value: string | number;
  color: string;
}

const WordCounterCard = ({ title, value, color }: WordCounterCardProps) => {
  return (
    <div className={`bg-gradient-to-r ${color} rounded-xl p-6 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-lg`}>
      <h3 className="text-sm font-medium opacity-90 mb-2">{title}</h3>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

export default WordCounterCard;
