import React from 'react';
import ReactDOM from 'react-dom';
import Game from '../pages/Game';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter()
});

const DELAY_MS = 1200;

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('is able to retrive a list of questions via fetch', async ()=> {
  const game = mount(<Game />);
  console.log(game.state());
  await game.instance().componentDidMount();
  await sleep(DELAY_MS)

  // console.log(game.state());
  expect((game.state().questions).length).not.toBe(0);
});
