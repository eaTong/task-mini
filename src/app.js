import Taro, {Component} from '@tarojs/taro'
import Index from './pages/index';
import Bind from './pages/bind/bind';

import './app.less'
class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/bind/bind',
      'pages/addDraft/addDraft',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };

  globalData = {
    primaryColor:"#2f54eb"
  };

  componentDidMount() {

  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentCatchError() {
  }

  render() {
    return (
      <Index/>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
