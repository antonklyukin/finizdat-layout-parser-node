'use strict';

import * as fs from "fs";
import { parseDocument as parseDocument } from "htmlparser2";
import { DomUtils as domutils } from 'htmlparser2';

let xmlFile = fs.readFileSync('./xml_examples/f_content.xml', { encoding: 'utf-8' });

let documentDOM = parseDocument(xmlFile, { xmlMode: true, decodeEntities: false });

const contentsTagName = 'text:h';
const contentsText = 'СОДЕРЖАНИЕ';
let foundContentsTag; //тег со строкой СОДЕРЖАНИЕ

let articlesNumber = 0;

// Ищем тег text:h содержащий строку СОДЕРЖАНИЕ
const elementsList = domutils.getElementsByTagName(contentsTagName, documentDOM);
for (let i = 0; i < elementsList.length; i++) {
  const tagContent = domutils.innerText(elementsList[i]);
  if (tagContent === contentsText) {
    foundContentsTag = elementsList[i];
  }
}

const contentTable = domutils.nextElementSibling(foundContentsTag);

const tableRowsList = domutils.getElementsByTagName('table:table-row', contentTable);

for (let i = 0; i < tableRowsList.length; i++) {
  let tableRow = tableRowsList[i];
  //Получаем количество ячеек в строке таблицы содержания
  let cellsNumber = domutils.getElementsByTagName('table:table-cell', tableRow).length;
  if (cellsNumber == 1) {
    console.log('Раздел');
  }
  if (cellsNumber == 2) {
    console.log('Статья');
    articlesNumber++;
  }
}

console.log(`Всего статей в выпуске: ${articlesNumber}`);



