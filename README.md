# 彩色表格

~~一个在控制台构建表格的工具（自定义版 console.table ）~~

~~本来想着写成在终端（node 环境）和控制台（浏览器环境）公用的，但是发现在浏览器环境表现不佳，且不同的浏览器环境渲染效果不同，还不如使用 `console.table`~~

现在支持在浏览器环境打印彩色文本的表格，但是目前不支持自定义边框及长文本换行。因为在 `node` 使用的终端和浏览器的控制台渲染的方式不同，其核心代码也不尽相同。

(目前的小问题就是当同行表情过多时会产生偏移)

## 安装

```bash
npm install  --save colored-table

# 亦可 (两包以后将同步版本发布)

npm install --save @qqi/table
```

## 使用

```ts
import { ColoredTable } from 'colored-table';

/** 构建表格，可传入初始化的数据，也可直接不使用参数而使用 `addRow` 添加行 */
const table = new ColoredTable([
  ['我在第一行第一列', '我在第一行第二列'],
  ['我在第二行第一列', '我在第二行第二列'],
]);

// 因为一个表只有一个表头，所以每次调用 `setHeader` 都将覆盖上一次配置表头
/** 设置表头，也可以在实例化时使用对象配置表头 */
table.setHeader(['第一列', '第二列']);

/** 使用 `addRow` 添加行，会追加到已有行后 */
table.addRow(['我在第三行第一列', '我在第三行第二列']);
// 构建表
table();
```

格式效果：

| 第一列           | 第二列           |
| :--------------- | :--------------- |
| 我在第一行第一列 | 我在第一行第二列 |
| 我在第二行第一列 | 我在第二行第二列 |
| 我在第三行第一列 | 我在第三行第二列 |

在浏览器效果：

[![浏览器表格](https://raw.githubusercontent.com/earthnutDev/qqi/main/media/浏览器表格.png)](https://github.com/earthnutDev/qqi/blob/main/media/浏览器表格.png)

带表情的效果

[![浏览器表格](https://raw.githubusercontent.com/earthnutDev/qqi/main/media/浏览器表格-with-emoji.png)](https://github.com/earthnutDev/qqi/blob/main/media/浏览器表格-with-emoji.png)

### setFontSize

除了 `addRow` 和 `setHeader` 两个方法，实例上还存在 `setFontSize` 方法。该方法将控制最终渲染的表格的字符大小。当然，这仅可在浏览器环境使用

```ts
table.setFontSize(8); // 渲染表格会在控制台显示更小
table.setFontSize(16); // 渲染表格会在控制台显示更大
```

### ColoredTableGlobalData

包还导出了 `ColoredTableGlobalData` 用于指定默认全局的样式。在该数据上的更改将直接影响所有没有特殊配置样式的文本或是边框。

## 文档地址

[colored-table](https://earthnut.dev/nmp/colored-table)
