import { createConstructor } from 'a-js-tools';
import { table } from './src/core';

/**
 *
 *  # 构建 DIY 表单
 *
 *  使用 console.table 构建的表单默认不支持彩色文本（目前我没找到支持的方法），遂花几日写该方法
 *
 *
 *
 */
const tableClass = createConstructor(table);

export { tableClass as ColoredTable, tableClass as Table };

export type {
  ColoredTableCellValue,
  ColoredTableBorderStyle,
  ColoredTableUnilateralBorder,
  ColoredTableUnilateralBorderOptions,
  ColoredTableBorder,
  ColoredTableBorderOptions,
  ColoredBorderOptions,
  ColoredTableContentAlign,
  ColoredTableCommon,
  ColoredTableCommonOption,
  ColoredTableCellNoBorder,
  ColoredTableCell,
  ColoredTableRowOption,
  ColoredTableEle,
  ColoredTableOptions,
} from './src/types';

export { globalData as ColoredTableGlobalData } from './src/global';
