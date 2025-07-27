import { ColoredTableRow } from '../types';
import { isNull, isUndefined } from 'a-type-of-js';
import { createPen } from './createPen';
import { cutoffStringWithChar } from 'color-pen';
import { lines } from '../lines';
import { terminalResetStyle } from '@color-pen/static';

/**  构建表头  */
export function buildBody(
  body: ColoredTableRow[],
  lineList: number[],
  hasHeader: boolean,
): string {
  /**  结果  */
  let result: string = '';

  /** 最大的下标  */
  const lineMaxIndex = lineList.length - 1;

  const { fine } = lines;

  lineList.forEach((e, i) => {
    if (i === 0) {
      result += terminalResetStyle;
      result += hasHeader ? fine.lc : fine.lt;
    }
    result += terminalResetStyle;
    result += fine.l.repeat(e + 2);

    if (i === lineMaxIndex) {
      result += terminalResetStyle;
      result += hasHeader ? fine.rc : fine.rt;
    } else {
      result += terminalResetStyle;
      result += hasHeader ? fine.c : fine.ct;
    }
  });

  result += '\n';

  body.forEach((row, index) => {
    /**  默认的画笔 (用于绘制空值时的表格)  */
    const defaultPen = createPen(row);

    lineList.forEach((e, i) => {
      result += terminalResetStyle;
      result += fine.v;
      /**  当前的元素  */
      const ele = row.data[i];
      // 元素为空则输出默认的样式
      if (isUndefined(ele) || isNull(ele)) {
        result += defaultPen`${'\u2002'.repeat(e + 2)}`;
      } else {
        /**  默认的画笔 (用于绘制空值时的表格)  */
        const cellPen = createPen(ele);
        let str = ele.content?.toString() || '';
        str = str
          .replace(/[\n]/g, '\\n')
          .replace(/\r/g, '\\r')
          .replace(/\t/g, '\\t');
        result += terminalResetStyle;
        result += cellPen`\u2002${cutoffStringWithChar(str, e)}\u2002`;
      }
      if (i === lineMaxIndex) {
        result += terminalResetStyle;
        result += fine.v;
      }
    });
    result += '\n';

    const isLastRow = body.length - 1 === index;
    lineList.forEach((e, i) => {
      if (i === 0) {
        result += terminalResetStyle;
        result += isLastRow ? fine.lb : fine.lc;
      }
      result += terminalResetStyle;
      result += fine.l.repeat(e + 2);

      if (i === lineMaxIndex) {
        // 最后一行的最后一个
        result += terminalResetStyle;
        result += isLastRow ? fine.rb : fine.rc;
      } else {
        result += terminalResetStyle;
        result += isLastRow ? fine.cb : fine.c;
      }
    });

    result += '\n';
  });

  return result;
}
