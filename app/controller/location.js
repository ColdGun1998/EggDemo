'use strict';

const moment = require('moment')

const Controller = require('egg').Controller;

class LocationController extends Controller {
  //获取当前定位场景最新的一帧定位数据
  async getCurLoc(){
    const { ctx, app } = this;
    // 获取，日期 date，帧大小，定位场景 scene_id
    const {user_id, frame_size = 60, scene_id = 'all' } = ctx.query
    const time_stamp = moment().format('x');
    //获取每天当前定位场景下用户的定位数据
    try {
        // 拿到当前用户的数据列表
        const list = await ctx.service.location.list(user_id)
        // 过滤出当天该定位场景所对应的数据列表

        const _list = list.filter(item => {
            if(scene_id!='all'){
            return Number(time_stamp)>=Number(item.time_stamp)-frame_size*1000 && Number(time_stamp)<=Number(item.time_stamp)+frame_size*1000 && scene_id == item.scene_id
            }
            return Number(time_stamp)>=Number(item.time_stamp)-frame_size*1000 && Number(time_stamp)<=Number(item.time_stamp)+frame_size*1000
        })
        
        const sortedList = _list.sort((a,b)=>Number(b.time_stamp) - Number(a.time_stamp));
        

        const formatList = sortedList.reduce((curr, item) => {
            // curr 默认初始值是一个空数组 []
            let loc_type = item.loc_type;
            if (curr && curr.length && curr.findIndex(item => item.loc_type == loc_type) > -1) {
              const index = curr.findIndex(item => item.loc_type == loc_type)
              curr[index].locations.push(item)
            }
            if (curr && curr.length && curr.findIndex(item => item.loc_type == loc_type) == -1) {
              curr.push({
                loc_type,
                locations: [item]
              })
            }
            // 如果 curr 为空数组
            if (!curr.length) {
              curr.push({
                loc_type,
                locations: [item]
              })
            }
            return curr
          }, [])
  
        // 返回数据
        ctx.body = {
          code: 200,
          msg: '请求成功',
          data: {
            list: formatList || [] // 格式化
          }
        }
    } catch {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }
  async add() {
    const { ctx, app } = this;
    // 获取请求中携带的参数
    const { user_id, coordinate, scene_id, scene_name, loc_type, remark = '' } = ctx.request.body;

    // 判空处理，这里前端也可以做，但是后端也需要做一层判断。
    if (!user_id ||!coordinate || !scene_id || !scene_name || !loc_type) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
    }
    const time_stamp = moment().format('x');
    try {
      const result = await ctx.service.location.add({
        coordinate,
        scene_id,
        scene_name,
        time_stamp,
        loc_type,
        remark,
        user_id
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }
}

module.exports = LocationController;