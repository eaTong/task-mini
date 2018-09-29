/**
 * Created by eaTong on 2018/8/30 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Textarea, Button, Form, Icon, Picker} from '@tarojs/components'
import './addTask.less';
import ajax from '../../utils/ajax';
import TaskItem from "../../components/TaskItem";


export default class TaskDetail extends Component {

  config = {
    navigationBarTitleText: '任务详情'
  };
  state = {
    taskDetail: {}
  };

  async componentDidMount(a) {
    await this.getTaskDetail();
  }

  async getTaskDetail() {
    const params = this.$router.params;
    const taskDetail = await ajax({data: {id: params.id}, url: '/api/task/detail'});
    this.setState({taskDetail});
  }

  render() {
    const {taskDetail} = this.state;
    return (
      <TaskItem task ={taskDetail}/>
    )
  }
}

