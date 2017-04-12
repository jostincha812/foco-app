import React from 'react';
import { View, Text } from 'react-native';

import T from '../T';
import S from '../styles/styles';
import I from '../components/Icons';
import Card from '../components/Card';
import TagsList from '../components/TagsList';

export default class UserActivitiesList extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <View>
        { Object.keys(data).map((k, i) => {
          return (
            <Card title={data[k].title} key={k}>
              <TagsList tags={data[k].tags} />
            </Card>
          )
        }) }
      </View>
    );
  }
}
