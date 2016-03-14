///<reference path="../../typings/main.d.ts"/>

import * as React from 'react';
import * as Snap from '../../node_modules/snapsvg/dist/snap.svg';
import {GraphPolynom} from "../helper/graphic_polynom";

let func = (alpha, betta, eps, gamma) => {
    return (x) => {
        return alpha * Math.cos(Math.tan(betta * x)) + eps * Math.sin(gamma * x);
    }
};

let bessel = (q, n, delta, y ) => {
    let deltaTwo = delta(2 * n);
    let deltaTwoPlus = delta(2 * n);
    let qMul = calc_q(q, n);
    let yMinus = y(-n);
    let yMinusPlus = y(-n + 1);
    return (
        (            qMul / factorial(2 * n)      * (deltaTwo * yMinus + deltaTwo * yMinusPlus) / 2) +
        ((q - 1/2) * qMul / factorial(2 * n + 1)) *  deltaTwoPlus * yMinus
    );
};

/**
 * Return q(q-1)(q+1)...(q-n-1)(q+n-1)(q-n)(q + n - 1)
 * @param q
 * @param n
 * @returns number
 */
let calc_q = (q: number, n: number) => {
    let c = q;
    for (let i = 1; i < n; i++) {
        c *= q - i;
        c *= q + i;
    }
    return c * (q - n) * (q + n - 1);
};

let factorial = (n) => {
    let c = 1;
    for (let i = 1; i <= n; i++) {
        c *= i;
    }
    return c;
};

export class Graph extends React.Component<any, any> {

    graph;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.graph = new GraphPolynom('#svg', func(1, 1, 1, 1));
    }

    componentDidUpdate() {
        this.graph();
    }

    render() {
        return (
            <div>
                <h1>Snap svg</h1>
                <svg id="svg" width="800px" height="600px"/>
            </div>
        )
    }
}