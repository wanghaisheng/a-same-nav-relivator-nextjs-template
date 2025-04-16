# 新一代 UI 组件体系重构与迁移任务文档

## 一、项目背景
随着项目的演进，组件体系出现了业务无关与业务相关代码混杂、组件分布分散、部分实现重复等问题。为提升组件复用性、可维护性、团队协作效率，现决定重构 UI 组件体系，采用统一的分层管理和现代化开发模式。

## 二、任务目标
- 分离业务无关和业务相关组件，提升组件的可复用性和稳定性。
- 优先复用 ui-layout 下的高质量组件，减少重复开发。
- 所有新组件集中管理于 src/new-ui，形成规范、现代、易维护的组件库。
- 业务组件全部基于新基础组件重构，保证风格统一、依赖清晰。
- 充分利用 Next.js 服务端组件与客户端组件协作开发模式，提升性能与开发体验。
- 完善文档与测试，保证迁移过程平滑、可回滚。

## 三、目录结构规划
```
src/
  new-ui/
    primitives/      # 业务无关基础组件（如 Button、Input、Card、Tabs、Modal 等）
    composites/      # 业务无关复合组件（如 Carousel、SpotlightCards、Form 等）
    business/        # 业务相关复合组件（如 AppDetailSections、AppListPage 等）
    hooks/           # 通用 hooks
    utils/           # 通用工具函数
    README.md        # 组件体系说明与用法
docs/
  ui-refactor-task.md  # 本任务文档
  develop-guide.md     # 开发规范与流程
  basic.md             # 文件结构说明
```
> 后续所有新组件优先归入 new-ui，逐步淘汰 src/ui 及 ui-layout 旧组件。

## 四、迁移与重构规则
### 1. 组件分类与归属
- primitives/：仅包含样式和最基础交互，无业务逻辑，优先直接迁移/复用 ui-layout/components/core、src/ui/primitives。
- composites/：由多个 primitives 组合成的复合组件，优先迁移 ui-layout/registry/components。
- business/：与具体业务强相关的组件（如 AppDetailSections），全部基于 new-ui/primitives 和 composites 重构，不直接依赖旧组件。
- hooks/、utils/：归集所有通用 hooks 和工具函数，避免重复实现。
### 2. 迁移与重构原则
- 组件迁移优先保证功能完整与 API 一致，必要时进行适当重构优化。
- 业务组件的数据获取逻辑优先放在服务端组件，UI 状态和交互由客户端组件负责。
- 所有新组件均采用 TypeScript，类型声明齐全。
- 迁移过程中，遇到重复组件需对比实现，择优合并，避免冗余。
- 迁移过程中如遇到 API 差异或实现风格不同，优先统一 API，保证团队代码风格一致。
- 迁移涉及第三方依赖（如动画库、UI 库）时需评估兼容性，必要时升级或统一依赖版本。
- 每次迁移/重构后需进行页面级回归测试，确保无破坏性变更。

## 五、详细执行步骤
### 阶段一：准备与梳理
1. 新建 src/new-ui 及其子目录结构。
2. 梳理 ui-layout/components/core、ui-layout/registry/components，标注哪些直接迁移到 new-ui/primitives、composites。
3. 梳理 src/ui/components，标注哪些为业务相关组件，计划重构。
### 阶段二：组件迁移与复用
1. 将业务无关的基础组件和复合组件迁移至 src/new-ui/primitives 和 src/new-ui/composites。
2. 对于有冲突/重复的组件，进行 API 统一与功能合并。
3. 完善每个组件的类型声明和文档注释。
### 阶段三：业务组件重构
1. 以 AppDetailSections、AppListPage 等为例，重构为 src/new-ui/business/ 下新组件。
2. 重构时采用服务端组件（如 async function AppDetailSectionsServer）负责数据获取，客户端组件负责渲染与交互。
3. 业务组件内部只依赖 new-ui/primitives 和 composites，不直接依赖旧 ui-layout 或 src/ui。
### 阶段四：测试与文档
1. 为 new-ui 体系下所有组件补充单元测试与集成测试。
2. 在 src/new-ui/README.md 编写组件体系设计说明、用法示例与迁移记录。
3. 对接现有页面，逐步替换为 new-ui 体系组件，保证功能无损。

