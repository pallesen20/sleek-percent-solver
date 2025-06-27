import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LengthUnitsPage = () => {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const conversionTableRef = useRef<HTMLDivElement>(null);

  // Conversion factors to meters
  const conversionFactors = {
    // Metric
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    micrometer: 0.000001,
    nanometer: 0.000000001,
    
    // Imperial
    foot: 0.3048,
    inch: 0.0254,
    yard: 0.9144,
    mile: 1609.344,
    
    // Nautical
    nautical_mile: 1852,
    
    // Other
    furlong: 201.168,
    chain: 20.1168,
    rod: 5.0292,
    fathom: 1.8288,
  };

  const unitLabels = {
    meter: 'Meter (m)',
    kilometer: 'Kilometer (km)',
    centimeter: 'Centimeter (cm)',
    millimeter: 'Millimeter (mm)',
    micrometer: 'Micrometer (μm)',
    nanometer: 'Nanometer (nm)',
    foot: 'Foot (ft)',
    inch: 'Inch (in)',
    yard: 'Yard (yd)',
    mile: 'Mile (mi)',
    nautical_mile: 'Nautical Mile (nmi)',
    furlong: 'Furlong',
    chain: 'Chain',
    rod: 'Rod',
    fathom: 'Fathom',
  };

  const quickConversions = [
    { from: 'meter', to: 'foot', label: 'Meters to Feet' },
    { from: 'foot', to: 'meter', label: 'Feet to Meters' },
    { from: 'inch', to: 'centimeter', label: 'Inches to Centimeters' },
    { from: 'centimeter', to: 'inch', label: 'Centimeters to Inches' },
    { from: 'kilometer', to: 'mile', label: 'Kilometers to Miles' },
    { from: 'mile', to: 'kilometer', label: 'Miles to Kilometers' },
    { from: 'yard', to: 'meter', label: 'Yards to Meters' },
    { from: 'meter', to: 'yard', label: 'Meters to Yards' },
  ];

  const convertLength = (value: number, from: string, to: string): number => {
    const fromFactor = conversionFactors[from as keyof typeof conversionFactors];
    const toFactor = conversionFactors[to as keyof typeof conversionFactors];
    return (value * fromFactor) / toFactor;
  };

  const handleQuickConversion = (from: string, to: string) => {
    setFromUnit(from);
    setToUnit(to);
    conversionTableRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const result = convertLength(parseFloat(inputValue) || 0, fromUnit, toUnit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-700 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Length Unit Converter
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Convert between metric and imperial length units with precision. 
            Get instant results for meters, feet, inches, kilometers, miles, and more.
          </p>
        </div>

        {/* Quick Conversion Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Quick Conversions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {quickConversions.map((conversion, index) => (
              <Button
                key={index}
                onClick={() => handleQuickConversion(conversion.from, conversion.to)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-300 p-4 h-auto text-center backdrop-blur-sm"
                variant="outline"
              >
                <div className="text-sm font-medium">{conversion.label}</div>
              </Button>
            ))}
          </div>
        </div>

        {/* Conversion Table */}
        <div ref={conversionTableRef} className="max-w-4xl mx-auto">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">
                Length Conversion Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="input-value" className="text-white font-medium">
                    Value
                  </Label>
                  <Input
                    id="input-value"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400"
                    placeholder="Enter value"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium">From</Label>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      {Object.entries(unitLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key} className="text-white hover:bg-slate-700">
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-medium">To</Label>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      {Object.entries(unitLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key} className="text-white hover:bg-slate-700">
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-center">
                <div className="text-white/80 text-sm mb-2">Result</div>
                <div className="text-3xl font-bold text-white">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 8 })} {unitLabels[toUnit as keyof typeof unitLabels].split('(')[1]?.replace(')', '') || toUnit}
                </div>
                <div className="text-white/80 text-sm mt-2">
                  {inputValue} {unitLabels[fromUnit as keyof typeof unitLabels].split('(')[1]?.replace(')', '') || fromUnit} = {result.toLocaleString(undefined, { maximumFractionDigits: 8 })} {unitLabels[toUnit as keyof typeof unitLabels].split('(')[1]?.replace(')', '') || toUnit}
                </div>
              </div>

              {/* Common Conversions Table */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Common {unitLabels[fromUnit as keyof typeof unitLabels]} Conversions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(unitLabels).slice(0, 8).map(([unit, label]) => {
                    if (unit === fromUnit) return null;
                    const convertedValue = convertLength(parseFloat(inputValue) || 1, fromUnit, unit);
                    return (
                      <div
                        key={unit}
                        className="bg-white/5 border border-white/10 rounded-lg p-3 flex justify-between items-center hover:bg-white/10 transition-colors"
                      >
                        <span className="text-white font-medium">{label}</span>
                        <span className="text-blue-300 font-semibold">
                          {convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Metric System</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">
                The metric system is a decimal-based system of measurement used worldwide. 
                It's based on units of 10, making conversions straightforward.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• 1 kilometer = 1,000 meters</li>
                <li>• 1 meter = 100 centimeters</li>
                <li>• 1 centimeter = 10 millimeters</li>
                <li>• 1 millimeter = 1,000 micrometers</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Imperial System</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">
                The imperial system is primarily used in the United States and 
                has historical roots in British measurements.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• 1 mile = 5,280 feet</li>
                <li>• 1 yard = 3 feet</li>
                <li>• 1 foot = 12 inches</li>
                <li>• 1 inch = 2.54 centimeters</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LengthUnitsPage;
