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

  componentWillMount() {
    this.state.value = this.props.value ||1;
  }

  componentWillReceiveProps(nextProp) {
    if(nextProp.value !== this.state.value){
      this.setState({value:nextProp.value});
    }
  }

  onChangeValue(event) {
    const value = event.currentTarget.value;
    event.currentTarget.id = this.props.name;
    this.setState({value});
    this.props.onChange && this.props.onChange(value, event);
  }


  render() {
    const {value} = this.state;
    const {label, max, min, step, name} = this.props;
    console.log(this.props.value);
    return (

      <View className="wa-form-item">
        <View className="wa-form-item-container">
          <Text className="label">{label}</Text>

          <Slider
            className="value"
            showValue
            value={this.props.value || value}
            name={name}
            onChange={this.onChangeValue.bind(this)}
            blockSize={12}
            max={max === undefined ? 100 : max}
            min={min === undefined ? 1 : min}
            step={step === undefined ? 1 : step}
          />

        </View>
      </View>
    );
  }
}
