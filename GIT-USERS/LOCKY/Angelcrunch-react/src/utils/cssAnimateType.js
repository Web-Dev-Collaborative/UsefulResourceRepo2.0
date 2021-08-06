import $ from 'jquery';

export const animatedType = {
  display:{
    block: 'display-block',
    inline_block: 'display-inline-block'
  },
  animate:{
    fadeOutDown: 'fadeOutDown'
  },

  WhenAnimationEnd:function ($ele, fn) {
    $ele.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', fn);
  },
  UnbindAnimationEndEvt:function ($ele) {
    $ele.unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
  }
};



export default animatedType;