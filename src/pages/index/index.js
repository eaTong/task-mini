import Taro, {Component} from '@tarojs/taro'
import {View, Text, Input, Button} from '@tarojs/components'
import './index.less';
import ajax from '../../utils/ajax';

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  };
  state = {
    myTask: [],
    currentUser: null,
    checked: false,
    form: {}
  };

  componentDidMount() {
    wx.login({
      success: async (res) => {
        const result = await ajax({url: '/api/user/loginByCode', data: {code: res.code}});
        this.setState({checked: true});
        if (result.user) {
          this.getMyTask();
          this.setState({currentUser: result.user});
        }
      }
    });
  }

  async getMyTask() {
    const myTasks = await ajax({url: "/api/task/mine"});
    console.log(myTasks);
  }

  onChangeField({detail, currentTarget}) {
    const {form} = this.state;
    form[currentTarget.dataset.field] = detail.value;
    this.setState({form});
  }

  async bindUser() {
    const currentUser = await ajax({url: '/api/user/bind', data: {...this.state.form, code: 'a'}});
    this.setState({currentUser});
    this.getMyTask();
  }

  render() {
    const {checked, currentUser} = this.state;
    return (
      <View className='index-page'>
        {checked && !currentUser && (
          <View className='bind-container'>
            <Input className="row" placeholder='账号' onChange={this.onChangeField.bind(this)} data-field={'account'}/>
            <Input className="row" password placeholder='密码' onChange={this.onChangeField.bind(this)}
                   data-field={'password'}/>
            <Button onClick={this.bindUser.bind(this)}>绑定</Button>
          </View>
        )}
      </View>
    )
  }
}

