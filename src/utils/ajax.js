let cookie = '';
const app = getApp();

export default function ajax(config) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://task.eatong.cn${config.url}`,
      data: config.data,
      method: (config.method || 'POST').toUpperCase(),
      header: {
        'Cookie': app.globalData.cookie,
      },
      success: (res) => {
        if (res.data && res.data.success) {
          resolve(res.data.data);
        } else {
          reject();
        }
      }, complete: (res) => {
        if (res.header['Set-Cookie']) {
          app.globalData.cookie = res.header['Set-Cookie'];
        }
      }
    })
  });
};
