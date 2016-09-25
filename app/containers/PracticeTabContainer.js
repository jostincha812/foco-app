import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../styles';
import Flashcard from '../components/Flashcard';

class PracticeHome extends React.Component {
  render() {
    let card = {
      front: "*Gamay* wine style from **Beaujolais**",
      points: "8",
      back: [
        {t:"*fragrant*, full of *raspberry* and *cherry*", p:2},
        {t:"often enhanced by *carbonic maceration*", p:1},
        {t:"very little tannin", p:1},
        {t:"flavours of *kirsch*, *bananas*, *bubble gum* and *cinnamon spices*", p:4}
      ],
      tags: ["france", "beaujolais", "varietal", "wine style", "gamay"]
    }
    return (
      <View style={styles.page}>
        <Text style={styles.title}>
          Practice Home
        </Text>
        <Flashcard data={card} />
      </View>
    );
  }
}

export default PracticeHome;
