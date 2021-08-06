import React from 'react';

export class TextInput extends React.Component {
  render() {
    var {labelName, ...other} = this.props;
    return (
      <label><span>{labelName}</span><i><input {...other} /></i></label>
    );
  }
}

export default TextInput;