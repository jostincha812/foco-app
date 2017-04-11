import React from 'react';
import { ScrollView, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import C from '../C';
import S from '../styles/styles';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';

import { fetchAirlinesData } from '../actions/airlinesActions';

class Home extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Home`,
  };

  componentDidMount() {
    this.props.fetchAirlinesData();
  }

  renderAirlines(data) {
    return (
      data.map((airline, i) => {
        return (
          <Card title={airline.name} key={airline.id}>
            <Text>IATA: {airline.id}</Text>
          </Card>
        )
      })
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    const props = this.props;

    if (props.airlinesData.isFetching) {
      return (
        <LoadingIndicator />
      )
    }

    return (
      <ScrollView style={S.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        {
          props.airlinesData.data.length ? this.renderAirlines(props.airlinesData.data) : null
        }
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
    airlinesData: state.airlinesData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAirlinesData: () => dispatch(fetchAirlinesData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
