import yaml from 'js-yaml';

const parseJson = (data) => JSON.parse(data);

const parseYaml = (data) => yaml.load(data);

const parse = (data, extension) => {
  switch (extension) {
    case '.json':
      return parseJson(data);
    case '.yml':
    case '.yaml':
      return parseYaml(data);
    default:
      return parseJson(data);
  }
};

export default parse;
