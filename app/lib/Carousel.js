import React from 'react'
import { ScrollView } from 'react-native'

import C from '../C'
import T from '../T'
import S from '../styles/styles'

export default class Carousel extends React.Component {
  render() {
    const props = this.props

    return (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={props.style}>
          {props.children}
        </ScrollView>
    )
  }
}
