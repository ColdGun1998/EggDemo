'use strict';
const moment = require('moment');
const Controller = require('egg').Controller;
// 相关接口设计
// 增加场景
// 根据scene_id获取指定场景信息
// 获取所有场景列表

class SceneController extends Controller {
  // 增加场景
  async add() {
    const { ctx, app } = this;
    // 获取请求中携带的参数
    const { sceneName, imgUrl, fmapSettings = '', fengMapId = '', fengAppName = '', fengKey = '', beaconSettings = '', remark = '' } = ctx.request.body;
    if (!sceneName || !imgUrl) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
    }
    try {
      const result = await ctx.service.scene.add({
        sceneName,
        imgUrl,
        fmapSettings,
        fengMapId,
        fengAppName,
        fengKey,
        beaconSettings,
        ctime: moment().format('x'),
        remark,
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }

  // 根据场景id获取场景详情
  async detail() {
    const { ctx, app } = this;
    const { id = '' } = ctx.query;
    if (!id) {
      ctx.body = {
        code: 500,
        msg: '场景id不能为空',
        data: null,
      };
    }
    try {
      const detail = await ctx.service.scene.detail(id);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: detail,
      };

    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }

  }
  // 编辑场景
  async update() {
    const { ctx, app } = this;
    const { id, sceneName, imgUrl, fmapSettings = '', fengMapId = '', fengAppName = '', fengKey = '', beaconSettings = '', remark = '' } = ctx.request.body;
    // 判空处理
    if (!sceneName || !imgUrl || !id) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
    }
    try {
      const result = await ctx.service.scene.update({
        id,
        sceneName,
        imgUrl,
        fmapSettings,
        fengMapId,
        fengAppName,
        fengKey,
        beaconSettings,
        remark,
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }

  // //获取所有场景列表
  // 请求参数:分页号，分页大小
  // 返回
  // sceneList:[{},{},{}]
  async getList() {
    const { ctx, app } = this;
    const { pageSize = 5, pageNumber = 1 } = ctx.query;
    try {
      const list = await ctx.service.scene.getList();

      const listMap = list.map(item => {
        const formatItem = {};
        formatItem.id = item.id;
        formatItem.sceneName = item.sceneName;
        formatItem.imgUrl = item.imgUrl;
        formatItem.fmapSettings = item.fmapSettings;
        formatItem.fengAppName = item.fengAppName;
        formatItem.fengKey = item.fengKey;
        formatItem.fengMapId = item.fengMapId;
        formatItem.beaconSettings = item.beaconSettings;
        formatItem.ctime = moment(+item.ctime).format('YYYY-MM-DD');
        return formatItem;
      });
      // 分页处理
      const filterList = listMap.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          total: listMap.length,
          sceneList: filterList || [], // 格式化后，并且经过分页处理的数据
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }


  }
  // 删除场景
  async delete() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;

    if (!id) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
    }

    try {
      const result = await ctx.service.scene.delete(id);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }

}

module.exports = SceneController;
