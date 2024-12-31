export interface Category {
  id: string;
  title: string;
  subtitle?: string;
}

export const categories: Category[] = [
  { id: "wealth", title: "2025 暴富计划" },
  { id: "career", title: "2025 事业规划" },
  { id: "life", title: "2025 生活愿望" },
  { id: "study", title: "2025 学习目标" },
];
