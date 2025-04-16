/**
 * 自动扫描 src 目录下所有 .tsx/.ts 文件，提取 useTranslations('xxx')('key') 形式的 key，
 * 并输出为标准的 JSON 结构，便于批量翻译。
 *
 * 用法：node scripts/extract-i18n-keys.js
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src');
const EXTENSIONS = ['.tsx', '.ts'];

/**
 * 递归获取所有 ts/tsx 文件
 */
function getAllFiles(dir, exts = EXTENSIONS) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, exts));
    } else if (exts.includes(path.extname(file))) {
      results.push(filePath);
    }
  });
  return results;
}

/**
 * 提取 useTranslations('namespace')('key') 调用
 */
function extractI18nKeysFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // 匹配 useTranslations('namespace') 或 useTranslations("namespace")
  const nsRegex = /useTranslations\(['"]([\w-]+)['"]\)/g;
  // 匹配 t('key') 或 t("key")
  const keyRegex = /t\(['"]([\w.-]+)['"]\)/g;

  let namespaces = [];
  let match;
  while ((match = nsRegex.exec(content))) {
    namespaces.push(match[1]);
  }
  // 若文件内有多个 namespace，按顺序取第一个
  const namespace = namespaces[0] || 'default';

  // 提取所有 t('key')
  let keys = new Set();
  while ((match = keyRegex.exec(content))) {
    keys.add(match[1]);
  }
  return { namespace, keys: Array.from(keys) };
}

/**
 * 合并所有文件的 key
 */
function mergeKeys(all) {
  const result = {};
  for (const { namespace, keys } of all) {
    if (!result[namespace]) result[namespace] = {};
    for (const key of keys) {
      result[namespace][key] = '';
    }
  }
  return result;
}

function main() {
  const files = getAllFiles(SRC_DIR);
  const all = [];
  for (const file of files) {
    const { namespace, keys } = extractI18nKeysFromFile(file);
    if (keys.length > 0) {
      all.push({ namespace, keys });
    }
  }
  const merged = mergeKeys(all);
  // 输出示例 json
  const outPath = path.resolve(__dirname, 'i18n-keys-example.json');
  fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), 'utf-8');
  console.log('i18n keys example generated:', outPath);
}

main();
