import React from 'react';
import { View, Text } from 'react-native';

import T from '../T';
import S from '../styles/styles';

import UserActivityCard from './UserActivityCard';

export default class UserActivitiesList extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <View>
        { Object.keys(data).map((k, i) => {
          return (
            <UserActivityCard key={k} data={data[k]} />
          )
        }) }
      </View>
    );
  }
}
