/**
 * Created by eaTong on 2018/10/4 .
 * Description:
 */
import Taro, {Component, navigateBack} from '@tarojs/taro'
import {View, Text, Input, Textarea, Button, Form, Icon, Picker} from '@tarojs/components'
import ajax from '../../utils/ajax';
import {AtInput, AtForm, AtTextarea, AtButton} from 'taro-ui';
import TextareaItem from "../../components/TextareaItem";
import SliderItem from "../../components/SliderItem";


export default class AddTask extends Component {

  config = {
    navigationBarTitleText: '更新任务'
  };
  state = {
    form: {},
    taskDetail:{}
  };

  async componentDidMount(a) {
    const params = this.$router.params;

    const taskDetail = await ajax({data: {id: params.id}, url:'/api/task/detail'});
    const {form} = this.state;
    form.afterPercent = taskDetail.completePercent;
    this.setState({form});
  }

  async onSubmit({detail}) {
    const data = {formId: detail.formId, ...this.state.form,taskId:this.$router.params.id};
    const result = await ajax({data, url: '/api/taskLog/add'});
    navigateBack();
  }

  handleChange(value, {currentTarget}) {
    const {form} = this.state;
    form[currentTarget.id] = value;
    this.setState({form});
  }

  render() {
    const {form} = this.state;
    return (
      <Form onSubmit={this.onSubmit.bind(this)} reportSubmit>
        <AtForm className='index-page'>
          <SliderItem
            label='完成量'
            max={100}
            min={0}
            step={10}
            name='afterPercent'
            value={form.afterPercent}
            onChange={this.handleChange}
          />

          <TextareaItem
            label={'描述'}
            name='content'
            value={form.content}
            onChange={this.handleChange}
          />

          <View className="submit-line">
            <Button formType={'submit'} type={'primary'}>更新</Button>
          </View>
        </AtForm>
      </Form>
    )
  }
}

