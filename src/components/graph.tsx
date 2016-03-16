///<reference path="../../typings/main.d.ts"/>

import * as React from 'react';
import * as Snap from '../../node_modules/snapsvg/dist/snap.svg';
import {GraphPolynom} from "../helper/graphic_polynom";
import {TableDiff} from "../helper/tableDiff";

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
let bessel = (t: number, n: number, delta: (k, p) => number) => {
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

let factorial = (n: number) => {
    let c = 1;
    for (let i = 1; i <= n; i++) {
        c *= i;
    }
    return c;
};


class Bessel {
    n;
    table: TableDiff;
    delta;

    constructor(func: (x) => number, n: number) {
        this.n = n;
        this.table = new TableDiff(func, 0, 1, 2 * n + 2);
        this.table.toString();
        this.delta = (k) => (this.table.getDelta(k, 0) + this.table.getDelta(k, 1)) / 2;
    }

    bessel(): number {
        let result = 0;
        for (var i = 0; i < this.n; i++) {
            result += this.bessel_(this.table.y[i], i, this.delta);
        }
        return result;
    }

    /**
     *
     * @param t
     * @param n узел интерполяции
     * @param delta функция, возвращающая нужный элемент из таблицы разностей
     * @returns {number}
     */
    bessel_(t: number, n: number, delta: (k) => number){
        let qMul = this.calc_t(t, n);
        return (
            (            qMul / this.factorial(2 * n)      * (delta(2 * n)     + delta(2 * n)) / 2) +
            ((t - 1/2) * qMul / this.factorial(2 * n + 1)) * (delta(2 * n + 1) + delta(2 * n + 1)) / 2
        );
    }

    /**
     * Return t(t-1)(t+1)...(t-n-1)(t+n-1)(t-n)(t + n - 1)
     * @param t
     * @param n
     * @returns number
     */
    calc_t(t: number, n: number) {
        let c = t;
        for (let i = 1; i < n; i++) {
            c *= t - i;
            c *= t + i;
        }
        return c * (t - n) * (t + n - 1);
    }

    factorial(n: number) {
        let c = 1;
        for (let i = 1; i <= n; i++) {
            c *= i;
        }
        return c;
    }
}

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
        let f = func(this.props.params);
        this.graph = new GraphPolynom('#svg', [f]);
        let bessel = new Bessel(f, 5);
        console.log(bessel.bessel());
    }

    componentDidUpdate() {
        this.graph.updateGraphics([func(this.props.params)]);
    }

    render() {
        return (
            <div>
                <svg id="svg" width="800px" height="600px"/>
            </div>
        )
    }
}