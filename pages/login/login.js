// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  login:function(e){
    console.log(e);
  },
  // 兼容不支持opentype 1.4.0基础库
  lowLogin:function(){
    //  支持getsetting 1.2.0
    if(wx.getSetting){
      wx.getSetting({
        success:function(resGetting){
          //  用户已经授权 1.2.0基础库
          if(resGetting.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success:function(UserInfo){
                console.log(UserInfo);
              }
            })
          // 用户未授权
          }else{
            // 拉取授权
            wx.getUserInfo({
              fail:function(){
                wx.showModal({
                  title: '提示',
                  content: '您尚未授权,是否打开设置界面进行授权？',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: function (ee) {
                          //  授权成功
                          if(ee.authSetting['scope.userInfo'] == true){
                            wx.getUserInfo({
                              success: function (eee) {
                                console.log(eee);
                              }
                            })
                          }else{
                            wx.showModal({
                              title: '提示',
                              content: '您未授权，若需要使用部分功能，请登录授权',
                              showCancel: false
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
            
          }
        }
      })
    //  不支持getsetting 通过调用wx.getUserInfo判断是否授权，若未授权则进入fail函数
    }else{
      wx.getUserInfo({
        success:function(getUserInfo){
          console.log(getUserInfo);
        },
        fail:function(){
          // 用户未授权 弹窗通过opensetting授权
          wx.showModal({
            title: '提示',
            content: '您尚未授权小程序，是否打开设置界面进行授权?',
            success:function(showModal){
              //  确定打开 调用opensetting 1.1.0
              if(showModal.confirm){
                wx.openSetting({
                  success:function(opensetting){
                    console.log(opensetting);
                    if(opensetting.authSetting['scope.userInfo']){
                      wx.getUserInfo({
                        success:function(ress){
                          console.log(ress);
                        }
                      })
                    }else{
                      wx.showModal({
                        title: '提示',
                        content: '你未授权小程序，将无法使用部分功能，若需要使用此部分功能，请授权登录',
                        showCancel: false
                      })
                    }
                  }
                })
              }
            }

          })
        }
      })
    }
  }
})