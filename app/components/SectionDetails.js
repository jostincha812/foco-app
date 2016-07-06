// import React, { Component } from 'react';
// import { View, Text, TouchableHighlight, ListView } from 'react-native';
//
// import styles from '../styles';
// import CardsDeck from './CardsDeck';
//
// import { carddecks } from '../data/TestData';
//
// const dataSource = new ListView.DataSource({
//   rowHasChanged: (row1, row2) => row1 !== row2,
// });
//
// export default class SectionDetails extends React.Component {
//   constructor(props) {
//     super(props);
//     this._renderItem = this._renderItem.bind(this);
//   }
//
//   render() {
//     // TODO data should contain list of card decks for section
//     const d = this.props.data;
//     const mt = this.props.marginTop;
//     const onSelectItem = this.props.onSelectItem;
//
//     // map id into card decks data
//     const decks = Object.entries(carddecks).map(entry => {return {id:entry[0], ...entry[1]}});
//     const ds = dataSource.cloneWithRows(decks);
//
//     return (
//       <View style={[{marginTop:mt}, styles.listContainer]}>
//         <View style={[styles.cover,{justifyContent:'flex-end'}]}>
//           <Text style={styles.title}>
//             Chapters {d.chapters.map(i => `${i} `)} {d.extras}
//           </Text>
//         </View>
//         <ListView dataSource={ds} renderRow={this._renderItem} />
//       </View>
//     );
//   }
//
//   _renderItem(d) {
//     const onSelectItem = this.props.onSelectItem;
//     return (
//       <CardsDeck data={d} onSelectItem={() => onSelectItem(d)} />
//     );
//   }
// }
