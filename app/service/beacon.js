'use strict';

const Service = require('egg').Service;

class BeaconService extends Service {
  async add(params) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.insert('beacon', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async detail(id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.get('beacon', { id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async update(params) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.update('beacon', {
        ...params,
      }, {
        id: params.id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 删除列表
  async delete(id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.delete('beacon', {
        id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 获取基站列表
  async getList() {
    const { ctx, app } = this;
    const QUERY_STR = 'id, size, coordinate, ctime, remark';
    const sql = `select ${QUERY_STR} from beacon`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}

module.exports = BeaconService;
