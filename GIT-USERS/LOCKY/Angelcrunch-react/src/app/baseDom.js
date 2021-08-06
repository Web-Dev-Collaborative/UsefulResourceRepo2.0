import React from 'react';
import Notification from 'components/notification';
import {RouteHandler} from 'react-router';

export class BaseDom extends React.Component {
    render() {
        return (
            <div>
                <div className='notification-board'>
                    <Notification ref='success' color='green' />
                    <Notification ref='warning' color='red' />
                    <Notification ref='warning' color='orange' />
                </div>
                <div className='react-root'>
                    <RouteHandler />
                </div>
            </div>
        );
    }
}

export default BaseDom;