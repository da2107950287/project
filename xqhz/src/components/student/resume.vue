<template>
  <div class="continer">
    <div class="aside">
      <div @click="show">个人简历</div>
      <div @click="show">简历投递管理</div>
    </div>
    <div class="resume" v-if="!isShow">
      <div class="content">
        <div class="ownerName">达荣春</div>
        <div class="BasicWrap row">
          <div class="border-wrap">
            <ul class="basicWrap">
              <div id="basicInfo" class>
                <div class="item-box">
                  <li>
                    <i>基本情况：</i>
                    <span>女 | 2020届毕业生</span>
                  </li>
                  <li>
                    <i>最高学历：</i>
                    <span>本科</span>
                  </li>
                  <li>
                    <i>联系电话：</i>
                    <span>15729839319</span>
                  </li>
                  <li>
                    <i>电子邮箱：</i>
                    <span>drc9839319@163.com</span>
                  </li>
                  <li>
                    <i>政治面貌：</i>
                    <span>中共党员</span>
                  </li>
                  <li>
                    <i>籍贯：</i>
                    <span>四川省</span>
                  </li>
                  <span class="edit" @click="handleEdit">编辑</span>
                </div>
              </div>
              <div id="picture" class>
                <div class="pic-wrap">
                  <!-- <img :src="avatar" alt /> -->
                  <!-- src="https://cdn6.haitou.cc/user/face/71/1292671_9b07.jpg?v=1567951235&amp;x-oss-process=image/resize,m_fixed,w_200,h_200" -->

                  <span class="edit">
                    编辑
                    <input type="file" @change="handleFile" />
                  </span>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div class="row" id="educationInfo" style="display: block;">
          <div class="border-wrap">
            <h3>
              <span>教育背景</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <label class="item-title">
                    <strong>2016.09-2020.07</strong>
                    <strong>攀枝花学院</strong>
                    <strong>计算机类</strong>
                    <strong>本科</strong>
                  </label>
                  <div class="item-content">
                    <p>C语言程序设计、C++程序设计、Java程序设计、数据库原理、计算机网络、数据结构、操作系统、算法设计与分析、软件工程及项目管理、JavaWeb程序设计语言</p>
                  </div>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <span>添加</span>
                    <span>删除</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="jobExperience" style="display: block;">
          <div class="border-wrap">
            <h3>
              <span>工作/实习经历</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <label class="item-title">
                    <strong>入职-离职时间</strong>
                    <strong>公司名称</strong>
                    <strong>实习</strong>
                    <strong>职位名称</strong>
                  </label>
                  <div class="item-content">
                    <p>在这里描述你的实习/工作经历...</p>
                  </div>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="collegeJob" style="display: block;">
          <div class="border-wrap">
            <h3>
              <span>校园经历</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <label class="item-title">
                    <strong>2017.09-2018.09</strong>
                    <strong>攀枝花学院</strong>
                    <strong class="right-end">普通话协会</strong>
                  </label>
                  <div class="item-content">
                    <p>每次协会举办活动前，在qq上推送活动信息；负责一些活动的策划与安排。</p>
                  </div>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <span>添加</span>
                    <span>删除</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="projectExperience" style="display: block;">
          <div class="border-wrap">
            <h3>
              <span>项目/比赛</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <label class="item-title">
                    <strong>2019.08-2019.09</strong>
                    <strong>时刻陪你</strong>
                    <strong class="right-end">前端人员</strong>
                  </label>
                  <div class="item-content">
                    <p>使用技术：HTML+CSS+JavaScript+Vue+Axios+Nodejs+MySQL项目描述：本项目主要是一个线上订购蛋糕的网站，项目主要分为一个服务器端和两个客户端。普通用户端主要实现了用户注册、用户登录、商品展示、商品详情、购物车、购买、搜索商品等功能；管理员端主要实现对商品、用户订单和用户信息的管理等；服务器端接受前端数据请求，按需处理数据，访问数据库并返回结果到客户端。职责描述：1.负责全局组件；2.使用vuex实现购物车功能；3.实现商品购买功能；4.负责后台部分服务器的搭建；</p>
                  </div>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <span>添加</span>
                    <span>删除</span>
                    <div class="clear"></div>
                  </div>
                </li>
                <li class="item-box">
                  <label class="item-title">
                    <strong>2016.04-2016.05</strong>
                    <strong>一起读书吧</strong>
                    <strong class="right-end">前端开发人员，后端开发人员</strong>
                  </label>
                  <div class="item-content">
                    <p>主要技术：HTML+CSS+JavaScript+Bootstrap+LayUI+Axios+Nodejs+MySQL项目描述：本项目是一个图书网站，项目分为一个服务端和两个客户端。用户端页面主要实现了用户的登录，注册，图书的分类展示，不同书籍的详情展示，图书的搜索，图书的收藏等功能；管理员后台实现了对书籍和对用户的个人信息的添加、修改、删除、查看等功能；责任描述：1.实现后台管理系统对书籍的操作功能，使用axios进行Ajax请求；2.实现前端与后端的接口对接，配合后台的接口联调；3.后台服务器的搭建；</p>
                  </div>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <span>添加</span>
                    <span>删除</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="practice" style="display: block;">
          <div class="border-wrap">
            <h3>
              <span>实践活动</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <label class="item-title">
                    <strong>开始-结束时间</strong>
                    <strong>活动名称</strong>
                  </label>
                  <div class="item-content">
                    <p>在这里填写你的活动描述...</p>
                  </div>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="award" style="display: block;">
          <div class="border-wrap">
            <h3>
              <span>荣誉奖励</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <div class="item-between">
                    <span class="title">2018-06</span>
                    <ol>
                      <li>三好学生</li>
                    </ol>
                  </div>
                  <div class="item-between">
                    <span class="title">2017-06</span>
                    <ol>
                      <li>三好学生</li>
                    </ol>
                  </div>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="evaluation" style="display: block;">
          <div class="border-wrap">
            <h3>
              <span>自我评价</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <p>对前端抱有浓厚的兴趣，会虚心请教自己不熟悉的业务知识技能，有较强的逻辑理解能力和自主学习能力，能快速接受使用新的知识。具有良好的分析解决问题的能力，同时有较好的团队协作和沟通的能力，责任心和团队意识俱佳。能吃苦耐劳，做事踏实认真，抗压能力强，适应能力强、敢于挑战。</p>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="personalQuality" style="display: block;">
          <div class="border-wrap">
            <h3>
              <span>技能证书</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <div class="item-between">
                    <span class="title">计算机能力</span>
                    <ol>
                      <li>
                        <span>熟悉：</span>
                        <span>HTML、CSS、JavaScript、ES6，Vue 框架以及脚手架、路由、Vuex、ElementUI，BootStrap、LayUI、 SASS，nodejs</span>
                      </li>
                    </ol>
                  </div>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <span>删除</span>
                    <div class="clear"></div>
                  </div>
                </li>
                <li class="item-box">
                  <div class="item-between">
                    <span class="title">专业证书</span>
                    <ol>
                      <li>计算机二级</li>
                    </ol>
                  </div>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <span>删除</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="character" style="display: none;">
          <div class="border-wrap">
            <h3>
              <span>性格特点</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <ol></ol>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <span>删除</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="hobby" style="display: block;">
          <div class="border-wrap">
            <h3>
              <span>兴趣爱好</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <ol>
                    <p>打乒乓球、打羽毛球</p>
                  </ol>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <span>删除</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="otherInfo" style="display: block;">
          <div class="border-wrap">
            <h3>
              <span>其他信息</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <div class="item-between">
                    <span class="title">信息标题</span>
                    <ol>
                      <li>在这里填写你的其它信息...</li>
                    </ol>
                  </div>
                  <div class="actionBtnBox">
                    <span>编辑</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row" id="attachment" style="display: block;">
          <div class="border-wrap bordernone">
            <h3>
              <span>附件信息</span>
            </h3>
            <div class="list-wrap">
              <ul class="list">
                <li class="item-box">
                  <a
                    href="http://cdn6.haitou.cc/resume/2019/10/14/1292671-1571068130.pdf"
                    target="_black"
                  >
                    <span>达荣春简历.pdf</span>
                    <span class="sizeSpan" style="display: inline-block;">/324KB</span>
                  </a>
                  <div class="actionBtnBox">
                    <span>下载</span>
                    <span>添加</span>
                    <span>删除</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="resume-list" v-if="isShow">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="基本信息" :visible.sync="editVisible" width="40%" class="base-informaion">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业院校">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="专业院系">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="最高学历">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option
              v-for="item in education"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业年份">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option
              v-for="item in identity"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生年月">
          <el-date-picker v-model="value1" type="month" placeholder="选择月"></el-date-picker>
        </el-form-item>

        <el-form-item label="籍贯">
          <v-distpicker
            :province="newInfo.province"
            :city="newInfo.city"
            @province="getProvince"
            @city="getCity"
            hide-area
          ></v-distpicker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
