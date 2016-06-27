import { connect } from 'react-redux';
import StudyTab from '../components/StudyTab';
import { push, pop } from '../actions/NavigationActions';

function mapStateToProps(state) {
  return {
    navigation: state.get('studyTab'),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
    pushRoute: (route,data) => {
      dispatchProps.dispatch(Object.assign(push(route), {
        scope: stateProps.navigation.key,
        data: data,
      }));
    },
    popRoute: () => {
      dispatchProps.dispatch(Object.assign(pop(), {
        scope: stateProps.navigation.key,
      }));
    },
	});
})(StudyTab);
