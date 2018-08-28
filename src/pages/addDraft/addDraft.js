import Taro, {Component} from '@tarojs/taro'
import {View, Text, Input, Button, Icon} from '@tarojs/components'
import './index.less';
import ajax from '../../utils/ajax';

export default class AddDraft extends Component {

  config = {
    navigationBarTitleText: '速记'
  };
  state = {};

  componentDidMount() {

  }

  render() {
    return (
      <View className='add-draft-page'>
        add draft page...
      </View>
    )
  }
}

