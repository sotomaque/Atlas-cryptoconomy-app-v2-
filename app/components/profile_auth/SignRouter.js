import { StackNavigator } from 'react-navigation';
import NotSignedInView from './NotSignedInView.js';
import SignUpView from './SignUpView.js';
import InitProfileView from './InitProfileView.js';
import SignInView from './SignInView.js';
// import ForgotPasswordView from './sign_views/ForgotPasswordView.js';

const myNewBackgroundColor = 'white';
export const SignRouterComponent = StackNavigator(
 {
  notSignedIn: {
    screen: NotSignedInView,
      navigationOptions: {
      header: null,
      },
     },
  signUpView: {
    screen: SignUpView,
      navigationOptions: {
      header: null,
      },
     },
 signInView: {
    screen: SignInView,
       navigationOptions: {
       header: null,
      },
     },
 forgotPassView: {
    screen: NotSignedInView,
       navigationOptions: {
       header: null,
      },
    },
  initProfile: {
    screen: InitProfileView,
       navigationOptions: {
       header: null,
      },
  },
 },
  {
    initialRouteName: 'notSignedIn',
    cardStyle: { backgroundColor: myNewBackgroundColor },
  },
);

export default (SignRouterComponent);
