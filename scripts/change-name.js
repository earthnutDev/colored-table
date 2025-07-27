import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFile,
} from 'a-node-tools';

const packageJson = readFileToJsonSync('./dist/package.json');

packageJson.name = '@qqi/table';

{
  //  写入 package.json

  const distPath = getDirectoryBy('dist', 'directory');

  const distPackagePath = pathJoin(distPath, './dist/package.json');

  writeJsonFile(distPackagePath, packageJson);
}
