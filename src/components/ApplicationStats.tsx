
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Award, Clock, CheckCircle } from 'lucide-react';

interface Patent {
  id: string;
  status: string;
  flowStatus?: string;
}

interface ApplicationStatsProps {
  patents: Patent[];
}

export const ApplicationStats: React.FC<ApplicationStatsProps> = ({ patents }) => {
  const ownedCount = patents.filter(p => p.status === '보유').length;
  const newApplicationCount = patents.filter(p => p.status === '신규출원').length;
  const inProgressCount = patents.filter(p => p.status === '신규출원' && p.flowStatus === 'in-progress').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
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
            <Award className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">보유</p>
              <p className="text-2xl font-bold">{ownedCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium">신규출원</p>
              <p className="text-2xl font-bold">{newApplicationCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">진행중</p>
              <p className="text-2xl font-bold">{inProgressCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
