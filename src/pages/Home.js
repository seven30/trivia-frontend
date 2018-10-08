import React, { Component } from 'react';
import './Home.css';

import Button from '@material-ui/core/Button';


class Home extends Component {

  handleClick(){
    this.props.history.push('/game');
  }

  render() {
    console.log(this.props);
    return (
      <div className="homepage">
        <Button variant="contained" color="primary" onClick={this.handleClick.bind(this)}>
          Start!
        </Button>
      </div>
    );
  }
}

export default Home;
