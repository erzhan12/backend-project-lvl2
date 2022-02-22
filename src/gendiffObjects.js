import _ from 'lodash';

const mergeKeys = (object1, object2) => Object.keys(_.merge(_.cloneDeep(object1), object2));

const genDiffObjects = (object1, object2) => {
  const assignValue = (value) => {
    if (_.isObject(value)) {
      return genDiffObjects(value, value);
    }
    return value;
  };
  const mergedKeys = _.sortBy(mergeKeys(object1, object2));

  const result = mergedKeys.reduce((acc, key) => {
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return [...acc,
        {
          key,
          type: 'objects',
          value: genDiffObjects(object1[key], object2[key]),
        },
      ];
    }
    if (object1[key] === object2[key]) {
      return [...acc,
        {
          key,
          type: 'equal',
          value: assignValue(object1[key]),
        },
      ];
    }
    if (_.has(object1, key) && _.has(object2, key)) {
      return [...acc,
        {
          key,
          type: 'changed',
          oldValue: assignValue(object1[key]),
          newValue: assignValue(object2[key]),
        },
      ];
    }
    if (_.has(object1, key)) {
      return [...acc,
        {
          key,
          type: 'removed',
          oldValue: assignValue(object1[key]),
        },
      ];
    }
    if (_.has(object2, key)) {
      return [...acc,
        {
          key,
          type: 'added',
          newValue: assignValue(object2[key]),
        },
      ];
    }

    return acc;
  }, []);
  return result;
};

export default genDiffObjects;
