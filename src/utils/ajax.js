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
        if (res.data && res.data.success) {
          resolve(res.data.data);
        } else {
          reject();
        }
      }, complete: (res) => {
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
