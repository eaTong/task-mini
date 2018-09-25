/**
 * Created by eaTong on 2018/8/30 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Textarea, Button, Form, Icon, Picker} from '@tarojs/components'
import './addTask.less';
import ajax from '../../utils/ajax';
import {AtInput, AtForm, AtTextarea , AtButton} from 'taro-ui';
import PickerItem from "../../components/PickerItem";
import SliderItem from "../../components/SliderItem";
import TextareaItem from "../../components/TextareaItem";


export default class Index extends Component {

  config = {
    navigationBarTitleText: '发布任务'
  };
  state = {
    form: {}
  };

  componentDidMount(a) {
    const params = this.$router.params;
    if (params) {
      this.setState({form: {draftId: params.draftId, title: params.draftName}});
    }
  }

  onChangeField({detail, currentTarget}) {
    const {form} = this.state;
    form[currentTarget.dataset.field] = detail.value;
    this.setState({form});
  }

  async onSubmit({detail: {value}}) {
    const result = await ajax({url: '/api/task/add', data: value});
    console.log(result);
  }

  handleChange(value, {currentTarget}) {
    console.log(value, currentTarget);
    // this.setData?
    const {form} = this.state;
    form[currentTarget.id] = value;
    this.setState({form});
  }

  render() {
    const {form} = this.state;
    return (
      <AtForm className='index-page' onSubmit={this.onSubmit}>
        <AtInput
          name='title'
          title='标题'
          type='text'
          placeholder='标题'
          value={form.title}
          onChange={this.handleChange}
        />
        <PickerItem label={'开始时间'} mode={'date'} name='startDate' value={form.startDate} onChange={this.handleChange}/>
        <PickerItem label={'结束时间'} mode={'date'} name='endDate' value={form.endDate} onChange={this.handleChange}/>
        <SliderItem label='紧急程度' max={5} name='emergency_level' value={form.emergency_level}
                    onChange={this.handleChange}/>
        <AtInput
          name='workload'
          title='工作量'
          type='number'
          placeholder='工作量'
          value={form.workload}
          onChange={this.handleChange}
        />
        <PickerItem label={'责任人'} mode={'selector'} name='responsible_user_id' value={form.responsible_user_id} onChange={this.handleChange}/>
        <TextareaItem label={'描述'} mode={'selector'} name='responsible_user_id' value={form.responsible_user_id} onChange={this.handleChange}/>

        <View className="submit-line">

          <AtButton formType={'submit'} type={'primary'}>发布</AtButton>
        </View>

      </AtForm>
    )
  }
}