export default {
  data() {
    return {
      query: {
        address: "",
        name: "",
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal:1,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      isShow: false,
      form: {
        name: "",
        sex: "",
        address: ""
      },
      options: [
        {
          value: "选项1",
          label: "男"
        },
        {
          value: "选项2",
          label: "女"
        }
      ],
      education: [
        {
          value: "选项1",
          label: "大专"
        },
        {
          value: "选项2",
          label: "本科"
        }
      ],
      identity: [
        {
          value: "选项1",
          label: "共青团员"
        },
        {
          value: "选项2",
          label: "中共党员"
        },
        {
          value: "选项3",
          label: "群众"
        },
        {
          value: "选项4",
          label: "民主党派"
        }
      ],
      newInfo: {
        province: "", //省
        city: "" // 市
      },
      editVisible: false,
      value1: "",
      avatar:
        "https://cdn6.haitou.cc/user/face/71/1292671_9b07.jpg?v=1567951235&amp;x-oss-process=image/resize,m_fixed,w_200,h_200"
    };
  },
  methods: {
    show() {
      this.isShow = !this.isShow;
    },
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    },
    getProvince(data) {
      this.newInfo.province = data.value;
    },
    getCity(data) {
      this.newInfo.city = data.value;
    },
    handleEdit() {
      this.editVisible = true;
    },
    saveEdit() {},
    handleFile(e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      var reader = new FileReader();
      reader.onload = data => {
        let res = data.target || data.srcElement;
        this.avatar = res.result;
      };
      reader.readAsDataURL(file);
    }
  },
  created() {
    console.log(this.isShow);
  },
  components: {
    VDistpicker
  }
};
</script>
<style lang="scss" >
ol,
ul,
li {
  list-style: none;
}
.continer {
  margin: 30px 50px;
  display: flex;
  .aside {
    margin-right: 20px;
    background-color: #fff;
    div {
      padding: 5px;
      padding-left: 1rem;
      height: 30px;
      line-height: 30px;
      margin-top: 4px;
      background-color: #e9e9e9;
      min-width: 150px;
      cursor: pointer;
      color: #505459;
    }
  }
  .resume {
    background: #fafafa;
    border: 1px solid #e3ebe9;
    border-radius: 5px;
    .content {
      overflow: hidden;
      width: 100%;
      padding: 72px;
      box-sizing: border-box;
      min-height: 600px;
      .ownerName {
        color: #333333;
        font-size: 30px;
        font-weight: bold;
        line-height: 36px;
        margin-bottom: 24px;
      }
      .row {
        .border-wrap {
          .basicWrap {
            width: 100%;
            padding: 0 150px 18px 0;
            box-sizing: border-box;
            position: relative;
            .item-box:hover {
              border: 1px dashed #4777e1;
              background-color: rgba(63, 103, 191, 0.06);
            }
            .item-box:hover .edit {
              display: block;
            }
            .item-box {
              position: relative;
              width: 100%;
              box-sizing: border-box;
              border: 1px dashed #fff;
              li {
                margin-bottom: 0;
                i {
                  color: #333333;
                  font-size: 14px;
                  line-height: 26px;
                  min-width: 70px;
                  display: inline-block;
                  text-align-last: justify;
                  text-align: justify;
                  font-style: normal;
                }
                span {
                  color: #666;
                  font-size: 14px;
                  line-height: 26px;
                  margin-left: 12px;
                }
              }
              .edit {
                display: none;
                position: absolute;
                height: 34px;
                width: 50px;
                text-align: center;
                line-height: 32px;
                border: 1px solid #eaeaea;
                background-color: #fff;
                border-radius: 4px;
                box-sizing: border-box;
                font-size: 14px;
                color: #4777e1;
                bottom: calc(50% - 17px);
                right: 10px;
                margin-left: -25px;
                z-index: 10000;
                cursor: pointer;
              }
            }

            .pic-wrap:hover .edit {
              display: block;
            }

            .pic-wrap {
              position: absolute;
              top: 0;
              right: 0;
              width: 120px;
              height: 120px;
              overflow: hidden;
              img {
                position: absolute;
                left: -9999px;
                right: -9999px;
                top: -9999px;
                bottom: -9999px;
                margin: auto;
                max-height: 130px;
              }
              .edit {
                display: none;
                position: absolute;
                height: 34px;
                width: 50px;
                text-align: center;
                line-height: 32px;
                border: 1px solid #eaeaea;
                background-color: #fff;
                border-radius: 4px;
                box-sizing: border-box;
                font-size: 14px;
                color: #4777e1;
                bottom: 12px;
                left: 50%;
                margin-left: -25px;
                z-index: 10000;
                cursor: pointer;
                input {
                  position: absolute;
                  top: 0;
                  left: 0;
                  height: 100%;
                  width: 100%;
                  display: block;
                  opacity: 0;
                }
              }
            }
          }
          h3 {
            margin-bottom: 10px;
          }
          .list-wrap {
            border-top: 1px solid #333333;
            position: relative;
            padding: 2px 0;
            .list {
              .item-box {
                position: relative;
                .item-title {
                  position: relative;
                  height: 26px;
                  width: 100%;
                  display: block;
                  strong {
                    line-height: 26px;
                    font-size: 12px;
                    color: #222;
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    max-width: 23%;
                  }
                  strong:nth-child(1) {
                    left: 0;
                    width: 130px;
                  }
                  strong:nth-child(2) {
                    left: 130px;
                    max-width: 26%;
                  }
                  strong:nth-child(3) {
                    left: 50%;
                  }
                  strong:nth-child(4) {
                    right: 0;
                  }
                }
                .item-content {
                  min-height: 26px;
                  padding-left: 130px;
                }
                p {
                  line-height: 26px;
                  font-size: 12px;
                  color: #999;
                  text-align: justify;
                  word-wrap: break-word;
                }
              }
              .item-box:last-child {
                border-bottom: 1px solid #fff;
              }
              .item-box:hover {
                border: 1px dashed #4777e1 !important;
                background-color: rgba(63, 103, 191, 0.06);
              }
              .actionBtnBox {
                // display: none;
                position: absolute;
                height: 34px;
                background-color: #fff;
                border: 1px solid #eaeaea;
                border-radius: 4px;
                box-sizing: border-box;
                top: 50%;
                margin-top: -17px;
                right: 16px;
                padding: 0 10px;
                text-align: center;
                span {
                  float: left;
                  line-height: 32px;
                  font-size: 14px;
                  margin-right: 16px;
                  color: #4777e1;
                  cursor: pointer;
                }
                span:nth-last-child(2) {
                  margin: 0 !important;
                }
                .clear {
                  width: 0;
                  height: 0;
                  clear: both;
                }
              }
            }
            .item-box:hover .actionBtnBox {
              display: block;
            }
          }
        }
      }
    }

    .basic {
      padding: 50px;
      background: #fafafa;
      border-radius: 5px 5px 0 0;
      border-bottom: 1px solid #e3ebe9;
      display: flex;
      .basic-photo {
        height: 88px;
        width: 88px;
        display: inline-block;
        position: relative;
        cursor: pointer;
        img {
          height: 88px;
          width: 88px;
          position: absolute;
          top: 0;
          border-radius: 50%;
        }

        .basic-photo_shadow {
          display: none;
        }
      }
      .basic-info {
        position: relative;
        width: 100%;
        margin-left: 20px;
        flex: 1;

        .edit-btn {
          position: absolute;
          right: 0;
          top: 0;
          height: 37px;
          font-style: normal;
          cursor: pointer;
        }
        .basic-name-area {
          overflow: hidden;
          height: 37px;
          margin-bottom: 11px;
          .basic-name {
            float: left;
            max-width: 250px;
            font-size: 26px;
            color: #333;
            font-weight: 600;
            line-height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .basic-self {
          margin-top: 20px;
        }
        p {
          font-size: 14px;
          color: #333;
          line-height: 20px;
          margin-top: 6px;
        }
      }
    }
    .base-informaion {
      overflow: scroll;
      white-space: nowrap;
      max-height: 400px;
    }
  }
  .resume-list {
    margin: 0 10px;
    width: 100%;
    border: 1px solid #ccc;
  }
}
.el-dialog {
  overflow: scroll;
  white-space: nowrap;
  height: 500px;
}
</style>