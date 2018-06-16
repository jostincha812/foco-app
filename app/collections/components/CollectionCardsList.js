import React from 'react'
import { View } from 'react-native'
import S from '../../styles'
import CollectionCard from './CollectionCard'

const CollectionCardsList = (props) => {
  const collections = props.collections
  const keys = props.keys
  const onSelect = props.onSelect
  const onPrefChange = props.onPrefChange
  const onPremiumTrigger = props.onPremiumTrigger

  return (
    <View style={props.style}>
      { collections &&
        keys.map((id, index) => {
          const collection = {id, ...collections[id]}
          const lastItem = (index == (keys.length-1)) ? S.lists.lastItem : null
          return (
            <CollectionCard
              style={[S.lists.listItem, lastItem]}
              key={collection.id}
              type={collection.type}
              collection={collection}
              onPrefToggle={onPrefChange}
              onPress={() => onSelect(collection)}
              onPremiumTrigger={onPremiumTrigger}>
            </CollectionCard>
          )
        }
      )}
    </View>
  )
}

export default CollectionCardsList
