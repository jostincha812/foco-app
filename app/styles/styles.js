import { StyleSheet } from 'react-native';
import T from '../T';

export const spacing = {
  standard: 16,
  small: 8,
  xsmall: 4,
  large: 16,
  xlarge: 32,
  none: 0,
}

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.containerBackgroundColor,
    paddingBottom: spacing.xsmall,
  },
  card: {
    backgroundColor: T.contentBackgroundColor,
    borderColor: T.contentBorderColor,
    borderWidth: 0.5,
    borderRadius: 0,
    shadowColor: T.shadowColor,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
    padding: 8,
    margin: spacing.none,
    marginTop: spacing.xsmall,
  },
});

export const navigationStyles = {
  header: {
    backTitle: null,
    titleStyle: {
      fontWeight: T.titleFontWeight,
      color: T.inverseTextColor,
    },
    style: {
      backgroundColor: T.activeColor,
    }
  },
};
