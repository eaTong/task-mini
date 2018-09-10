/**
 * Created by eaTong on 2018/8/30 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Textarea, Button, Form, Icon, Picker} from '@tarojs/components'
import './addTask.less';
import ajax from '../../utils/ajax';
import { AtInput, AtForm , AtTextarea } from 'taro-ui';

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
    const result = await ajax({url: '/api/task/add' , data:value});
    console.log(result);
  }

  handleChange(value , {currentTarget}){
    console.log(value ,currentTarget);
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
        <AtTextarea
          name={'description'}
          value={form.description}
          onChange={this.handleChange}
          maxlength='200'
          placeholder='你的问题是...'
        />
      </AtForm>
    )
  }
}

