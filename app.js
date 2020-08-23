'use strict';

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (squares[i] == null) {

            squares[i] = this.state.xIsNext ? "X" : "O"



            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext
            },
                () => {
                    console.log(this.state)
                    // TODO: Check if the computer is supposed to take its turn
                    if (!this.state.xIsNext) {
                        this.takeComputerTurn(this.state.squares);
                    }

                }
            );
        }
    }


    async takeComputerTurn(squares) {
        const computerMove = calculateComputerMove(squares);
        console.log(computerMove)


        squares[computerMove] = "O"
        this.setState({
            squares: squares,
            xIsNext: true,
        });


    }


    restartGame() {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {

        const winner = calculateWinner(this.state.squares);

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
        }




        return (
            <div className="game">
                <div className="status">{status}</div>
                <div className="board">
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
                <button className="restartButton" onClick={() => this.restartGame()} ><span>Restart</span></button>
            </div>
        );
    }
}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;

}

function calculateComputerMove(squares) {
    for (var i = 0; i < squares.length; i++) {
        if (squares[i] == null) {
            return i;
        }
    }

    // If the board is completely full, don't return anything
    return;
}


class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Tic Tac Toe</h1>

                <Game />



            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));