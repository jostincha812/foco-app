import React from 'react'
import { ScrollView } from 'react-native'

import styles, { sizes } from './styles'

export default class Carousel extends React.Component {
  render() {
    const props = this.props

    return (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={props.style}>
          {props.children}
        </ScrollView>
    )
  }
}
