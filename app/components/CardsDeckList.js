import React from 'react';
import { View, ListView } from 'react-native';

import CardsDeck from './CardsDeck';

export default class CardsList extends React.Component {
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

  _renderItem(i) {
    const onSelectItem = this.props.onSelectItem;
    return (
      <CardsDeck data={i} onSelectItem={() => onSelectItem(i)} />
    );
  }
}
