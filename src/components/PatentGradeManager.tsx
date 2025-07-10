
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star, Edit, Shield, AlertTriangle } from 'lucide-react';
import { Patent } from './ValidPatentAnalysis';

interface PatentGradeManagerProps {
  patents: Patent[];
  onGradeUpdate: (patentId: string, grade: 'S' | 'A' | 'B' | 'C' | 'X', reason?: string) => void;
}

export const PatentGradeManager: React.FC<PatentGradeManagerProps> = ({ patents, onGradeUpdate }) => {
  const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<'S' | 'A' | 'B' | 'C' | 'X'>('X');
  const [gradeReason, setGradeReason] = useState('');

  const getGradeBadge = (grade?: 'S' | 'A' | 'B' | 'C' | 'X') => {
    if (!grade) return <Badge variant="outline">미분류</Badge>;
    
    const gradeConfig = {
      'S': { variant: 'destructive' as const, color: 'bg-red-600', text: 'S급 (핵심)' },
      'A': { variant: 'destructive' as const, color: 'bg-orange-600', text: 'A급 (핵심)' },
      'B': { variant: 'secondary' as const, color: 'bg-blue-600', text: 'B급' },
      'C': { variant: 'outline' as const, color: 'bg-gray-600', text: 'C급' },
      'X': { variant: 'outline' as const, color: 'bg-gray-400', text: 'X급 (미분류)' }
    };

    const config = gradeConfig[grade];
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const getGradeIcon = (grade?: 'S' | 'A' | 'B' | 'C' | 'X') => {
    if (grade === 'S' || grade === 'A') {
      return <Shield className="h-4 w-4 text-red-600" />;
    }
    return <Star className="h-4 w-4 text-gray-400" />;
  };

  const handleGradeSubmit = () => {
    if (selectedPatent) {
      onGradeUpdate(selectedPatent.id, selectedGrade, gradeReason);
      setIsDialogOpen(false);
      setSelectedPatent(null);
      setGradeReason('');
    }
  };

  const openGradeDialog = (patent: Patent) => {
    setSelectedPatent(patent);
    setSelectedGrade(patent.grade || 'X');
    setGradeReason(patent.gradeReason || '');
    setIsDialogOpen(true);
  };

  const gradeStats = {
    S: patents.filter(p => p.grade === 'S').length,
    A: patents.filter(p => p.grade === 'A').length,
    B: patents.filter(p => p.grade === 'B').length,
    C: patents.filter(p => p.grade === 'C').length,
    X: patents.filter(p => p.grade === 'X' || !p.grade).length
  };

  const corePatents = gradeStats.S + gradeStats.A;

  return (
    <div className="space-y-6">
      {/* 등급별 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium">핵심특허</p>
                <p className="text-2xl font-bold text-red-600">{corePatents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {Object.entries(gradeStats).map(([grade, count]) => (
          <Card key={grade}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                {getGradeIcon(grade as 'S' | 'A' | 'B' | 'C' | 'X')}
                <div>
                  <p className="text-sm font-medium">{grade}급</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 등급 설명 카드 */}
      <Card>
        <CardHeader>
          <CardTitle>등급 분류 기준</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Badge variant="destructive">S급</Badge>
                <div>
                  <p className="font-medium text-red-600">핵심특허 - 대응논리 필요</p>
                  <p className="text-sm text-gray-600">현재 실시 중인 보유기술 또는 특허 출원된 보유기술과 대응도가 높아 비침해 논리 또는 회피 설계가 필요한 문헌</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Badge variant="destructive" className="bg-orange-600">A급</Badge>
                <div>
                  <p className="font-medium text-orange-600">핵심특허 - 대응논리 필요</p>
                  <p className="text-sm text-gray-600">향후 출원예정 기술 또는 개발 예정 기술과 대응도가 높아 회피 설계가 필요하거나, 참고하여 신규 기술 개발에 이용할 수 있는 문헌</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Badge variant="secondary">B급</Badge>
                <div>
                  <p className="font-medium">참고특허</p>
                  <p className="text-sm text-gray-600">현 시점에서 관련 기술을 직접 개발할 계획은 없으나, 신규 특허 아이디어 발굴 시 참고할 수 있는 문헌</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Badge variant="outline">C급</Badge>
                <div>
                  <p className="font-medium">일반특허</p>
                  <p className="text-sm text-gray-600">현 시점에서 관련 기술을 직접 개발할 계획은 없으나, 기술 분야 내에서 일부 참고할 만한 내용을 포함하고 있는 문헌</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="text-gray-400">X급</Badge>
                <div>
                  <p className="font-medium text-gray-500">미분류</p>
                  <p className="text-sm text-gray-600">보유 기술 또는 출원예정 기술과 관련도가 높지 않아 모니터링이 불필요한 문헌</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 특허 등급 관리 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>특허 등급 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>출원번호</TableHead>
                <TableHead>발명의 명칭</TableHead>
                <TableHead>현재 등급</TableHead>
                <TableHead>등급 사유</TableHead>
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
                      {getGradeIcon(patent.grade)}
                      {getGradeBadge(patent.grade)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {patent.gradeReason || '미분류'}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openGradeDialog(patent)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      등급설정
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 등급 설정 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>특허 등급 설정</DialogTitle>
          </DialogHeader>
          {selectedPatent && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">출원번호: {selectedPatent.applicationNumber}</p>
                <p className="text-sm text-gray-600">{selectedPatent.title}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">등급 선택</label>
                <Select value={selectedGrade} onValueChange={(value) => setSelectedGrade(value as 'S' | 'A' | 'B' | 'C' | 'X')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S">S급 - 핵심특허 (현재 실시기술 대응도 높음)</SelectItem>
                    <SelectItem value="A">A급 - 핵심특허 (향후 출원기술 대응도 높음)</SelectItem>
                    <SelectItem value="B">B급 - 참고특허 (신규 아이디어 발굴 참고)</SelectItem>
                    <SelectItem value="C">C급 - 일반특허 (기술 분야 내 일부 참고)</SelectItem>
                    <SelectItem value="X">X급 - 미분류 (모니터링 불필요)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">등급 설정 사유</label>
                <Textarea
                  value={gradeReason}
                  onChange={(e) => setGradeReason(e.target.value)}
                  placeholder="등급을 부여한 이유를 입력하세요..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleGradeSubmit}>
                  등급 설정
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
