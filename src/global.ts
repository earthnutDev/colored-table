import { ColoredTableBorder, ColoredTableContentAlign } from './types';

import { isNode } from 'a-js-tools';

/**  浏览器环境  */
export const browserEnv = !isNode();

export const data = {
  emojiLength: 2.08,
  emojiRegex:
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}]/gu,
  chineseLength: 1.8,
  /**  中文的正则  */
  chineseRegex: /[\u4E00-\u9FFF]/g,
};

/**  全局的属性  */
class ColoredTableGlobalData {
  align: ColoredTableContentAlign = 'left';
  color: string = '';
  bgColor: string = '';
  bold: boolean = false;
  underline: boolean = false;
  italic: boolean = false;
  border: ColoredTableBorder = {
    left: {
      color: undefined,
      style: 'simple',
    },
    right: {
      color: undefined,
      style: 'simple',
    },
    top: {
      color: undefined,
      style: 'simple',
    },
    bottom: {
      color: undefined,
      style: 'simple',
    },
  };
}

/**
 *
 * 全局 table 配置
 *
 * 若没有其他特殊说名，将使用该数据作为最终的渲染依据
 *
 * 即为默认属性
 */
export const globalData = new ColoredTableGlobalData();
