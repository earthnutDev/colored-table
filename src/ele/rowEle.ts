import { createConstructor } from 'a-js-tools';
import { ColoredTableCommonOption, ColoredTableRow } from '../types';

/**  构建行 原始类  */
export const RowEleClass = createConstructor(function (
  this: ColoredTableRow,
  proto: ColoredTableCommonOption,
): ColoredTableRow {
  this.data = [];

  Object.setPrototypeOf(this, proto);

  return this;
});
