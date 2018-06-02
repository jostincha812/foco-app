import React from 'react'

import T from '../../T'
import S, { markdown } from '../../styles'

import PillsList from '../../lib/PillsList'
import VPQTags from '../../lib/VPQTags'

export default class FlashcardTags extends React.Component {
  render() {
    const props = this.props

    const items = []
    if (props.tags) {
      props.tags.map(tag => {
        if (VPQTags.isRegionTag(tag) || VPQTags.isCategoryTag(tag)) {
          items.push({key:tag, label:tag})
        }
      })
    }

    return (
      <PillsList
        style={props.style}
        items={items}
        selected={props.tags}
        textColor={T.colors.inverse}
        pillColor={T.colors.active}
        pillBorderColor='transparent'
      />
    )
  }
}
