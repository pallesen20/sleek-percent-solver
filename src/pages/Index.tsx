
import React, { useState } from 'react';
import { Calculator, Percent, TrendingUp, TrendingDown } from 'lucide-react';
import PercentageCalculator from '../components/PercentageCalculator';
import CalculatorCard from '../components/CalculatorCard';

const Index = () => {
  const [activeCalculator, setActiveCalculator] = useState('basic');

  const calculatorTypes = [
    {
      id: 'basic',
      title: 'Basic Percentage',
      description: 'Calculate X% of a number',
      icon: Percent,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'increase',
      title: 'Percentage Increase',
      description: 'Calculate percentage increase between two numbers',
      icon: TrendingUp,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'decrease',
      title: 'Percentage Decrease',
      description: 'Calculate percentage decrease between two numbers',
      icon: TrendingDown,
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'whatPercent',
      title: 'What Percentage',
      description: 'Find what percentage X is of Y',
      icon: Calculator,
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Percent className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Advanced Percentage Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional-grade percentage calculations with multiple modes. Fast, accurate, and beautifully designed.
          </p>
        </div>

        {/* Calculator Type Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {calculatorTypes.map((type) => (
            <CalculatorCard
              key={type.id}
              type={type}
              isActive={activeCalculator === type.id}
              onClick={() => setActiveCalculator(type.id)}
            />
          ))}
        </div>

        {/* Main Calculator */}
        <div className="max-w-2xl mx-auto">
          <PercentageCalculator type={activeCalculator} />
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose Our Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Multiple Modes</h3>
              <p className="text-gray-300">Four different calculation types to cover all your percentage needs</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Results</h3>
              <p className="text-gray-300">Instant calculations as you type with live preview</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Percent className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Professional Design</h3>
              <p className="text-gray-300">Modern, responsive interface that works on any device</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
