import { ColoredTableRow } from '../types';
import { isNull, isUndefined } from 'a-type-of-js';
import { createPen } from './createPen';
import { cutoffStringWithChar } from 'color-pen';
import { lines } from '../lines';
import { terminalResetStyle } from '@color-pen/static';

/**  构建表头  */
export function buildHeader(
  header: ColoredTableRow,
  lineList: number[],
): string {
  /**  结果  */
  let result: string = '';

  /** 最大的下标  */
  const lineMaxIndex = lineList.length - 1;

  const { fine } = lines;

  /**  默认的画笔 (用于绘制空值时的表格)  */
  const defaultPen = createPen(header);

  lineList.forEach((e, i) => {
    if (i === 0) {
      result += fine.lt;
    }
    result += terminalResetStyle;
    result += fine.l.repeat(e + 2);

    if (i === lineMaxIndex) {
      result += terminalResetStyle;
      result += fine.rt;
    } else {
      result += terminalResetStyle;
      result += fine.ct;
    }
  });

  result += '\n';

  lineList.forEach((e, i) => {
    result += terminalResetStyle;
    result += fine.v;
    /**  当前的元素  */
    const ele = header.data[i];
    // 元素为空则输出默认的样式
    if (isUndefined(ele) || isNull(ele)) {
      result += terminalResetStyle;
      result += defaultPen('\u2002'.repeat(e + 2));
    } else {
      /**  默认的画笔 (用于绘制空值时的表格)  */
      const cellPen = createPen(ele);
      let str = ele.content?.toString() ?? '';
      str = str
        .replace(/[\n]/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      result += terminalResetStyle;
      result += cellPen`\u2002${cutoffStringWithChar(str, e)}\u2002`;
    }

    if (i === lineMaxIndex) {
      result += fine.v;
    }
  });
  result += '\n';
  return result;
}
