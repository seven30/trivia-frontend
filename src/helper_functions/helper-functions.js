const shuffle = function(arr){
  let tmp, rand, i;
  for(i = arr.length - 1; i > 0; i--){
    rand = Math.floor(Math.random() * (i+1));
    tmp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = tmp;
  }
  return arr;
}

const unicode = [[/&quot;/g, '"'],[/&#039;/g, "'"],[/&amp;/g, '&'],[/&HELLIP;/g, '...'],[/&LDQUO;/g, '"'], [/&RDQUO;/g, '"'], [/&Uuml/g, 'µ'],[/&uuml/g, 'µ'],[/&eacute;/g, 'é'], [/&RSQUO;/g, "'"], [/&deg;/g,'°'], [/&OACUTE;/g, '']];

const replaceUnicode = function(str){
  //console.log(str);
  for(let i = 0; i < unicode.length; i++){
    if(str.match(unicode[i][0])){
      str = str.replace(unicode[i][0], unicode[i][1]);
      //console.log(str);
    }
  }
  //console.log(str);
  return str;
}

export {
  shuffle,
  replaceUnicode
}
