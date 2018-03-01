import { StackNavigator } from 'react-navigation';
import NotSignedInView from './NotSignedInView.js';
// import SignUpView from './sign_views/SignUpView.js';
// import SignInView from './sign_views/SignInView.js';
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
    screen: NotSignedInView,
      navigationOptions: {
      header: null,
      },
     },
 signInView: {
    screen: NotSignedInView,
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
 },
  {
    initialRouteName: 'notSignedIn',
    cardStyle: { backgroundColor: myNewBackgroundColor },
  },
);

export default (SignRouterComponent);
