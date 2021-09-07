'use strict';

const Service = require('egg').Service;

class SceneService extends Service {
  async add(params) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.insert('scene', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async detail(id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.get('scene', { id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async update(params) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.update('scene', {
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
      const result = await app.mysql.delete('scene', {
        id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 获取场景列表
  async getList() {
    const { ctx, app } = this;
    const QUERY_STR = 'id, sceneName, imgUrl, beaconSettings,fengMapId,fengAppName,fengKey,fmapSettings,ctime, remark';
    const sql = `select ${QUERY_STR} from scene`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}

module.exports = SceneService;
