import React from 'react';
import { View, Text } from 'react-native';

import T from '../T';
import S, { spacing } from '../styles/styles';
import Pill from '../components/Pill';

export default class UserActivitiesList extends React.Component {
  render() {
    const tags = this.props.tags;
    return (
      <View style={{flexDirection:'row', alignItems:'center'}}>
        { tags.map((t, i) => {
            if (i < 3) {
              return (
                <Pill style={{marginRight:spacing.xsmall}}
                  key={t}
                  label={t}
                />
              )
            }
        }) }

        { (tags.length > 3) &&
          <Text style={{fontSize:T.smallFontSize, fontWeight:T.boldedFontWeight, color:T.accentColor2}}>
            +{tags.length-3} more
          </Text>
        }

      </View>
    );
  }
}
