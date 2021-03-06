import {showToast , navigateTo} from '@tarojs/taro'
let cookie = '';

export default function ajax(config) {
  return new Promise((resolve, reject) => {
    const app = getApp();
    wx.request({
      url: `https://task.eatong.cn${config.url}`,
      data: config.data,
      method: (config.method || 'POST').toUpperCase(),
      header: {
        'Cookie': app.globalData && app.globalData.cookie,
      },
      success: (res) => {
        console.log(res);
        if (res.data && res.data.success) {
          resolve(res.data.data);
        } else {
          switch (res.statusCode){
            case 401:
              navigateTo({url:'pages/bind/bind'});
              break;
            case 400:
            default:
              showToast({title:res.data.message,icon:'none',duration:3000})
          }
          reject();
        }
      },
      error:(res)=>{
        console.log(res);
      },
      complete: (res) => {
        if (res.header['Set-Cookie']) {
          if (app.globalData) {
            app.globalData.cookie = res.header['Set-Cookie'];
          } else {
            app.globalData = {cookie: res.header['Set-Cookie']};
          }
        }
      }
    })
  });
};
