import { createHeaderProto } from './proto/createHeaderProto';
import { parse } from './parse/parse';
import { parseRow } from './parse/parseRow';
import {
  ColoredTable,
  ColoredTableOptions,
  ColoredTableRowOption,
} from './types';
import { render } from './build';

/**  构建一个用于控制台的表格  */
export function table(
  this: ColoredTable,
  options?: ColoredTableOptions,
): ColoredTable {
  /**  构建初始化配置的表单  */
  const [tableEle, tablePro] = parse(options);
  let fontSize = 12;
  /**
   * 核心技能
   *
   *  这里将构建表格
   *
   *
   */
  const core = () => render(tableEle, fontSize);

  Object.setPrototypeOf(core, this);

  Object.defineProperties(core, {
    addRow: {
      value: (data: ColoredTableRowOption) => {
        tableEle.body.push(parseRow(data, tablePro));
        return core;
      },
      configurable: false,
      writable: false,
      enumerable: false,
    },
    setHeader: {
      value: (data: ColoredTableRowOption) => {
        tableEle.header = parseRow(data, createHeaderProto(tablePro));
        return core;
      },
      configurable: false,
      writable: false,
      enumerable: false,
    },
    setFontSize: {
      value: (_fontSize: number) => {
        fontSize = _fontSize;
        return core;
      },
    },
  });

  return core as ColoredTable;
}
