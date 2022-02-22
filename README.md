### Hexlet tests and linter status:
[![Actions Status](https://github.com/erzhan12/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/erzhan12/backend-project-lvl2/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/d54e37b1a7c9bcc5474f/maintainability)](https://codeclimate.com/github/erzhan12/backend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/d54e37b1a7c9bcc5474f/test_coverage)](https://codeclimate.com/github/erzhan12/backend-project-lvl2/test_coverage)

[![Test Coverage](https://github.com/erzhan12/backend-project-lvl2/actions/workflows/lint.yml/badge.svg)](https://github.com/erzhan12/backend-project-lvl2/actions/workflows/lint.yml/badge.svg)

___
### Краткое описание:
Пакет реализует функциональность поиска отличий между двумя файлами (.json либо .yaml)
Формат вывода может быть:
- stylish - структурированный вид
- plain - плоский вид
- json - вывод в формате json

Запуск из командной строки:
> gendiff --format stylish filePath1.json filePath2.json

Использованеие пакета в своем коде
```
const diff = genDiff(filePath1, filePath2, formatName);
```
___
### Установка
make install
npm link
____
Демонстрация работы:
[![asciicast](https://asciinema.org/a/8iwRLiSnwNzgqaUThE30QjIjR.svg)](https://asciinema.org/a/8iwRLiSnwNzgqaUThE30QjIjR)