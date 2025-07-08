
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface Patent {
  id: string;
  status: string;
}

interface PatentAnalysisStatsProps {
  patents: Patent[];
}

export const PatentAnalysisStats: React.FC<PatentAnalysisStatsProps> = ({ patents }) => {
  const validCount = patents.filter(p => p.status === '유효').length;
  const invalidCount = patents.filter(p => p.status === '무효').length;
  const pendingCount = patents.filter(p => p.status === '심사중').length;

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
              <p className="text-sm font-medium">유효</p>
              <p className="text-2xl font-bold">{validCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium">무효</p>
              <p className="text-2xl font-bold">{invalidCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium">심사중</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
