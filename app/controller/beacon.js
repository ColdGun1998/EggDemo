'use strict';
const moment = require('moment');
const Controller = require('egg').Controller;

class BeaconController extends Controller {
  // 增加基站
  async add() {
    const { ctx, app } = this;
    // 获取请求中携带的参数
    const { size, coordinate, remark = '' } = ctx.request.body;
    if (!size || !coordinate) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
    }
    try {
      const result = await ctx.service.beacon.add({
        size,
        coordinate: coordinate.reduce((accumulator, item, index, arr) => {
          if (index !== arr.length - 1) {
            accumulator = accumulator.concat(item + ';');
          } else {
            accumulator = accumulator.concat(item);
          }
          return accumulator;
        }, ''),
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

  // 根据基站id获取基站详情
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
      const detail = await ctx.service.beacon.detail(id);
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
  // 编辑基站
  async update() {
    const { ctx, app } = this;
    const { id, size, coordinate, remark = '' } = ctx.request.body;
    // 判空处理
    if (!id || !size || !coordinate) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
    }
    try {
      const result = await ctx.service.beacon.update({
        id,
        size,
        coordinate: coordinate.reduce((accumulator, item, index, arr) => {
          if (index !== arr.length - 1) {
            accumulator = accumulator.concat(item + ';');
          } else {
            accumulator = accumulator.concat(item);
          }
          return accumulator;
        }, ''),
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

  // //获取所有基站列表
  // 请求参数:分页号，分页大小
  // 返回
  // beaconList:[{},{},{}]
  async getList() {
    const { ctx, app } = this;
    const { pageSize = 10, pageNumber = 1 } = ctx.query;
    try {
      const list = await ctx.service.beacon.getList();

      const listMap = list.map(item => {
        const formatItem = {};
        formatItem.id = item.id;
        formatItem.coordinate = item.coordinate.split(';');
        formatItem.size = item.size;
        formatItem.remark = item.remark;
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
          beaconList: filterList || [], // 格式化后，并且经过分页处理的数据
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
  // 删除基站
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
      const result = await ctx.service.beacon.delete(id);
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

module.exports = BeaconController;
