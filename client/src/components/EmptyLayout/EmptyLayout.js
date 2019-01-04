import React, {Component} from 'react';

class EmptyLayout extends Component {
  render() {
    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default EmptyLayout;