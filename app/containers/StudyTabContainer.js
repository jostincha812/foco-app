import { connect } from 'react-redux';
import StudyTab from '../components/StudyTab';
import { push, pop } from '../actions/NavigationActions';

function mapStateToProps(state) {
  return {
    navigation: state.get('studyTab'),
    dataSource: state.get('studyTab').dataSource,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    pushRoute: (route,data) => dispatch(Object.assign(push(route),{data})),
    popRoute: () => dispatch(pop()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
    // pushRoute: (route,data) => {
    //   dispatchProps.dispatch(Object.assign(push(route), {
    //     scope: stateProps.navigation.key,
    //     data: data,
    //   }));
    // },
    // popRoute: () => {
    //   dispatch(pop())
    // },
		// onNavigate: (action) => {
		// 	dispatchProps.dispatch(Object.assign(action, {
		// 		scope: action.scope || stateProps.navigation.key
		// 	}));
		// }
	});
})(StudyTab);
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(StudyTab);
