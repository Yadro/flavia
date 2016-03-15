///<reference path="../../typings/main.d.ts"/>

import * as React from 'react';
import * as Snap from '../../node_modules/snapsvg/dist/snap.svg';
import {GraphPolynom} from "../helper/graphic_polynom";

function func(params) {
    let alpha = params.alpha;
    let betta = params.betta;
    let eps = params.eps;
    let gamma = params.gamma;
    return (x) => {
        return alpha * Math.cos(Math.tan(betta * x)) + eps * Math.sin(gamma * x);
    }
}

/**
 *
 * @param t
 * @param n узел интерполяции
 * @param delta функция, возвращающая нужный элемент из таблицы разностей
 * @returns {number}
 */
let bessel = (t, n, delta) => {
    let qMul = calc_t(t, n);
    return (
        (            qMul / factorial(2 * n)      * (delta(2 * n, -n)     + delta(2 * n, -n + 1)) / 2) +
        ((t - 1/2) * qMul / factorial(2 * n + 1)) * (delta(2 * n + 1, -n) + delta(2 * n + 1, -n + 1)) / 2
    );
};

/**
 * Return t(t-1)(t+1)...(t-n-1)(t+n-1)(t-n)(t + n - 1)
 * @param t
 * @param n
 * @returns number
 */
let calc_t = (t: number, n: number) => {
    let c = t;
    for (let i = 1; i < n; i++) {
        c *= t - i;
        c *= t + i;
    }
    return c * (t - n) * (t + n - 1);
};

let factorial = (n) => {
    let c = 1;
    for (let i = 1; i <= n; i++) {
        c *= i;
    }
    return c;
};

interface GraphProps {
    params;
}

export class Graph extends React.Component<GraphProps, any> {

    graph: GraphPolynom;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.graph = new GraphPolynom('#svg', func(this.props.params));
    }

    componentDidUpdate() {
        this.graph.updateGraphics(func(this.props.params));
    }

    render() {
        return (
            <div>
                <svg id="svg" width="800px" height="600px"/>
            </div>
        )
    }
}