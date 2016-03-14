///<reference path="../typings/main.d.ts"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Graph} from './components/graph';
import {TableDiff} from  './helper/tableDiff';


class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
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

let table = new TableDiff((e) => Math.cos(Math.tan(e)) + Math.sin(e), -2, 1, 8);
table.toString();
