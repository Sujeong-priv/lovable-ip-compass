
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Patent {
  id: string;
  status: string;
  category1: string;
}

interface PatentAnalysisChartProps {
  patents: Patent[];
}

export const PatentAnalysisChart: React.FC<PatentAnalysisChartProps> = ({ patents }) => {
  const statusData = [
    { name: '유효', value: patents.filter(p => p.status === '유효').length, color: '#10B981' },
    { name: '무효', value: patents.filter(p => p.status === '무효').length, color: '#EF4444' },
    { name: '심사중', value: patents.filter(p => p.status === '심사중').length, color: '#F59E0B' }
  ];

  const categoryData = [
    { category: '1A', count: patents.filter(p => p.category1 === '1A').length },
    { category: '1B', count: patents.filter(p => p.category1 === '1B').length },
    { category: '1C', count: patents.filter(p => p.category1 === '1C').length }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
