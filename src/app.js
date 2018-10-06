import Taro, {Component , navigateTo} from '@tarojs/taro'
import './app.less';
import './utils/prototype'
import ajax from "./utils/ajax";
import Bind from "./pages/bind/bind";

class App extends Component {
  config = {
    pages: [
      'pages/mine/mine',
      'pages/bind/bind',
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
    primaryColor:"#2f54eb",
    checked :false,
    currentUser:null
  };

  componentDidMount() {
    wx.login({
      success: async (res) => {
        const result = await ajax({url: '/api/user/loginByCode', data: {code: res.code}});
        const app = getApp();
        app.globalData.checked = true;
        if(result.user){
          app.globalData.currentUser = result.user;
          app.onLoginSuccess && app.onLoginSuccess();
        }else{
          navigateTo({url:'/pages/bind/bind'});
        }
      }
    });
  }

  render() {
    return <Bind/>
  }
}

Taro.render(<App/>, document.getElementById('app'))
