// pages/device/energy/energy.wxml.js
var req = require('../../../req/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDeviceInfo(options.id)
  },
  getDeviceInfo(id) {
    let that = this;
    req.user.queryDevice({
      page: 1,
      limit: 10,
      input: id
    }).then(res => {
      res.data[0].lightOpenTime = that.formatterTime(res.data[0].lightOpenTime)
      res.data[0].lightCloseTime = that.formatterTime(res.data[0].lightCloseTime)
      // res.data[0].compressorMax = res.data[0].compressorMax ? res.data[0].compressorMax / 60 : res.data[0].compressorMax
      that.setData({
        form: res.data[0]
      })
    })
  },
  // onChange({ detail }) {
  //   // 需要手动对 checked 状态进行更新
  //   this.setData({
  //     'form.energySaving': detail
  //   });
  // },
  onChangeLight({ detail }) {
    this.setData({
      'form.lightAuto': detail
    });
  },
  bindLightOpenTime(event) {
    this.setData({
      'form.lightOpenTime': event.detail.value
    });
  },
  bindLightCloseTime(event) {
    this.setData({
      'form.lightCloseTime': event.detail.value
    });
  },
  onChangeColdHot({ detail }) {
    this.setData({
      'form.coldHot': detail
    });
  },
  fanOpenInput(e) {
    this.setData({
      'form.fanOpenDelay': e.detail.value
    })
  },
  fanCloseInput(e) {
    this.setData({
      'form.fanCloseDelay': e.detail.value
    })
  },
  compressorInput(e) {
    this.setData({
      'form.compressorMax': e.detail.value
    })
  },
  defrostInput(e) {
    this.setData({
      'form.defrostWork': e.detail.value
    })
  },
  defrostCloseInput(e) {
    this.setData({
      'form.defrostCloseDelay': e.detail.value
    })
  },
  temperatureInput (e) {
    this.setData({
      'form.temperature': e.detail.value
    })
  },
  formatterTime(time) {
    if(time) {
      let arr = []
      arr = time.split(':');
      let str = '';
      str = arr[0] + ':' + arr[1]
      return str
    }else {
      return '00:00'
    }
  },
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },
  save() {
    // this.data.form.chOpenTime = this.data.form.chOpenTime.split(':').length == 2 ? this.data.form.chOpenTime + ':00' : this.data.form.chOpenTime
    // this.data.form.compressorMax = this.data.form.compressorMax * 60
    this.data.form.lightCloseTime = this.data.form.lightCloseTime.split(':').length == 2 ? this.data.form.lightCloseTime + ':00' : this.data.form.lightCloseTime
    this.data.form.lightOpenTime = this.data.form.lightOpenTime.split(':').length == 2 ? this.data.form.lightOpenTime + ':00' : this.data.form.lightOpenTime
    req.user.updateEnerySaving(this.data.form).then(() => {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})