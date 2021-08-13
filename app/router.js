'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller ,middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/test',  _jwt,controller.user.test);
  router.post('/api/upload', controller.upload.upload);
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo); // 获取用户信息
  router.post('/api/location/add', controller.location.add); // 添加定位项
  router.get('/api/location/get', controller.location.getCurLoc); // 获取指定帧定位数据
};
