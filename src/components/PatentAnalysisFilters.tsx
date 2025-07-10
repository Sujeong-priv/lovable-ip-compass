
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download } from 'lucide-react';

interface PatentAnalysisFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  detailStatusFilter: string;
  onDetailStatusFilterChange: (detailStatus: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  gradeFilter: string;
  onGradeFilterChange: (grade: string) => void;
}

export const PatentAnalysisFilters: React.FC<PatentAnalysisFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  detailStatusFilter,
  onDetailStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  gradeFilter,
  onGradeFilterChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
      <div className="flex items-center space-x-4 flex-wrap gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="특허명, 출원번호로 검색..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={detailStatusFilter} onValueChange={onDetailStatusFilterChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="세부상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="심사중">심사중</SelectItem>
            <SelectItem value="등록">등록</SelectItem>
            <SelectItem value="거절">거절</SelectItem>
            <SelectItem value="무효">무효</SelectItem>
            <SelectItem value="취하">취하</SelectItem>
            <SelectItem value="포기">포기</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="분류" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="1A">1A</SelectItem>
            <SelectItem value="1B">1B</SelectItem>
            <SelectItem value="1C">1C</SelectItem>
          </SelectContent>
        </Select>

        <Select value={gradeFilter} onValueChange={onGradeFilterChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="등급" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="S">S급</SelectItem>
            <SelectItem value="A">A급</SelectItem>
            <SelectItem value="B">B급</SelectItem>
            <SelectItem value="C">C급</SelectItem>
            <SelectItem value="X">X급</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          고급 필터
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          내보내기
        </Button>
      </div>
    </div>
  );
};
