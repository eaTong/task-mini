/**
 * Created by eaTong on 2018/9/25 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress, Picker, Slider} from '@tarojs/components';
import {AtIcon} from 'taro-ui';

export default class SliderItem extends Component {
  state = {
    value: 1
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
    const {label, max, min, step,} = this.props;
    return (

      <View className="wa-form-item">
        <View className="wa-form-item-container">
          <Text className="label">{label}</Text>

          <Slider
            className="value"
            showValue
            value={value}
            onChange={this.onChangeValue.bind(this)}
            blockSize={12}
            max={max ||100} min={min ||1} step={step ||1}/>

        </View>
      </View>
    );
  }
}
