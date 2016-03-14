import React = JSX.React;


export class InputC extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <input type="number"/>
                <input type="number"/>
                <input type="number"/>
                <input type="number" />
            </div>
        )
    }
}