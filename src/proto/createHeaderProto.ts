import { RowProto } from '../parse/parseRow';
import { ColoredTableBorder, ColoredTableCommonOption } from '../types';

/** 表头  */
class HeaderProto extends RowProto {
  border: ColoredTableBorder = {
    left: {
      style: 'bold',
      color: undefined,
    },
    right: {
      style: 'bold',
      color: undefined,
    },
    top: {
      style: 'bold',
      color: undefined,
    },
    bottom: {
      style: 'bold',
      color: undefined,
    },
  };
}

/**  设置 header 的原型  */
export function createHeaderProto(
  tableProto: ColoredTableCommonOption,
): ColoredTableCommonOption {
  const headerProto = new HeaderProto();

  Object.setPrototypeOf(headerProto, tableProto);

  return headerProto;
}
