import React from 'react';
import { Badge } from '../../primitives/badge';
import { Separator } from '../../primitives/separator';
import { ItemType } from '../../../db/sqlite/schema/items';
import { Clock, Book, Code, Gamepad2, Smartphone, Globe, Download, Award, Users, Layers } from 'lucide-react';

// 通用属性接口
interface BaseItemProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category?: string;
  type: string;
  rating?: number;
  features?: string[];
  specs?: Record<string, any>;
}
// APP和TOOL类型特有属性
interface AppItemProps extends BaseItemProps {
  platform?: string;
  version?: string;
  minSystemRequirements?: string;
}
// GAME类型特有属性
interface GameItemProps extends BaseItemProps {
  gameGenre?: string;
  multiplayer?: boolean;
  gameMode?: string;
}
// EBOOK类型特有属性
interface EbookItemProps extends BaseItemProps {
  pageCount?: number;
  format?: string;
  language?: string;
}
// COURSE类型特有属性
interface CourseItemProps extends BaseItemProps {
  duration?: number;
  level?: string;
  certification?: boolean;
}
// WEBSITE类型特有属性
interface WebsiteItemProps extends BaseItemProps {
  framework?: string;
  responsive?: boolean;
}
// 联合类型，包含所有可能的属性
export type ItemProps = AppItemProps & GameItemProps & EbookItemProps & CourseItemProps & WebsiteItemProps;

// APP和TOOL类型的详情部分
export const AppDetailSection: React.FC<AppItemProps> = (props) => {
  const { platform, version, minSystemRequirements } = props;
  return (
    <section>
      <h3 className="font-bold flex items-center gap-2 text-lg mb-2"><Smartphone /> 应用信息</h3>
      <ul className="text-sm space-y-1">
        {platform && <li>平台：{platform}</li>}
        {version && <li>版本：{version}</li>}
        {minSystemRequirements && <li>最低系统要求：{minSystemRequirements}</li>}
      </ul>
      <Separator className="my-4" />
    </section>
  );
};
// GAME类型的详情部分
export const GameDetailSection: React.FC<GameItemProps> = (props) => {
  const { gameGenre, multiplayer, gameMode } = props;
  return (
    <section>
      <h3 className="font-bold flex items-center gap-2 text-lg mb-2"><Gamepad2 /> 游戏信息</h3>
      <ul className="text-sm space-y-1">
        {gameGenre && <li>类型：{gameGenre}</li>}
        {typeof multiplayer === 'boolean' && <li>支持多人：{multiplayer ? '是' : '否'}</li>}
        {gameMode && <li>模式：{gameMode}</li>}
      </ul>
      <Separator className="my-4" />
    </section>
  );
};
// EBOOK类型的详情部分
export const EbookDetailSection: React.FC<EbookItemProps> = (props) => {
  const { pageCount, format, language } = props;
  return (
    <section>
      <h3 className="font-bold flex items-center gap-2 text-lg mb-2"><Book /> 电子书信息</h3>
      <ul className="text-sm space-y-1">
        {pageCount && <li>页数：{pageCount}</li>}
        {format && <li>格式：{format}</li>}
        {language && <li>语言：{language}</li>}
      </ul>
      <Separator className="my-4" />
    </section>
  );
};
// COURSE类型的详情部分
export const CourseDetailSection: React.FC<CourseItemProps> = (props) => {
  const { duration, level, certification } = props;
  return (
    <section>
      <h3 className="font-bold flex items-center gap-2 text-lg mb-2"><Award /> 课程信息</h3>
      <ul className="text-sm space-y-1">
        {duration && <li>时长：{duration} 分钟</li>}
        {level && <li>难度：{level}</li>}
        {typeof certification === 'boolean' && <li>结业证书：{certification ? '有' : '无'}</li>}
      </ul>
      <Separator className="my-4" />
    </section>
  );
};
// WEBSITE类型的详情部分
export const WebsiteDetailSection: React.FC<WebsiteItemProps> = (props) => {
  const { framework, responsive } = props;
  return (
    <section>
      <h3 className="font-bold flex items-center gap-2 text-lg mb-2"><Globe /> 网站信息</h3>
      <ul className="text-sm space-y-1">
        {framework && <li>框架：{framework}</li>}
        {typeof responsive === 'boolean' && <li>响应式：{responsive ? '支持' : '不支持'}</li>}
      </ul>
      <Separator className="my-4" />
    </section>
  );
};

// 根据商品类型渲染对应的详情部分
export const ItemDetailSections: React.FC<ItemProps> = (props) => {
  const { type } = props;
  switch (type) {
    case ItemType.APP:
    case ItemType.TOOL:
      return <AppDetailSection {...props} />;
    case ItemType.GAME:
      return <GameDetailSection {...props} />;
    case ItemType.EBOOK:
      return <EbookDetailSection {...props} />;
    case ItemType.COURSE:
      return <CourseDetailSection {...props} />;
    case ItemType.WEBSITE:
      return <WebsiteDetailSection {...props} />;
    default:
      return null;
  }
};
