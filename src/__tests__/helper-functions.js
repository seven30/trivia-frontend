import React from 'react';
import ReactDOM from 'react-dom';
import Game from '../pages/Game';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shuffle, replaceUnicode } from '../helper_functions/helper-functions.js';

Enzyme.configure({
  adapter: new Adapter()
});

it('shuffle should change the order of an array', () =>{
  let arr = ['answer1', 'answer2', 'answer3', 'answer4'];
  let shuffled_arr = shuffle(['answer1', 'answer2', 'answer3', 'answer4']);
  console.log(arr, shuffled_arr);
  expect(arr).not.toEqual(shuffled_arr);
});

it('replaceUnicode should replace any unicode in a string with the appropriate character', () => {
  let str = 'This is a &qou;Question&quo;';
  let unicode = '&quo;'
  str = replaceUnicode(str);
  console.log(str);
  expect.not.stringContaining(unicode);
  expect.stringContaining('"');
});
