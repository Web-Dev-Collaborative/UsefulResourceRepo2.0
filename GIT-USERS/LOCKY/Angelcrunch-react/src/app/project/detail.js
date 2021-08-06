import React from 'react';

export class projectDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        require.ensure([], function() {
          require('static/css/wapsite/investor/details.css');
          this.setState({
            Header: require('components/header').Header,
            BaseInfo: require('components/project/baseInfo').BaseInfoComponent,
            Details: require('components/project/details').projectDetails
          });
        }.bind(this));
    }

    render() {
        if(!this.state.Header) return null;
        return (
          <div className="details">
            <this.state.Header />
            <this.state.BaseInfo />
            <this.state.Details />
          </div>
        );
    }
}

export default projectDetails;