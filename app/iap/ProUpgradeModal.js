import React from 'react'
import { View, Text, Button } from 'react-native'
import Modal from 'react-native-modal'
import { FlatButton } from 'react-native-elements'

import CurrentUser from '../auth/CurrentUser'
import Card from '../lib/Card'
import S from '../styles'
import { cards } from '../styles'

const ProUpgradeModal = (props) => {
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.dismissModal}
      style={S.containers.centered}
    >
      <View style={[S.cards.card, S.cards.raised, S.corners.rounded,
        S.cards.regular, {aspectRatio:0.8, padding:S.spacing.normal}]}>

        <View style={{flex:1}}>
          <Text>I am the Pro Upgrade modal!</Text>
          <Button
            title="Unlock now"
            onPress={CurrentUser.unlockPremiumAccess}
          />
        </View>

        <Button
          title="Maybe Later"
          style={{alignSelf:'flex-start'}}
          onPress={props.dismissModal}
        />
      </View>
    </Modal>
  )
}

export default ProUpgradeModal
