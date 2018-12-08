
import React, {Component} from "react";

// var classnames = require("classnames");
import ClassNames from "classnames";

function Square(props) {
    let classes = ClassNames("square", {
        bold: props.bold
    });

    return (
      <button
      className={classes}
      onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

function JumpButton(props)
{
    let classes = ClassNames("jump-button", {
        active: props.active
    });

    return(
        <li className={classes} key={props.move}>
            <button
                onClick={props.onClick}
            >
            {props.desc}
            </button>
        </li>
    );
}

class Board extends React.Component {
  renderSquare(i, bold) {
      let classes = {
          bold: bold
      };

    return <Square
    {...classes}
    key={i}
    value={this.props.squares[i]}
    onClick={() => this.props.onClick(i)}
    />;
  }

  render() {

      let rows = [];
      for(let r = 0; r < 3; r ++)
      {
          let cols = [];
          for(let c = 0; c < 3; c++)
          {
              const square_num = c + (r*3);
              const bold = this.props.winners ? (this.props.winners.includes(square_num)?true:false) : false;
              cols.push(this.renderSquare(square_num, bold));
          }
          rows.push(<div key={r} className="board-row">{cols}</div>);
      }

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Toggle extends React.Component{
    render(){
        return(
            <button
            onClick={this.props.onClick}
            >
                Toggle Sort
            </button>
        );
    }
}

class Game extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            descending: true
        }
    }


    handleClick(i)
    {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i])
        {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                move: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(step)
    {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    toggle()
    {
        const descending = this.state.descending;
        this.setState({
            descending: !descending
        });
    }

  render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const stepNumber = this.state.stepNumber;



      let moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move + " (" + parseInt(step.move % 3 + 1) + ", " + parseInt(step.move/3 + 1) + ")":
            'Go to game start';

            const classes = {
                "active": (stepNumber === move) ? true : false
            };

            return <JumpButton
            {...classes}
            onClick={() => this.jumpTo(move)}
            desc={desc}
            key={move}
            />;
        });

        if(!this.state.descending)
            moves.reverse();

      let status;
      if(winner)
      {
          status = "Winner: " + winner[0];
      }
      else
      {
          if(stepNumber >= 9)
          {
              alert("Draw");
          }
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

    return (
      <div className="game">
        <div className="game-board">
          <Board winners={winner && winner[1]} squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <Toggle onClick={() => this.toggle()}/>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares)
{
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i ++)
    {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return [squares[a], [a,b,c]];
    }
    return null;
}

export default Game;
