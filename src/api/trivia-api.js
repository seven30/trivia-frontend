let classicModeFetch = function(){
  return fetch("https://opentdb.com/api.php?amount=10&type=multiple")
  .then(res => {
    console.log(res);
    res = res.json()
    console.log(res);
    return Promise.resolve(res);
  })
  .then(json => {
    console.log("results", json.results);
    return json.results
  })
}

export {
  classicModeFetch
}
