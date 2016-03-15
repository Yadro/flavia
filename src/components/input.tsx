///<reference path="../../typings/main.d.ts"/>
import * as React from 'react';

interface InputCProps {
    labels: string[];
    callback: (name, value) => void;
}

export class InputC extends React.Component<InputCProps, any> {

    constructor(props) {
        super(props);
    }

    onChange(name, e: KeyboardEvent) {
        this.props.callback(name, e.target.value);
    }

    createInput(name) {
        return (
            <div key={name}>
                <label htmlFor={name}>{name}</label>
                <input name={name} type="number" onChange={this.onChange.bind(this, name)}/>
            </div>
        )
    }

    render() {
        const inputGroup = this.props.labels.map((l) => {
            return this.createInput(l);
        });
        return (
            <div>
                <b>alpha * cos(tan(betta * x)) + eps * sin(gamma * x)</b>
                {inputGroup}
            </div>
        )
    }
}