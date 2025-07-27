import { isString, isType, isUndefined } from 'a-type-of-js';
import {
  ColoredTableCommonOption,
  ColoredTableBorderStyle,
  ColoredTableUnilateralBorderOptions,
  ColoredTableBorder,
} from '../types';

/**  配置原型上的属性  */
export function setPro(
  targetObj: ColoredTableCommonOption,
  options: ColoredTableCommonOption,
) {
  if (options.align) {
    targetObj.align = options.align;
  }

  if (options.bgColor) {
    targetObj.bgColor = options.bgColor;
  }

  if (options.color) {
    targetObj.color = options.color;
  }

  if (options.italic) {
    targetObj.italic = options.italic;
  }

  if (options.underline) {
    targetObj.underline = options.underline;
  }

  if (options.border) {
    if (isType<ColoredTableBorderStyle>(options.border, e => isString(e))) {
      const style = options.border;
      targetObj.border = {
        left: {
          color: undefined,
          style,
        },
        right: {
          color: undefined,
          style,
        },
        top: {
          color: undefined,
          style,
        },
        bottom: {
          color: undefined,
          style,
        },
      };
    } else if (
      isType<ColoredTableUnilateralBorderOptions>(options.border, e =>
        (['color', 'style'] as const).some(i => !isUndefined(e[i])),
      )
    ) {
      const border = options.border;
      const style = border.style;
      const color = border.color || undefined;
      // 设置边框并剔除空值
      targetObj.border = JSON.parse(
        JSON.stringify(
          {
            left: {
              color,
              style,
            },
            right: {
              color,
              style,
            },
            top: {
              color,
              style,
            },
            bottom: {
              color,
              style,
            },
          },
          (a, b) => (b === '' ? undefined : b),
        ),
      );
    } else if (
      isType<ColoredTableBorder>(options.border, e =>
        (['left', 'right', 'top', 'bottom'] as const).some(
          i => !isUndefined(e[i]),
        ),
      )
    ) {
      targetObj.border = options.border;
    }
  }
}
