
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Grid3X3, Shield, TrendingUp, Eye, FileText } from 'lucide-react';
import { Patent } from './ValidPatentAnalysis';

interface PatentPortfolioComparisonProps {
  patents: Patent[];
  selectedPatents: string[];
  projectId: string;
  customerId: string;
}

export const PatentPortfolioComparison: React.FC<PatentPortfolioComparisonProps> = ({ 
  patents, 
  selectedPatents, 
  projectId, 
  customerId 
}) => {
  const [portfolioScope, setPortfolioScope] = useState<'all' | 'selected'>('all');
  const [comparisonView, setComparisonView] = useState<'matrix' | 'grade' | 'timeline'>('matrix');

  // 분석 대상 특허 결정
  const targetPatents = portfolioScope === 'selected' 
    ? patents.filter(p => selectedPatents.includes(p.id))
    : patents;

  // 2차원 기술 프레임 매트릭스 데이터 생성
  const generateMatrixData = () => {
    const matrix: { [key: string]: { [key: string]: number } } = {};
    
    targetPatents.forEach(patent => {
      const axis1 = patent.category1;
      const axis2 = patent.category2 || '미분류';
      
      if (!matrix[axis1]) matrix[axis1] = {};
      if (!matrix[axis1][axis2]) matrix[axis1][axis2] = 0;
      matrix[axis1][axis2]++;
    });

    return matrix;
  };

  // 등급별 분포 데이터
  const gradeDistribution = [
    { grade: 'S급', count: targetPatents.filter(p => p.grade === 'S').length, color: '#DC2626' },
    { grade: 'A급', count: targetPatents.filter(p => p.grade === 'A').length, color: '#EA580C' },
    { grade: 'B급', count: targetPatents.filter(p => p.grade === 'B').length, color: '#2563EB' },
    { grade: 'C급', count: targetPatents.filter(p => p.grade === 'C').length, color: '#6B7280' },
    { grade: 'X급', count: targetPatents.filter(p => p.grade === 'X' || !p.grade).length, color: '#9CA3AF' }
  ];

  // 기술 분류별 분포 데이터
  const categoryDistribution = [
    { category: '1A (AI)', count: targetPatents.filter(p => p.category1 === '1A').length },
    { category: '1B (반도체)', count: targetPatents.filter(p => p.category1 === '1B').length },
    { category: '1C (통신)', count: targetPatents.filter(p => p.category1 === '1C').length }
  ];

  const matrixData = generateMatrixData();
  const corePatents = targetPatents.filter(p => p.grade === 'S' || p.grade === 'A').length;

  return (
    <div className="space-y-6">
      {/* 포트폴리오 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Grid3X3 className="h-5 w-5" />
            <span>포트폴리오 분석 설정</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium mb-2">분석 범위</label>
              <Select value={portfolioScope} onValueChange={(value) => setPortfolioScope(value as 'all' | 'selected')}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 유효특허 ({patents.length}건)</SelectItem>
                  <SelectItem value="selected">선택된 특허 ({selectedPatents.length}건)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 ml-auto">
              <Badge variant="outline" className="text-blue-600">
                분석 대상: {targetPatents.length}건
              </Badge>
              <Badge variant="secondary" className="text-red-600">
                핵심특허: {corePatents}건
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 포트폴리오 분석 결과 */}
      <Tabs value={comparisonView} onValueChange={(value) => setComparisonView(value as 'matrix' | 'grade' | 'timeline')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="matrix">기술 매트릭스</TabsTrigger>
          <TabsTrigger value="grade">등급별 분포</TabsTrigger>
          <TabsTrigger value="timeline">시계열 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>2차원 기술 프레임워크 매트릭스</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-3 text-left">1축 \ 2축</th>
                      <th className="border border-gray-300 p-3">2A (하드웨어)</th>
                      <th className="border border-gray-300 p-3">2B (소프트웨어)</th>
                      <th className="border border-gray-300 p-3">2C (시스템)</th>
                      <th className="border border-gray-300 p-3">미분류</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(matrixData).map(([axis1, axis2Data]) => (
                      <tr key={axis1}>
                        <td className="border border-gray-300 p-3 font-medium bg-gray-50">
                          {axis1}
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          <Badge variant={axis2Data['2A'] ? 'default' : 'outline'}>
                            {axis2Data['2A'] || 0}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          <Badge variant={axis2Data['2B'] ? 'default' : 'outline'}>
                            {axis2Data['2B'] || 0}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          <Badge variant={axis2Data['2C'] ? 'default' : 'outline'}>
                            {axis2Data['2C'] || 0}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          <Badge variant={axis2Data['미분류'] ? 'secondary' : 'outline'}>
                            {axis2Data['미분류'] || 0}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>기술 분류별 분포</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grade" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>등급별 특허 분포</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count">
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  <span>핵심특허 분석</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>S급 (현재 실시기술)</span>
                    <Badge variant="destructive">{gradeDistribution[0].count}건</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>A급 (향후 출원기술)</span>
                    <Badge variant="destructive" className="bg-orange-600">{gradeDistribution[1].count}건</Badge>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>핵심특허 총계</span>
                      <Badge variant="destructive">{corePatents}건</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>포트폴리오 강도</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>핵심특허 비율</span>
                    <Badge variant="secondary">
                      {targetPatents.length > 0 ? ((corePatents / targetPatents.length) * 100).toFixed(1) : 0}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>기술 커버리지</span>
                    <Badge variant="outline">
                      {Object.keys(matrixData).length}개 분야
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>포트폴리오 평가</span>
                    <Badge variant={corePatents >= 10 ? 'default' : corePatents >= 5 ? 'secondary' : 'outline'}>
                      {corePatents >= 10 ? '강함' : corePatents >= 5 ? '보통' : '약함'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>시계열 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>특허 출원 시기별 분석 차트가 여기에 표시됩니다.</p>
                <p className="text-sm mt-2">출원연도별 등급 분포 및 기술 트렌드 분석을 제공합니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 액션 버튼 */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          상세 분석 보고서
        </Button>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          포트폴리오 리포트 생성
        </Button>
      </div>
    </div>
  );
};
