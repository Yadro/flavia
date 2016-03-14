///<reference path="../typings/main.d.ts"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import {InputMatrix} from 'components/input_matrix'
import {Matrix} from 'helper/matrix';
//import Fraction = require('../node_modules/fraction.js/fraction');
import {Graph} from './components/graph';
import {TableDiff} from  './helper/TableDiff';

//import {Fraction} from "helper/fraction.js.ts";

let test = [
    [0, 0, 0],
    [0, 1, 3],
    [1, 2, 2],
    [7, 2, 10],
    [1, 1, 1],
];

interface AppState {
    matrix: Matrix;
}

class App extends React.Component<any, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            matrix: new Matrix(3, 3)
        };
    }

    callback(matrix) {
        let m = matrix.gauss(true);
        m.debugMatrix.forEach(e => {
            console.info(e.operation.toString());
            console.log(e.matrix.toString());
        });
        console.log(m.toString());
        this.setState({matrix: matrix});
    }

    render() {
        return (
            <div>
                <Graph />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('.react'));

let table = new TableDiff((e) => Math.cos(Math.tan(e)) + Math.sin(e), [0, 5], 1, 8);
table.toString();
