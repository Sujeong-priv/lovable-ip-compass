
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Patent {
  id: string;
  status: string;
  detailStatus: string;
  category1: string;
  category2?: string;
  grade?: 'S' | 'A' | 'B' | 'C' | 'X';
}

interface PatentAnalysisChartProps {
  patents: Patent[];
}

export const PatentAnalysisChart: React.FC<PatentAnalysisChartProps> = ({ patents }) => {
  // Exclude X grade patents from analysis
  const analyzedPatents = patents.filter(p => p.grade && p.grade !== 'X');
  
  // Core patents (S and A grades)
  const corePatents = analyzedPatents.filter(p => p.grade === 'S' || p.grade === 'A').length;
  
  // Major patents (S, A, B, C grades - excluding X)
  const majorPatents = analyzedPatents.length;
  
  const coreRatio = majorPatents > 0 ? (corePatents / majorPatents * 100).toFixed(1) : '0';
  
  const patentClassificationData = [
    { 
      name: '핵심특허', 
      value: corePatents, 
      color: '#DC2626',
      percentage: coreRatio
    },
    { 
      name: '일반특허', 
      value: majorPatents - corePatents, 
      color: '#3B82F6',
      percentage: (100 - parseFloat(coreRatio)).toFixed(1)
    }
  ];

  const statusData = [
    { name: 'Active', value: patents.filter(p => p.status === 'active').length, color: '#10B981' },
    { name: 'Inactive', value: patents.filter(p => p.status === 'inactive').length, color: '#EF4444' }
  ];

  // 2D Matrix data for technical classification
  const generateMatrixData = () => {
    const matrix: { [key: string]: { [key: string]: number } } = {};
    
    analyzedPatents.forEach(patent => {
      const axis1 = patent.category1;
      const axis2 = patent.category2 || '미분류';
      
      if (!matrix[axis1]) matrix[axis1] = {};
      if (!matrix[axis1][axis2]) matrix[axis1][axis2] = 0;
      matrix[axis1][axis2]++;
    });

    return matrix;
  };

  const matrixData = generateMatrixData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>주요특허 내 핵심특허 비율</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={patentClassificationData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {patentClassificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-600">
            <p>주요특허 총 {majorPatents}건 중 핵심특허 {corePatents}건</p>
            <p className="text-xs text-gray-500">* X급 특허는 집계에서 제외됨</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>특허 상태 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>2차원 기술 분류 매트릭스</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left">1축 \ 2축</th>
                  <th className="border border-gray-300 p-3">2A (하드웨어)</th>
                  <th className="border border-gray-300 p-3">2B (소프트웨어)</th>
                  <th className="border border-gray-300 p-3">2C (시스템)</th>
                  <th className="border border-gray-300 p-3">미분류</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(matrixData).map(([axis1, axis2Data]) => (
                  <tr key={axis1}>
                    <td className="border border-gray-300 p-3 font-medium bg-gray-50">
                      {axis1}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        axis2Data['2A'] ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {axis2Data['2A'] || 0}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        axis2Data['2B'] ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {axis2Data['2B'] || 0}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        axis2Data['2C'] ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {axis2Data['2C'] || 0}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        axis2Data['미분류'] ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {axis2Data['미분류'] || 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
