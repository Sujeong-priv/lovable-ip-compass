
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, AlertTriangle, Clock, Eye } from 'lucide-react';

interface Patent {
  id: string;
  applicationNumber: string;
  title: string;
  status: string;
  category1: string;
  applicationDate: string;
  expiryDate: string;
  validityScore: number;
}

interface PatentAnalysisTableProps {
  patents: Patent[];
}

export const PatentAnalysisTable: React.FC<PatentAnalysisTableProps> = ({ patents }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case '유효':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">유효</Badge>;
      case '무효':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">무효</Badge>;
      case '심사중':
        return <Badge variant="outline" className="text-orange-600 border-orange-300">심사중</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '유효':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case '무효':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case '심사중':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getValidityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>유효특허 분석 결과</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>출원번호</TableHead>
              <TableHead>발명의 명칭</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>분류</TableHead>
              <TableHead>출원일</TableHead>
              <TableHead>만료일</TableHead>
              <TableHead>유효성 점수</TableHead>
              <TableHead>액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patents.map((patent) => (
              <TableRow key={patent.id}>
                <TableCell className="font-medium">{patent.applicationNumber}</TableCell>
                <TableCell className="max-w-xs truncate">{patent.title}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(patent.status)}
                    {getStatusBadge(patent.status)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">{patent.category1}</Badge>
                </TableCell>
                <TableCell>{patent.applicationDate}</TableCell>
                <TableCell>{patent.expiryDate}</TableCell>
                <TableCell>
                  <span className={`font-semibold ${getValidityColor(patent.validityScore)}`}>
                    {patent.validityScore}점
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    상세보기
                  </Button>
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
