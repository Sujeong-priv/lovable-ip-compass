import React, { useState } from 'react';
import { PatentAnalysisFilters } from '@/components/PatentAnalysisFilters';
import { PatentAnalysisStats } from '@/components/PatentAnalysisStats';
import { PatentAnalysisChart } from '@/components/PatentAnalysisChart';
import { PatentAnalysisTable } from '@/components/PatentAnalysisTable';
import { PatentGradeManager } from '@/components/PatentGradeManager';
import { PatentPortfolioComparison } from '@/components/PatentPortfolioComparison';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ValidPatentAnalysisProps {
  projectId: string;
  customerId: string;
}

export interface Patent {
  id: string;
  applicationNumber: string;
  title: string;
  status: 'active' | 'inactive';
  detailStatus: '심사중' | '등록' | '거절' | '무효' | '취하' | '포기';
  category1: string;
  category2?: string;
  applicationDate: string;
  expiryDate: string;
  validityScore: number;
  grade?: 'S' | 'A' | 'B' | 'C' | 'X';
  gradeReason?: string;
}

export const ValidPatentAnalysis: React.FC<ValidPatentAnalysisProps> = ({ projectId, customerId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [detailStatusFilter, setDetailStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [selectedPatents, setSelectedPatents] = useState<string[]>([]);

  // Mock data with new status structure
  const [patents, setPatents] = useState<Patent[]>([
    {
      id: 'pat-1',
      applicationNumber: '10-2023-0001234',
      title: 'AI 기반 이미지 처리 방법 및 시스템',
      status: 'active',
      detailStatus: '등록',
      category1: '1A',
      category2: '2A',
      applicationDate: '2023-01-15',
      expiryDate: '2043-01-15',
      validityScore: 85,
      grade: 'S',
      gradeReason: '현재 실시 중인 보유기술과 대응도가 높아 비침해 논리 필요'
    },
    {
      id: 'pat-2',
      applicationNumber: '10-2022-0045678',
      title: '반도체 메모리 최적화 기술',
      status: 'active',
      detailStatus: '등록',
      category1: '1B',
      category2: '2A',
      applicationDate: '2022-05-20',
      expiryDate: '2042-05-20',
      validityScore: 92,
      grade: 'A',
      gradeReason: '향후 출원예정 기술과 대응도가 높아 회피 설계 필요'
    },
    {
      id: 'pat-3',
      applicationNumber: '10-2023-0002345',
      title: '5G 통신 프로토콜 개선 방법',
      status: 'active',
      detailStatus: '심사중',
      category1: '1C',
      category2: '2B',
      applicationDate: '2023-01-20',
      expiryDate: '2043-01-20',
      validityScore: 78,
      grade: 'B',
      gradeReason: '신규 특허 아이디어 발굴 시 참고 가능'
    },
    {
      id: 'pat-4',
      applicationNumber: '10-2021-0003456',
      title: '머신러닝 기반 데이터 분석',
      status: 'inactive',
      detailStatus: '거절',
      category1: '1A',
      category2: '2C',
      applicationDate: '2021-03-10',
      expiryDate: '2041-03-10',
      validityScore: 45,
      grade: 'X',
      gradeReason: '보유 기술과 관련도가 낮아 모니터링 불필요'
    }
  ]);

  const filteredPatents = patents.filter(patent => {
    const matchesSearch = searchTerm === '' || 
      patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || patent.status === statusFilter;
    const matchesDetailStatus = detailStatusFilter === 'all' || patent.detailStatus === detailStatusFilter;
    const matchesCategory = categoryFilter === 'all' || patent.category1 === categoryFilter;
    const matchesGrade = gradeFilter === 'all' || patent.grade === gradeFilter;
    
    return matchesSearch && matchesStatus && matchesDetailStatus && matchesCategory && matchesGrade;
  });

  const handlePatentGradeUpdate = (patentId: string, grade: 'S' | 'A' | 'B' | 'C' | 'X', reason?: string) => {
    setPatents(prev => prev.map(patent => 
      patent.id === patentId 
        ? { ...patent, grade, gradeReason: reason }
        : patent
    ));
  };

  const handlePatentSelection = (patentIds: string[]) => {
    setSelectedPatents(patentIds);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analysis">유효특허 분석</TabsTrigger>
          <TabsTrigger value="grading">등급 관리</TabsTrigger>
          <TabsTrigger value="portfolio">포트폴리오 비교</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <PatentAnalysisFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            detailStatusFilter={detailStatusFilter}
            onDetailStatusFilterChange={setDetailStatusFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            gradeFilter={gradeFilter}
            onGradeFilterChange={setGradeFilter}
          />

          <PatentAnalysisStats patents={patents} />

          <PatentAnalysisChart patents={patents} />

          <PatentAnalysisTable 
            patents={filteredPatents}
            selectedPatents={selectedPatents}
            onPatentSelection={handlePatentSelection}
            onGradeUpdate={handlePatentGradeUpdate}
          />
        </TabsContent>

        <TabsContent value="grading" className="space-y-6">
          <PatentGradeManager 
            patents={patents}
            onGradeUpdate={handlePatentGradeUpdate}
          />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <PatentPortfolioComparison 
            patents={patents}
            selectedPatents={selectedPatents}
            projectId={projectId}
            customerId={customerId}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
