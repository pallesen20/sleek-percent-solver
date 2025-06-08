
import React, { useState, useEffect } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface PercentageCalculatorProps {
  type: string;
}

const PercentageCalculator: React.FC<PercentageCalculatorProps> = ({ type }) => {
  const [values, setValues] = useState({
    number1: '',
    number2: '',
    percentage: ''
  });
  const [result, setResult] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateResult = () => {
    const num1 = parseFloat(values.number1);
    const num2 = parseFloat(values.number2);
    const percent = parseFloat(values.percentage);

    switch (type) {
      case 'basic':
        if (!isNaN(num1) && !isNaN(percent)) {
          setResult((num1 * percent) / 100);
        }
        break;
      case 'increase':
        if (!isNaN(num1) && !isNaN(num2)) {
          setResult(((num2 - num1) / num1) * 100);
        }
        break;
      case 'decrease':
        if (!isNaN(num1) && !isNaN(num2)) {
          setResult(((num1 - num2) / num1) * 100);
        }
        break;
      case 'whatPercent':
        if (!isNaN(num1) && !isNaN(num2)) {
          setResult((num1 / num2) * 100);
        }
        break;
      default:
        setResult(null);
    }
  };

  useEffect(() => {
    calculateResult();
  }, [values, type]);

  const handleInputChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toFixed(2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetCalculator = () => {
    setValues({ number1: '', number2: '', percentage: '' });
    setResult(null);
  };

  const getCalculatorConfig = () => {
    switch (type) {
      case 'basic':
        return {
          title: 'Basic Percentage Calculator',
          description: 'Calculate what X% of a number is',
          inputs: [
            { field: 'percentage', label: 'Percentage (%)', placeholder: 'Enter percentage' },
            { field: 'number1', label: 'Of Number', placeholder: 'Enter number' }
          ],
          resultLabel: 'Result:',
          formula: `${values.percentage}% of ${values.number1}`,
          gradient: 'from-blue-500 to-purple-600'
        };
      case 'increase':
        return {
          title: 'Percentage Increase Calculator',
          description: 'Calculate the percentage increase between two numbers',
          inputs: [
            { field: 'number1', label: 'Original Number', placeholder: 'Enter original number' },
            { field: 'number2', label: 'New Number', placeholder: 'Enter new number' }
          ],
          resultLabel: 'Percentage Increase:',
          formula: `From ${values.number1} to ${values.number2}`,
          gradient: 'from-green-500 to-teal-600'
        };
      case 'decrease':
        return {
          title: 'Percentage Decrease Calculator',
          description: 'Calculate the percentage decrease between two numbers',
          inputs: [
            { field: 'number1', label: 'Original Number', placeholder: 'Enter original number' },
            { field: 'number2', label: 'New Number', placeholder: 'Enter new number' }
          ],
          resultLabel: 'Percentage Decrease:',
          formula: `From ${values.number1} to ${values.number2}`,
          gradient: 'from-red-500 to-pink-600'
        };
      case 'whatPercent':
        return {
          title: 'What Percentage Calculator',
          description: 'Find what percentage one number is of another',
          inputs: [
            { field: 'number1', label: 'First Number', placeholder: 'Enter first number' },
            { field: 'number2', label: 'Second Number', placeholder: 'Enter second number' }
          ],
          resultLabel: 'Percentage:',
          formula: `${values.number1} is what % of ${values.number2}`,
          gradient: 'from-orange-500 to-yellow-600'
        };
      default:
        return {
          title: 'Calculator',
          description: '',
          inputs: [],
          resultLabel: 'Result:',
          formula: '',
          gradient: 'from-blue-500 to-purple-600'
        };
    }
  };

  const config = getCalculatorConfig();

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{config.title}</h2>
        <p className="text-gray-300">{config.description}</p>
      </div>

      <div className="space-y-6">
        {config.inputs.map((input, index) => (
          <div key={input.field} className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              {input.label}
            </label>
            <input
              type="number"
              value={values[input.field as keyof typeof values]}
              onChange={(e) => handleInputChange(input.field, e.target.value)}
              placeholder={input.placeholder}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        ))}

        {/* Formula Display */}
        {config.formula && (values.number1 || values.number2 || values.percentage) && (
          <div className="bg-black/20 rounded-lg p-4 border border-white/10">
            <p className="text-sm text-gray-400 mb-1">Formula:</p>
            <p className="text-white font-mono">{config.formula}</p>
          </div>
        )}

        {/* Result Display */}
        {result !== null && (
          <div className={`bg-gradient-to-r ${config.gradient} rounded-lg p-6 text-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <p className="text-white/80 text-sm mb-2">{config.resultLabel}</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-bold text-white">
                  {result.toFixed(2)}
                  {(type === 'increase' || type === 'decrease' || type === 'whatPercent') && '%'}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Copy className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-white/80 text-sm mt-2 animate-fade-in">Copied to clipboard!</p>
              )}
            </div>
          </div>
        )}

        {/* Reset Button */}
        <button
          onClick={resetCalculator}
          className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Calculator
        </button>
      </div>
    </div>
  );
};

export default PercentageCalculator;
