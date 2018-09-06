/**
 * Created by eaTong on 2018/9/6 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress} from '@tarojs/components';
import {emergentLevel, importantLevel} from '../utils/constants';
import {AtTag} from 'taro-ui'

export default class TaskItem extends Component {
  state = {
    showChildren: true
  };
  defaultProps = {
    task: {}
  };

  componentDidMount() {

  }


  render() {
    const {task} = this.props;
    if (task) {
      console.log(task, emergentLevel[task.emergent_level].label);
      const emergentItem = emergentLevel[task.emergent_level];
      return (
        <View className="task-item">
          <AtTag>{emergentItem.label}</AtTag>
          <View className="title">{task.title}</View>
          <View className='percentage'>{`${task.complete_percent}%`}</View>
        </View>
      );
    }

    return <Text/>
  }
}
