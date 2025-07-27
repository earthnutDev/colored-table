import { ColoredTableEle } from '../types';
import { strInTerminalLength } from 'color-pen';
import { browserEnv, data } from '../global';

/**  计算得到最大的值  */
export function computerMaxLen(data: ColoredTableEle): number[] {
  const result: number[] = [];
  /**  计算  */
  if (data.header) {
    data.header.data.forEach((e, i) => {
      const current = e?.content?.toString() ?? '';

      result[i] = Math.max(
        result[i] ?? 0,
        browserEnv ? strInBrowserLength(current) : strInTerminalLength(current),
      );
    });
  }

  if (data.body) {
    data.body.forEach(row => {
      row.data.forEach((e, i) => {
        const current = e?.content?.toString() ?? '';

        result[i] = Math.max(
          result[i] ?? 0,
          browserEnv
            ? strInBrowserLength(current)
            : strInTerminalLength(current),
        );
      });
    });
  }

  return result;
}

/**  字符串在浏览器环境的字符长度  */
function strInBrowserLength(str: string): number {
  /**    */
  let result = 0;

  [...str].forEach(e => {
    data.emojiRegex.lastIndex = 0;
    data.chineseRegex.lastIndex = 0;
    if (e.match(data.emojiRegex)) {
      result += data.emojiLength;
    } else if (e.match(data.chineseRegex)) {
      result += data.chineseLength;
    } else {
      result++;
    }
  });
  return Math.ceil(result);
}
