import yaml from 'js-yaml';

const parseJson = (data) => JSON.parse(data);

const parseYaml = (data) => yaml.load(data);

const parse = (data, extension) => {
  let parseData;
  switch (extension) {
    case '.json':
      parseData = parseJson;
      break;
    case '.yml':
    case '.yaml':
      parseData = parseYaml;
      break;
    default:
      parseData = parseJson;
  }
  return parseData(data);
};

export default parse;
