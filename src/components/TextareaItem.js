/**
 * Created by eaTong on 2018/9/25 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress, Picker, Textarea} from '@tarojs/components';
import {AtIcon} from 'taro-ui';

export default class TextareaItem extends Component {
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
    const {label, placeholder,maxlength} = this.props;
    return (

      <View className="wa-form-item">
        <View className="wa-form-item-container">
          <Text className="label">{label}</Text>

          <Textarea
            className="value"
            placeholder={placeholder}
            value={value}
            maxlength={maxlength}
            onChange={this.onChangeValue.bind(this)}
            autoHeight
          />

        </View>
      </View>
    );
  }
}
