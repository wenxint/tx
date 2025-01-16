let inputFocus = false//input是否聚焦 聚焦弹起键盘时无需执行initScroll（）
function initScroll () {
  // todo暂时关闭横屏控制
  // console.log(window.innerHeight,document.documentElement.clientHeight , document.body.clientHeight,window.screen.height)
  // if (window.matchMedia("(orientation: landscape)").matches) {
  //   //当宽度大于高度时的样式
  //   //添加相应的样式或执行其他操作
  //   document.documentElement.classList.add('langScroll');
  //   $('.container').hide()
  //   console.log("横屏",window.innerHeight,document.documentElement.clientHeight , document.body.clientHeight,window.screen.height)
  // } else {
  //   // 当高度大于宽度时的样式
  //   // 添加相应的样式或执行其他操作
  //   document.documentElement.classList.remove('langScroll');
  //   $('.container').show()
  // }
}

window.addEventListener('resize', function () {
  initScroll()
})
// initScroll()
// const env = import.meta.env.VITE_MODE; // 获取配置信息
// console.log(env, "env");



var globalView = {
  baseURL: '//game.gtimg.cn/images/op/act/a20241009czdj/'
}

// 首页第一梯队加载
var preLoadList = [
  { src: 'area_bg' },
  { src: 'bottom' },
  { src: 'code' },
  { src: 'confirm_not' },
  { src: 'confirm' },
  { src: 'head' },
  { src: 'mobile_bg' },
  { src: 'popup_bg' },
  { src: 'popup_btn' },
  { src: 'popup_code' },
  { src: 'sel-act' },
  { src: 'sel' },
  { src: 'tagline' },
  { src: 'tips' },
  { src: 'update_mobile' },
  { src: 'bottomBG' },
]

for (var item of preLoadList) {
  item.src = globalView.baseURL + item.src + '.png';
}

//预加载方法
var preload = {
  // 预加载函数
  startPreload: function () {
    var preload = new createjs.LoadQueue(false);
    //为preloaded添加整个队列变化时展示的进度事件
    preload.addEventListener("progress", this.handleFileProgress);
    //注意加载音频文件需要调用如下代码行
    // preload.installPlugin(createjs.SOUND);
    //为preloaded添加当队列完成全部加载后触发事件
    preload.addEventListener("complete", this.loadComplete);
    //设置最大并发连接数  最大值为10
    preload.setMaxConnections(6);
    preload.loadManifest(preLoadList);
  },

  // 当整个队列变化时展示的进度事件的处理函数
  handleFileProgress: function (event) {
  },

  // 处理preload添加当队列完成全部加载后触发事件
  loadComplete: function () {

  }
}


preload.startPreload();




// pc端判断
var isPC = !/iPhone|iPad|iPod|Android/ig.test(navigator.userAgent);
if (isPC) {
  $(".container").hide();
  $(".pc_mask").show();
}



//记录当前弹窗id,弹窗确认键根据id不同执行不同事件,radioFlag是否同意协议
var timer, popupId, radioFlag = false
// 打开弹窗 id: 弹窗id flag: 点击遮罩是否关闭,title:弹窗标题
function TGDialogS (id, flag = true, title) {
  // 控制遮罩点击
  // var dialogMask = $('.dialogMask');
  // if (flag) {
  //   dialogMask.click(function () {
  //     closeDialog();
  //   });
  // } else {
  //   dialogMask.unbind('click')
  // }
  //closeDialog();
  $('.dialog').addClass('on');
  $('#popup').show()
  if (title) {
    $('#title').text(title)
  }
  // 更新手机号 执行倒计时
  if (id === 'updateMobile') {
    $('#codeInp').val('')
    // onTimer()
  }
  popupId = id
  $('#' + id).show().siblings().hide();

}


