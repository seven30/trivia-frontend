let classicModeFetch = function(num){
  return fetch("https://opentdb.com/api.php?amount="+num+"&type=multiple")
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

let triviaFetch = function(num = "", category = "", difficulty = ""){
  category = category === "" ? "" : "&category=" + category;
  difficulty = difficulty === "" ? "" : "&difficulty=" + difficulty;
  num = num === "" ? "amount=10" : "amount=" + num;
  console.log("num", num, "category", category, "difficulty", difficulty);
  return fetch("https://opentdb.com/api.php?" + num + category + "&type=multiple")
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
  classicModeFetch,
  triviaFetch
}
