'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串

  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/test', _jwt, controller.user.test);
  router.get('/api/user/get_list', controller.user.getList);
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo); // 获取用户信息


  router.post('/api/upload', controller.upload.upload);

  router.post('/api/location/add', controller.location.add); // 添加定位项
  router.get('/api/location/get', controller.location.getCurLoc); // 获取指定帧定位数据

  router.post('/api/scene/add', controller.scene.add); // 添加场景
  router.get('/api/scene/get_list', controller.scene.getList); // 获取所有场景列表
  router.get('/api/scene/detail', controller.scene.detail); // 获取场景详情
  router.post('/api/scene/update', controller.scene.update); // 场景更新
  router.post('/api/scene/delete', controller.scene.delete); // 删除场景

  router.post('/api/beacon/add', controller.beacon.add); // 添加基站
  router.get('/api/beacon/get_list', controller.beacon.getList); // 获取所有基站列表
  router.get('/api/beacon/detail', controller.beacon.detail); // 获取基站详情
  router.post('/api/beacon/update', controller.beacon.update); // 基站更新
  router.post('/api/beacon/delete', controller.beacon.delete); // 删除基站


};
