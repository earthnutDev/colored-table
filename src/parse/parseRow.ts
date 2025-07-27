import { isArray } from 'a-type-of-js';
import {
  ColoredTableCommonOption,
  ColoredTableRow,
  ColoredTableRowOption,
} from '../types';
import { RowEleClass } from '../ele/rowEle';
import { setPro } from '../proto/setPro';
import { parseCell } from './parseCell';
/**  表格的行原型  */
export class RowProto {}

/**
 * 解析行
 *
 * @param data 行数据
 * @param parentPro 父级的属性参数
 */
export function parseRow(
  data: ColoredTableRowOption,
  parentPro: ColoredTableCommonOption,
): ColoredTableRow {
  // 数组转化为对，方便后续统一处理
  if (isArray(data)) data = { data };

  /**  表格的原型属性  */
  const rowProto: ColoredTableCommonOption = new RowProto();
  setPro(rowProto, data); // 设置已配置的属性
  /**  行数据  */
  const result: ColoredTableRow = new RowEleClass(rowProto);
  Object.setPrototypeOf(rowProto, parentPro);

  data.data?.forEach(e => {
    if (e) result.data.push(parseCell(e, rowProto));
  });

  return result;
}
