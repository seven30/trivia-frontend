import React, { Component } from 'react';
import './Home.css';
import Header from '../components/Header'
import Button from '@material-ui/core/Button';


class Home extends Component {

  handleClick(){
    this.props.history.push('/game');
  }

  render() {
    console.log(this.props);
    return (
      <div className="homepage">
        <Header / >
        <Button variant="contained" color="primary" onClick={this.handleClick.bind(this)}>
          Start!
        </Button>
      </div>
    );
  }
}

export default Home;
