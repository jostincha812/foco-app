import React from 'react';
import { ScrollView, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import S from '../styles/styles';
import LoadingIndicator from '../components/LoadingIndicator';

import { fetchUserActivities } from '../actions/userActivitiesActions';
import UserActivitiesList from '../components/UserActivitiesList';

class Home extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Home`,
  };

  componentDidMount() {
    this.props.fetchUserActivities();
  }

  render() {
    // const { navigate } = this.props.navigation;
    const props = this.props;

    if (props.activitiesData.isFetching) {
      return (
        <LoadingIndicator />
      )
    }

    return (
      <ScrollView style={S.container}>
        <StatusBar barStyle="light-content" />
        { props.activitiesData.data.length ?
          <UserActivitiesList data={props.activitiesData.data} /> : null
        }
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
    activitiesData: state.activitiesData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUserActivities: () => dispatch(fetchUserActivities())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
