let classicModeFetch = function(num, difficulty){
  return fetch("https://opentdb.com/api.php?amount="+num+"&difficulty="+difficulty+"&type=multiple")
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

// let triviaFetch = function(num, category, difficulty){
//   return fetch("https://opentdb.com/api.php?amount="+num+"&category="+category+"&difficulty="+difficulty+"&type=multiple")
//   .then(res => {
//     console.log(res);
//     res = res.json()
//     console.log(res);
//     return Promise.resolve(res);
//   })
//   .then(json => {
//     console.log("results", json.results);
//     return json.results
//   })
// }
//
export {
  classicModeFetch
}
