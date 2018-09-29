/**
 * Created by eaTong on 2018/9/6 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress} from '@tarojs/components';
import {emergentLevel, importantLevel} from '../utils/constants';
import TaskChildren from "./TaskChildren";

export default class TaskItem extends Component {
  static options = {
    addGlobalClass: true
  };

  render() {
    const {task, isRoot} = this.props;
    const emergentItem = emergentLevel[task.emergent_level - 1];
    return (
      <View className={`task-item ${isRoot ? 'root' : ''}`} key="id">
        <View className="title-bar">
          <Text className={`tag tag-level-${task.emergent_level}`}>{emergentItem.label}</Text>
          <View className="title">{task.title}</View>
          <View className='percentage'>{`${task.complete_percent}%`}</View>
        </View>
        {task.children && task.children.length > 0 && (
          <TaskChildren childrenTasks={task.children}/>
        )}
      </View>
    );
  }

}
