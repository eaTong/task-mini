/**
 * Created by eaTong on 2018/9/9 .
 * Description:
 */

import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress} from '@tarojs/components';
import TaskItem from "./TaskItem";

export default class TaskChildren extends Component {
  static options = {
    addGlobalClass: true
  };
  render() {
    const {childrenTasks} = this.props;
    return (<View className="task-children">
      {childrenTasks.map(childTask => (<TaskItem task={childTask} key={childTask.id}  onClick={this.props.onClick}/>))}
    </View>);
  }
}
