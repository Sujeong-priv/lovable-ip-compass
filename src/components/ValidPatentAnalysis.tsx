
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Building, 
  FileText,
  Calendar,
  Target,
  BarChart3,
  Mail,
  Eye,
  Shield,
  Star,
  Clock
} from 'lucide-react';

interface ValidPatentAnalysisProps {
  projectId: string;
  customerId: string;
}

export const ValidPatentAnalysis: React.FC<ValidPatentAnalysisProps> = ({ projectId, customerId }) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedPresentationRound, setSelectedPresentationRound] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const competitors = [
    { id: 'comp-1', name: 'Apple Inc.', patentCount: 234, monitoringCount: 89 },
    { id: 'comp-2', name: 'Google LLC', patentCount: 167, monitoringCount: 76 },
    { id: 'comp-3', name: 'Microsoft Corp.', patentCount: 145, monitoringCount: 52 },
    { id: 'comp-4', name: 'Meta Platforms', patentCount: 98, monitoringCount: 34 }
  ];

  const presentationRounds = [
    { id: 'round-1', name: '1차 발표 (2024.01)', date: '2024-01-15', patentCount: 18 },
    { id: 'round-2', name: '2차 발표 (2024.02)', date: '2024-02-05', patentCount: 20 },
    { id: 'round-3', name: '3차 발표 (2024.02)', date: '2024-02-19', patentCount: 17 },
    { id: 'round-4', name: '4차 발표 (예정)', date: '2024-03-05', patentCount: 0 }
  ];

  const validPatents = [
    {
      id: 'patent-1',
      competitor: 'Apple Inc.',
      title: 'Neural Engine for Machine Learning Applications',
      applicationNumber: 'US17/123,456',
      applicationDate: '2024-01-15',
      registrationNumber: 'US11,234,567',
      status: '등록',
      grade: 'S',
      presentationRound: 'round-1',
      responseLogic: '비침해 논리: 구현 방식이 상이하여 청구항 침해 소지 없음',
      monitoringStatus: '모니터링 중',
      category1: '1A',
      category2: '2B'
    },
    {
      id: 'patent-2',
      competitor: 'Google LLC',
      title: 'Quantum Computing Error Correction System',
      applicationNumber: 'US17/234,567',
      applicationDate: '2024-01-10',
      registrationNumber: '',
      status: '심사중',
      grade: 'A',
      presentationRound: 'round-1',
      responseLogic: '회피설계: 대안 기술 적용으로 특허 회피 가능',
      monitoringStatus: '심사 경과 확인',
      category1: '1B',
      category2: '2A'
    },
    {
      id: 'patent-3',
      competitor: 'Microsoft Corp.',
      title: 'Cloud-based AI Model Training Infrastructure',
      applicationNumber: 'US17/345,678',
      applicationDate: '2024-01-08',
      registrationNumber: 'US11,345,678',
      status: '등록',
      grade: 'B',
      presentationRound: 'round-2',
      responseLogic: '참고 기술: 신규 기술 개발 시 참고 활용',
      monitoringStatus: '소송/심판 여부 확인',
      category1: '1A',
      category2: '2C'
    }
  ];

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'S':
        return <Badge className="bg-red-600 text-white">S급</Badge>;
      case 'A':
        return <Badge className="bg-orange-600 text-white">A급</Badge>;
      case 'B':
        return <Badge className="bg-blue-600 text-white">B급</Badge>;
      case 'C':
        return <Badge className="bg-green-600 text-white">C급</Badge>;
      case 'X':
        return <Badge variant="outline">X급</Badge>;
      default:
        return <Badge variant="outline">미분류</Badge>;
    }
  };

  const getMonitoringBadge = (status: string) => {
    switch (status) {
      case '모니터링 중':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">모니터링 중</Badge>;
      case '심사 경과 확인':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">심사 경과 확인</Badge>;
      case '소송/심판 여부 확인':
        return <Badge variant="default" className="bg-red-100 text-red-800">소송/심판 확인</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredPatents = validPatents.filter(patent => {
    const matchesCompetitor = selectedCompetitor === 'all' || patent.competitor === selectedCompetitor;
    const matchesGrade = selectedGrade === 'all' || patent.grade === selectedGrade;
    const matchesRound = selectedPresentationRound === 'all' || patent.presentationRound === selectedPresentationRound;
    const matchesSearch = searchTerm === '' || 
      patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.competitor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCompetitor && matchesGrade && matchesRound && matchesSearch;
  });

  const corePatentsCount = validPatents.filter(p => p.grade === 'S' || p.grade === 'A').length;
  const monitoringPatentsCount = validPatents.filter(p => p.monitoringStatus.includes('모니터링')).length;

  return (
    <div className="space-y-6">
      {/* 개요 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">총 분석특허</h3>
                <p className="text-3xl font-bold text-blue-600">{validPatents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">핵심특허 (S+A급)</h3>
                <p className="text-3xl font-bold text-red-600">{corePatentsCount}</p>
              </div>
              <Star className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">모니터링 특허</h3>
                <p className="text-3xl font-bold text-orange-600">{monitoringPatentsCount}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">발표 회차</h3>
                <p className="text-3xl font-bold text-green-600">{presentationRounds.length - 1}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 필터 및 검색 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Select value={selectedCompetitor} onValueChange={setSelectedCompetitor}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="경쟁사 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 경쟁사</SelectItem>
              {competitors.map(comp => (
                <SelectItem key={comp.id} value={comp.name}>
                  {comp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="등급" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 등급</SelectItem>
              <SelectItem value="S">S급</SelectItem>
              <SelectItem value="A">A급</SelectItem>
              <SelectItem value="B">B급</SelectItem>
              <SelectItem value="C">C급</SelectItem>
              <SelectItem value="X">X급</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPresentationRound} onValueChange={setSelectedPresentationRound}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="발표 회차" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 회차</SelectItem>
              {presentationRounds.slice(0, -1).map(round => (
                <SelectItem key={round.id} value={round.id}>
                  {round.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="특허명, 경쟁사로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            고급 필터
          </Button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <Tabs defaultValue="patents" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="patents">특허 목록</TabsTrigger>
          <TabsTrigger value="presentations">발표 회차</TabsTrigger>
          <TabsTrigger value="grades">등급별 분석</TabsTrigger>
          <TabsTrigger value="monitoring">모니터링</TabsTrigger>
        </TabsList>

        <TabsContent value="patents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>유효특허 분석 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>경쟁사</TableHead>
                    <TableHead>특허명</TableHead>
                    <TableHead>출원번호</TableHead>
                    <TableHead>등록번호</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>등급</TableHead>
                    <TableHead>발표회차</TableHead>
                    <TableHead>모니터링</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatents.map((patent) => (
                    <TableRow key={patent.id}>
                      <TableCell className="font-medium">{patent.competitor}</TableCell>
                      <TableCell className="max-w-xs truncate">{patent.title}</TableCell>
                      <TableCell>{patent.applicationNumber}</TableCell>
                      <TableCell>{patent.registrationNumber || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={patent.status === '등록' ? 'default' : 'secondary'}>
                          {patent.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{getGradeBadge(patent.grade)}</TableCell>
                      <TableCell>
                        {presentationRounds.find(r => r.id === patent.presentationRound)?.name}
                      </TableCell>
                      <TableCell>{getMonitoringBadge(patent.monitoringStatus)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            상세보기
                          </Button>
                          <Button variant="outline" size="sm">
                            대응논리
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presentations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {presentationRounds.map((round) => (
              <Card key={round.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{round.name}</span>
                    <Badge variant={round.patentCount > 0 ? 'default' : 'secondary'}>
                      {round.patentCount > 0 ? '완료' : '예정'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">발표일</span>
                      <span className="font-medium">{round.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">분석 특허 수</span>
                      <span className="font-medium">{round.patentCount}건</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        발표자료
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        피드백자료
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grades" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>등급별 특허 현황</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['S', 'A', 'B', 'C', 'X'].map(grade => {
                    const count = validPatents.filter(p => p.grade === grade).length;
                    const percentage = validPatents.length > 0 ? (count / validPatents.length) * 100 : 0;
                    return (
                      <div key={grade} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getGradeBadge(grade)}
                          <span className="text-sm text-gray-600">
                            {grade === 'S' ? '현재 실시 기술과 대응도 높음' :
                             grade === 'A' ? '향후 기술과 대응도 높음' :
                             grade === 'B' ? '신규 아이디어 발굴 시 참고' :
                             grade === 'C' ? '기술 분야 내 일부 참고' : '모니터링 불필요'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                grade === 'S' ? 'bg-red-600' :
                                grade === 'A' ? 'bg-orange-600' :
                                grade === 'B' ? 'bg-blue-600' :
                                grade === 'C' ? 'bg-green-600' : 'bg-gray-400'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>핵심특허 (S+A급) 대응현황</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {validPatents.filter(p => p.grade === 'S' || p.grade === 'A').map(patent => (
                    <div key={patent.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getGradeBadge(patent.grade)}
                          <span className="font-medium text-sm">{patent.competitor}</span>
                        </div>
                        {getMonitoringBadge(patent.monitoringStatus)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{patent.title}</p>
                      <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        {patent.responseLogic}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>모니터링 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-900">일반 모니터링</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      {validPatents.filter(p => p.monitoringStatus === '모니터링 중').length}건
                    </p>
                    <p className="text-sm text-blue-800">등록특허 소송/심판 확인</p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-900">심사 경과</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">
                      {validPatents.filter(p => p.monitoringStatus === '심사 경과 확인').length}건
                    </p>
                    <p className="text-sm text-yellow-800">심사중 특허 진행상황 확인</p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-900">소송/심판</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600">
                      {validPatents.filter(p => p.monitoringStatus === '소송/심판 여부 확인').length}건
                    </p>
                    <p className="text-sm text-red-800">분쟁 발생 여부 확인</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">모니터링 일정</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">S+A급 핵심특허 월간 모니터링</span>
                      <Badge variant="outline">매월 1일</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">심사중 특허 진행상황 확인</span>
                      <Badge variant="outline">격주</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">등록특허 소송/심판 여부 확인</span>
                      <Badge variant="outline">월간</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
