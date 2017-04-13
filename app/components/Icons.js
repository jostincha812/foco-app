import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import T from '../T.js';

const AppIcon = (name, options) => {
  let size = options.size ? options.size : T.iconSize;
  let color = options.tintColor ? options.tintColor : T.color;
  let focused = options.focused ? options.focused : false;
  return (
    // <View style={{borderColor:'#666', borderWidth:0.5, width:size+1, height:size+1}}>
      <Icon name={name} size={size} color={color} />
    // </View>
  )
};

// https://materialdesignicons.com/
export default {
  // foco icons
  home: (options = {}) => AppIcon('home', options),
  homeOutline: (options = {}) => AppIcon('home-outline', options),
  search: (options = {}) => AppIcon('magnify', options),
  bookmark: (options = {}) => AppIcon('bookmark', options),
  bookmarkOutline: (options = {}) => AppIcon('bookmark-outline', options),
  profile: (options = {}) => AppIcon('account', options),
  profileOutline: (options = {}) => AppIcon('account-outline', options),
  analytics: (options = {}) => AppIcon('chart-line', options),
  study: (options = {}) => AppIcon('book-open-variant', options),
  timer: (options = {}) => AppIcon('timer', options),

  multipleChoice: (options = {}) => AppIcon('format-list-bulleted', options),
  flashcards: (options = {}) => AppIcon('cards-outline', options),
  shortAnswers: (options = {}) => AppIcon('file-document', options),
  reports: (options = {}) => AppIcon('file-chart', options),

  currencyUSD: (options = {}) => AppIcon('currency-usd', options),
  currencyGBP: (options = {}) => AppIcon('currency-gbp', options),
  currencyEUR: (options = {}) => AppIcon('currency-eur', options),

  cloud: (options = {}) => AppIcon('weather-cloudy', options),

  // user actions
  favorite: (options = {}) => AppIcon('heart', options),
  favoriteOutline: (options = {}) => AppIcon('heart-outline', options),
  star: (options = {}) => AppIcon('star', options),
  starOutline: (options = {}) => AppIcon('star-outline', options),
  flag: (options = {}) => AppIcon('flag', options),
  flagOutline: (options = {}) => AppIcon('flag-outline', options),
  like: (options = {}) => AppIcon('thumb-up', options),
  likeOutline: (options = {}) => AppIcon('thumb-up-outline', options),
  comment: (options = {}) => AppIcon('comment-text', options),
  commentOutline: (options = {}) => AppIcon('comment-text-outline', options),
  commentAdd: (options = {}) => AppIcon('comment-plus-outline', options),
  commentMore: (options = {}) => AppIcon('comment-processing', options),
  lock: (options = {}) => AppIcon('lock', options),
  unlock: (options = {}) => AppIcon('lock-open-outline', options),

  add: (options = {}) => AppIcon('plus', options),
  addOutline: (options = {}) => AppIcon('plus-circle-outline', options),
  remove: (options = {}) => AppIcon('minus', options),
  removeOutline: (options = {}) => AppIcon('minus-circle-outline', options),
  edit: (options = {}) => AppIcon('pencil', options),
  delete: (options = {}) => AppIcon('delete', options),
  share: (options = {}) => AppIcon('share', options),

  // app icons
  help: (options = {}) => AppIcon('help', options),
  new: (options = {}) => AppIcon('new-box', options),
  image: (options = {}) => AppIcon('image', options),
  warning: (options = {}) => AppIcon('alert-circle', options),
  menu: (options = {}) => AppIcon('menu', options),
  settings: (options = {}) => AppIcon('settings', options),
  grid: (options = {}) => AppIcon('view-grid', options),
  list: (options = {}) => AppIcon('view-headline', options),
  // widgets: (options = {}) => AppIcon('widgets', options),
  tune: (options = {}) => AppIcon('tune', options),

}
