// AppDetailSections 组件类型定义
export type AppDetailData = {
  name?: string;
  developerName?: string;
  developerWebsite?: string;
  releaseDate?: string;
  lastUpdate?: string;
  // 其他业务字段可扩展
};

export type AppDetailSectionsProps = {
  appId?: string;
  detailData?: AppDetailData;
};

export type AppDetailSectionsClientProps = {
  detailData?: AppDetailData | null;
  error?: string | null;
};
