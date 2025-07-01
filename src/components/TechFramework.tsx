
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tree, TreeDataItem } from '@/components/ui/tree';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Grid3X3, 
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen
} from 'lucide-react';

interface TechFrameworkProps {
  projectId: string;
  customerId: string;
}

interface ClassificationItem {
  id: string;
  code: string;
  name: string;
  description: string;
  axis: 1 | 2;
  parentId?: string;
  level: 'major' | 'minor';
  patentCount: number;
}

export const TechFramework: React.FC<TechFrameworkProps> = ({ projectId, customerId }) => {
  const [selectedAxis, setSelectedAxis] = useState<1 | 2>(1);
  const [selectedItem, setSelectedItem] = useState<ClassificationItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    parentId: '',
    level: 'major' as 'major' | 'minor'
  });

  // Mock classification data
  const classifications: ClassificationItem[] = [
    // 1축 분류
    { id: '1', code: '1A', name: '인공지능', description: 'AI 및 머신러닝 관련 기술', axis: 1, level: 'major', patentCount: 87 },
    { id: '2', code: '1AA', name: 'ML 알고리즘', description: '머신러닝 알고리즘 및 모델', axis: 1, parentId: '1', level: 'minor', patentCount: 45 },
    { id: '3', code: '1AB', name: '딥러닝', description: '딥러닝 및 신경망', axis: 1, parentId: '1', level: 'minor', patentCount: 32 },
    { id: '4', code: '1AC', name: '자연어처리', description: 'NLP 및 언어 모델', axis: 1, parentId: '1', level: 'minor', patentCount: 10 },
    
    { id: '5', code: '1B', name: '반도체', description: '반도체 설계 및 제조 기술', axis: 1, level: 'major', patentCount: 156 },
    { id: '6', code: '1BA', name: '메모리', description: '메모리 반도체 기술', axis: 1, parentId: '5', level: 'minor', patentCount: 78 },
    { id: '7', code: '1BB', name: '프로세서', description: '프로세서 및 연산 장치', axis: 1, parentId: '5', level: 'minor', patentCount: 56 },
    { id: '8', code: '1BC', name: '패키징', description: '반도체 패키징 기술', axis: 1, parentId: '5', level: 'minor', patentCount: 22 },
    
    { id: '9', code: '1C', name: '통신', description: '통신 기술 및 프로토콜', axis: 1, level: 'major', patentCount: 94 },
    { id: '10', code: '1CA', name: '5G/6G', description: '5G/6G 통신 기술', axis: 1, parentId: '9', level: 'minor', patentCount: 45 },
    { id: '11', code: '1CB', name: '무선 통신', description: '무선 통신 기술', axis: 1, parentId: '9', level: 'minor', patentCount: 35 },
    { id: '12', code: '1CC', name: '네트워크', description: '네트워크 프로토콜', axis: 1, parentId: '9', level: 'minor', patentCount: 14 },
    
    // 2축 분류
    { id: '13', code: '2A', name: '하드웨어', description: '하드웨어 구현 기술', axis: 2, level: 'major', patentCount: 134 },
    { id: '14', code: '2AA', name: '칩 설계', description: '칩 설계 및 아키텍처', axis: 2, parentId: '13', level: 'minor', patentCount: 67 },
    { id: '15', code: '2AB', name: '회로 설계', description: '회로 설계 기술', axis: 2, parentId: '13', level: 'minor', patentCount: 45 },
    { id: '16', code: '2AC', name: '센서', description: '센서 기술', axis: 2, parentId: '13', level: 'minor', patentCount: 22 },
    
    { id: '17', code: '2B', name: '소프트웨어', description: '소프트웨어 구현 기술', axis: 2, level: 'major', patentCount: 112 },
    { id: '18', code: '2BA', name: '알고리즘', description: '소프트웨어 알고리즘', axis: 2, parentId: '17', level: 'minor', patentCount: 58 },
    { id: '19', code: '2BB', name: '인터페이스', description: '사용자 인터페이스', axis: 2, parentId: '17', level: 'minor', patentCount: 34 },
    { id: '20', code: '2BC', name: '데이터 처리', description: '데이터 처리 기술', axis: 2, parentId: '17', level: 'minor', patentCount: 20 },
    
    { id: '21', code: '2C', name: '시스템', description: '시스템 통합 기술', axis: 2, level: 'major', patentCount: 87 },
    { id: '22', code: '2CA', name: '아키텍처', description: '시스템 아키텍처', axis: 2, parentId: '21', level: 'minor', patentCount: 45 },
    { id: '23', code: '2CB', name: '통합', description: '시스템 통합', axis: 2, parentId: '21', level: 'minor', patentCount: 28 },
    { id: '24', code: '2CC', name: '최적화', description: '시스템 최적화', axis: 2, parentId: '21', level: 'minor', patentCount: 14 }
  ];

  const getFilteredClassifications = (axis: 1 | 2) => {
    return classifications.filter(item => item.axis === axis);
  };

  const buildTreeData = (items: ClassificationItem[]): TreeDataItem[] => {
    const itemMap = new Map<string, ClassificationItem>();
    items.forEach(item => itemMap.set(item.id, item));

    const rootItems = items.filter(item => !item.parentId);
    
    const buildNode = (item: ClassificationItem): TreeDataItem => {
      const children = items
        .filter(child => child.parentId === item.id)
        .map(child => buildNode(child));

      return {
        id: item.id,
        name: (
          <div className="flex items-center justify-between w-full pr-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {item.code}
              </Badge>
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {item.patentCount}건
              </Badge>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                    setFormData({
                      code: item.code,
                      name: item.name,
                      description: item.description,
                      parentId: item.parentId || '',
                      level: item.level
                    });
                    setIsFormOpen(true);
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // 삭제 로직
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ),
        children: children.length > 0 ? children : undefined
      };
    };

    return rootItems.map(item => buildNode(item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsFormOpen(false);
    setSelectedItem(null);
    setFormData({
      code: '',
      name: '',
      description: '',
      parentId: '',
      level: 'major'
    });
  };

  const axis1Data = buildTreeData(getFilteredClassifications(1));
  const axis2Data = buildTreeData(getFilteredClassifications(2));

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">2차원 기술 프레임 관리</h2>
          <p className="text-gray-600">기술 분류 체계를 관리하고 특허에 적용할 분류 코드를 설정합니다.</p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              분류 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedItem ? '분류 수정' : '새 분류 추가'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="axis">축 선택</Label>
                  <Select value={selectedAxis.toString()} onValueChange={(value) => setSelectedAxis(parseInt(value) as 1 | 2)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1축 (기술 분야)</SelectItem>
                      <SelectItem value="2">2축 (구현 방식)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="level">분류 레벨</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value as 'major' | 'minor'})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="major">대분류</SelectItem>
                      <SelectItem value="minor">소분류</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.level === 'minor' && (
                <div>
                  <Label htmlFor="parent">상위 분류</Label>
                  <Select value={formData.parentId} onValueChange={(value) => setFormData({...formData, parentId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="상위 분류 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {getFilteredClassifications(selectedAxis)
                        .filter(item => item.level === 'major')
                        .map(item => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.code} - {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">분류 코드</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="예: 1AA, 2BC"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="name">분류 명칭</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="분류 이름"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">상세 설명</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="이 분류에 대한 상세한 설명을 입력하세요..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  취소
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {selectedItem ? '수정' : '추가'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 분류 관리 탭 */}
      <Tabs defaultValue="axis1" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="axis1">1축 기술 분류</TabsTrigger>
          <TabsTrigger value="axis2">2축 구현 분류</TabsTrigger>
          <TabsTrigger value="matrix">분류 매트릭스</TabsTrigger>
        </TabsList>

        <TabsContent value="axis1" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Grid3X3 className="h-5 w-5" />
                <span>1축 기술 분류 (기술 분야)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tree data={axis1Data} className="w-full" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="axis2" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Grid3X3 className="h-5 w-5" />
                <span>2축 구현 분류 (구현 방식)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tree data={axis2Data} className="w-full" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matrix" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>분류 조합 매트릭스</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Grid3X3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>분류 조합별 특허 분포를 시각화하는 매트릭스가 여기에 표시됩니다.</p>
                <p className="text-sm mt-2">1축 × 2축 조합으로 구성된 히트맵 형태로 제공됩니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
