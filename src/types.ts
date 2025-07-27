/**  表格的单元格的内容数据格式  */
export type ColoredTableCellValue =
  | string
  | number
  | undefined
  | boolean
  | null;

/**   表格的边框样式 (当前版本仅 `simple`、`undefined` 值可用) */
export type ColoredTableBorderStyle =
  | undefined
  | 'simple'
  | 'bold'
  | 'double'
  | 'dash';

/**  表格的边框  */
export type ColoredTableUnilateralBorder = {
  style: ColoredTableBorderStyle;
  color: string | undefined;
};

/**  配置单边边框属性  */
export type ColoredTableUnilateralBorderOptions = {
  [x in keyof ColoredTableUnilateralBorder]?: ColoredTableUnilateralBorder[x];
};

/**  表格的单边边框（最终解析）  */
export type ColoredTableBorder = {
  left: ColoredTableUnilateralBorder;
  right: ColoredTableUnilateralBorder;
  top: ColoredTableUnilateralBorder;
  bottom: ColoredTableUnilateralBorder;
};

/**  配置四个方向的边框  */
export type ColoredTableBorderOptions = {
  [x in keyof ColoredTableBorder]?: ColoredTableUnilateralBorderOptions;
};

/**  边框配置  */
export type ColoredBorderOptions =
  | ColoredTableBorderStyle
  | ColoredTableBorderOptions
  | ColoredTableUnilateralBorderOptions;

/**  文本对齐方式  */
export type ColoredTableContentAlign = 'left' | 'center' | 'right';

/**  公有属性，继承制  */
export type ColoredTableCommon = {
  /**  对齐  */
  align: ColoredTableContentAlign;
  /**  文本色  */
  color: string;
  /**  背景色  */
  bgColor: string;
  /**  是否为粗体  */
  bold: boolean;
  /**  是否含下划线 */
  underline: boolean;
  /**  是否为斜文本  */
  italic: boolean;
};

/**  一个使用的简单的除数据外的属性  */
export type ColoredTableCommonOption = {
  [x in keyof ColoredTableCommon]?: ColoredTableCommon[x];
} & {
  border?: ColoredBorderOptions;
};

/**  表格的单元格配置  */
export type ColoredTableCellNoBorder = {
  /**  内容（文本）  */
  content: ColoredTableCellValue;
} & ColoredTableCommon;

/**  带表格的单元格配置  */
export type ColoredTableCell = ColoredTableCellNoBorder & {
  border: ColoredTableBorder;
};

/**  单行  */
export type ColoredTableRow = {
  data: (ColoredTableCell | undefined)[];
} & ColoredTableCommon & {
    border: ColoredTableBorder;
  };

export type ColoredTableRowOptionData =
  | ColoredTableCellValue
  | ({ [x in keyof ColoredTableCellNoBorder]?: ColoredTableCellNoBorder[x] } & {
      border?: ColoredBorderOptions;
    })
  | undefined;

/**  单行表数据  */
export type ColoredTableRowOption =
  | ColoredTableRowOptionData[]
  | ({
      data?: ColoredTableRowOptionData[];
    } & ColoredTableCommonOption);

/**  使用单元格  */
export type ColoredTableEle = {
  /**  表头  */
  header?: ColoredTableRow;
  /**  表干  */
  body: ColoredTableRow[];
} & ColoredTableCommon &
  ColoredTableBorder;

/**  单元格  */
export type ColoredTableOptions =
  | ({
      /**  头部  */
      header?: ColoredTableRowOption;
      /**  内容  */
      body?: ColoredTableRowOption[];
    } & ColoredTableCommonOption)
  | ColoredTableRowOption[]
  | undefined;

/**  表  */
export type ColoredTable = {
  /**  开始构建  */
  (): void;
} & {
  /**  添加表头  */
  setHeader(data: ColoredTableRowOption): ColoredTable;
  /**  添加行  */
  addRow(data: ColoredTableRowOption): ColoredTable;
  /**
   * 设置字体大小
   *
   * （该值仅影响浏览器环境，不支持终端环境）
   *
   * 缺省值： 12
   */
  setFontSize(fontSize: number): ColoredTable;
};
