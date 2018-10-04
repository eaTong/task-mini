/**
 * Created by eaTong on 2018/9/25 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Progress, Picker} from '@tarojs/components';
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
    this.props.onChange && this.props.onChange(this.getValue(value), event);
  }

  getValue(index) {
    const {mode, range, key} = this.props;
    if (mode === 'selector') {
      if (typeof range[index] === 'string') {
        return range[index];
      }
      return range[index][key || 'id'];
    }
    return index;
  }


  render() {
    const {value} = this.state;
    const {label, mode, range, rangeKey, name , required} = this.props;
    let showLabel = value;
    if (mode === 'selector') {
      showLabel = range[value] && range[value][rangeKey];
    }
    return (
      <Picker
        mode={mode}
        name={name}
        value={value}
        range={range}
        rangeKey={rangeKey}
        onChange={this.onChangeValue.bind(this)}
      >
        <View className="wa-form-item">
          <View className="wa-form-item-container">
            <Text className="label">{label}</Text>
            {required && (<Text class='required'>*</Text>)}

            <View className="value">
              {value ? <Text>{showLabel}</Text> : <Text className="placeholder">请选择</Text>}
            </View>
            <AtIcon value='chevron-right' size={22}/>

          </View>
        </View>
      </Picker>
    );
  }
}
