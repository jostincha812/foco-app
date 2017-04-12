import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import C from '../C';
import T from '../T';
import S, { spacing } from '../styles/styles';
import Card from '../components/Card';
import TagsList from '../components/TagsList';

export default class UserActivityCard extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <Card containerStyle={styles.activityCard}>
        <Text style={S.titleBanner}>
          {data.title}
        </Text>
        <TagsList tags={data.tags} theme={C.THEME_ACCENT1} more={C.THEME_ACCENT2} />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  activityCard: {
    marginTop: spacing.small,
    marginLeft: spacing.small,
    marginRight: spacing.small,
    height: 140,
    backgroundColor: T.accentColor2,
  }
});
