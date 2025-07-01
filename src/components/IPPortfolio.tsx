
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Filter, 
  Download, 
  TrendingUp, 
  Grid3X3,
  BarChart3,
  Target
} from 'lucide-react';

interface IPPortfolioProps {
  projectId: string;
  customerId: string;
}

export const IPPortfolio: React.FC<IPPortfolioProps> = ({ projectId, customerId }) => {
  const [selectedEntity, setSelectedEntity] = useState('customer');
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for 2D tech framework
  const axis1Categories = [
    { code: '1A', name: 'AI/ML', subcategories: ['1AA', '1AB', '1AC'] },
    { code: '1B', name: '반도체', subcategories: ['1BA', '1BB', '1BC'] },
    { code: '1C', name: '통신', subcategories: ['1CA', '1CB', '1CC'] },
    { code: '1D', name: '디스플레이', subcategories: ['1DA', '1DB', '1DC'] }
  ];

  const axis2Categories = [
    { code: '2A', name: '하드웨어', subcategories: ['2AA', '2AB', '2AC'] },
    { code: '2B', name: '소프트웨어', subcategories: ['2BA', '2BB', '2BC'] },
    { code: '2C', name: '시스템', subcategories: ['2CA', '2CB', '2CC'] },
    { code: '2D', name: '방법론', subcategories: ['2DA', '2DB', '2DC'] }
  ];

  // Mock portfolio data (1축 × 2축 매트릭스)
  const portfolioData = {
    '1A-2A': 23, '1A-2B': 45, '1A-2C': 12, '1A-2D': 8,
    '1B-2A': 34, '1B-2B': 15, '1B-2C': 28, '1B-2D': 6,
    '1C-2A': 18, '1C-2B': 22, '1C-2C': 31, '1C-2D': 14,
    '1D-2A': 9, '1D-2B': 7, '1D-2C': 16, '1D-2D': 11
  };

  const getHeatmapColor = (count: number) => {
    const maxCount = Math.max(...Object.values(portfolioData));
    const intensity = count / maxCount;
    
    if (intensity === 0) return 'bg-gray-50';
    if (intensity <= 0.2) return 'bg-blue-100';
    if (intensity <= 0.4) return 'bg-blue-200';
    if (intensity <= 0.6) return 'bg-blue-300';
    if (intensity <= 0.8) return 'bg-blue-400';
    return 'bg-blue-500';
  };

  const getTextColor = (count: number) => {
    const maxCount = Math.max(...Object.values(portfolioData));
    const intensity = count / maxCount;
    return intensity > 0.6 ? 'text-white' : 'text-gray-900';
  };

  return (
    <div className="space-y-6">
      {/* 필터 컨트롤 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Select value={selectedEntity} onValueChange={setSelectedEntity}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">고객사</SelectItem>
              <SelectItem value="competitor">경쟁사</SelectItem>
              <SelectItem value="comparison">비교 분석</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 기간</SelectItem>
              <SelectItem value="2024">2024년</SelectItem>
              <SelectItem value="2023">2023년</SelectItem>
              <SelectItem value="recent">최근 3년</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="registered">등록</SelectItem>
              <SelectItem value="pending">출원중</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            고급 필터
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            내보내기
          </Button>
        </div>
      </div>

      {/* 포트폴리오 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Grid3X3 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">총 특허 수</p>
                <p className="text-2xl font-bold">
                  {Object.values(portfolioData).reduce((sum, count) => sum + count, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">활성 영역</p>
                <p className="text-2xl font-bold">
                  {Object.values(portfolioData).filter(count => count > 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">강점 영역</p>
                <p className="text-2xl font-bold">
                  {Object.values(portfolioData).filter(count => count >= 30).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">포트폴리오 밀도</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2D 히트맵 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Grid3X3 className="h-5 w-5" />
            <span>2차원 기술 포트폴리오 맵</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* 테이블 헤더 */}
              <div className="grid grid-cols-5 gap-2 mb-2">
                <div className="p-2"></div>
                {axis2Categories.map(cat2 => (
                  <div key={cat2.code} className="p-2 text-center">
                    <div className="font-medium text-sm">{cat2.code}</div>
                    <div className="text-xs text-gray-600">{cat2.name}</div>
                  </div>
                ))}
              </div>

              {/* 테이블 본문 */}
              {axis1Categories.map(cat1 => (
                <div key={cat1.code} className="grid grid-cols-5 gap-2 mb-2">
                  <div className="p-2 text-right">
                    <div className="font-medium text-sm">{cat1.code}</div>
                    <div className="text-xs text-gray-600">{cat1.name}</div>
                  </div>
                  {axis2Categories.map(cat2 => {
                    const key = `${cat1.code}-${cat2.code}`;
                    const count = portfolioData[key] || 0;
                    return (
                      <div
                        key={key}
                        className={`p-4 rounded-lg border-2 border-gray-200 transition-all hover:border-blue-400 cursor-pointer ${getHeatmapColor(count)}`}
                      >
                        <div className={`text-center ${getTextColor(count)}`}>
                          <div className="text-lg font-bold">{count}</div>
                          <div className="text-xs">특허</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* 범례 */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="text-sm text-gray-600">특허 수:</span>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-50 border rounded"></div>
              <span className="text-xs">0</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 rounded"></div>
              <span className="text-xs">1-10</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-200 rounded"></div>
              <span className="text-xs">11-20</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-300 rounded"></div>
              <span className="text-xs">21-30</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
              <span className="text-xs">31-40</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-xs">40+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 상세 분석 */}
      <Tabs defaultValue="strengths" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strengths">강점 분석</TabsTrigger>
          <TabsTrigger value="gaps">갭 분석</TabsTrigger>
          <TabsTrigger value="opportunities">기회 영역</TabsTrigger>
        </TabsList>

        <TabsContent value="strengths" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>포트폴리오 강점 영역</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">핵심 강점 기술</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">1A-2B</Badge>
                          <span className="font-medium">AI 소프트웨어</span>
                        </div>
                        <span className="text-xl font-bold text-blue-600">45</span>
                      </div>
                      <p className="text-sm text-blue-800">
                        업계 최강 수준의 AI 소프트웨어 특허 포트폴리오
                      </p>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">1B-2A</Badge>
                          <span className="font-medium">반도체 하드웨어</span>
                        </div>
                        <span className="text-xl font-bold text-green-600">34</span>
                      </div>
                      <p className="text-sm text-green-800">
                        반도체 하드웨어 설계 분야의 강력한 특허 보유
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">경쟁 우위 지표</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">전체 기술 커버리지</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-5/6" />
                        </div>
                        <span className="text-sm font-medium">83%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">핵심 기술 집중도</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-4/5" />
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">신기술 대응력</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full w-3/4" />
                        </div>
                        <span className="text-sm font-medium">71%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>포트폴리오 갭 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-3">취약 영역</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">1D-2D (디스플레이 방법론)</span>
                        <Badge variant="outline" className="text-red-600">11건</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">1D-2B (디스플레이 소프트웨어)</span>
                        <Badge variant="outline" className="text-red-600">7건</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-3">보강 필요</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">1A-2D (AI 방법론)</span>
                        <Badge variant="outline" className="text-orange-600">8건</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">1D-2A (디스플레이 하드웨어)</span>
                        <Badge variant="outline" className="text-orange-600">9건</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>신규 기회 영역</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-3">신기술 융합 기회</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">AI + 디스플레이 융합</span>
                        <p className="text-sm text-purple-700">차세대 스마트 디스플레이 시장 진출 기회</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">High</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">반도체 + 통신 융합</span>
                        <p className="text-sm text-purple-700">5G/6G 전용 반도체 개발 기회</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Medium</Badge>
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