## 六、注意事项
- 每次迁移/重构后，务必进行页面级回归测试。
- 组件 API 变更需同步更新文档与用法示例。
- 新增组件优先加入 new-ui 体系，逐步淘汰旧 ui-layout 和 src/ui。
- 保持 new-ui 体系与 Next.js 最新最佳实践同步，适时引入新特性。
- 迁移过程如遇技术难题，及时记录并同步团队讨论。
- 迁移过程中建议统一文件命名风格（推荐小写+短横线或大驼峰）。

## 七、交付标准
- src/new-ui 目录结构清晰，组件分类明确，文档完善。
- 业务无关组件全部迁移并通过测试。
- 业务相关组件全部重构并通过测试。
- 现有页面均可平滑切换至新组件体系，无功能损失。
- 相关文档（本任务文档、README、迁移记录等）齐全，便于后续维护。

## 八、现有组件目录与文件说明

### 1. ui-layout/components 结构与说明

- core/  
  基础组件库。包含最常用的 UI 基础构件，如按钮、输入框、卡片、标签、弹窗等。适合迁移到 new-ui/primitives。  
  典型文件：button.tsx, input.tsx, card.tsx, badge.tsx, tabs.tsx, dialog.tsx, drawer.tsx, tooltip.tsx 等

- labs/  
  实验性组件，可能是新特性试验场或尚未稳定的组件，实现方式多样。可择优迁移到 new-ui/composites/labs 或保留为实验区。

- website/  
  网站级复合组件，如 Header、Footer、Layout、NavBar、Banner、Section、Sidebar 等，通常服务于页面整体结构。适合迁移到 new-ui/composites。  
  典型文件：header.tsx, footer.tsx, layout.tsx, navbar.tsx, banner.tsx, section.tsx, sidebar.tsx 等

### 2. ui-layout/registry/components 结构与说明

此目录以功能和特效为单位，每个子目录为一个复合型 UI 组件或动画模块。适合迁移到 new-ui/composites。

- accordion/：手风琴折叠面板，包含多个变体
- animated-beam/：动画光束特效
- bg-blocks/：背景块动画
- blurvignette/：模糊晕影特效
- button/：高级按钮集合，含多种交互样式
- card/：卡片组件，含多种内容与动画（如 cuip-card.tsx）
- carousel/：轮播图/滑块组件
- clip-path/：SVG/CSS 裁剪路径动画
- drag/：拖拽交互组件
- drawer/：抽屉式弹窗
- footers/：多种页脚样式
- form/：表单相关复合组件
- github-repo-btn/：GitHub 仓库按钮
- grid/：网格布局组件
- image-reveal/：图片揭示动画
- marquee/：跑马灯/滚动字幕
- modal/：模态弹窗
- mousetrail/：鼠标轨迹动画
- noise-effect/：噪点特效
- number-flow/：数字流动画
- scroll-animation/：滚动触发动画
- spotlight-cards/：聚光灯卡片动画
- tabs/：标签页组件
- text-animation/：文本动效
- timeline-animation/：时间线动画

---

## 九、src/ui/components 业务组件梳理与重构计划

### 1. 已重构/集成到 new-ui/business 的组件
- AppListPage
- CourseListPage
- ProductListPage
- GameListPage
- EbookListPage
- OtherListPage
- Cart（购物车相关）
- AddToCartButton
- comments-and-reviews
- notification-center

