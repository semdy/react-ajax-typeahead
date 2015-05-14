var TypeAheadSelect = React.createClass({
    getInitialState: function() {
        var options = [
            { text: 'One', value: 1 },
            { text: 'Two', value: 2 },
            { text: 'Three', value: 3 },
            { text: 'Four', value: 4 },
            { text: 'Five', value: 5 },
        ];
        return {
            options: options,
            showing: [],
            position: -1
        };
    },
    handleInput: function(e) {
        if (e.key === 'ArrowDown') {
            this.move(1)
        } else if (e.key === 'ArrowUp') {
            this.move(-1)
        } else if (e.key === 'Enter') {
            this.selectHighlighted();
        } else {
            this.setState({
                showing: this.getOptions(e.target.value)
            });
        }
    },
    selectHighlighted: function() {
            var selectedOption = this.state.showing[this.state.position];
            if (selectedOption) {
                this.selectOption(selectedOption);
            }
    },
    getOptions: function(value) {
        if (value === '') return [];
        return this.state.options.filter(function(c) { return c.text.toLowerCase().indexOf(value.toLowerCase()) !== -1 });
    },
    selectOption: function(option) {
        React.findDOMNode(this.refs.input).value = option.text;
        this.setState({ showing: [], position: -1 });
        console.log(option.value);
    },
    move: function(dPosition) {
        var newPosition = Math.min(this.state.showing.length, Math.max(this.state.position + dPosition, 0));
        this.setState({ position: newPosition });
    },
    render: function() {
        var options = this.state.showing.map(function(option, index) {
            return (
                <TypeAheadOption
                    text={option.text}
                    key={option.value}
                    selectOption={this.selectOption}
                    highlight={index === this.state.position} />
            );
        }.bind(this))
        return (
            <div>
                <input type="text" onKeyUp={this.handleInput} ref="input" onBlur={this.selectHighlighted} />
                <ul onKeyDown={this.handleInput}>
                    {options}
                </ul>
            </div>
        );
    }
});

var TypeAheadOption = React.createClass({
    handleSelection: function(e) {
        this.props.selectOption({ value: this.props.key, text: this.props.text });
    },
    render: function() {
        return (
            <li
                onClick={this.handleSelection}
                className={this.props.highlight ? 'highlight': ''}>
                    {this.props.text}
            </li>
        );
    }
});

React.render(
    <TypeAheadSelect />,
    document.getElementById('demo')
);