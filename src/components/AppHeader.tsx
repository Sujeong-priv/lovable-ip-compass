
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Plus } from 'lucide-react';

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
