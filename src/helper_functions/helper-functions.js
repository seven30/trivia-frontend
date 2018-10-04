
//SHUFFLES array elements into a new random order
const shuffle = function(arr){
  //Declare a temporary (tmp), random (rand), and index (i)
  let tmp, rand, i;
  for(i = arr.length - 1; i > 0; i--){
    //assign a random index value from 0 to the array length
    rand = Math.floor(Math.random() * (i+1));
    //assign current index value to tmp
    tmp = arr[i];
    //assign random index array value to the current index array value
    arr[i] = arr[rand];
    //assign tmp value to the random index array value
    arr[rand] = tmp;
  }
  return arr;
}

//ARRAY OF UNICODES AND THEIR APPROPRIATE CHARACTERS
const unicode = [[/&quot;/g, '"'],[/&#039;/g, "'"],[/&amp;/g, '&'],[/&HELLIP;/g, '...'],[/&LDQUO;/g, '"'], [/&RDQUO;/g, '"'], [/&Uuml/g, 'µ'],[/&uuml/g, 'µ'],[/&eacute;/g, 'é'], [/&RSQUO;/g, "'"], [/&deg;/g,'°'], [/&OACUTE;/g, '']];

//Replaces unicode in a string with appropriate character
const replaceUnicode = function(str){

  for(let i = 0; i < unicode.length; i++){
    //if unicode regex matches in the string, replace it
    if(str.match(unicode[i][0])){
      str = str.replace(unicode[i][0], unicode[i][1]);

    }
  }
  return str;
}

export {
  shuffle,
  replaceUnicode
}
