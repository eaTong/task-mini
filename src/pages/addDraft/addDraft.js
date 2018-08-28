import Taro, {Component} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Checkbox, Label, Switch} from '@tarojs/components'
import './addDraft.less';
import ajax from '../../utils/ajax';

const app = getApp();

export default class AddDraft extends Component {

  config = {
    navigationBarTitleText: '速记'
  };
  state = {
    myDrafts: [],
    showAll: false,
    draftValue: ''
  };

  async componentDidMount() {
    await this.getMyDrafts();
  }

  async getMyDrafts() {

    const myDrafts = await ajax({
      url: '/api/draft/mine'
    });
    this.setState({myDrafts});
  }

  showAll({detail}) {
    this.setState({showAll: detail.value});
  }

  async addDraft() {
    const title = this.state.draftValue;
    await ajax({
      url: '/api/draft/add',
      data: {title}
    });

    this.setState({draftValue: ''});
    await this.getMyDrafts();
  }

  async onDraftChange({detail}) {
    this.setState({draftValue: detail.value});
  }

  render() {
    const {draftValue, showAll, myDrafts} = this.state;
    return (
      <View className='add-draft-page'>
        {myDrafts.map(draft => (
          <View className="draft-item" key={draft.id}>
            <Text>{draft.title}</Text>
          </View>
        ))}

        <View className="show-all">
          <Text className="label">显示所有</Text>
          <Switch checked={showAll} onChange={this.showAll.bind(this)} color={app.globalData.primaryColor}/>
        </View>
        <View className="add-draft-container">
          <Input value={draftValue} placeholder="输入速记内容" onChange={this.onDraftChange.bind(this)}/>
          <Button onClick={this.addDraft.bind(this)}>添加</Button>
        </View>
      </View>
    )
  }
}

