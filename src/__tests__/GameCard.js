import React from 'react';
import ReactDOM from 'react-dom';
import GameCard from '../components/GameCard';
import Game from '../pages/Game';
import Enzyme, {
  mount
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter()
});

const question = [
  {
    "category": "Entertainment: Japanese Anime & Manga",
    "type": "multiple",
    "difficulty": "hard",
    "question": "Which song was the callsign for Stefan Verdemann&#039;s KWFM radio station in Urasawa Naoki&#039;s &quot;Monster&quot;?",
    "correct_answer": "Over the Rainbow",
    "incorrect_answers": ["What a Wonderful World", "When You Wish Upon A Star", "Singing In The Rain"]
  }
]

it('renders without crashing', () => {
      const game = mount( < Game / > );
      const div = document.createElement('div');
      ReactDOM.render( < GameCard questions={question} counter={0} checkAnswer={() => console.log("test")}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
