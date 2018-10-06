/**
 * Created by eaTong on 2018/8/30 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro';
import ajax from '../../utils/ajax';
import TaskItem from "../../components/TaskItem";
import {View, Text} from '@tarojs/components';
import {AtTimeline} from 'taro-ui'
import './taskDetail.less'


export default class TaskDetail extends Component {

  config = {
    navigationBarTitleText: '任务详情'
  };
  state = {
    tasks: {},
    taskLogs: []
  };

  async componentDidMount(a) {
    await this.getTaskDetail();
  }

  async getTaskDetail() {
    const params = this.$router.params;
    const taskDetail = await ajax({data: {id: params.id}, url: '/api/task/detail/structured'});
    this.setState(taskDetail);
  }

  updateTaskLog() {
    navigateTo({url: `/pages/updateTaskLog/updateTaskLog?id=${this.$router.params.id}`})
  }

  render() {
    const {taskLogs, tasks} = this.state;
    const timeLineLogs = taskLogs.map(log => {
      return {
        title: log.task.title,
        content: [`进度更新：${log.beforePercent} 至 ${log.afterPercent}`, log.content, `时间：${new Date(log.createdAt).format('YYYY-MM-DD')}`],
        icon: log.afterPercent === 100 ? 'check-circle' : 'clock'
      }
    });
    return (
      <View className="task-detail">
        {tasks.map(task => <TaskItem task={task} isRoot key={task.id}/>)}

        <View className="task-logs">
          <AtTimeline items={timeLineLogs}/>
        </View>

        <View className="operator-container">
          <View className="button primary" onClick={this.updateTaskLog.bind(this)}>
            <Text>更新</Text>
          </View>
        </View>
      </View>
    )
  }
}

