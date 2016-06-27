import React, { Component } from 'react';
import { View, ListView, TouchableHighlight } from 'react-native';

import Section from './Section';

export default class SectionsList extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  render() {
    const ds = this.props.dataSource;
    return (
      <ListView dataSource={ds} renderRow={this._renderItem} />
    )
  }

  _renderItem(s) {
    const onSelectItem = this.props.onSelectItem;
    return (
      <Section data={s} key={s.key} onSelectItem={onSelectItem} />
    );
  }
}
