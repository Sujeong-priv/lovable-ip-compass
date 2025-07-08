
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { PatentForm } from '@/components/PatentForm';

interface ApplicationFiltersProps {
  viewMode: 'all' | 'owned' | 'new';
  onViewModeChange: (mode: 'all' | 'owned' | 'new') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({
  viewMode,
  onViewModeChange,
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-4">
        <Tabs value={viewMode} onValueChange={(value) => onViewModeChange(value as typeof viewMode)}>
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
            onChange={(e) => onSearchChange(e.target.value)}
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
  );
};
