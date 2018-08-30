/**
 * Created by eaTong on 2018/8/30 .
 * Description:
 */
import Taro, {Component, navigateTo} from '@tarojs/taro'
import {View, Text, Input, Textarea, Button, Form, Icon, Picker} from '@tarojs/components'
import './addTask.less';
import ajax from '../../utils/ajax';

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  };
  state = {
    form: {}
  };

  componentDidMount(a) {
    console.log(a, this.$router.params);

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


  render() {
    const {form} = this.state;
    return (
      <Form className='index-page' onSubmit={this.onSubmit}>
        <View className="form-item">
          <View className="label">任务名称</View>
          <Input value={form.title} onChange={this.onChangeField.bind(this)} name="title" data-field={'title'}/>
        </View>
        <View className="form-item">
          <View className="label">任务描述</View>
          <Textarea value={form.description} onChange={this.onChangeField.bind(this)} name="description"
                    data-field={'description'}/>
        </View>
        <Picker mode='date' onChange={this.onChangeField.bind(this)} name="plan_start_date" data-field={'plan_start_date'}>
          <View className="form-item">
            <View className="label">计划开始时间</View>
            <View>
              {form.plan_start_date}
            </View>
          </View>
        </Picker>
        <Picker mode='date' onChange={this.onChangeField.bind(this)} name="plan_end_date" data-field={'plan_end_date'}>
          <View className="form-item">
            <View className="label">计划结束时间</View>
            <View>

              {form.plan_end_date}
            </View>
          </View>
        </Picker>

        <Button type="primary" formType="submit">提交</Button>
      </Form>
    )
  }
}

