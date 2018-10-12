const BASE = process.env.REACT_APP_API_URL; //"http://localhost:3000";

let createGameHistory = function(game_history){
  console.log("in create game history", game_history, game_history.user_id);
  return fetch(BASE + "/users/" + game_history.user_id + "/game_histories", {
    method: 'POST',
    body: JSON.stringify({
      game_history: game_history
    }),
    headers: {
      'Content-Type':'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => {
    console.log(res);
    res = res.json();
    console.log(res);
    return res;
  }).catch(err => {
      console.log("ERROR: ", err);
      return err;
  })
}

let getGameHistory = function(user_id){
  return fetch(BASE + "/users/" + user_id + "/game_histories")
  .then((res) => {
    console.log("currently fetching game histories")
    let json = res.json()
    console.log(json);
    return json
  })
  .then(res => {
    console.log("second .then response: ", res);
    return res})
  .catch(err => {
    console.log("ERROR: ", err)
    return err
  })
}

export {
  createGameHistory,
  getGameHistory
}
