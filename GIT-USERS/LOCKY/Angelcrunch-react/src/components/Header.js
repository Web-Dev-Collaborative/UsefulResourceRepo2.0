import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import animatedType from 'utils/cssAnimateType';
import {documentClick} from 'utils/tools';

export const Header = React.createClass({

  getInitialState() {
    return {
    };
  },

  MakeMenuHide($menu){
    if($menu.hasClass(animatedType.display.block)) {
      if($menu.hasClass(animatedType.animate.fadeOutDown)) 
        return 0;
      $menu.addClass(animatedType.animate.fadeOutDown);
      animatedType.WhenAnimationEnd($menu, function ($ele, animatedType) {
        $ele.removeClass([animatedType.animate.fadeOutDown,
                          animatedType.display.block].join(' '));
      }.bind(this, $menu, animatedType));
    }
  },

  onClick(evt) {
    var $menu = $(this.refs.hiddenMenu.getDOMNode());

    if($menu.hasClass([animatedType.display.block,
                       animatedType.animate.fadeOutDown]
                       .join(' ')))
      $menu.removeClass(animatedType.animate.fadeOutDown);
    else if($menu.hasClass(animatedType.display.block)) {
      this.MakeMenuHide($menu);
    } else 
      $menu.addClass(animatedType.display.block);
  },


  // lifecycle
  componentDidMount() {
    var $menu = $(this.refs.hiddenMenu.getDOMNode()),
        MakeMenuHide = this.MakeMenuHide.bind(this, $menu);
    var arr = [
            ".head .options",
            ".head .options span",
            ".head .options .hidden-menu",
            ".head .options .hidden-menu li"
        ];
    documentClick(arr, function (fn) {
        fn();
    }.bind(this, MakeMenuHide));
  },

  render() {
    return (
      <div id="header" className="head">
          <div className="logo"></div>
          <div className="options" onClick={this.onClick}>
              <span></span>
              <ul ref='hiddenMenu' className='hidden-menu animated'>
                  <li><Link to='projectList'>创业项目</Link></li>
              </ul>
          </div>
      </div>
    );
  }
});

export default Header;