import { isArray, isUndefined } from 'a-type-of-js';
import {
  ColoredTableOptions,
  ColoredTableCommonOption,
  ColoredTableEle,
} from '../types';
import { globalData } from '../global';
import { setPro } from '../proto/setPro';
import { TableEleClass } from '../ele/tableEle';
import { parseRow } from './parseRow';
import { createHeaderProto } from '../proto/createHeaderProto';
/**  表格的  */
class TableProto {}

/**
 *
 * 解析并转化（可选）参数为定值属性
 *
 */
export function parse(
  options: ColoredTableOptions,
): [ColoredTableEle, ColoredTableCommonOption] {
  // 初始化时可为空（undefined）
  if (isUndefined(options)) {
    options = {};
  }

  // 数组参数转化为对象
  if (isArray(options)) {
    options = {
      body: options,
    };
  }

  /**  表格的原型属性  */
  const tableProto: ColoredTableCommonOption = new TableProto();

  // 将在 options 上配置的属性配置到原型上
  setPro(tableProto, options);

  Object.setPrototypeOf(tableProto, globalData);
  // 创建表格
  const table = new TableEleClass(tableProto);

  // 解析表头
  if (options.header)
    table.header = parseRow(options.header, createHeaderProto(tableProto));

  /**  解析表干  */
  options.body?.forEach(e => table.body.push(parseRow(e, tableProto)));

  return [table, tableProto];
}
