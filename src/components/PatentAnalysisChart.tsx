
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Patent {
  id: string;
  status: string;
  detailStatus: string;
  category1: string;
  grade?: 'S' | 'A' | 'B' | 'C' | 'X';
}

interface PatentAnalysisChartProps {
  patents: Patent[];
}

export const PatentAnalysisChart: React.FC<PatentAnalysisChartProps> = ({ patents }) => {
  // Core patent ratio (S and A grades)
  const corePatents = patents.filter(p => p.grade === 'S' || p.grade === 'A').length;
  const totalPatents = patents.length;
  const coreRatio = totalPatents > 0 ? (corePatents / totalPatents * 100).toFixed(1) : '0';
  
  const corePatentData = [
    { 
      name: '핵심특허', 
      value: corePatents, 
      color: '#EF4444',
      percentage: coreRatio
    },
    { 
      name: '일반특허', 
      value: totalPatents - corePatents, 
      color: '#94A3B8',
      percentage: (100 - parseFloat(coreRatio)).toFixed(1)
    }
  ];

  const statusData = [
    { name: 'Active', value: patents.filter(p => p.status === 'active').length, color: '#10B981' },
    { name: 'Inactive', value: patents.filter(p => p.status === 'inactive').length, color: '#EF4444' }
  ];

  const categoryData = [
    { category: '1A', count: patents.filter(p => p.category1 === '1A').length },
    { category: '1B', count: patents.filter(p => p.category1 === '1B').length },
    { category: '1C', count: patents.filter(p => p.category1 === '1C').length }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>핵심특허 비율</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={corePatentData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {corePatentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
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

      <Card>
        <CardHeader>
          <CardTitle>분류별 특허 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
