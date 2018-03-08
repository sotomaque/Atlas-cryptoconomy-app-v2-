import { AppRegistry } from 'react-native';
import CodePush from 'react-native-code-push';
import App from './App';

const CodePushConfig = {
  updateDialog: true,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

const AppCodePushed = CodePush(CodePushConfig)(App);
AppRegistry.registerComponent('portfolio', () => AppCodePushed);
