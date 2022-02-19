const json = (tree) => {
  const jsonString = JSON.stringify(tree, null, 2);
  // console.log(jsonString);
  // const jsonObject = JSON.parse(jsonString);
  // console.log(jsonObject);
  return jsonString;
};

export default json;
