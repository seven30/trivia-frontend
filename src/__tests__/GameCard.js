import React from 'react';
import ReactDOM from 'react-dom';
import GameCard from '../components/GameCard';
import Game from '../pages/Game';
import Enzyme, {
  mount, shallow
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '@material-ui/core/Button';

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
const answers_order = [];
const answered_questions = [];

it('renders without crashing', () => {
      console.log(answers_order.length);
      const div = document.createElement('div');
      ReactDOM.render( < GameCard questions={question} answers_order={answers_order} answered_questions={answered_questions} counter={0} nextQuestion={() => console.log("ran next question")} checkAnswer={() => console.log("ran check Answer")}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

describe('Test Answer Buttons', () => {
  it('Test click events', () => {
    const mockCheck = jest.fn();
    const mockNext = jest.fn();
    const component = shallow(<GameCard questions={question} answers_order={answers_order} answered_questions={answered_questions} counter={0} nextQuestion={mockNext} checkAnswer={mockCheck}/>)
    // console.log(component.debug());
    component.find('#btn1').simulate('click');
    expect(mockCheck).toHaveBeenCalled();
  });
});
