const json = (tree) => {
  const jsonString = JSON.stringify(tree, null, 2);
  console.log(jsonString);
  return jsonString;
};

export default json;
