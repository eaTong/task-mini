import Taro, {Component} from '@tarojs/taro'
import {View, Text, Input, Button, Icon, Checkbox, Label, Switch} from '@tarojs/components'
import './draft.less';
import ajax from '../../utils/ajax';

const app = getApp();

export default class Draft extends Component {

  config = {
    navigationBarTitleText: '速记'
  };
  state = {
    myDrafts: [],
    showAll: false,
    draftValue: '',
    operatingIndex: 0
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

  async Draft() {
    const title = this.state.draftValue;
    if (title) {

      await ajax({
        url: '/api/draft/add',
        data: {title}
      });

      this.setState({draftValue: ''});
      await this.getMyDrafts();
    }
  }

  async onDraftChange({detail}) {
    this.setState({draftValue: detail.value});
  }

  render() {
    const {draftValue, showAll, myDrafts, operatingIndex} = this.state;
    return (
      <View className='draft-page'>
        <View className="draft-list">
          {myDrafts.map((draft, index) => (
            <View className="draft-item" key={draft.id}>
              <Text className="title">{draft.title}</Text>
              {index === operatingIndex && (
                <View className="operate-bar">
                  <Text className="operate-button ghost error-text">丢弃</Text>
                  <Text className="operate-button ghost primary-text">转任务</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View className="show-all">
          <Text className="label">显示所有</Text>
          <Switch checked={showAll} onChange={this.showAll.bind(this)} color={app.globalData.primaryColor}/>
        </View>
        <View className="add-draft-container">
          <Input value={draftValue} placeholder="输入速记内容" onChange={this.onDraftChange.bind(this)}/>
          <Button onClick={this.Draft.bind(this)}>添加</Button>
        </View>
      </View>
    )
  }
}

