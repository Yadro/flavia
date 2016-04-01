///<reference path="../../typings/main.d.ts"/>

import * as React from 'react';
import * as Snap from '../../node_modules/snapsvg/dist/snap.svg';
import {GraphPolynom} from "../helper/graph_polynom";
import {TableDiff} from "../helper/tableDiff";
import {Bessel} from "../helper/bessel";
import {Params} from '../app';

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
 * ????
 */
function wtf(costjl) {
    return costjl;
}

interface GraphProps {
    params: Params
}

export class Graph extends React.Component<GraphProps, any> {

    graph: GraphPolynom;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let f = func(this.props.params);
        this.graph = new GraphPolynom('#svg', [{f: f}], this.props.params);
        let bessel = new Bessel(f, this.props.params);
        this.graph.addGraphic({f: (x) => bessel.bessel(x)});
    }

    componentDidUpdate() {
        let f = func(this.props.params);
        let bessel = new Bessel(f, this.props.params);
        this.graph.updateGraphics([
            {f: f},
            {f: (x) => bessel.bessel(x), step: wtf(bessel.h)}
        ], this.props.params);
    }

    render() {
        return (
            <div>
                <svg id="svg" width="800px" height="600px"/>
            </div>
        )
    }
}