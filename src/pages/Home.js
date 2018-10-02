import React, { Component } from 'react';
import './Home.css';

import Button from '@material-ui/core/Button';


class Home extends Component {
  render() {
    return (
      <div className="homepage">
        <Button variant="contained" color="primary">
          Start!
        </Button>
      </div>
    );
  }
}

export default Home;
