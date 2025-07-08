
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { ApplicationFlow } from '@/components/ApplicationFlow';

interface Patent {
  id: string;
  piRef: string;
  clientRef: string;
  status: string;
  workingTitle: string;
  inventionTitle: string;
  applicationNumber: string;
  applicationDate: string;
  registrationNumber: string;
  registrationDate: string;
  category1: string;
  category2: string;
  inventors: string[];
  currentStage: string;
  flowStatus?: string;
}

interface ApplicationTableProps {
  patents: Patent[];
  viewMode: 'all' | 'owned' | 'new';
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({ patents, viewMode }) => {
  const getStatusBadge = (status: string, flowStatus?: string) => {
    if (status === '보유') {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">보유</Badge>;
    } else {
      if (flowStatus === 'completed') {
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">출원완료</Badge>;
      } else {
        return <Badge variant="outline" className="text-orange-600 border-orange-300">진행중</Badge>;
      }
    }
  };

  const getStageIcon = (stage: string) => {
    if (stage.includes('완료')) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (stage.includes('OA')) {
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    } else {
      return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>특허 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PI IP Ref.</TableHead>
              <TableHead>고객사 관리번호</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>발명의 명칭</TableHead>
              <TableHead>출원번호</TableHead>
              <TableHead>등록번호</TableHead>
              <TableHead>분류</TableHead>
              <TableHead>발명자</TableHead>
              {viewMode === 'new' && <TableHead>진행단계</TableHead>}
              <TableHead>액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patents.map((patent) => (
              <TableRow key={patent.id}>
                <TableCell className="font-medium">{patent.piRef}</TableCell>
                <TableCell>{patent.clientRef}</TableCell>
                <TableCell>{getStatusBadge(patent.status, patent.flowStatus)}</TableCell>
                <TableCell className="max-w-xs truncate">{patent.inventionTitle}</TableCell>
                <TableCell>{patent.applicationNumber}</TableCell>
                <TableCell>{patent.registrationNumber || '-'}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Badge variant="outline" className="text-xs">{patent.category1}</Badge>
                    <Badge variant="outline" className="text-xs">{patent.category2}</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {patent.inventors.map((inventor, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {inventor}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                {viewMode === 'new' && (
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStageIcon(patent.currentStage)}
                      <span className="text-sm">{patent.currentStage}</span>
                    </div>
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      편집
                    </Button>
                    {patent.status === '신규출원' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            진행관리
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{patent.inventionTitle} - 진행 관리</DialogTitle>
                          </DialogHeader>
                          <ApplicationFlow patentId={patent.id} />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {patents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
