/**
 * Created by eaTong on 2018/9/9 .
 * Description:
 */

import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress} from '@tarojs/components';
import TaskItem from "./TaskItem";
import './taskChildren.less'

export default class TaskChildren extends Component {
  static options = {
    addGlobalClass: true
  }
  render() {
    const {childrenTasks} = this.props;
    return (<View className="task-children">
      {childrenTasks.map(childTask => (<TaskItem task={childTask} key={childTask.id}/>))}
    </View>);
  }
}
