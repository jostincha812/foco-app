import { StyleSheet } from 'react-native'

// http://www.flatuicolorpicker.com/

const T = {
  NONE: "transparent",
  PRIMARY: "#333",
  ACCENT_1: "#D35400",     // orange - burnt orange
  ACCENT_2: "#3A539B",      // blue - chambray
  BG: "#D9D9D9",
  NAVBG: "#EEEEEE",       // gray - gallery
  NAVCOLOR: "#AAA",
  INACTIVE: "#AAA",
  BORDER: "#CDCDCD",
  CARDBG: "#FFF",
}

const F = {
  HERO: 72,
  LARGEST: 36,
  LARGER: 24,
  NORMAL: 16,
  SMALLER: 12,
  SMALLEST: 8,
  BOLD: "600",
  NORMAL: "200",
  THIN: "100",
}

const G = {
  NONE: 0,
  LARGEST: 24,
  LARGER: 16,
  NORMAL: 12,
  SMALLER: 8,
  SMALLEST: 4,
}

const shadow = {
  shadowColor: T.INACTIVE,
  shadowOpacity: 0.3,
  shadowRadius: 2,
  shadowOffset: {width: 2, height: 4},
}

export default styles = StyleSheet.create({
  appContainer: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: T.NAVBG,
  },
  tourContainer: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: G.NORMAL,
    paddingRight: G.NORMAL,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: G.SMALLER,
  },
  page: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: G.NORMAL,
    paddingRight: G.NORMAL,
  },
  card: {
    margin: G.NORMAL,
    marginTop: G.SMALLER,
    marginBottom: G.SMALLEST,
    padding: G.LARGEST,
    backgroundColor: T.CARDBG,
    borderColor: T.BORDER,
    borderWidth: StyleSheet.hairlineWidth,
    ...shadow
  },
  cover: {
    height: 240,
    margin: G.NONE,
    marginBottom: G.LARGE,
    padding: G.LARGEST,
    backgroundColor: T.CARDBG,
    borderColor: T.BORDER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...shadow
  },
  stackedInput: {
    borderColor: T.BORDER,
    borderWidth: 1,
    marginBottom: G.NORMAL,
    paddingLeft: G.SMALLEST,
    paddingRight: G.SMALLEST,
  },
  title: {
    fontSize: F.LARGER,
    fontWeight: F.BOLD
  },
  subtitle: {
    fontSize: G.NORMAL,
    fontWeight: F.THIN
  },
  tabTitle: {
    color: T.NAVCOLOR,
    height: 0
  },
  tabTitleSelected: {
    color: T.ACCENT_1,
  },
  tabIcon: {
    color: T.NAVCOLOR,
    paddingBottom:1
  },
  tabIconSelected: {
    color: T.ACCENT_1,
    paddingBottom:1
  },
  autocompleteContainer: {
    margin: G.NONE,
  },
  autocompleteInputContainer: {
    margin: G.NONE,
  },
  autocompleteInputStyle: {
    margin: G.NONE,
  },
  autocompleteListStyle: {
    margin: G.NONE,
    padding: G.SMALLER,
  },
  autocompleteItemStyle: {
    fontSize: F.LARGER,
  }
});

export {
  T,
  F,
  G,
}
