
import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TreeDataItem {
  id: string;
  name: React.ReactNode;
  children?: TreeDataItem[];
}

interface TreeProps {
  data: TreeDataItem[];
  className?: string;
}

interface TreeNodeProps {
  item: TreeDataItem;
  level?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ item, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center py-2 px-2 hover:bg-gray-50 rounded cursor-pointer",
          level > 0 && "ml-4"
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-1 min-w-0 flex-1">
          {hasChildren ? (
            <button className="p-1 hover:bg-gray-200 rounded">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}
          <div className="flex-1 min-w-0">
            {item.name}
          </div>
        </div>
      </div>
      
      {hasChildren && isOpen && (
        <div>
          {item.children!.map((child) => (
            <TreeNode key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Tree: React.FC<TreeProps> = ({ data, className }) => {
  return (
    <div className={cn("w-full", className)}>
      {data.map((item) => (
        <TreeNode key={item.id} item={item} />
      ))}
    </div>
  );
};
