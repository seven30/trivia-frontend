import React, { Component } from 'react';
import './Game.css';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


class Game extends Component {

  render() {
    return (
      <div className="gamepage">
        <Card className="card">
          <CardContent>
            <p>What is the class mascot?</p>
              <Button>
              Cat
              </Button>
              <Button>
              Dog
              </Button>
              <Button>
              Unicorn
              </Button>
              <Button>
              Lion
              </Button>
          </CardContent>
            <CardActions>
              <Button size="small">Submit</Button>
            </CardActions>
        </Card>
      </div>
    );
  }
}

export default Game;
