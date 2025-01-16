//todo 活动逻辑js，v2处理角色绑定等完整逻辑
var CommonReq = {
    //通用逻辑处理 start
    loginSuc: function () {
        console.log(`[loginSuc] 玩家登录成功，开始执行按钮点击绑定和初始化流程~`)
        //端内直接读url参数，请求初始化接口
        if (ActGlobal.user.isGame && ActGlobal.user.isGame == true) {
            console.log(`[loginSuc] suc, player in game`);
            //let role_area = ActTools.isQQDev(ActGlobal.user.sArea) ? 'QQ' : '微信';
            //let real_area = ActConfig.envTip[ActConfig.env]
            //$("#area").html(real_area + "-" + ActGlobal.user.sPartition + "区-" + ActGlobal.user.sRoleName);

            //todo 处理展示的昵称
            ActFunRed.DevPartitionInfo(function () {
                let realArea = ActTools.dealAreaId(ActGlobal.user.sArea);//兼容非正式环境
                let role_area = ActTools.isWeChatDev(ActGlobal.user.sArea) ? '微信' : 'QQ';
                if (ActTools.isNull(ActGlobal.user.qf_nameArr[realArea])) {
                    console.log(`[showRoleList] 该环境区服信息缺失，无法展示`)
                    partitionName = ActGlobal.user.sPartition;
                } else {
                    partitionName = ActGlobal.user.qf_nameArr[realArea][ActGlobal.user.sPartition];
                }
                ActGlobal.user.showQfInfo = role_area + "-" + partitionName + "-" + ActGlobal.user.sRoleName;
                $("#area").html(ActGlobal.user.showQfInfo);
            });//拉取区服名称本地处理好

            if (ActGlobal.user.isGame || (ActTools.isMini() && ActConfig.miniConfig.changeBind == false)) {
                console.log(`[showBindInfo] 游戏内 or 小程序内嵌不允许切换绑定`)
                $('#bindBtnTxt').hide();
            } else {
                $('#bindBtnTxt').text('【切换区服】');
                $('#bindBtnTxt').show();
            }
            ActFun.myEmit(MyRequest.Main);
        } else {
            console.error(`[loginSuc] not in game`);
            alert(`请前往游戏内参与活动！`)
        }
    },
    loginErr: function () {//可以处理未登录的情况
        console.log('[loginFail] 登录失败');
        if (ActTools.isPhone()) {
            console.log(`[loginErr] 第三方弹窗`)
            TGDialogS(`hyMobileVisit`);
        } else {
            console.log(`[loginErr] PC弹窗 or 直接拉起联合登录`)
            ActFun.pcBothLogin();
        }
    },
    AmsError: function (data) {//全局后台错误处理函数
        console.log('[AmsError] data', data);
        if (ActTools.isNull(data.iRet)) {
            alert(ActConfig.errMsg);
            return;
        }
        switch (data.iRet) {
            case 99999:
                ActGlobal.user.activeBegin = false;//活动未开启
                alert(data.sMsg);
                break;
            default:
                console.error(`[AmsError] error`, data.sMsg);
                alert(data.sMsg);
        }
    },
    //开发根据情况处理最近登录区服、绑定后展示、自动绑定逻辑，业务特性 start
    showRoleList: function () {//渲染展示最近登录区服列表，带缓存，只有进入页面后请求1次后台
        var data = ""
        if (ActTools.isNull(ActGlobal.user.recentRoleList)) {
            console.error(`[showRoleList] ActGlobal.user.recentRoleList is empty`, ActGlobal.user.recentRoleList)
            var successExtend = function (res) {
                console.log(`[showRoleList] successExtend recentRoleList ===>`, res)
                if (ActTools.isNull(res)) {//列表无数据
                    console.error(`[showRoleList] 玩家无角色~`)
                    TGDialogS(ActConfig.NoRolePop)
                } else {//列表有数据，渲染
                    console.error(`[showRoleList] 玩家列表查询成功~`)
                    ActGlobal.user.recentRoleList = res;
                    CommonReq.callRoleListPop(res);
                }
            }
            var failExtend = function (res) {
                console.log(`[showRoleList] failExtend`, res)
            }
            ActFunRed.queryRoleList(successExtend, failExtend);//调用接口获取
        } else {
            data = ActGlobal.user.recentRoleList;
            CommonReq.callRoleListPop(data);
        }
    },
    callRoleListPop: function (data) {//唤起弹窗，可以根据开发相关内容，自行调整代码
        console.log(`[showRoleList] 开始渲染最近登录区服列表`)
        //$('#hyRecentUl').html('');
        $('#hyRecentUl').empty();
        for (var i = 0; i < data.length; i++) {
            let temp = data[i];
            if (ActTools.isNull(temp) || ActTools.isNull(data[i])) {
                continue;
            }
            let realArea = ActTools.dealAreaId(temp['AreaId']);//兼容非正式环境
            let realPlat = temp['PlatId'];
            let realPartition = parseInt(temp['Partition']) + 20000;//返回的不带20000无法使用
            let realRoleName = decodeURIComponent(temp['RoleName']);
            let realRoleId = temp['RoleId'];
            let showArea = temp['AreaId'] == 1 ? '微信' : 'QQ';
            let showPlat = temp['PlatId'] == 0 ? 'iOS' : '安卓';
            let showPartition = realPlat == 0 ? ActGlobal.user.qf_nameArr.iOSArr[partition] : ActGlobal.user.qf_nameArr.AndArr[partition];
            let str = "<li data-area=" + realArea + " data-plat=" + realPlat + " data-partition=" + realPartition +
                " data-role=" + realRoleId + " data-roleName='" + realRoleName + "'>\n" +
                "<label>\n" +
                "<p>" + showPlat + showArea + showPartition + "</p>\n" +
                "<span>" + realRoleName + "</span>\n" +
                "<input type=\"radio\" name=\"js-ip\"/>\n" +
                "<em class=\"sp\"></em>\n" +
                "</label>\n" +
                " </li>"
            $('#hyRecentUl').append(str);
        }
        $(document).on('click', '.list_zhangh li', function () {
            ActGlobal.user.selectArea.selArea = $(this).attr("data-area")
            ActGlobal.user.selectArea.selPlat = $(this).attr("data-plat")
            ActGlobal.user.selectArea.selPartition = $(this).attr("data-partition")
            ActGlobal.user.selectArea.selRole = $(this).attr("data-role")
            ActGlobal.user.selectArea.selRoleName = $(this).attr("data-roleName")
        })
        $("#hyRecentListConfirm").myOn("click", function () {//自动提交绑定
            //判断授权
            if ($('.milo-PIPContainer').css('display') !== 'none' && !$('.milo_custom_PIPInfo').is(':checked')) {
                alert('请勾选协议'); return false;
            }
            ActFunRed.autoBindRole(ActGlobal.user.selectArea.selArea, ActGlobal.user.selectArea.selPlat, ActGlobal.user.selectArea.selPartition, ActGlobal.user.selectArea.selRole,
                CommonReq.showBindInfo, CommonReq.autoBindRoleFail);
        });
        //增加授权判断
        ActFun.queryAuth(function () {
            closeDialog();//关闭最近登录区服弹窗
            $('.milo-PIPContainer').hide()
            TGDialogS('hyRecentList');
        }, function () {
            closeDialog();//关闭最近登录区服弹窗
            $('.milo-PIPContainer').show()
            TGDialogS('hyRecentList');
        })
    },
    showBindInfo: function (commitBind = true, mainRes = null) {//处理绑定成功的回调
        console.log(`[showBindInfo] 渲染相关绑定信息`, commitBind, mainRes);
        //渲染角色相关信息
        let role_area = ActTools.isWeChatDev(ActGlobal.user.sArea) ? '微信' : 'QQ';
        //let role_plat = parseInt(ActGlobal.user.sPlatId) === 0 ? 'iOS' : '安卓';
        $("#userDetail").html(role_area + "-" + ActGlobal.user.sPartition + "区-" + ActGlobal.user.sRoleName);
        if (ActGlobal.user.isGame || (ActTools.isMini() && ActConfig.miniConfig.changeBind == false)) {
            console.log(`[showBindInfo] 游戏内 or 小程序内嵌不允许切换绑定`)
            $('#bindBtnTxt').hide();
        } else {
            $('#bindBtnTxt').text('【切换区服】');
            $('#bindBtnTxt').show();
        }
        //todo 处理初始化 or 页面渲染
        if (commitBind && commitBind == true) {
            console.log(`[showBindInfo] 绑定成功，无初始化信息，请求后台`)
            closeDialog();//提交绑定后需要手动关闭弹窗
            ActFun.myEmit(MyRequest.Main);
        } else {
            console.log(`[showBindInfo] 已绑定，直接初始化信息`)
            mainInit(mainRes);
        }
    },
    autoBindRoleFail: function (err) {//提交绑定失败的回调
        console.log(`[autoBindRoleFail] err`, err)
        if (err.iRet == 1 || err.details.iRet == 1) {//无角色
            console.error(`[autoBindRoleFail] 无角色~`)
            TGDialogS(ActConfig.NoRolePop);//开发替换弹窗或渲染逻辑即可
        } else {
            alert(ActConfig.errMsg);
        }
    },
}

