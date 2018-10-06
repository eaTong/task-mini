/**
 * Created by eaTong on 2018/9/6 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress} from '@tarojs/components';
import {emergentLevel} from '../utils/constants';
import TaskChildren from "./TaskChildren";
import {daysFromToday, getDateDiff} from "../utils/utils";

export default class TaskItem extends Component {
  static options = {
    addGlobalClass: true
  };

  render() {
    const {task, isRoot} = this.props;
    const emergentItem = emergentLevel[task.emergentLevel - 1];
    const days = daysFromToday(task.planStartDate);
    let timeInfo = null;
    const planDays = getDateDiff(task.planEndDate, task.planStartDate);
    const delayDays = task.workload - planDays - days;
    if(task.completePercent === 100){
      timeInfo = <Text className="success-text">已完成</Text>
    }else  if (days > 0) {
      timeInfo = (<Text><Text className="number">{days}</Text>天后开始</Text>)
    } else if (delayDays < 0) {
      const endDays = daysFromToday(task.planEndDate);
      timeInfo = (<Text className='success-text'>项目正常</Text>);
    } else {
      timeInfo = (<Text className='error-text'><Text className="number">{delayDays}</Text>天延期</Text>)
    }
    return (
      <View className={`task-item ${isRoot ? 'root' : ''}`} key={task.id} onClick={this.props.onClick} data-id={task.id} data-task={task}>
        <View className="title-bar">
          <Text className={`tag tag-level-${task.emergentLevel}`}>{emergentItem.label}</Text>
          <View className="title">{task.title}</View>
          <View className='percentage'>{`${task.completePercent}%`}</View>
        </View>
        <View className="content">
          <View className="time">{timeInfo}</View>
          <View className="responsible-user">{task.responsibleUser.name}</View>
        </View>
        {task.children && task.children.length > 0 && (
          <TaskChildren childrenTasks={task.children} onClick={this.props.onClick}/>
        )}
      </View>
    );
  }

}
