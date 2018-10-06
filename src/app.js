import Taro, {Component} from '@tarojs/taro'
import Overview from './pages/overview/overview';
import './app.less'
class App extends Component {

  config = {
    pages: [
      'pages/mine/mine',
      'pages/overview/overview',
      'pages/draft/draft',
      'pages/addTask/addTask',
      'pages/taskDetail/taskDetail',
      'pages/updateTaskLog/updateTaskLog',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      selectedColor: "#1aad1a",
      list: [

        {
          "pagePath": "pages/mine/mine",
          "text": "我负责的",
          "iconPath": "images/mine.png",
          "selectedIconPath": "images/mine-active.png"
        },
        {
          "pagePath": "pages/overview/overview",
          "text": "概览",
          "iconPath": "images/home.png",
          "selectedIconPath": "images/home-active.png"
        }
      ]
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
