import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import C from '../C'
import T from '../T'
import S from '../styles/styles'
import L from '../L'

import Icons from '../components/Icons'
import LevelPill from '../components/LevelPill'

export default class FlashcardSetCard extends React.Component {
  render() {
    const props = this.props
    const type = props.type ? props.type : 'regular'
    const onPress = props.onPress
    const onEdit = props.onEdit
    const icon = props.icon
    const backgroundColor = props.backgroundColor
    const set = props.set
    const image = set.image

    const card = (
      <View
        style={[S.cards.card, S.cards.raised, styles[type], props.style]}
        >
        <View style={[styles.header, {backgroundColor}]}>
          { image &&
            <Image
              style={{width:'100%', height:'100%', position:'absolute'}}
              source={{uri: image}}
            />
          }
          <View style={{flexDirection:'row'}}>
            { icon &&
              <View style={{paddingLeft:S.spacing.small, paddingTop:S.spacing.xsmall}}>
                {icon}
              </View>
            }
            <Text style={[
              (type==='hero') ? S.text.title : S.text.subtitle,
              {
                padding:S.spacing.small,
                backgroundColor: T.colors.translucentWhite,
                color: T.colors.text,
                // backgroundColor: image ? T.colors.translucentWhite : T.colors.transparent,
                // color:image ? T.colors.text : T.colors.inverseText,
              }
            ]}>
              {props.title ? props.title : set.title}
            </Text>
          </View>
          <LevelPill
            level={set.level}
            style={{alignSelf:'flex-start', marginLeft:S.spacing.small}}
          />
        </View>
        <View style={styles.content}>
          {/* left info block */}
          <View style={styles.info}>
            <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
              {Icons.cards({size:T.icons.smallIcon, color:T.colors.inactive})}
              <Text style={[S.text.normal, {marginLeft:S.spacing.xsmall}]}>
                {`${set.flashcards.length} ${L.cards}`}
              </Text>
            </View>
          </View>

          {/* right action menu block */}
          { onEdit &&
            <View style={[S.containers.centered,{paddingTop:S.spacing.xsmall}]}>
              {Icons.edit({
                size: T.icons.smallIcon,
                color: T.colors.normal,
                onPress: onEdit
              })}
            </View>
          }
        </View>
      </View>
    )

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          {card}
        </TouchableOpacity>
      )
    } else {
      return card
    }
  }
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    height: 200,
  },
  carousel: {
    width: 240,
    height: 140,
    marginRight: S.spacing.small,
  },
  full: {
    width: '100%',
    height: 140,
  },
  regular: {
    width: 140,
    height: 140,
  },
  header: {
    flex: 1,
    borderBottomColor: T.colors.divider,
    borderBottomWidth: 1
  },
  content: {
    height: 50,
    padding:S.spacing.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  info: {
    justifyContent:'center',
    alignItems:'flex-start',
  }
})
