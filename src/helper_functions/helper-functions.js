
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
const unicode = [[/&#039;|&prime;|&Rsquo;|&rsquo;|&lsquo;|&Lsquo;|&RSQUO;|&LSQUO;/g, "'"],[/&amp;|&AMP;|&Amp;/g, '&'],[/&HELLIP;|&hellip;|&Hellip;/g, '...'],[/&LDQUO;|&RDQUO;|&ldquo;|&rdquo;|&quot;|&Prime;/g, '"'], [/&Uuml/g, 'Ü'],[/&uuml/g, 'ü'],[/&eacute;/g, 'é'], [/&Rsquo;|&rsquo;/g, "'"], [/&deg;/g,'°'], [/&oacute;/g, 'ó'], [/&Oacute/g,'Ó'],[/&shy;/g, '-'], [/&Ouml;/g,"Ö"],[/&ouml;/g, "ö"],[/&Auml;/g,"Ä"],[/&auml;/g, "ä"],[/&Aring;/g,"Å"],[/&aring;/g, "å"] ];

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
