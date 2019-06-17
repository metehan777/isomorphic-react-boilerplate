import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item } from '@components';

function array_wrap(value) {
  if (Object.prototype.toString.call(value) === '[object Array]') {
    return value;
  } else {
    return [value];
  }
}

class List extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['ul', 'ol']).isRequired,
    static: PropTypes.bool.isRequired
  };

  static defaultProps = {
    type: 'ul',
    static: true,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.items = [];
  }

  componentDidMount() {
    console.log(this.items);
  }

  bindReference = element => {
    console.log(this.props.static, element, this.items);
    if (this.props.static) {
      return undefined;
    }

    this.items.push(element);
  }


  focusNext = index => {
    if (!this.items.length || index < 0 || index >= this.items.length) {
      return undefined;
    }

    // this.items[index].blur();

    if (index === this.items.length - 1) {
      index = 0;
    } else {
      ++index;
    }

    this.items[index].focus();
  }

  focusPrevious = index => {
    if (!this.items.length || index < 0 || index >= this.items.length) {
      return undefined;
    }

    // this.items[index].blur();

    if (index === 0) {
      index = this.items.length - 1;
    } else {
      --index;
    }

    this.items[index].focus();
  }

  render() {
    return (
      <this.props.type>
        {
          array_wrap(this.props.children).map((item, index) => {
            return (
              <Item
                key={index}
                innerRef={this.bindReference}
                static={this.props.static}
                onArrowDown={() => this.focusNext(index)}
                onArrowUp={() => this.focusPrevious(index)}
                {...array_wrap(item.props)}>
                  {item.props.children || item}
              </Item>
            );
          })
        }
      </this.props.type>
    );
  }
}

export default List;
