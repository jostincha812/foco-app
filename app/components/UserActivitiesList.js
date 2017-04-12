import React from 'react';
import { View, Text } from 'react-native';

import T from '../T';
import S from '../styles/styles';
import I from '../components/Icons';
import Card from '../components/Card';

export default class UserActivitiesList extends React.Component {
  render() {
    const data = this.props.data;
    return (
      data.map((a, i) => {
        console.log (a);
        console.log (
          <Card title={a.title} key={a.id}>
            <Text>
              {a.tags}
            </Text>
          </Card>
        )
      })
    );
  }
}
