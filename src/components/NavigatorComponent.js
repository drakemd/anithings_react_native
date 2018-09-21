import { connect } from 'react-redux';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { createFluidNavigator } from 'react-navigation-fluid-transitions'
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import DetailScreen from '../screen/DetailScreen/DetailScreen';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const RootNavigator = createFluidNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen }
});

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, navigationMiddleware };
