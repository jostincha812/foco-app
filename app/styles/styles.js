import { StyleSheet } from 'react-native';
import T from '../T';

export const spacing = {
  standard: 16,
  small: 8,
  xsmall: 4,
  large: 24,
  xlarge: 32,
  none: 0,
}

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.containerBackgroundColor,
    paddingBottom: spacing.xsmall,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowWrapped: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  titleBanner: {
    fontSize: T.titleFontSize,
    fontWeight: T.fontWeight,
    color: T.inverseTextColor,
    // backgroundColor: T.translucentWhiteColor,
    marginBottom: spacing.small,
  },
  card: {
    borderColor: T.contentBorderColor,
    backgroundColor: T.contentBackgroundColor,
  },
  rounded: {
    borderRadius: spacing.small,
  },
  roundedSmall: {
    borderRadius: spacing.xsmall,
  },
  roundedLarge: {
    borderRadius: spacing.standard,
  },
});

export const navigationStyles = {
  header: {
    backTitle: null,
    tintColor: T.inverseTextColor,
    titleStyle: {
      fontWeight: T.titleFontWeight,
      color: T.inverseTextColor,
    },
    style: {
      backgroundColor: T.activeColor,
      borderBottomWidth: 0,
    },
  },
};
