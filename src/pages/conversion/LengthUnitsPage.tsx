import React, { useState } from 'react';
import { ArrowLeftRight, Ruler } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const LengthUnitsPage = () => {
  const [fromValue, setFromValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [result, setResult] = useState('');

  const units = {
    meters: 1,
    centimeters: 100,
    millimeters: 1000,
    kilometers: 0.001,
    inches: 39.3701,
    feet: 3.28084,
    yards: 1.09361,
    miles: 0.000621371
  };

  const convert = () => {
    if (!fromValue) return;
    const meters = parseFloat(fromValue) / units[fromUnit as keyof typeof units];
    const converted = meters * units[toUnit as keyof typeof units];
    setResult(converted.toFixed(6));
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(result);
    setResult(fromValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Ruler className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 leading-tight">
            Length Converter
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Convert between different length units quickly and accurately
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">Unit Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">From</label>
                  <Input
                    type="number"
                    placeholder="Enter value"
                    value={fromValue}
                    onChange={(e) => setFromValue(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(units).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={swap}
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">To</label>
                  <Input
                    type="text"
                    placeholder="Result"
                    value={result}
                    readOnly
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(units).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={convert}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-2"
                >
                  Convert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LengthUnitsPage;