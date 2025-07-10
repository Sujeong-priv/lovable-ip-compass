
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, AlertTriangle, Clock, Eye, Shield, Star } from 'lucide-react';
import { Patent } from './ValidPatentAnalysis';

interface PatentAnalysisTableProps {
  patents: Patent[];
  selectedPatents: string[];
  onPatentSelection: (patentIds: string[]) => void;
  onGradeUpdate: (patentId: string, grade: 'S' | 'A' | 'B' | 'C' | 'X', reason?: string) => void;
}

export const PatentAnalysisTable: React.FC<PatentAnalysisTableProps> = ({ 
  patents, 
  selectedPatents, 
  onPatentSelection,
  onGradeUpdate 
}) => {
  const getStatusBadge = (status: 'active' | 'inactive', detailStatus: string) => {
    if (status === 'active') {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">{detailStatus}</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-red-100 text-red-800">{detailStatus}</Badge>;
    }
  };

  const getStatusIcon = (status: 'active' | 'inactive', detailStatus: string) => {
    if (status === 'active') {
      if (detailStatus === '심사중') {
        return <Clock className="h-4 w-4 text-orange-600" />;
      }
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else {
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getGradeBadge = (grade?: 'S' | 'A' | 'B' | 'C' | 'X') => {
    if (!grade) return <Badge variant="outline">미분류</Badge>;
    
    const gradeConfig = {
      'S': { variant: 'destructive' as const, text: 'S급', className: '' },
      'A': { variant: 'destructive' as const, text: 'A급', className: 'bg-orange-600' },
      'B': { variant: 'secondary' as const, text: 'B급', className: '' },
      'C': { variant: 'outline' as const, text: 'C급', className: '' },
      'X': { variant: 'outline' as const, text: 'X급', className: 'text-gray-500' }
    };

    const config = gradeConfig[grade];
    return <Badge variant={config.variant} className={config.className || undefined}>{config.text}</Badge>;
  };

  const getGradeIcon = (grade?: 'S' | 'A' | 'B' | 'C' | 'X') => {
    if (grade === 'S' || grade === 'A') {
      return <Shield className="h-4 w-4 text-red-600" />;
    }
    return <Star className="h-4 w-4 text-gray-400" />;
  };

  const getValidityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onPatentSelection(patents.map(p => p.id));
    } else {
      onPatentSelection([]);
    }
  };

  const handleSelectPatent = (patentId: string, checked: boolean) => {
    if (checked) {
      onPatentSelection([...selectedPatents, patentId]);
    } else {
      onPatentSelection(selectedPatents.filter(id => id !== patentId));
    }
  };

  const isAllSelected = patents.length > 0 && selectedPatents.length === patents.length;
  const isPartiallySelected = selectedPatents.length > 0 && selectedPatents.length < patents.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>유효특허 분석 결과</span>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{selectedPatents.length}개 선택됨</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  {...(isPartiallySelected && { 'data-indeterminate': true })}
                />
              </TableHead>
              <TableHead>출원번호</TableHead>
              <TableHead>발명의 명칭</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>등급</TableHead>
              <TableHead>1축분류</TableHead>
              <TableHead>2축분류</TableHead>
              <TableHead>출원일</TableHead>
              <TableHead>만료일</TableHead>
              <TableHead>유효성 점수</TableHead>
              <TableHead>액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patents.map((patent) => (
              <TableRow key={patent.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedPatents.includes(patent.id)}
                    onCheckedChange={(checked) => handleSelectPatent(patent.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">{patent.applicationNumber}</TableCell>
                <TableCell className="max-w-xs truncate">{patent.title}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(patent.status, patent.detailStatus)}
                    {getStatusBadge(patent.status, patent.detailStatus)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getGradeIcon(patent.grade)}
                    {getGradeBadge(patent.grade)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">{patent.category1}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">{patent.category2 || '미분류'}</Badge>
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