### 2. 待迁移/重构为 new-ui/business 的业务组件（建议优先级高）
- AppScreenshots（应用截图展示，建议迁移为 business/app-screenshots）
- CourseCurriculum（课程大纲，建议迁移为 business/course-curriculum）
- CoursePurchaseOptions（课程购买选项，建议迁移为 business/course-purchase-options）
- CourseVideoPreview（课程视频预览，建议迁移为 business/course-video-preview）
- FeaturedItems/featured-items（首页/专题推荐，建议迁移为 business/featured-items）
- Features（功能点展示，建议迁移为 business/features 或 composites/features）
- Hero（首页头图/介绍，建议迁移为 business/hero）
- ItemDetailSections（通用详情区块，建议迁移为 business/item-detail-sections）
- ItemListPage（通用 item 列表页，建议迁移为 business/item-list-page）
- ListPageLayout（列表页布局，建议迁移为 business/layouts/list-page-layout）
- news-and-activities（新闻与活动，建议迁移为 business/news-and-activities）
- official-links（官方链接，建议迁移为 business/official-links）
- ProductSection（产品详情区块，建议迁移为 business/product-section）
- SubmitToolForm（工具提交表单，建议迁移为 business/submit-tool-form）
- TestimonialCarousel（用户评价轮播，建议迁移为 business/testimonial-carousel 或 composites/testimonial-carousel）

### 3. 其它建议关注的业务组件
- DatabaseInitializer（如涉及业务初始化逻辑，可考虑迁移为 business/database-initializer）
- breadcrumb（面包屑，若有业务定制可迁移为 business/breadcrumb，否则可归入 composites/primitives）
- detailed-information（详细信息区块，建议迁移为 business/detailed-information）

> 纯展示型、无业务逻辑的组件（如 LoadingSpinner、ErrorMessage、theme-provider、theme-toggle 等）建议迁移至 primitives 或 composites。
> 布局类组件（如 ListPageLayout、layouts/ 下的 dashboard/auth 等）建议迁移至 business/layouts。
> 业务表单、区块、专题等建议迁移至 business/ 下独立目录。

---

## 十、推荐最佳实践

- 服务端/客户端组件分离模式
- 统一组件 API 风格
- 组件迁移/重构过程中，建议采用 issue、看板或表格方式跟踪每个组件的迁移状态和负责人。

---

## 附录：ui-layout/components 组件清单与分类

