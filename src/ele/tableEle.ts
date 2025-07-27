import { createConstructor } from 'a-js-tools';
import { ColoredTableCommonOption, ColoredTableEle } from '../types';

/** TableEleClass 类，原始构建类   */
export const TableEleClass = createConstructor(function (
  this: ColoredTableEle,
  proto: ColoredTableCommonOption,
): ColoredTableEle {
  this.body = [];
  this.header = undefined;

  Object.setPrototypeOf(this, proto);
  return this;
});
