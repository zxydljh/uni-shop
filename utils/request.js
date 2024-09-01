const baseUrl = 'http://localhost:8080';

const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
	  url: baseUrl + options.url,
	  // data: options.params || {}, // 正确传递参数
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

export default request;