import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import S, { spacing } from '../styles/styles'
import Icons from '../components/Icons'
import LoadingIndicator from '../components/LoadingIndicator'
import Card from '../components/Card'

import { fetchUserFlashcardSets } from '../actions/UserFlashcardSetsActions'

import api from '../data/api'

class Home extends React.Component {
  // const {state, setParams, navigate} = navigation
  // const {user} = state.params
  static navigationOptions = {
    title: `Foco: WSET-3`,
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      // left: (
      //   <TouchableOpacity
      //     style={{top:spacing.xsmall/2, paddingLeft: spacing.small}}
      //     onPress={() => navigation.navigate('DrawerOpen') }>
      //     {Icons.menu({tintColor: S.header.tintColor})}
      //   </TouchableOpacity>
      // ),
      // right: (
      //   <TouchableOpacity
      //     style={{top:spacing.xsmall/2, paddingRight: spacing.small}}
      //     onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER) }>
      //     {Icons.forward({tintColor: S.header.tintColor})}
      //   </TouchableOpacity>
      // )
    })
  }

  componentDidMount() {
    // TODO replace with first fetch with app config setting
    this.props.fetchUserFlashcardSets(C.FOCO_WSET3)
    this.props.fetchUserFlashcardSets(this.props.user.id)
  }

  navigate(route) {
    this.props.navigation.navigate(route)
  }

  render() {
    const navigation = this.props.navigation
    const props = this.props
    const user = this.props.user
    const appSets = this.props.sets[C.FOCO_WSET3] ? this.props.sets[C.FOCO_WSET3] : {}
    const userSets = this.props.sets[user.id] ? this.props.sets[user.id] : {}

    if (!this.props.ready) {
      return (
        <View style={[S.container, S.centeredContent]}>
          <StatusBar barStyle={S.statusBarStyle} />
          <LoadingIndicator />
        </View>
      )
    }

    return (
      <ScrollView style={S.container}>
        <StatusBar barStyle={S.statusBarStyle} />
        <Text>Common Sets</Text>
        { Object.keys(appSets).map(setId => {
          const set = appSets[setId]
          return (
            <Card
              key={setId}
              title={set.title}
              onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, ids:set.flashcards})}>
              <Text>
                {set.tags}
              </Text>
            </Card>
          )
        })}
        <Text>User Sets</Text>
        { Object.keys(userSets).map(setId => {
          const set = userSets[setId]
          return (
            <Card
              key={setId}
              title={set.title}
              onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, ids:set.flashcards})}>
              <Text>
                {set.tags}
              </Text>
            </Card>
          )
        })}
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: { id: 'E5HfTJLiJtdRoQujlAFUB9KAw5H3' },
    ready: state.flashcardSets.isReady,
    sets: state.flashcardSets.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchUserFlashcardSets: (id) => dispatch(fetchUserFlashcardSets(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
