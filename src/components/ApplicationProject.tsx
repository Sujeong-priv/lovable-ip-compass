
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Calendar,
  User,
  Building,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { PatentForm } from '@/components/PatentForm';
import { ApplicationFlow } from '@/components/ApplicationFlow';

interface ApplicationProjectProps {
  projectId: string;
  customerId: string;
}

export const ApplicationProject: React.FC<ApplicationProjectProps> = ({ projectId, customerId }) => {
  const [viewMode, setViewMode] = useState<'all' | 'owned' | 'new'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatent, setSelectedPatent] = useState<string | null>(null);

  // Mock data - 실제로는 Supabase에서 가져올 데이터
  const patents = [
    {
      id: 'pat-1',
      piRef: 'PI-2024-001',
      clientRef: 'SEC-AI-001',
      status: '신규출원',
      workingTitle: 'AI 기반 이미지 처리',
      inventionTitle: 'AI 기반 이미지 처리 방법 및 시스템',
      applicationNumber: '10-2024-0001234',
      applicationDate: '2024-01-15',
      registrationNumber: '',
      registrationDate: '',
      category1: '1A',
      category2: '2B',
      inventors: ['김철수', '이영희'],
      currentStage: '명세서 송부',
      flowStatus: 'in-progress'
    },
    {
      id: 'pat-2',
      piRef: 'PI-2023-045',
      clientRef: 'SEC-MEM-002',
      status: '보유',
      workingTitle: '메모리 최적화 기술',
      inventionTitle: '반도체 메모리 최적화 기술',
      applicationNumber: '10-2023-0045678',
      applicationDate: '2023-05-20',
      registrationNumber: '10-2456789',
      registrationDate: '2024-01-10',
      category1: '1B',
      category2: '2A',
      inventors: ['박민수', '정다영', '최준호'],
      currentStage: '등록 완료',
      flowStatus: 'completed'
    },
    {
      id: 'pat-3',
      piRef: 'PI-2024-002',
      clientRef: 'SEC-5G-001',
      status: '신규출원',
      workingTitle: '5G 통신 프로토콜',
      inventionTitle: '5G 통신 프로토콜 개선 방법',
      applicationNumber: '10-2024-0002345',
      applicationDate: '2024-01-20',
      registrationNumber: '',
      registrationDate: '',
      category1: '1C',
      category2: '2C',
      inventors: ['송민석'],
      currentStage: 'OA 대응',
      flowStatus: 'in-progress'
    }
  ];

  const filteredPatents = patents.filter(patent => {
    const matchesView = viewMode === 'all' || 
      (viewMode === 'owned' && patent.status === '보유') ||
      (viewMode === 'new' && patent.status === '신규출원');
    
    const matchesSearch = searchTerm === '' || 
      patent.inventionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.piRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.clientRef.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesView && matchesSearch;
  });

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
    <div className="space-y-6">
      {/* 필터 및 액션 버튼 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as typeof viewMode)}>
            <TabsList>
              <TabsTrigger value="all">전체 보기</TabsTrigger>
              <TabsTrigger value="owned">보유 특허</TabsTrigger>
              <TabsTrigger value="new">신규 출원</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="특허명, 관리번호로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                특허 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>새 특허 추가</DialogTitle>
              </DialogHeader>
              <PatentForm onSubmit={(data) => console.log('Patent added:', data)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 통계 요약 */}
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
                <p className="text-2xl font-bold">{patents.filter(p => p.status === '보유').length}</p>
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
                <p className="text-2xl font-bold">{patents.filter(p => p.status === '신규출원').length}</p>
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
                <p className="text-2xl font-bold">{patents.filter(p => p.status === '신규출원' && p.flowStatus === 'in-progress').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 특허 테이블 */}
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
              {filteredPatents.map((patent) => (
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

          {filteredPatents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
