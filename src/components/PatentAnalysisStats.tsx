
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle, AlertTriangle, Star } from 'lucide-react';

interface Patent {
  id: string;
  status: 'active' | 'inactive';
  detailStatus: string;
  grade?: 'S' | 'A' | 'B' | 'C' | 'X';
}

interface PatentAnalysisStatsProps {
  patents: Patent[];
}

export const PatentAnalysisStats: React.FC<PatentAnalysisStatsProps> = ({ patents }) => {
  const activeCount = patents.filter(p => p.status === 'active').length;
  const inactiveCount = patents.filter(p => p.status === 'inactive').length;
  
  // Exclude X grade patents from major patents
  const majorPatentsCount = patents.filter(p => p.grade && p.grade !== 'X').length;
  const corePatentsCount = patents.filter(p => p.grade === 'S' || p.grade === 'A').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">전체</p>
              <p className="text-2xl font-bold">{patents.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">Active</p>
              <p className="text-2xl font-bold">{activeCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium">Inactive</p>
              <p className="text-2xl font-bold">{inactiveCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium">주요특허</p>
              <p className="text-2xl font-bold">{majorPatentsCount}</p>
              <p className="text-xs text-gray-500">핵심: {corePatentsCount}건</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
