
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Building, 
  FileText,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react';

interface CompetitorAnalysisProps {
  projectId: string;
  customerId: string;
}

export const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ projectId, customerId }) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('2024');

  // Mock data
  const competitors = [
    { id: 'comp-1', name: 'Apple Inc.', patentCount: 1247, recentApplications: 89 },
    { id: 'comp-2', name: 'Google LLC', patentCount: 892, recentApplications: 76 },
    { id: 'comp-3', name: 'Microsoft Corp.', patentCount: 645, recentApplications: 52 },
    { id: 'comp-4', name: 'Meta Platforms', patentCount: 423, recentApplications: 34 }
  ];

  const competitorPatents = [
    {
      id: 'comp-pat-1',
      competitor: 'Apple Inc.',
      title: 'Neural Engine for Machine Learning Applications',
      applicationNumber: 'US17/123,456',
      applicationDate: '2024-01-15',
      status: 'Published',
      category1: '1A',
      category2: '2B',
      threatLevel: 'high'
    },
    {
      id: 'comp-pat-2',
      competitor: 'Google LLC',
      title: 'Quantum Computing Error Correction System',
      applicationNumber: 'US17/234,567',
      applicationDate: '2024-01-10',
      status: 'Pending',
      category1: '1B',
      category2: '2A',
      threatLevel: 'medium'
    },
    {
      id: 'comp-pat-3',
      competitor: 'Microsoft Corp.',
      title: 'Cloud-based AI Model Training Infrastructure',
      applicationNumber: 'US17/345,678',
      applicationDate: '2024-01-08',
      status: 'Published',
      category1: '1A',
      category2: '2C',
      threatLevel: 'low'
    }
  ];

  const getThreatBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge variant="destructive">높음</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">보통</Badge>;
      case 'low':
        return <Badge variant="outline">낮음</Badge>;
      default:
        return <Badge variant="outline">미분류</Badge>;
    }
  };

  const filteredPatents = competitorPatents.filter(patent => {
    const matchesCompetitor = selectedCompetitor === 'all' || patent.competitor === selectedCompetitor;
    const matchesSearch = searchTerm === '' || 
      patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.competitor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCompetitor && matchesSearch;
  });

  return (
    <div className="space-y-6">
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

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024년</SelectItem>
              <SelectItem value="2023">2023년</SelectItem>
              <SelectItem value="all">전체 기간</SelectItem>
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

      {/* 경쟁사 개요 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {competitors.map(competitor => (
          <Card key={competitor.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{competitor.name}</h3>
                    <p className="text-xs text-gray-500">특허 {competitor.patentCount}건</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">최근 출원</span>
                  <span className="font-medium">{competitor.recentApplications}건</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(competitor.recentApplications / 100) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 분석 탭 */}
      <Tabs defaultValue="patents" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patents">특허 목록</TabsTrigger>
          <TabsTrigger value="trends">출원 동향</TabsTrigger>
          <TabsTrigger value="technology">기술 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="patents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>경쟁사 특허 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>경쟁사</TableHead>
                    <TableHead>특허명</TableHead>
                    <TableHead>출원번호</TableHead>
                    <TableHead>출원일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>기술분류</TableHead>
                    <TableHead>위험도</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatents.map((patent) => (
                    <TableRow key={patent.id}>
                      <TableCell className="font-medium">{patent.competitor}</TableCell>
                      <TableCell className="max-w-xs truncate">{patent.title}</TableCell>
                      <TableCell>{patent.applicationNumber}</TableCell>
                      <TableCell>{patent.applicationDate}</TableCell>
                      <TableCell>
                        <Badge variant={patent.status === 'Published' ? 'default' : 'secondary'}>
                          {patent.status === 'Published' ? '공개' : '심사중'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Badge variant="outline" className="text-xs">{patent.category1}</Badge>
                          <Badge variant="outline" className="text-xs">{patent.category2}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{getThreatBadge(patent.threatLevel)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            상세분석
                          </Button>
                          <Button variant="outline" size="sm">
                            모니터링
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

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>출원 동향 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                차트 컴포넌트가 여기에 표시됩니다 (Recharts 사용)
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>기술 분야별 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">기술 분야별 특허 수</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI/ML (1A)</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-3/4" />
                        </div>
                        <span className="text-sm font-medium">156</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">반도체 (1B)</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-1/2" />
                        </div>
                        <span className="text-sm font-medium">98</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">통신 (1C)</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full w-1/3" />
                        </div>
                        <span className="text-sm font-medium">67</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">경쟁 위험도 분석</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="font-medium text-red-900">높은 위험</span>
                      </div>
                      <p className="text-sm text-red-800">34건 - 우리 핵심 기술과 직접 경쟁</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                        <span className="font-medium text-orange-900">보통 위험</span>
                      </div>
                      <p className="text-sm text-orange-800">67건 - 관련 기술 분야</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <span className="font-medium text-green-900">낮은 위험</span>
                      </div>
                      <p className="text-sm text-green-800">123건 - 주변 기술</p>
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
