
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Building2, Plus, Calendar, Users, FileText, Settings, HelpCircle } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  code: string;
}

interface Project {
  id: string;
  name: string;
  customer: string;
  features: string[];
  status: string;
}

interface AppHeaderProps {
  customers: Customer[];
  projects: Project[];
  selectedCustomer: string;
  selectedProject: string;
  onCustomerChange: (customerId: string) => void;
  onProjectChange: (projectId: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  customers,
  projects,
  selectedCustomer,
  selectedProject,
  onCustomerChange,
  onProjectChange
}) => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">Lovable AI</span>
              <Badge variant="secondary" className="text-xs">IP Management</Badge>
            </div>

            {/* 메뉴바 추가 */}
            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="px-3 py-1">프로젝트</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Plus className="h-4 w-4 mr-2" />
                    새 프로젝트
                  </MenubarItem>
                  <MenubarItem>
                    <Settings className="h-4 w-4 mr-2" />
                    프로젝트 설정
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FileText className="h-4 w-4 mr-2" />
                    보고서 생성
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="px-3 py-1">팀</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Users className="h-4 w-4 mr-2" />
                    팀 멤버 관리
                  </MenubarItem>
                  <MenubarItem>
                    <Plus className="h-4 w-4 mr-2" />
                    멤버 초대
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="px-3 py-1">도움말</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    사용 가이드
                  </MenubarItem>
                  <MenubarItem>
                    <FileText className="h-4 w-4 mr-2" />
                    API 문서
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={selectedCustomer} onValueChange={onCustomerChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="고객사 선택" />
              </SelectTrigger>
              <SelectContent>
                {customers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedProject} onValueChange={onProjectChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="프로젝트 선택" />
              </SelectTrigger>
              <SelectContent>
                {projects
                  .filter(p => p.customer === selectedCustomer)
                  .map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              신규 프로젝트
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
