'use strict';

const Service = require('egg').Service;

class LocationService extends Service {
  async add(params) {
    const { ctx, app } = this;
    try {
      // 往 location 表中，插入一条账单数据
      const result = await app.mysql.insert('location', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 获取账单列表
  async list(id) {
    const { ctx, app } = this;
    const QUERY_STR = 'id, loc_type, coordinate, time_stamp, scene_id, scene_name, remark';
    let sql = `select ${QUERY_STR} from location where user_id = ${id}`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}

module.exports = LocationService;