import Taro, {Component} from '@tarojs/taro'
import Overview from './pages/overview/overview';
import './app.less'
class App extends Component {

  config = {
    pages: [
      'pages/overview/overview',
      'pages/draft/draft',
      'pages/addTask/addTask',
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
      <Overview/>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
