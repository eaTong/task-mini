/**
 * Created by eaTong on 2018/8/30 .
 * Description:
 */
import Taro, {Component, navigateBack} from '@tarojs/taro'
import {View, Text, Input, Textarea, Button, Form, Icon, Picker} from '@tarojs/components'
import './addTask.less';
import ajax from '../../utils/ajax';
import {AtInput, AtForm, AtTextarea, AtButton} from 'taro-ui';
import PickerItem from "../../components/PickerItem";
import SliderItem from "../../components/SliderItem";
import TextareaItem from "../../components/TextareaItem";


export default class AddTask extends Component {

  config = {
    navigationBarTitleText: '发布任务'
  };
  state = {
    form: {emergentLevel: 1},
    employees: []
  };

  async componentDidMount(a) {
    const params = this.$router.params;
    delete params['/pages/addTask/addTask'];
    console.log(params);
    if (params) {
      this.setState({form: {emergentLevel:1, ...params}});
    }
    await this.getEmployees();
  }

  async getEmployees() {
    const employees = await ajax({url: '/api/user/get'});
    // this.setState({employees: employees.map(emp => ({label: emp.name, value: emp.id}))});
    this.setState({employees});
  }


  async onSubmit({detail}) {
    const data = {formId: detail.formId, ...this.state.form};
    const result = await ajax({data, url: '/api/task/add'});
    navigateBack();
  }

  handleChange(value, {currentTarget}) {
    const {form} = this.state;
    form[currentTarget.id] = value;
    this.setState({form});
  }

  render() {
    const {form, employees} = this.state;
    console.log(form);
    return (

      <Form onSubmit={this.onSubmit.bind(this)} reportSubmit>
        <AtForm className='index-page'>
          <AtInput
            name='title'
            title='标题'
            type='text'
            placeholder='标题'
            value={form.title}
            onChange={this.handleChange}
          />
          <PickerItem
            label={'开始时间'}
            mode={'date'}
            name='planStartDate'
            value={form.planStartDate}
            onChange={this.handleChange}
          />
          <PickerItem
            label={'结束时间'}
            mode={'date'}
            name='planEndDate'
            value={form.planEndDate}
            onChange={this.handleChange}
          />
          <SliderItem
            label='紧急程度'
            max={5}
            min={1}
            name='emergentLevel'
            value={form.emergentLevel}
            onChange={this.handleChange}
          />
          <AtInput
            name='workload'
            title='工作量'
            type='number'
            placeholder='工作量'
            value={form.workload}
            onChange={this.handleChange}
          />
          <PickerItem
            label={'责任人'}
            mode={'selector'}
            range={employees}
            rangeKey={'name'}
            name='responsibleUserId'
            value={form.responsibleUserId}
            onChange={this.handleChange}
          />
          <TextareaItem
            label={'描述'}
            name='description'
            value={form.description}
            onChange={this.handleChange}
          />

          <View className="submit-line">
            <Button formType={'submit'} type={'primary'}>发布</Button>
          </View>
        </AtForm>
      </Form>
    )
  }
}