| 目录/文件路径 | 推荐分类 | 说明 |
|---|---|---|
| core/accordion.tsx | primitives | 折叠面板基础组件 |
| core/animated-beam.tsx | composites | 动画/特效组件 |
| core/blocks.tsx | composites | 特效组件 |
| core/blur-vignette.tsx | composites | 特效组件 |
| core/carousel.tsx | primitives | 轮播基础组件 |
| core/cursor-follow-text.tsx | composites | 特效组件 |
| core/dateTime-input.tsx | primitives | 日期时间输入基础组件 |
| core/drawer/vaul-header.tsx | primitives | 抽屉基础组件（子文件） |
| core/drawer/vaul-main.tsx | primitives | 抽屉基础组件（子文件） |
| core/drawer/vaul-sidebar.tsx | primitives | 抽屉基础组件（子文件） |
| core/file-upload.tsx | primitives | 文件上传基础组件 |
| core/framer-timeline.tsx | composites | 动画/特效组件 |
| core/image-tabs.tsx | composites | 复合组件 |
| core/liquid-gradient.tsx | composites | 特效组件 |
| core/main-spotlight.tsx | composites | 特效组件 |
| core/marquee.tsx | composites | 特效组件 |
| core/modal/dialog.tsx | primitives | 弹窗基础组件（子文件） |
| core/modal/media-modal.tsx | composites | 媒体弹窗复合组件 |
| core/mousetrail.tsx | composites | 特效组件 |
| core/multi-selector.tsx | primitives | 多选基础组件 |
| core/numbersuffle.tsx | composites | 特效组件 |
| core/phone-input.tsx | primitives | 手机号输入基础组件 |
| core/progress-carousel.tsx | primitives | 进度轮播基础组件 |
| core/scroll-element.tsx | composites | 特效组件 |
| core/scroll-text-marque.tsx | composites | 特效组件 |
| core/scroll-text.tsx | composites | 特效组件 |
| core/slider.tsx | primitives | 滑块基础组件 |
| core/spotlight.tsx | composites | 特效组件 |
| core/tab.tsx | primitives | 标签页基础组件 |
| core/tags-input.tsx | primitives | 标签输入基础组件 |
| core/text-randomized.tsx | composites | 特效组件 |
| core/tooltip-doc.tsx | composites | 文档/演示用特效 |
| labs/preview-tab.tsx | composites | 实验性复合组件 |
| website/footer.tsx | composites | 布局组件 |
| website/header.tsx | composites | 布局组件 |
| website/moibile-header.tsx | composites | 移动端布局组件 |
| website/searchbar.tsx | composites | 搜索栏复合组件 |
| website/sidebar.tsx | composites | 侧边栏复合组件 |
| website/tableof-compoents.tsx | composites | 组件总览复合组件 |
| website/theme-provider.tsx | composites | 主题提供复合组件 |
| website/theme-switch.tsx | composites | 主题切换复合组件 |
| website/ui/aspect-ratio.tsx | primitives | 比例容器基础组件 |
| website/ui/badge.tsx | primitives | 徽章基础组件 |
| website/ui/button.tsx | primitives | 按钮基础组件 |
| website/ui/calendar.tsx | primitives | 日历基础组件 |
| website/ui/command.tsx | primitives | 命令输入基础组件 |
| website/ui/dialog.tsx | primitives | 弹窗基础组件 |
| website/ui/drawer.tsx | primitives | 抽屉基础组件 |
| website/ui/dropdown.tsx | primitives | 下拉菜单基础组件 |
| website/ui/form.tsx | primitives | 表单基础组件 |
| website/ui/hover-card.tsx | primitives | 悬浮卡片基础组件 |
| website/ui/input.tsx | primitives | 输入框基础组件 |
| website/ui/label.tsx | primitives | 标签基础组件 |
| website/ui/navigation-menu.tsx | primitives | 导航菜单基础组件 |
| website/ui/popover.tsx | primitives | 气泡卡片基础组件 |
| website/ui/scroll-area.tsx | primitives | 滚动区域基础组件 |
| website/ui/slider.tsx | primitives | 滑块基础组件 |
| website/ui/tabs.tsx | primitives | 标签页基础组件 |
| website/ui/toast.tsx | primitives | 提示基础组件 |
| website/icons/github.tsx | primitives | 图标基础组件 |
| website/icons/x.tsx | primitives | 图标基础组件 |
| website/home/hero-animated-btn.tsx | composites | 首页动画按钮 |
| website/home/hero-sec.tsx | composites | 首页英雄区 |
| website/home/home-3d-blob.tsx | composites | 首页 3D 特效 |
| website/home/home-accordion-modal.tsx | composites | 首页手风琴弹窗 |
| website/home/home-accordion.tsx | composites | 首页手风琴 |
| website/home/home-beam.tsx | composites | 首页光束特效 |
| website/home/home-btn.tsx | composites | 首页按钮 |
| website/home/home-buyme-coffe.tsx | business | 业务相关组件 |
| website/home/home-carousel.tsx | composites | 首页轮播 |
| website/home/home-clippath.tsx | composites | 首页裁剪特效 |
| website/home/home-datetime-picker.tsx | composites | 首页日期选择 |
| website/home/home-drag-items.tsx | composites | 首页拖拽项 |
| website/home/home-file-upload.tsx | composites | 首页文件上传 |
| website/home/home-footer.tsx | composites | 首页页脚 |
| website/home/home-header-dropdown.tsx | composites | 首页头部下拉 |
| website/home/home-header.tsx | composites | 首页头部 |
| website/home/home-hover-card.tsx | composites | 首页悬浮卡片 |
| website/home/home-image-modal.tsx | composites | 首页图片弹窗 |
| website/home/home-image-reveal.tsx | composites | 首页图片揭示特效 |
| website/home/home-magnified-doc.tsx | composites | 首页文档放大特效 |
| website/home/home-mousetrail.tsx | composites | 首页鼠标轨迹特效 |
| website/home/home-password.tsx | composites | 首页密码输入 |
| website/home/home-phone-input.tsx | composites | 首页手机号输入 |
| website/home/home-range-slider.tsx | composites | 首页区间滑块 |
| website/home/home-stacking-card.tsx | composites | 首页堆叠卡片 |
| website/home/home-tab.tsx | composites | 首页标签页 |
| website/home/home-text-marque.tsx | composites | 首页文本跑马灯 |
| website/home/home-youtube-tags.tsx | composites | 首页 YouTube 标签 |
| website/home/new-items-loading.tsx | composites | 首页加载动画 |
| website/home/progress-carousel.tsx | composites | 首页进度轮播 |
| website/labs/component-section.tsx | composites | 实验区组件 |
| website/labs/labs-sidebar.tsx | composites | 实验区侧边栏 |
| website/code-components/code-block.tsx | composites | 代码区块 |
| website/code-components/component-block.tsx | composites | 组件区块 |
| website/code-components/component-code-preview.tsx | composites | 代码预览 |
| website/code-components/component-preview.tsx | composites | 组件预览 |
| website/code-components/copy-button.tsx | composites | 复制按钮 |
| website/code-components/copy-npm-button.tsx | composites | 复制 npm 按钮 |
| website/code-components/drawer-code-preview.tsx | composites | 抽屉代码预览 |
| website/code-components/drawer-components-edit.tsx | composites | 抽屉组件编辑 |
| website/code-components/iframe-component-preview.tsx | composites | iframe 组件预览 |
| website/code-components/iframe-tab-codepreview.tsx | composites | iframe 标签代码预览 |
| website/code-components/pagination.tsx | composites | 分页组件 |
| website/code-components/pre-code.tsx | composites | 预格式代码 |
| website/code-components/pre-coded.tsx | composites | 预格式代码 |
| website/code-components/react-runner-component-edit.tsx | composites | React 组件编辑 |
| website/code-components/tab-codepreview.tsx | composites | 标签代码预览 |

