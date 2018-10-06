/**
 * Created by eaTong on 2018/10/2 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress} from '@tarojs/components';
import {AtSegmentedControl} from 'taro-ui';
import './mine.less';
import ajax from '../../utils/ajax';
import FlatTaskItem from "../../components/FlatTaskItem";

const app = getApp();

export default class Mine extends Component {

  config = {
    navigationBarTitleText: '我负责的'
  };

  state = {
    myTask: [],
    groupedTasks: [],
    currentUser: null,
    checked: false,
    form: {},
    currentTab: 0,
  };

  componentDidShow(){
    if(app.globalData.currentUser){
      this.getMyTask();
    }else {
      app.onLoginSuccess =()=>{
        this.getMyTask();
      }
    }
  }


  onChangeSegmented(currentTab) {
    this.setState({currentTab}, () => this.getMyTask())
  }

  async getMyTask() {
    const myTask = await ajax({url: "/api/task/mine", data: {completed: this.state.currentTab === 1}});
    this.setState({myTask})
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

  publishTask() {
    navigateTo({url: '/pages/addTask/addTask'});
  }


  addDraft() {
    navigateTo({url: '/pages/draft/draft'});
  }

  addJournal() {
    navigateTo({url: '/pages/addJournal/addJournal'});
  }

  onCheckTaskItem({currentTarget}) {
    navigateTo({url: `/pages/taskDetail/taskDetail?id=${currentTarget.dataset.id}`});
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
    return (
      <View className='index-page'>
        <View className="header-segmented">

          <AtSegmentedControl
            values={['未完成', '已完成']}
            onClick={this.onChangeSegmented.bind(this)}
            current={currentTab}
          />
        </View>
        <View className="task-list">
          {myTask.map(item => (
            <FlatTaskItem key={item.id} task={item} isRoot onClick={this.onCheckTaskItem.bind(this)} data-id={item.id}/>
          ))}
        </View>

        <View className="operator-container">

          <View className="button warning">
            <Text onClick={this.publishTask}>发布</Text>
          </View>
          <View className="button error" onClick={this.addDraft}>
            <Text>速记</Text>
          </View>
          <View className="button primary">
            <Text>写日志</Text>
          </View>


        </View>
      </View>
    )
  }
}

