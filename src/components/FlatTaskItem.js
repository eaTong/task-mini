/**
 * Created by eaTong on 2018/9/6 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text} from '@tarojs/components';
import {emergentLevel} from '../utils/constants';
import {daysFromToday, getDateDiff} from '../utils/utils';

export default class FlatTaskItem extends Component {
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
    const endDays = daysFromToday(task.planEndDate);
    if(task.completePercent === 100){
      timeInfo = <Text className="success-text">已完成</Text>
    }else  if (days > 0) {
      timeInfo = (<Text><Text className="number">{days}</Text>天后开始</Text>)
    } else if (delayDays < 0) {
      timeInfo = (<Text className='success-text'><Text className="number">{ endDays }</Text>天后到期</Text>)
    } else {
      timeInfo = (<Text className='error-text'>
        <Text className='status delay'>延期</Text>
        <Text className="number">{delayDays}</Text>天
      </Text>)
    }
    return (
      <View className={`task-item ${isRoot ? 'root' : ''}`} key="id" onClick={this.props.onClick} data-id={task.id} data-task={task}>
        <View className="title-bar">
          <Text className={`tag tag-level-${task.emergentLevel}`}>{emergentItem.label}</Text>
          <View className="title">{task.title}</View>
          <View className='percentage'>{`${task.completePercent}%`}</View>
        </View>
        <View className="content">
          <View className="time">{timeInfo}</View>
          <View className="responsible-user">
            {(task.participators || []).map(item => item.name).join('、') +
            (task.participators.length > 2 ? `等${task.participators.length}人参与` : '')
            }
          </View>
        </View>
      </View>
    );
  }

}
