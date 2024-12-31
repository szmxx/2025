export interface WishOption {
  id: number;
  text: string;
  category?: string[];
}

// 时间选项
export const timeOptions: WishOption[] = [
  { id: 1, text: '新的一年' },
  { id: 2, text: '明天' },
  { id: 3, text: '下个月' },
  { id: 4, text: '今年年底' },
  { id: 5, text: '明年春天' },
  { id: 6, text: '2025年' },
  { id: 7, text: '毕业之前' },
  { id: 8, text: '35岁之前' },
  { id: 9, text: '退休之前' },
  { id: 10, text: '这个季度' },
  { id: 11, text: '下半年' },
  { id: 12, text: '三年之内' }
];

// 方法选项
export const methodOptions: WishOption[] = [
  // 财富类
  { id: 1, text: '理财投资', category: ['wealth'] },
  { id: 2, text: '创业', category: ['wealth', 'career'] },
  { id: 3, text: '副业', category: ['wealth', 'career'] },
  { id: 4, text: '加密货币', category: ['wealth'] },
  { id: 5, text: '股票投资', category: ['wealth'] },
  { id: 6, text: '基金定投', category: ['wealth'] },
  // 学习类
  { id: 7, text: '考证', category: ['study', 'career'] },
  { id: 8, text: '读研深造', category: ['study'] },
  { id: 9, text: '自学编程', category: ['study', 'career'] },
  { id: 10, text: '考研', category: ['study'] },
  { id: 11, text: '学习新技能', category: ['study', 'career'] },
  // 生活类
  { id: 12, text: '健身', category: ['life'] },
  { id: 13, text: '环球旅行', category: ['life'] },
  { id: 14, text: '学习新语言', category: ['study', 'life'] },
  { id: 15, text: '养成好习惯', category: ['life'] },
  { id: 16, text: '规律作息', category: ['life'] }
];

// 目标选项
export const goalOptions: WishOption[] = [
  // 财富目标
  { id: 1, text: '财务自由', category: ['wealth'] },
  { id: 2, text: '买房', category: ['wealth', 'life'] },
  { id: 3, text: '存够首付', category: ['wealth'] },
  { id: 4, text: '实现百万资产', category: ['wealth'] },
  { id: 5, text: '月入过万', category: ['wealth', 'career'] },
  // 事业目标
  { id: 6, text: '升职加薪', category: ['career'] },
  { id: 7, text: '转行成功', category: ['career'] },
  { id: 8, text: '当上总监', category: ['career'] },
  { id: 9, text: '创立品牌', category: ['career', 'wealth'] },
  { id: 10, text: '实现技术突破', category: ['career', 'study'] },
  // 生活目标
  { id: 11, text: '环游世界', category: ['life'] },
  { id: 12, text: '减重20斤', category: ['life'] },
  { id: 13, text: '找到另一半', category: ['life'] },
  { id: 14, text: '学会一门乐器', category: ['life', 'study'] },
  { id: 15, text: '跑完马拉松', category: ['life'] },
  // 学习目标
  { id: 16, text: '考过研究生', category: ['study'] },
  { id: 17, text: '拿下证书', category: ['study'] },
  { id: 18, text: '掌握新技能', category: ['study'] },
  { id: 19, text: '出国深造', category: ['study'] },
  { id: 20, text: '发表论文', category: ['study'] }
];