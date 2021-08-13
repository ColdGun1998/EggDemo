'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // async index() {
  //   const { ctx } = this;
  //   const {id} = ctx.query;
  //   ctx.body = 'hi, '+id;   
  // }
  // // 获取用户信息
  // async user() {
  //   const { ctx } = this;
  //   const { id } = ctx.params; // 通过 params 获取申明参数
  //   ctx.body = id;
  // }
  // post 请求方法
  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    // Egg 框架内置了 bodyParser 中间件来对 POST 请求 body 解析成 object 挂载到 ctx.request.body 上
    ctx.body = {
      title
    };
  }
  //获取用户信息
  async user(){
    const {ctx} = this;
    const result = await ctx.service.home.user();
    ctx.body = result;
  }
  async index(){
    const { ctx} = this;
    await ctx.render('index.html',{
      title:'我是韩梅梅'
    })
  }
  // 删除
async deleteUser() {
  const { ctx } = this;
  const { id } = ctx.request.body;
  try {
    const result = await ctx.service.home.deleteUser(id);
    ctx.body = {
      code: 200,
      msg: '删除成功',
      data: null
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '删除失败',
      data: null
    }
  }
}
  async addUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    try {
      const result = await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null
      }
    }
  }
  // 编辑
async editUser() {
  const { ctx } = this;
  const { id, name } = ctx.request.body;
  try {
    const result = await ctx.service.home.editUser(id, name);
    ctx.body = {
      code: 200,
      msg: '添加成功',
      data: null
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '添加失败',
      data: null
    }
  }
}
}

module.exports = HomeController;
