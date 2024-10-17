const fs = require('fs/promises');
const handlebars = require('handlebars');

async function compilerHtml(file, contex) {
  const html = await fs.readFile(file);
  const compiler = handlebars.compile(html.toString());
  const htmlString = compiler(contex);
  return htmlString;
}

module.exports = compilerHtml;