---

## 十一、业务组件重构注意事项

### 1. 空值处理与友好界面

在业务组件重构过程中，必须确保组件对空值和异常情况有良好的处理机制，具体要求如下：

1. **防御性数据处理**
   - 使用可选链操作符 `?.` 和空值合并操作符 `??` 安全访问可能为空的属性
   - 为所有可能为 `null` 或 `undefined` 的数据提供默认值
   - 使用数组方法前检查数组是否存在（如 `data?.map()` 或 `Array.isArray(data) && data.map()`）

2. **优雅降级策略**
   - 为缺失数据提供合理的占位内容或默认状态
   - 对关键数据缺失采用备用视图而非错误状态
   - 对非关键数据缺失采用隐藏策略而非显示空白

3. **用户友好的加载状态**
   - 实现骨架屏（Skeleton）加载状态替代简单的 Loading 指示器
   - 对长时间加载提供进度反馈
   - 确保加载状态下页面布局稳定，避免加载完成后的布局跳动

4. **错误处理与恢复**
   - 捕获并优雅处理数据获取和处理过程中的错误
   - 提供重试机制和清晰的错误提示
   - 对部分数据加载失败实现局部恢复而非整页失败

### 2. 实现示例

**不良实践（容易出错）:**
```tsx
function ProductCard({ product }) {
  // 直接访问可能不存在的属性，容易导致运行时错误
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <div>{product.price.toFixed(2)}</div>
      <div>
        {product.tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
```

