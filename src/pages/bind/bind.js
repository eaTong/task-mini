/**
 * Created by eaTong on 2018/10/6 .
 * Description:
 */
/**
 * Created by eaTong on 2018/10/2 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro';
import ajax from '../../utils/ajax';

const app = getApp();

export default class Bind extends Component {

  config = {
    navigationBarTitleText: '用户绑定'
  };

  state = {
    form: {},
  };

  onChangeField({detail, currentTarget}) {
    const {form} = this.state;
    form[currentTarget.dataset.field] = detail.value;
    this.setState({form});
  }

  async bindUser() {
    const currentUser = await ajax({url: '/api/user/bind', data: {...this.state.form, code: 'a'}});
    this.setState({currentUser});
  }
  render() {
    const {checked, currentUser, myTask, currentTab} = this.state;
    if (checked && !currentUser) {
      return (
        <View className="index-page">
          <View className='bind-container'>
            <Input className="row" placeholder='账号' onChange={this.onChangeField.bind(this)} data-field={'account'}/>
            <Input className="row" password placeholder='密码' onChange={this.onChangeField.bind(this)}
                   data-field={'password'}/>
            <Button onClick={this.bindUser.bind(this)}>绑定</Button>
          </View>
        </View>
      )
    }
  }
}

