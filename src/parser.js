import yaml from 'js-yaml';

const parseJson = (data) => JSON.parse(data);

const parseYaml = (data) => yaml.load(data);

const parse = (data, formatName) => {
  switch (formatName) {
    case 'json':
      return parseJson(data);
    case 'yaml':
      return parseYaml(data);
    default:
      return parseJson(data);
  }
};

export default parse;
