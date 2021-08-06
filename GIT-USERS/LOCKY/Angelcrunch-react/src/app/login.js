import React from 'react';
import TitleHelper from 'utils/titleHelper';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        require.ensure([], function() {
            require('static/css/wapsite/user/login.css');
            this.setState({
                Login: require('components/login').Login
            });
        }.bind(this));   
        TitleHelper.changeTitle(TitleHelper.login);
    }

    render() {
        if(!this.state.Login) return null;
        return (
          <div>
            <this.state.Login />
          </div>
        );
    }
}

export default Login;