import React from 'react';
import { View } from 'react-native';

import T from '../T';
import S, { spacing } from '../styles/styles';
import Pill from '../components/Pill';

export default class UserActivitiesList extends React.Component {
  render() {
    const tags = this.props.tags;
    return (
      <View style={{flexDirection:'row'}}>
        { tags.map((t, i) => {
          return (
            <Pill style={{marginRight:spacing.xsmall, marginBottom:spacing.xsmall}}
              key={t}
              label={t}
            />
          )
        }) }
      </View>
    );
  }
}
