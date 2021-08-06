import React from 'react';

export class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        require.ensure([], function() {
          require('static/css/wapsite/list/style.css');
          this.setState({
            Header: require('components/header').Header,
            List: require('components/project/list').List
          });
        }.bind(this));
    }

    render() {
        if(!this.state.Header) return null;
        return (
            <div className="details gray">
                <this.state.Header />
                <this.state.List />
            </div>
        );
    }
}

export default ProjectList;