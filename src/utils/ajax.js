let cookie = '';

export default function ajax(config) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://task.eatong.cn${config.url}`,
      data: config.data,
      method: (config.method || 'POST').toUpperCase(),
      header: {
        'Cookie': cookie,
      },
      success: (res) => {
        cookie = res.header['Set-Cookie'];
        if (res.data && res.data.success) {
          resolve(res.data.data);
        } else {
          reject();
        }
      }, complete: (res) => {
        console.log(res);
      }
    })
  });
};