MyRequest = {
    // 请求方式：ActFun.myEmit(MyRequest.Main);
    Main: {
        token: '6Mejfn', // 管线or星图上面的别名
        needUserData: true,//是否需要携带sAra+plat,默认不携带
        //loading: true, // loading状态，默认开启,false关闭
        render: function (res) {
            console.log('[Main] suc', res);
            ActGlobal.user.sGameOpenid = res.details.jData.sGameOpenid;
            ActFun.reportAdtag("mainShow");//eas埋点方式
            mainInit(res.details.jData);
            //todo 端外先屏蔽
            /*var bandInfo = res.details.jData.bandInfo;//绑定记录
            if (bandInfo && !ActTools.isNull(bandInfo) && bandInfo.FroleId && !ActTools.isNull(bandInfo.FroleId)) {
                console.log(`[Main] suc, player is bind`);
                ActFunRed.dealBindProcess(res.details.jData.bandInfo, res.details.jData);//展示区服信息，封装到火影通用
            } else {//未绑定逻辑
                if (ActGlobal.user.isGame && ActGlobal.user.isGame == true) {
                    console.error(`[Main] suc, player not bind, in game`);
                    ActFunRed.dealBindProcess([], res.details.jData);//绑定信息为空，自动绑定逻辑
                } else {
                    console.error(`[Main] suc, player not bind, not in game`);
                    // todo 未使用最近登录
                    // ActGlobal.user.recentRoleList = res.details.jData.recentRoleList;//区服列表
                    // ActFunRed.queryQfName(CommonReq.showRoleList);//获取到区服名称后，开始渲染列表
                }
            }*/
        },
        error: function (err) {//自己的错误处理函数，定义后优先级最高
            console.error('[Main] fail', err);
            alert(err.sMsg)
        }
    },
    RequestPhoneCode: {
        // 获取验证码
        token: 'Mre6Tl', // 管线or星图上面的别名
        needUserData: true,//是否需要携带sAra+plat,默认不携带
        render: function (res) {
            console.log('[RequestPhoneCode] suc', res);
            isCanSendCode = false
            onTimer(59)
            if (sCodeType == 0) {
                ActFun.reportAdtag("RequestPhoneCodeBind");
                TGDialogS('updateMobile', true, '请输入绑定验证码')
            } else if (sCodeType == 1) {
                ActFun.reportAdtag("RequestPhoneCodeRemove");
                TGDialogS('removePhoneCode', true, '请输入解绑验证码')
            }
        },
        error: function (err) {//自己的错误处理函数，定义后优先级最高
            console.error('[Others] fail', err);
            if (err.iRet == 100008) {
                showToast(err.sMsg)
            } else {
                alert(err.sMsg)
            }

        }
    },
    RequestBindPhone: {
        // 绑定手机号
        token: 'HgjhNO', // 管线or星图上面的别名
        needUserData: true,//是否需要携带sAra+plat,默认不携带
        render: function (res) {
            console.log('[RequestBindPhone] suc', res);
            ActFun.reportAdtag("RequestBindPhone");
            initData.isBindPhone = 1
            initData.phone = $('#mobileInp').val()
            closeDialog()
            onAward()
            allInit()

        },
        error: function (err) {//自己的错误处理函数，定义后优先级最高
            console.error('[Others] fail', err);
            if (err.iRet == 100007) {
                // 绑定成功,但是奖励已领取
                ActFun.reportAdtag("RequestBindPhone");
                initData.isBindPhone = 1
                initData.phone = $('#mobileInp').val()
                closeDialog()
                alert(err.sMsg)
                allInit()
            } else if (err.iRet == 100011) {
                // 绑定成功，但是当前号码历史绑定过
                ActFun.reportAdtag("RequestBindPhone");
                initData.isBindPhone = 1
                initData.phone = $('#mobileInp').val()
                closeDialog()
                alert(err.sMsg)
                allInit()
            } else {
                alert(err.sMsg)
            }

        }
    },
    RequestRemoveBindPhone: {
        // 解绑手机号
        token: 'YupJIX', // 管线or星图上面的别名
        needUserData: true,//是否需要携带sAra+plat,默认不携带
        render: function (res) {
            console.log('[RequestRemoveBindPhone] suc', res);
            ActFun.reportAdtag("RequestRemoveBindPhone");
            closeDialog()
            alert('亲爱的玩家，您已成功解除游戏账户与该手机号' + encodePhone(initData.phone) + '的绑定，后续将不再收到相关消息短信、电话通知，祝您生活愉快！')
            initData.isBindPhone = 0
            initData.phone = ""
            allInit()
        },
        error: function (err) {//自己的错误处理函数，定义后优先级最高
            console.error('[Others] fail', err);
            alert(err.sMsg)
        }
    },
}