**良好实践（健壮安全）:**
```tsx
function ProductCard({ product }) {
  // 如果整个 product 为空，显示占位内容
  if (!product) {
    return <div className="product-card-placeholder">商品信息不可用</div>;
  }
  
  // 安全访问可能为空的属性，提供默认值
  const { 
    name = '未命名商品',
    description = '暂无描述',
    price = 0,
    tags = [],
    image = '/placeholder.jpg'
  } = product;
  
  return (
    <div className="product-card">
      <img 
        src={image} 
        alt={name}
        onError={(e) => {
          e.currentTarget.src = '/fallback-image.jpg';
          e.currentTarget.onerror = null;
        }}
      />
      <h2>{name}</h2>
      {description && <p>{description}</p>}
      <div>{typeof price === 'number' ? price.toFixed(2) : '价格待定'}</div>
      {Array.isArray(tags) && tags.length > 0 && (
        <div className="tags">
          {tags.map(tag => (
            <span key={tag || 'unknown'}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 3. 服务端数据验证

在服务端组件中获取数据时，应进行数据验证和规范化处理：

```tsx
// 服务端组件
async function ProductPageServer({ productId }) {
  let product = null;
  let error = null;
  
  try {
    // 数据获取（服务端）
    const response = await fetchData(productId);
    
    // 验证和规范化数据
    product = {
      id: response?.id || 'unknown',
      name: response?.name || '未命名商品',
      description: response?.description || '',
      price: typeof response?.price === 'number' ? response.price : null,
      // 确保 images 始终是数组
      images: Array.isArray(response?.images) ? response.images : [],
      // 其他属性规范化...
    };
  } catch (err) {
    console.error('Failed to fetch product:', err);
    error = '获取商品信息失败';
  }
  
  // 根据数据状态渲染不同内容
  if (error) {
    return <ErrorDisplay message={error} />;
  }
  
  return <ProductPageClient product={product} />;
}
```

通过以上措施，确保即使数据中存在 null 值，组件也能正常渲染，不会因为空值引用导致错误，同时为用户提供更友好的界面体验。

---

## 附录二：业务组件重构清单与计划

### 1. 业务组件重构清单

| 组件名 | 类型 | 重构优先级 | 复杂度 | 预计工时 | 负责人 |
|-------|------|-----------|-------|---------|-------|
| AppListPage.tsx | 列表页 | 高 | 高 | 2人日 | - |
| AppDetailSections.tsx | 详情页 | 高 | 高 | 3人日 | - |
| ProductListPage.tsx | 列表页 | 高 | 中 | 1.5人日 | - |
| CourseListPage.tsx | 列表页 | 高 | 中 | 1.5人日 | - |
| cart.tsx | 功能组件 | 高 | 中 | 1.5人日 | - |
| AddToCartButton.tsx | 功能组件 | 高 | 低 | 0.5人日 | - |
| comments-and-reviews.tsx | 功能组件 | 中 | 中 | 1人日 | - |
| notification-center.tsx | 功能组件 | 中 | 中 | 1人日 | - |
| layouts/dashboard-layout.tsx | 布局组件 | 中 | 中 | 1人日 | - |
| layouts/auth-layout.tsx | 布局组件 | 中 | 低 | 0.5人日 | - |
| product-card.tsx | 展示组件 | 中 | 低 | 0.5人日 | - |
| header.tsx | 布局组件 | 低 | 中 | 1人日 | - |
| footer.tsx | 布局组件 | 低 | 低 | 0.5人日 | - |

### 2. 重构方法论

#### 2.1 服务端/客户端组件分离模式

对于每个业务组件，采用以下模式进行重构：

1. **服务端组件**：负责数据获取和初始渲染
   ```tsx
   // 服务端组件
   async function ProductPageServer({ productId }) {
     // 数据获取（服务端）
     const data = await fetchData(productId);
     
     // 渲染，传递数据给客户端组件
     return (
       <div>
         {/* 静态内容（服务端渲染） */}
         <h1>{data.title}</h1>
         
         {/* 交互组件（客户端渲染） */}
         <ProductPageClient data={data} />
       </div>
     );
   }
   ```

2. **客户端组件**：负责交互和状态管理
   ```tsx
   // 客户端组件
   'use client';
   
   export function ProductPageClient({ data }) {
     // 客户端状态和交互逻辑
     const [state, setState] = useState(initialState);
     
     return (
       <div>
         {/* 交互UI */}
       </div>
     );
   }
   ```

#### 2.2 重构步骤

1. **分析组件职责**
   - 识别数据获取逻辑
   - 识别状态管理和交互逻辑
   - 识别静态展示内容

2. **拆分组件**
   - 创建服务端组件（负责数据获取）
   - 创建客户端组件（负责交互）
   - 根据需要创建子组件

3. **更新依赖**
   - 替换 `~/ui/primitives` 为 `@/src/new-ui/primitives`
   - 替换其他旧组件为新 UI 体系组件

4. **优化数据流**
   - 使用 props 传递数据
   - 考虑使用 Context API 共享状态
   - 使用 React Server Actions 处理表单提交

5. **添加类型和文档**
   - 完善 TypeScript 类型定义
   - 添加 JSDoc 注释

### 3. 详细重构计划

#### 阶段 3.1：核心业务组件重构（预计 2 周）

1. **第 1-3 天**：AppListPage 重构
   - 分析现有实现和数据流
   - 创建服务端组件和客户端组件
   - 实现过滤、排序等交互功能
   - 单元测试和集成测试

2. **第 4-6 天**：AppDetailSections 重构
   - 分离数据获取和交互逻辑
   - 重构子组件（概述、截图、评论等）
   - 优化性能和用户体验
   - 测试和文档

3. **第 7-8 天**：ProductListPage 和 CourseListPage 重构
   - 复用 AppListPage 的模式和组件
   - 调整特定业务逻辑
   - 测试和文档

4. **第 9-10 天**：购物车相关组件重构
   - cart.tsx 和 AddToCartButton.tsx
   - 实现 React Server Actions 处理购物车操作
   - 测试和文档

#### 阶段 3.2：次要业务组件重构（预计 1 周）

1. **第 1-2 天**：评论和通知组件
   - comments-and-reviews.tsx
   - notification-center.tsx

2. **第 3-4 天**：布局组件
   - layouts/dashboard-layout.tsx
   - layouts/auth-layout.tsx

3. **第 5 天**：展示组件
   - product-card.tsx

#### 阶段 3.3：低优先级组件重构（预计 3 天）

1. **第 1-3 天**：
   - header.tsx
   - footer.tsx
   - 其他低优先级组件

#### 阶段 3.4：测试与文档（贯穿整个过程）

1. **单元测试**：为每个重构的组件编写单元测试
2. **集成测试**：确保组件在实际页面中正常工作
3. **文档更新**：更新 README 和组件文档
4. **性能优化**：检查并优化性能瓶颈

### 4. 重构进度跟踪

| 组件名 | 状态 | 开始日期 | 完成日期 | 备注 |
|-------|------|---------|---------|------|
| AppListPage.tsx | 未开始 | - | - | - |
| AppDetailSections.tsx | 未开始 | - | - | - |
| ProductListPage.tsx | 未开始 | - | - | - |
| CourseListPage.tsx | 未开始 | - | - | - |
| cart.tsx | 未开始 | - | - | - |
| AddToCartButton.tsx | 未开始 | - | - | - |
| comments-and-reviews.tsx | 未开始 | - | - | - |
| notification-center.tsx | 未开始 | - | - | - |
| layouts/dashboard-layout.tsx | 未开始 | - | - | - |
| layouts/auth-layout.tsx | 未开始 | - | - | - |
| product-card.tsx | 未开始 | - | - | - |
| header.tsx | 未开始 | - | - | - |
| footer.tsx | 未开始 | - | - | - |
