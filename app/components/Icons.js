import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import T from '../T.js';

const AppIcon = (name, options) => {
  const size = options.size ? options.size : T.icons.normalIcon;
  const color = options.color ? options.color : T.colors.normal;
  const focused = options.focused ? options.focused : false;
  const style = options.style
  const onPress = options.onPress

  if (onPress) {
    return (
      <TouchableOpacity
        style={style}
        onPress={onPress}
        >
        <Icon name={name} size={size} color={color} />
      </TouchableOpacity>
    )
  } else {
    return (
      <Icon style={style} name={name} size={size} color={color} />
    )
  }
};

// https://materialdesignicons.com/
export default {
  // @TODO foco app icon
  foco: (options = {}) => AppIcon('book-open-page-variant', options),

  // tab nav icons
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
  collection: (options = {}) => AppIcon('format-list-bulleted-type', options),

  multipleChoice: (options = {}) => AppIcon('format-list-bulleted', options),
  cards: (options = {}) => AppIcon('cards', options),
  cardsOutline: (options = {}) => AppIcon('cards-outline', options),
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
  pullDown: (options = {}) => AppIcon('download', options),

  add: (options = {}) => AppIcon('plus', options),
  addOutline: (options = {}) => AppIcon('plus-circle-outline', options),
  remove: (options = {}) => AppIcon('minus', options),
  removeOutline: (options = {}) => AppIcon('minus-circle-outline', options),
  edit: (options = {}) => AppIcon('pencil', options),
  delete: (options = {}) => AppIcon('delete', options),
  share: (options = {}) => AppIcon('share', options),
  check: (options = {}) => AppIcon('check', options),
  checkOutline: (options = {}) => AppIcon('check-circle-outline', options),
  archive: (options = {}) => AppIcon('archive', options),
  yesCircled: (options = {}) => AppIcon('checkbox-marked-circle', options),
  yesCircledOutline: (options = {}) => AppIcon('checkbox-marked-circle-outline', options),
  noCircled: (options = {}) => AppIcon('close-circle', options),
  noCircledOutline: (options = {}) => AppIcon('close-circle-outline', options),
  filter: (options = {}) => AppIcon('filter', options),
  filterOutline: (options = {}) => AppIcon('filter-outline', options),
  send: (options = {}) => AppIcon('send', options),

  // app icons
  about: (options = {}) => AppIcon('information', options),
  help: (options = {}) => AppIcon('help', options),
  new: (options = {}) => AppIcon('new-box', options),
  image: (options = {}) => AppIcon('image', options),
  warning: (options = {}) => AppIcon('alert-circle', options),
  menu: (options = {}) => AppIcon('menu', options),
  inlineMenu: (options = {}) => AppIcon('dots-vertical', options),
  settings: (options = {}) => AppIcon('settings', options),
  grid: (options = {}) => AppIcon('view-grid', options),
  list: (options = {}) => AppIcon('view-headline', options),
  // widgets: (options = {}) => AppIcon('widgets', options),
  tune: (options = {}) => AppIcon('tune', options),
  inbox: (options = {}) => AppIcon('inbox', options),
  new: (options = {}) => AppIcon('new-box', options),
  back: Platform.select({
    ios: (options = {}) => AppIcon('chevron-left', options),
    android: (options = {}) => AppIcon('arrow-left', options),
  }),
  forward: (options = {}) => AppIcon('chevron-right', options),
  lock: (options = {}) => AppIcon('lock', options),

  // Drawer icons
  drawerAll: (options = {}) => AppIcon('cards', options),
  drawerNew: (options = {}) => AppIcon('inbox', options),
  drawerStarred: (options = {}) => AppIcon('star', options),
  drawerSaved: (options = {}) => AppIcon('playlist-check', options),
  drawerDiscarded: (options = {}) => AppIcon('playlist-remove', options),
}