// 关闭弹窗
function closeDialog () {
  $('.dialog').removeClass('on');
}
$('#close').on('click', function () {
  closeDialog()
})
//提示语显示
function showToast (text, dur) {
  $('#toast div').text(text);
  $('#toast').show()
  setTimeout(() => {
    $('#toast').hide()
  }, dur || 1000)
}
//验证 type 默认只验证手机号
function validate (type) {
  let mobile = $('#mobileInp').val()
  if (mobile === '') {
    showToast('请输入手机号')
    return
  }
  /*
  const pattern = /^1[345789]\d{9}$/;
  if (!pattern.test(mobile)) {
    showToast('请输入正确的手机号')
    return
  }
    */
  // 手机号码验证 使用milo
  if (mobile.length != 11) {
    showToast('请输入正确的手机号')
    return
  }
  if (type === 'award' && !radioFlag) {
    //绑定时验证 是否同意了协议
    showToast('请先同意通知提示')
    return
  }
  return true
}
//倒计时
function onTimer (timeNum) {
  let time = timeNum
  if (timer) {
    clearInterval(timer)
  }
  // 重置状态
  $('#timer,#timer_remove').text('59秒后可重新获取验证码')
  $('#timer,#timer_remove').show().siblings().hide();
  timer = setInterval(() => {
    --time
    $('#timer, #timer_remove').text(time + '秒后可重新获取验证码')
    if (time < 0) {
      isCanSendCode = true
      clearInterval(timer)
      $('#timer, #timer_remove').hide().siblings().show();
    }
  }, 1000)
}
// 更换手机号
function onUpdateMobile () {
  if (validate()) {
    //打开弹窗
    TGDialogS('updateMobile', true, '请输入验证码')
  }
}
//弹窗确认事件
function confirmPop () {
  console.log(popupId)
  // 绑定手机号 验证有没有输入验证码
  if (popupId === 'updateMobile') {
    let codeInp = $('#codeInp').val()
    if (codeInp === '') {
      showToast('请输入绑定验证码')
      return
    }
    //提交验证码操作
    //联调接口
    requestBindPhone()
    return
  }
  // 解绑手机号
  if (popupId === 'removePhoneCode') {
    let codeInp = $('#codeInp_remove').val()
    if (codeInp === '') {
      showToast('请输入解绑验证码')
      return
    }
    //提交验证码操作
    //联调接口
    requestRemoveBindPhone()
    return
  }
  if (popupId === 'award') {
    //领取奖励弹窗确认事件
    //更改按钮状态
    $('#confirm').hide().siblings().show();
  }
  if (popupId === 'remove') {
    //解除绑定手机号确认事件
    requestPhoneCode(1)
  }
  if (popupId === 'custom') {
    //自定义弹窗确认事件
  }
  popupId = ''
  //隐藏弹窗
  closeDialog();
}
//同意协议状态
function changeRadio () {
  radioFlag = !radioFlag
  // 如果已绑定，radioFlag 默认为true
  if (initData.isBindPhone == 1) {
    radioFlag = true
  }
  let sel = '//game.gtimg.cn/images/op/act/a20241009czdj/sel.png', selAct = '//game.gtimg.cn/images/op/act/a20241009czdj/sel-act.png'
  $('#radio').attr('src', radioFlag ? selAct : sel)
}
//一键绑定 领取礼包
function onAward () {
  if (validate('award')) {
    TGDialogS('award', true, '绑定手机')
  }
}
//解绑
function onRemove () {
  //如果没有绑定手机号应该要提示
  if (initData.isBindPhone != 1) {
    alert("亲爱的玩家，您的账号尚未绑定手机号码。如您需要通过短信、电话订阅账户安全类、活动通知类信息，请参与本活动，谢谢！")
    return
  }

  //更改弹窗内的手机号文字
  let mobile = $('#mobileInp').val() //用户的手机号
  var maskedPhone = mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  $('#mobile').text(maskedPhone)
  //显示解绑的弹窗
  TGDialogS('remove', true, '解除绑定')
}
//协议跳转 1是隐私协议 2运营商隐私协议
function onLink (type) {
  radioFlag = true
  let selAct = '//game.gtimg.cn/images/op/act/a20241009czdj/sel-act.png', url
  $('#radio').attr('src', selAct)


  if (type == 1) {
    url = 'https://rule.tencent.com/rule/41950247-a569-44f5-8112-5163b0d5a58b';
  } else if (type === 2) {
    url = 'https://game.qq.com/contract.shtml';
  }

  if (url) {
    document.getElementById('popupWindow').style.display = "block";
    document.getElementById('minWindow').src = url;
  }
  else {
    document.getElementById('popupWindow').style.display = "none";
    document.getElementById('minWindow').src = 'about:blank';
    // 等msdk修复之后 强制竖屏
    // ActFun.useMSDK(ActConfig.msdkPosition);
  }


}


