/**
 * Created by eaTong on 2018/9/25 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress, Picker } from '@tarojs/components';
import {AtIcon} from 'taro-ui';

export default class PickerItem extends Component {
  state = {
    value: ''
  };
  static options = {
    addGlobalClass: true
  };

  componentDidMount() {

  }

  onChangeValue(event) {
    const value = event.currentTarget.value;
    event.currentTarget.id = this.props.name;
    this.setState({value});
    this.props.onChange && this.props.onChange(value , event);
  }


  render() {
    const {value} = this.state;
    const {label,mode, range , rangeKey} = this.props;
    return (

      <Picker mode={mode} value={value} onChange={this.onChangeValue.bind(this)}>
        <View className="wa-form-item">
          <View className="wa-form-item-container">
            <Text className="label">{label}</Text>

            <View className="value">
              {value ? <Text>{value}</Text> : <Text className="placeholder">请选择</Text>}
            </View>
            <AtIcon value='chevron-right' size={22}/>

          </View>
        </View>
      </Picker>
    );
  }
}