var sCodeType = 0 // 0 绑定验证码 1 解绑验证码
var isCanSendCode = true // 是否能发送验证码 1 可以 0 不可以
var initData = {
    isBindPhone: 0, // 是否绑定手机
    phone: "", // 已绑定的手机号
}

//初始化成功后的回调逻辑
function mainInit(info) {
    console.log(`[mainInit] start`, info)
    let data = JSON.parse(info.data)
    initData.isBindPhone = data.isBind
    initData.phone = data.phone
    // 逻辑初始
    allInit()
}

// 逻辑初始化
function allInit() {
    // 是否已绑定手机号
    initBindPhoneStatus(initData.isBindPhone)
    // 一键绑定手机号
    $('#confirm').off('click').on('click', function () {
        requestPhoneCode(0)
    })
}


// 手机获取验证
function requestPhoneCode(flag) {
    sCodeType = flag
    $('#codeInp, #codeInp_remove').val('') // 清空原验证码输入
    if (!isCanSendCode) {
        showToast('验证码发送过于频繁，请稍后再试。')
        return
    }
    if (flag == 0) {
        // 绑定手机号
        if (validate('award') == true) {
            let params = {
                sPhoneNum: $('#mobileInp').val(),
                sCodeType: flag
            }
            ActFun.myEmit(MyRequest.RequestPhoneCode, params)
        }
    } else if (flag == 1) {
        // 解绑手机号
        let params = {
            sPhoneNum: initData.phone,
            sCodeType: flag
        }
        ActFun.myEmit(MyRequest.RequestPhoneCode, params)
    }
}

