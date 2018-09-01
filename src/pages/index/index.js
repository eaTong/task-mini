import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress} from '@tarojs/components'
import './index.less';
import ajax from '../../utils/ajax';
import {emergentLevel, importantLevel} from '../../utils/constants'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  };
  state = {
    myTask: [],
    groupedTasks: [],
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
    const groupedTasks = emergentLevel.map(level => ({...level, tasks: []}));
    const myTask = await ajax({url: "/api/task/mine"});
    // this.setState({myTask});
    myTask.forEach(item => {
      groupedTasks[(item.emergent_level - 1) || 0].tasks.push(item);
    });
    // console.log(groupedTasks);
    this.setState({groupedTasks: groupedTasks.filter(level => level.tasks.length).reverse()})
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
    navigateTo({url: '/pages/addTask/addTask?draftId=1&draftName=ahahahah'});
  }


  addDraft() {
    navigateTo({url: '/pages/draft/draft'});
  }

  addJournal() {
    navigateTo({url: '/pages/addJournal/addJournal'});
  }

  render() {
    const {checked, currentUser, myTask, groupedTasks} = this.state;
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
        <View className="task-group">
          {groupedTasks.map(group => (
            <View  className={`emergent-level level-${group.value}`} key={group.value}>
              <View className="label" style={{color:group.color}}>{group.label}</View>
              <View className="task-list">

                {group.tasks.map(item => (
                  <View key={item.key} className="task-item">
                    <View className="title">{item.title}</View>
                    <Progress active showInfo percent={item.complete_percent} strokeWidth={2}/>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View className="task-list">

        </View>

        <View className="operator-container">

          <View className="button warning">
            <Text onClick={this.publishTask}>发布任务</Text>
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

