import { colorText, strInTerminalLength } from 'color-pen';
import { ColoredTableEle } from '../types';
import { buildBody } from './buildBody';
import { buildHeader } from './buildHeader';
import { computerMaxLen } from './computerMaxLen';
import { browserEnv, data } from '../global';

/**  渲染  */
export function render(table: ColoredTableEle, fontSize: number) {
  /**  获取每一行最大宽度的元素的宽度组成的数组  */
  const lineLen = computerMaxLen(table);
  /**  是否有表头  */
  let hasHeader = false;
  let buildStr: string = '';
  // 构建表头
  if (table.header) {
    hasHeader = true;
    buildStr += buildHeader(table.header, lineLen);
  }

  buildStr += buildBody(table.body, lineLen, hasHeader);
  /**  彩色数组  */
  const colorTextArr = colorText(buildStr);
  if (browserEnv) {
    const strList = colorTextArr[0].split('%c');
    const result = colorTextArr.map((e, i) => {
      if (i > 0) {
        /**  构建最小的单位的组  */
        const doubleByteCharNumber = [...strList[i]].reduce((v, e) => {
          if (strInTerminalLength(e) > 1) {
            data.emojiRegex.lastIndex = 0;
            if (e.match(data.emojiRegex)) return v - (data.emojiLength - 2);
            return v + (2 - data.chineseLength);
          }

          return v;
        }, 0);
        const newStr =
          e +
          "font-family: Consolas,Monaco,Courier,'Courier New','等宽字体',monospace; font-size:" +
          fontSize +
          'px;word-spacing:normal;padding:0;margin:0;padding-right:' +
          doubleByteCharNumber * fontSize +
          'px';

        return newStr;
      }
      return e;
    });
    /// 渲染表格
    console.log(...result);
  } else {
    console.log(...colorTextArr);
  }
}