// 绑定手机号
function requestBindPhone() {
    showToast('申请绑定中~')
    let params = {
        sPhoneNum: $('#mobileInp').val(),
        sCode: $('#codeInp').val(),
    }
    ActFun.myEmit(MyRequest.RequestBindPhone, params)
}

// 解绑手机号
function requestRemoveBindPhone() {
    showToast('申请解绑中~')
    let params = {
        sPhoneNum: initData.phone,
        sCode: $('#codeInp_remove').val(),
    }
    ActFun.myEmit(MyRequest.RequestRemoveBindPhone, params)
}

// 更换号码, 清空输入
function changePhone() {
    $('#mobileInp').val('')
}

// radioFlag 是否同意勾选

// 切换为已经绑定状态
function initBindPhoneStatus(flag) {
    if (flag == 1) {
        // 已绑定
        $('#confirm').hide().siblings().show();
        $('#mobileInp').attr('disabled', 'disabled') // 输入框disabled
        $('#mobileInp').val(encodePhone())
        $('.update_mobile').hide()
        // 绑定手机号默认勾选上同意
        if ($('#radio').attr('src').indexOf('sel-act') == -1) {
            changeRadio()
        }
    } else {
        // 未绑定
        $('#confirm').show().siblings().hide();
        $('#mobileInp').removeAttr('disabled') // 输入框disabled
        $('#mobileInp').val('')
        $('.update_mobile').show()
    }
}

// showToast() 轻提示

// 手机号加密
function encodePhone() {
    return initData.phone.replace(initData.phone.substring(3, 7), "****")
}

window.alert = function (msg) {
    //打开自定义弹窗
    $('#custom div').html(msg)
    TGDialogS('custom', true, '温馨提示')
}

//入口
function start() {
    ActFun.loginProcess();
    if (ActTools.isPhone()) {//手机默认设置分享
        ActFun.callMiloShare(ActConfig.mainUrl);//调用1次默认分享
    }
    ActFunRed.initShare()
}

// ActTools.openDebug(start);
start();

