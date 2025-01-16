window.ams_login_avoid_conflict = true; // 防止串号的开关
var _ActFun;
var _ActTools;
var _ActFunRed; //业务专属
var ActConfig = {   //活动配置，每个活动需要单独维护
    gameName: "op",//业务名
    ams_targetappid_wx: "wx42fa705139e2b36c",//业务微信appid
    ams_targetappid_qc: "1110666754",//业务QQ-appid
    ams_login_mobile_wx: "wx07b353821cd10ace",//milo的微信m端授权登录appid,milo--wx1cd4fbe9335888fe,公众号--wx35171251490cc955,服务号--wx07b353821cd10ace
    ams_login_pc_wx: "wxfa0c35392d06b82f",//milo的微信pc端授权登录appid
    ams_login_connect_qq: "101491592",//qc互联登录appid
    activityType: 1,//活动类型(0-普通类, 1-传播类, 2-其他)
    shareIcon: "https://game.gtimg.cn/images/op/m202404/share.jpg",//每个业务固定分享icon，存在公共库
    /*****************************************************************开发每期需维护内容**********************************************************************************/
    activityNum: 675366,//管线、星图的活动号
    ideNum: "78_ExAjBL",//星图后台，需单独填写密钥
    adtagPrefix:"a20231127op",//奕星上报的通用前瞻，一般用活动地址名拼接
    queryRoleList:"",//查询最近登录区服（带缓存以及各种兼容判断） todo 当前不使用
    autoBindRole:"zsgFus",//自动提交绑定流程的token
    NoRolePop:"NoRolePop",//无角色弹窗的id
    msdkFull: true,//控制msdk浏览器是否全屏，
    msdkPosition: "Vertical",//控制msdk浏览器的锁定方向，竖屏：Vertical，横屏：Landscape
    mainUrl: "",//活动默认地址，必填
    shareUrl: "",//活动默认分享地址，必填
    errMsg: "目前参与人数过多，请稍后再试~",//通用提示语
    //todo 测试环境切换，每个业务的配置会有区别，开发可以自行增加映射关系
    env: 0,//env 0-正式环境;1-主干开发;2-主干测试;3-分支测试;4-分支测试备份;5-周版本测试;6-策划主环境;7-五测正式;8-预发布;9-个人测试
    shareInfo: {//结构化分享使用的信息
        'title' : "产品提供",//结构化分享的标题
        'desc' : "产品提供描述",//分享活动简介
        'imgUrl' : "",//分享后朋友看到的图标,20*20
    },
    miniConfig:{
        changeBind: false,//小程序主态是否允许切换绑定
        miniShare: {//小程序内嵌分享的图和授权图
            'title': "",//小程序分享出去的标题
            'picture': "",//小程序分享图，420x336
            'shareAuthImage': "",//授权页图片，750x248 100kb
            'url': "",//分享链接
        },
    },
    /*****************************************************************开发每期需维护内容**********************************************************************************/
    envTip: {
        0: 1,
        1: "主干开发",
        2: "主干测试",
        3: "分支测试",
        4: "分支测试备份",
        5: "周版本测试",
        6: "策划主环境",
        7: "五测正式",
        8: "预发布",
        9: "个人测试",
    },
    wxEnvAreaMap: {
        0: 1,
        1: 980,//主干开发
        2: 982,//主干测试
        3: 984,//分支测试
        4: 986,//分支测试备份
        5: 988,//周版本测试
        6: 990,//策划主环境
        7: 992,//五测正式
        8: 994,//预发布
        9: 996,//个人测试
    },
    qqEnvAreaMap: {
        0: 2,
        1: 981,//主干开发
        2: 983,//主干测试
        3: 985,//分支测试
        4: 987,//分支测试备份
        5: 989,//周版本测试
        6: 991,//策划主环境
        7: 993,//五测正式
        8: 995,//预发布
        9: 997,//个人测试
    },
    platform: {
        MobileWx: 1,//微信环境打开活动
        MobileQQ: 2,//手Q环境打开活动
        Msdk: 3,//msdk环境打开
        SlugSdk: 4,//slugSdk环境打开
        Mini: 5,//小程序内打开
        MobileBrowser: 6,//手机浏览器打开活动
        Pc: 7,//pc端打开活动
    },
    platformMap: {
        1: {name: "微信环境打开活动", isAllow: false},
        2: {name: "手Q环境打开活动", isAllow: false},
        3: {name: "msdk环境打开", isAllow: false},
        4: {name: "slugSdk环境打开", isAllow: false},
        5: {name: "小程序内打开", isAllow: false},
        6: {name: "手机浏览器打开活动", isAllow: false},
        7: {name: "pc端打开活动", isAllow: false},
    },
};
var ActGlobal = {
    user: {   //可以追加其他参数，已有参数注意不要修改命名
        'sOpenid': "",//登录openid
        'sGameOpenid': "",//业务openid
        'sArea': 2,
        'sPlatId': 0,
        'sPartition': 0,
        'sRole': 0,
        'sRoleName': "",
        'sHeadUrl': "",
        'sNickName': "",//登录态获取到的昵称
        'loginType':"",//登录方式
        'loginEnv':"",//登录环境标识：1-微信，2-QQ，3-msdk，4-slugsdk，5-小程序内嵌，6-第三方，7-PC
        'activeBegin': false,//活动是否开启
        'isLogin': false,//是否登录
        'isBind': false,//是否绑定
        'isAuth': false,//是否授权
        'isGame': false,//游戏内嵌
        'isMini': false,//小程序内嵌
        'isRequesting': false,//请求状态
        'recentRoleList':{},
        'qf_name': {},
        'qf_nameArr':{//存储区服名称
            'AndArr':{},//and
            'iOSArr':{},//iOS
        },
        'showQfInfo':'',//用于前端展示的区服信息，提前拼接好
        'selectArea': {
            'selArea': "",
            'selPlat': 0,
            'selPartition': "",
            'selRoleName': '',
        },
    },
    actBindInfo: {//后台返回的绑定记录
    },
    urlParams: {//存储url上的字段
    },
};
//milo相关方法
var ActFun = (_ActFun = {
    //处理通用登录
    loginProcess: function loginProcess() {
        ActFun.miniLoginClear();
        ActFun.loadClick();
        ActGlobal.urlParams = Milo.getUrlParams();//提前获取链接参数
        ActGlobal.user.loginEnv = ActTools.getPlatform();//获取环境标识 登录环境标识：1-微信，2-QQ，3-msdk，4-slugsdk，5-小程序内嵌，6-第三方，7-PC
        console.log("[loginProcess] 当前平台为" + ActConfig.platformMap[ActGlobal.user.loginEnv].name)
        switch (ActGlobal.user.loginEnv) {
            case ActConfig.platform.SlugSdk:
                ActFun.checkSlug();
                break;
            case ActConfig.platform.Msdk:
                ActFun.checkMSDK();
                break;
            case ActConfig.platform.App:
                ActFun.checkMini();
                break;
            case ActConfig.platform.MobileQQ:
                ActFun.checkMilo();
                break;
            case ActConfig.platform.MobileWx:
                ActFun.checkMilo();
                break;
            case ActConfig.platform.MobileBrowser:
                console.error(`[loginProcess] 第三方，按需处理~`)
                break;
            case ActConfig.platform.Pc:
                console.error(`[loginProcess] pc`);
                ActFun.checkMilo();
                break;
            default:
                console.error(`[loginProcess] 环境异常`)
                break;
        }
    },
    checkSlug:function checkSlug() {
        ActTools.loadScript("https://op.qq.com/act/a20231127op/js/browser_adapt.js", function () {
            console.log("[loginSuccess] slugsdk start");
            customBrowserInterface.hideUi()  // 隐藏slug返回按钮
            ActGlobal.user.loginEnv = 4;
            ActGlobal.user.isGame = true;
            ActGlobal.user.isLogin = true;
            ActGlobal.user.loginType = 'msdk';
            ActGlobal.user.sGameOpenid = milo.request('openid');
            ActGlobal.user.sArea = parseInt(milo.request('areaid'));
            ActGlobal.user.sRoleName = decodeURIComponent(milo.request('name'));
            ActGlobal.user.sPlatId = milo.request('platid');
            ActGlobal.user.sPartition = milo.request('partition');
            ActGlobal.user.sPartition = ActGlobal.user.sPartition % 100000;
            ActGlobal.user.sRole = milo.request('roleid');
            console.log("[loginSuccess] slugsdk ActGlobal.user", ActGlobal.user);
            CommonReq.loginSuc(4);
        })
    },
    checkMSDK:function checkMSDK() {
        //todo 给测试单独处理
        if(milo.request('openid') == "13090130201005217630"){
            console.log(`[checkMSDK] 测试验证修改~`)
            ActConfig.env = 5;//测试同学验证
        }

        //展示关闭按钮
        $('#return_game').show();
        ActFun.useMSDK(ActConfig.msdkPosition);//固定浏览器屏幕方向
        console.log("[loginSuccess] msdk start");
        ActGlobal.user.loginEnv = 3;
        ActGlobal.user.isGame = true;
        ActGlobal.user.isLogin = true;
        ActGlobal.user.loginType = 'msdk';
        ActGlobal.user.sGameOpenid = milo.request('openid');
        ActGlobal.user.sRoleName = decodeURIComponent(milo.request('nickname'));//游戏透传
        ActGlobal.user.sPlatId = milo.request('platid');
        ActGlobal.user.sPartition = milo.request('partition');
        ActGlobal.user.sRole = milo.request('roleid');
        //todo 通过channelid结合env判断环境
        if(milo.request('channelid') == 2){
            ActGlobal.user.sArea = ActTools.dealAreaId(2);//手Q
        }else{
            ActGlobal.user.sArea = ActTools.dealAreaId(1);
        }
        console.log("[loginSuccess] msdk ActGlobal.user",ActGlobal.user);
        CommonReq.loginSuc(3);
    },
    checkMini:function checkMini() {
        ActGlobal.user.loginEnv = 5;
        ActGlobal.user.isMini = true;
        ActGlobal.user.isLogin = true;
        ActGlobal.user.loginType = 'mini';
        if (milo.request('isSharePage') == 1) {//客态页，无当前玩家的绑定信息
            console.log("[loginSuccess] 小程序内嵌H5-客态页 start");
            if(ActTools.isNull(milo.request('platid')) || ActTools.isNull(milo.request('areaid')) || ActTools.isNull(milo.request('partition')) ||
                ActTools.isNull(milo.request('roleid'))){//内嵌参数缺失，传undefined处理
                console.error('[loginSuccess] 小程序内嵌分享页H5参数异常，处理活动链接')
                let newUrl = window.location.href
                newUrl = newUrl.replace('&platid=undefined','');
                newUrl = newUrl.replace('&areaid=undefined','');
                newUrl = newUrl.replace('&partition=undefined','');
                newUrl = newUrl.replace('&roleid=undefined','');
                history.replaceState('','',newUrl);//替换浏览器当前地址，确保后续流程不会异常
            }
            //获取area、plat进行后续流程即可
            ActGlobal.user.sArea = ActTools.dealAreaId(ActTools.isWeChat() ? 1 : 2);
            ActGlobal.user.sPlatId = ActTools.isAndroid() ? 1 : 0;
        }else{//主态页，允许玩家进行切换绑定，走常规H5的逻辑
            console.log("[loginSuccess] 小程序内嵌H5-主态页 start");
            if(ActConfig.miniConfig.changeBind == true){
                //允许换绑，之间替换当前打开的链接即可，只保留登录态相关信息
                let newUrl = ActConfig.mainUrl + "?e_code=526992&miloMpLoginParams=" + ActTools.getQueryString("miloMpLoginParams")
                history.replaceState('','',newUrl);//替换浏览器当前地址，确保后续流程不会异常
                ActGlobal.user.sArea = ActTools.dealAreaId(ActTools.isWeChat() ? 1 : 2);
                ActGlobal.user.sPlatId = ActTools.isAndroid() ? 1 : 0;
            }else{
                console.log('[loginSuccess] 小程序内嵌H5主态页，走自动绑定无法切换的流程')
                //不允许换绑，需要走自动绑定的逻辑[与端内打开表现一致]
                ActGlobal.user.sArea = ActTools.dealAreaId(milo.request('areaid'));
                ActGlobal.user.sPlatId = milo.request('platid');
                ActGlobal.user.sPartition = milo.request('partition');
                ActGlobal.user.sRole = milo.request('roleid');
            }
        }
        CommonReq.loginSuc(5);
    },
    checkMilo:function checkMilo() {
        Milo.checkLogin({
            iUseQQConnect: true,
            activateMultiChannel: [],//是否需开启获取渠道登录态、拉起登录框等功能。
            success: function (res) {
                ActGlobal.user.isLogin = true;
                var userInfo = res && res.userInfo;
                console.log('[Milo.checkLogin] 登录成功, 用户信息为:', userInfo);
                ActGlobal.user.sNickName = userInfo.nickName;
                ActGlobal.user.sHeadUrl = ActTools.dealHeadUrl(userInfo.avatarUrl);
                ActGlobal.user.sOpenid = userInfo.openid;//此为登录openid
                if (ActTools.isWeChat() || milo.cookie.get("acctype") == 'wx' || ActGlobal.user.loginType == 'wx') {//wx
                    let appid = milo.cookie.get('appid');
                    console.log(`[Milo.checkLogin] 当前cookie中的appid,acctype,res.userInfo.loginType==>`,appid,milo.cookie.get("acctype"),ActGlobal.user.loginType)
                    if(ActTools.isWeChat() && (milo.cookie.get("acctype") != 'wx' || appid != ActConfig.ams_login_mobile_wx)){//m端，acctype、appid校验
                        console.error(`[Milo.checkLogin] m端，acctype、appid校验不通过，重新拉起授权!`)
                        ActFun.callLogout();
                    }
                    console.log('[Milo.checkLogin] 登录成功, 微信玩家');
                    ActGlobal.loginEnv = 1;
                    ActGlobal.user.sArea = ActTools.dealAreaId(1);
                    ActGlobal.user.sPlatId = ActTools.isAndroid() ? 1 : 0;
                    if(!ActTools.isPhone()){//pc
                        if(appid != ActConfig.ams_login_pc_wx){//PC端,appid校验
                            console.error(`[Milo.checkLogin] PC端微信的appid校验`)
                            ActFun.callLogout();
                        }
                        ActGlobal.user.sPlatId = 2;//此时先赋值为2标识
                    }
                } else if (ActTools.isQQ() || milo.cookie.get("acctype") == 'qc' || ActGlobal.user.loginType == 'qc') {//qc
                    console.log('[Milo.checkLogin] 登录成功, QQ玩家');
                    ActGlobal.loginEnv = 2;
                    ActGlobal.user.sArea = ActTools.dealAreaId(2);
                    ActGlobal.user.sPlatId = ActTools.isAndroid() ? 1 : 0;
                    if(!ActTools.isPhone()){//pc
                        ActGlobal.user.sPlatId = 2;//此时先赋值为2标识
                    }
                } else if (ActTools.isPhone()) {//第三方
                    console.log('[Milo.checkLogin] 登录成功, 第三方玩家');
                    ActGlobal.loginEnv = 6;
                    //弹登录引导，开发自助按需添加
                } else {//PC
                    ActGlobal.loginEnv = 7;
                }
                console.log('[Milo.checkLogin] 处理过的玩家信息:', ActGlobal.user);
                CommonReq.loginSuc(ActGlobal.loginEnv);
            },
            fail: function (res) {
                console.log('[Milo.checkLogin] 登录失败，err', res)
                ActFun.checkLoginFail(CommonReq.loginErr);
            }
        });
    },
    //登录失败回调，会处理不同环境的拉起登录
    checkLoginFail: function checkLoginFail(callback) {
        console.log("[act]--loginFail--");
        //未登录回调，先判断游戏内->小程序->wx->QQ->M->pc
        if (ActTools.isWeChat()) {
            ActFun.mobileByWX();
        } else if (ActTools.isQQ()) {
            ActFun.mobileByQQConnect();
        }else if (ActTools.isPhone()) {
            console.log("[loginFail] 手机端，第三方浏览器~");
            if (!ActTools.isNull(callback) && (typeof callback) == "function") {
                callback();
            }
        } else if (ActTools.isQQBrowser()) {
            console.log("[loginFail] 手机端，qq浏览器--");
            if (!ActTools.isNull(callback) && (typeof callback) == "function") {
                callback();
            }
        } else {
            console.log("[loginFail] PC");
            if (!ActTools.isNull(callback) && (typeof callback) == "function") {
                callback();
            }
        }
    },
    mobileByQQConnect: function mobileByQQConnect(sUrl= ""){
        //m端QQ互联登录方式，以下内容为固定配置
        Milo.mobileLoginByQQConnect({
            appId: ActConfig.ams_login_connect_qq,//milo默认：101491592
            scope: 'get_user_info',
            state: 'STATE',
            redirectUri: 'https://milo.qq.com/comm-htdocs/login/qc_redirect.html',
            sUrl: sUrl, //登录之后的跳转地址，默认为当前页面
        });
    },
    pcByQQConnect: function pcByQQConnect(sUrl= "") {    //pc端QQ拉起登录的方法
        Milo.loginByQQConnect({
            appId: ActConfig.ams_login_connect_qq,
            scope: "get_user_info",
            state: "STATE",
            redirectUri: "https://milo.qq.com/comm-htdocs/login/qc_redirect.html",
            sUrl: sUrl,//登录之后的跳转地址，默认为当前页面
            callback: null,//登录成功后的回调
        });
    },
    mobileByWX: function mobileByWX(){//M端微信授权登录，固定配置
        Milo.mobileLoginByWX({
            appId: ActConfig.ams_login_mobile_wx, //游戏在微信的appid，默认为腾讯游戏活动号
            gameDomain: 'iu.qq.com',
            redirectUri: '', //授权页面，默认为系统默认的comm-htdocs/login/milosdk/wx_mobile_redirect.html
            sUrl: '', //授权成功返回的页面，默认为当前页面
            scope: 'snsapi_userinfo', //默认静默授权
            lang: 'zh_CN', //返回的用户信息中省市的语言版本
            openlink: '', //openlink，如果设置了，则在处理微信登录的时候，会从第三方跳到微信中
        });
    },
    pcByWX:function pcByWX() {
        Milo.loginByWX({
            appId: ActConfig.ams_login_pc_wx,//游戏在微信的appid，默认为腾讯游戏活动号
            gameDomain: 'iu.qq.com',
            lang: 'zh_CN',//返回的用户信息中省市的语言版本
            callback: null,//登录成功后的回调
        });
    },
    mobileBothLogin:function mobileBothLogin(sUrl="", openlink="") {
        Milo.mobileLoginByQQConnectAndWX({
            oQQConnectParams:{
                appId:ActConfig.ams_login_connect_qq,
                scope:"get_user_info",
                state:"STATE",
                redirectUri:"https://milo.qq.com/comm-htdocs/login/qc_redirect.html",
                sUrl:sUrl,//登录之后的跳转地址
                callback:null,//登录成功后的回调
                showParams:{}//会覆盖公共的showParams
            },
            oWXParams: {
                appId: ActConfig.ams_login_mobile_wx, //游戏在微信的appid，默认为腾讯游戏活动号
                gameDomain: 'iu.qq.com', // 微信开放平台管理端里登记的回调域
                redirectUri: '', //授权页面，默认为系统默认的comm-htdocs/login/milosdk/wx_mobile_redirect.html
                sUrl: sUrl, //授权成功返回的页面，默认为当前页面
                scope: 'snsapi_userinfo ', //默认静默授权
                lang: 'zh_CN', //返回的用户信息中省市的语言版本
                openlink: openlink, //openlink，如果设置了，则在处理微信登录的时候，会从第三方跳到微信中
            },
        });
    },
    pcBothLogin: function pcBothLogin(sUrl="") {
        Milo.loginByQQConnectAndWX({
            oQQConnectParams: {
                appId: ActConfig.ams_login_connect_qq,
                scope: 'get_user_info',
                state: 'STATE',
                redirectUri: 'https://milo.qq.com/comm-htdocs/login/qc_redirect.html',
                sUrl: sUrl, //登录之后的跳转地址
            },
            oWXParams: {
                appId:ActConfig.ams_login_pc_wx,//游戏在微信的appid，默认为腾讯游戏活动号
                gameDomain:'iu.qq.com',
                lang:'zh_CN',//返回的用户信息中省市的语言版本
                callback:null,//登录成功后的回调
                showParams:{}//会覆盖公共的showParams
            },
        });
    },
    callLogout: function callLogout(sucCallBack){   //milo-next注销方法，支持回调处理
        Milo.logout({
            callback:function(){
                console.log('[logout] 已注销');
                if (!ActTools.isNull(sucCallBack) && (typeof sucCallBack) == "function") {
                    sucCallBack();
                }
            }
        })
    },
    // eas上报相关
    reportAdtag: function (event) {
        var dataStr = ActConfig.gameName + "_"+ActConfig.adtagPrefix + "_" + ActConfig.activityNum + "_" + event;//需确认该字段的含义，以及c_t字段的传参要求
        EAS.SendClick({e_c: dataStr, c_t: 4, openid: ActGlobal.user.sGameOpenid, uin: ActGlobal.user.sOpenid})
    },
    //todo 不需要关联绑定相关使用以下方法进行查询、写入、取消
    //milo-next授权状态记录使用
    queryAuthNone: function queryAuthNone() {
        // 指定授权URL
        Milo.role.getPIPInfo({
            gameId: ActConfig.gameName,
            url: "" // URL替换为需要授权的
        }).then((res)=>{
            console.log(`[getPIPInfo] 获取url状态：`,res)
            if(res.retCode == 0){
                ActGlobal.user.isAuth = true;//已授权
                //todo 开始后台接口请求
            }else{
                ActGlobal.user.isAuth = false;
                //todo 展示授权弹窗
                return false;
            }
        })
    },
    //写入授权状态,url/action可以根据前端传入
    setAuthNone: function setAuthNone(action= "auth",) {
        // 指定授权URL
        Milo.role.setPIPInfo({
            gameId: ActConfig.gameName,
            url:"", // URL替换为需要授权的
            action:action,//具体执行动作（授权、同意：auth 拒绝：cancel）
        }).then((res)=>{
            console.log(`[setPIPInfo] 进行操作-`+action+`-, 返回:`,res)
            if(action == "auth" && res.retCode == 0){
                ActGlobal.user.isAuth = true;
                //todo 授权后请求后台
            }else{
                closeDialog();
                ActGlobal.user.isAuth = false;
                return ActGlobal.user.isAuth;
            }
        })
    },
    //取消授权
    cancelAuthNone : function cancelAuthNone() {
        Milo.role.setPIPInfo({
            gameId: ActConfig.gameName,
            action:'cancel'
        }).then((res)=>{
            console.log('[cancelAuth] setPIPInfo cancel res ====>',res)
        })
    },
    //todo 与绑定大区关联的授权相关流程 start
    queryAuth: function queryAuth(successCallback= null, failCallback= null, ) {
        if (ActGlobal.user.isGame || ActGlobal.user.isMini) {
            ActGlobal.user.isAuth = true;//已授权
            if (!ActTools.isNull(successCallback) && (typeof successCallback) == "function") {
                successCallback()
            }
        } else {
            Milo.role.getPIPInfo({
                gameId: ActConfig.gameName,
                url: "" //默认为当前链接
            }).then((res)=>{
                console.log(`[queryAuth] getPIPInfo-->`,res)
                if(res && res.retCode == 0){
                    ActGlobal.user.isAuth = true;//已授权
                    if (!ActTools.isNull(successCallback) && (typeof successCallback) == "function") {
                        successCallback()
                    }
                }else{
                    ActGlobal.user.isAuth = false;
                    if (!ActTools.isNull(failCallback) && (typeof failCallback) == "function") {
                        failCallback()
                    }
                }
            })
        }
    },
    setAuth: function setAuth(successCallback= null, failCallback= null, action= "auth") {
        Milo.role.setPIPInfo({
            gameId: ActConfig.gameName,
            url: "", // URL替换为需要授权的
            action:action,//具体执行动作（授权、同意：auth 拒绝：cancel）
        }).then((res)=>{
            console.log(`[setPIPInfo] ==> `+action+`-, 返回:`,res)
            if(action == "auth" && res.retCode == 0){
                ActGlobal.user.isAuth = true;
                if (!ActTools.isNull(successCallback) && (typeof successCallback) == "function") {
                    successCallback();
                }
            }else{
                ActGlobal.user.isAuth = false;
                if (!ActTools.isNull(failCallback) && (typeof failCallback) == "function") {
                    failCallback();
                }
            }
        })
    },
    cancelAuth : function cancelAuth() {
        Milo.role.setPIPInfo({
            gameId: ActConfig.gameName,
            action:'cancel'
        }).then((res)=>{
            console.log('[cancelAuth] setPIPInfo cancel res ====>',res)
        })
    },
    // end
    //星图、管线提交接口
    myEmit: function (modal, sData2 = {}, successCallBack) {
        if (!ActGlobal.user.isLogin) {//登录态校验
            console.error("[emitCheck] 未登录");
            ActFun.checkLoginFail();
            return false;
        }
        if (ActGlobal.user.isRequesting) {
            console.error("[emitCheck]正在请求中----");
            alert(`接口请求中，请稍后再试~`)
            return false;
        }
        if (!modal.hasOwnProperty("token") || ActTools.isNull(modal.token)) {
            console.log("[myEmit] token is null, check again");
            return false;
        }
        ActGlobal.user.isRequesting = true;//请求锁-->开启
        console.log("[myEmit] request params, isRequesting --> true", modal);
        var sucCallBack = !ActTools.isNull(successCallBack) ? successCallBack : modal.render;
        var failCallBack = modal.hasOwnProperty("error") ? modal.error : CommonReq.AmsError;//每个方法下面的error处理报错等级最高
        //封装成功和失败的回调
        var successExtend = function (res) {
            //todo 二次封装校验返回值(兼容星图、管线)，条件cgi的details没有iRet和jData-->若涉及请修改此处判断
            if (ActTools.isNull(res["iRet"]) || res.iRet != 0 || res.details.iRet != 0 || res.details.jData.iRet != 0) {
                if (!modal.hasOwnProperty("error")) {
                    CommonReq.AmsError(res);
                } else {
                    console.log(`[myEmit] 开发配置的错误输出流程~`)
                    modal.error(res);
                }
            } else {
                if (ActTools.isNull(sucCallBack)) {
                    if (modal.hasOwnProperty("render")) {
                        modal.render(res.details.jData);
                    } else {
                        console.error("[myEmit]未配置接口请求成功回调函数");
                    }
                } else {
                    sucCallBack(res);
                }
            }
        }
        var failExtend = function (res) {
            //todo 二次封装处理登录态失效、未绑定区服的逻辑，注意报错的时候可能没有jData字段
            if (res.iRet == 101 || res.details.iRet == 101 ) {
                console.log(`[myEmit] emit 登录态失效，刷新页面或重新授权登录`)
                ActFun.checkLoginFail();
            }else if (res.iRet == 99998 || res.details.iRet == 99998 ){
                console.log(`[myEmit] emit提交后，返回错误码提示未绑定大区！`)
                //未绑定大区，调用绑定大区的方法，大区配置初始化
                //todo 调用最近登录区服
                // CommonReq.showRoleList();
            } else {
                failCallBack(res)
            }
        }
        ActFun.commonEmit(modal, sData2, successExtend, failExtend);
    },
    //二次封装后台请求
    commonEmit: function (modal, sData2, sucCallBack, failCallBack) {
        if(modal.needUserData == true){
            userData = {//玩家相关区服信息，建议不透传，直接读取绑定大区库中的内容，活动相关data走sData2字段
                "sArea": ActGlobal.user.sArea,
                "sPlatId": ActGlobal.user.sPlatId,
                "sPartition": ActGlobal.user.sPartition,
                "sRoleId": ActGlobal.user.sRole,
                "sRoleName": encodeURIComponent(ActGlobal.user.sRoleName),
            };
        }else{
            userData = {}
        }
        var callLoading = ActTools.isNull(modal.loading) ? modal.loading : true;
        var actId = ActTools.isNull(ActConfig.ideNum) ? ActConfig.activityNum : ActConfig.ideNum;//兼容ide和管线
        var newFlow = {
            actId: actId, //活动id
            loading: callLoading, // 开启loading浮层,默认不开启
            token: modal.token,
            success: function (res) {
                ActGlobal.user.isRequesting = false;
                //console.log("[commonEmit] result is:",res)
                sucCallBack(res);
            },
            fail: function (err) {
                //条件不满足，ame返回大于0是后走到这里
                ActGlobal.user.isRequesting = false;
                console.error("[commonEmit] token:" + modal.token + "执行失败:", err);
                failCallBack(err);
            }
        }
        newFlow.sData = $.extend(userData, sData2);
        console.log("[commonEmit] " + modal.modalName + " params is:", newFlow.sData);
        Milo.emit(newFlow);
    },
    //点击处理
    loadClick: function loadClick() {
        $.fn.myOn = function (...info) {// 先解除click事件，再绑定，防止出现重复绑定的情况
            this.off("click");
            this.on(...info);
        }
    },
    //清理小程序登录态对活动的影响
    miniLoginClear:function miniLoginClear() {
        if (!milo.request('miloMpLoginParams') && milo.cookie.get('acctype') == "qqmini") {
            console.log(`[appLoginCheck] 小程序残留登录态会影响QC拉起授权，需要清理cookie`);
            //openid、acctype、appid、ieg_ams_token_time、ieg_ams_session_token、ieg_ams_token
            milo.cookie.clear("acctype", ".game.qq.com", "/");
            milo.cookie.clear("openid", ".game.qq.com", "/");
            milo.cookie.clear("appid", ".game.qq.com", "/");
            milo.cookie.clear("ieg_ams_token_time", ".game.qq.com", "/");
            milo.cookie.clear("ieg_ams_session_token", ".game.qq.com", "/");
            milo.cookie.clear("ieg_ams_token", ".game.qq.com", "/");
            milo.cookie.clear("acctype", ".hyrz.qq.com", "/");
            milo.cookie.clear("openid", ".hyrz.qq.com", "/");
            milo.cookie.clear("appid", ".hyrz.qq.com", "/");
            milo.cookie.clear("ieg_ams_token_time", ".hyrz.qq.com", "/");
            milo.cookie.clear("ieg_ams_session_token", ".hyrz.qq.com", "/");
            milo.cookie.clear("ieg_ams_token", ".hyrz.qq.com", "/");
        }
    },
    //通用分享，m端、slug、msdk、mini均包含
    commonShare:function commonShare(shareUrl, title = '', description = '',shareType = ""){
        if(ActTools.isMini()){
            ActFun.miniShare(shareUrl, title);
        }else if(ActTools.isSlug()) {
            ActFun.slugSdkShare(shareType, shareUrl, title, description);
        }else if(ActTools.isMSDK()){
            ActFun.msdkShare(shareType, shareUrl, title, description);
        }else{
            ActFun.callMiloShare(shareUrl, title, description);
        }
    },
    //m端结构化分享
    callMiloShare:function callMiloShare(sendUrl, title = '', description = '', shareSuccessCallback = null) {
        ActTools.isNull(title) && (title = ActConfig.shareInfo.title)
        ActTools.isNull(description) && (description = ActConfig.shareInfo.desc)
        milo.ready(function () {
            need("biz.mobileclient", function (mClient) {
                var obj = {
                    wx_appid: 'wx7303bdca1d6e9cd1', //微信appid(和平精英)
                    title: title,// 分享标题，默认为活动页面标题（可手动调整）
                    desc: description, //分享活动简介
                    link: sendUrl, //分享链接
                    imgUrl: ActConfig.shareIcon, //分享后朋友看到的图标
                    WXtrigger: function (res) { // 微信中，点击预要分享给微信好友
                        console.log('[miloShare] WXtrigger:', res)
                    },
                    WXsuccess: function (res) { // 微信分享到QQ时，是只要点击了QQ就会返回；微信分享到微信的时候，需要分享成功才会有这个回调
                        console.log('[miloShare] WXsuccess:', res)
                        if (!ActTools.isNull(shareSuccessCallback) && (typeof shareSuccessCallback) == "function") {
                            shareSuccessCallback()
                        }
                    },
                    WXcancel: function (res) { //微信分享取消回调
                        console.log('[miloShare] WXcancel:', res)
                    },
                    WXfail: function (res) { //微信分享失败回调
                        console.log('[miloShare] WXfail:', res)
                    },
                    /*手Q分享回调【不需要可不写】*/
                    QQcallback: function (res) {// QQ分享到QQ的回调，QQ分享到微信没有回调
                        console.log('[miloShare] QQcallback:', res)
                        if (res.retCode === 0) {
                            if (!ActTools.isNull(shareSuccessCallback) && (typeof shareSuccessCallback) == "function") {
                                shareSuccessCallback()
                            }  // qq可以判断真分享， 成功就回调
                        }
                    },
                    QQtrigger: function (res) {// QQ中，选择分享到QQ或者微信的时候有一个触发回调
                        console.log('[miloShare] QQtrigger:', res)
                    },
                    /* QQ浏览器分享回调【不需要可不写】*/
                    qqBrowserCallback: function (data) {
                        console.log('[miloShare] qqBrowserCallback:', data)
                    }
                };
                mClient.shareAll(obj);
            });
        });
    },
    //小程序内嵌H5自定义分享
    miniShare:function appShare (urlToshare, title = '') {
        console.log("[appShare] info", sendUrl, title);
        ActTools.isNull(urlToshare) && (urlToshare = ActConfig.miniConfig.urlToshare)
        ActTools.isNull(title) && (title = ActConfig.miniConfig.title)
        var jsLib = ActTools.isWeChat() ? "https://game.gtimg.cn/images/hyrz/json/js/wxSdk.js" : "https://game.gtimg.cn/images/hyrz/json/js/qqSdk.js";
        ActTools.loadScript(jsLib, function () {
            wx.miniProgram.postMessage({
                data: {
                    title: encodeURIComponent(title), // 分享的标题
                    picture: ActConfig.miniConfig.picture, // 分享的封面
                    urlToshare: urlToshare, // 分享出去后，希望客态玩家访问的页面
                    shareAuthImage: ActConfig.miniConfig.shareAuthImage, // 客态好友打开看到的授权页
                }
            })
            console.log("[appShare] 已调用小程序分享");
        });
    },
    // slugSdk分享
    slugSdkShare:function slugSdkShare(shareType, sUrl, title = '', description = '') {
        ActTools.isNull(title) && (title = ActConfig.shareInfo.title)
        ActTools.isNull(description) && (description = ActConfig.shareInfo.desc)
        var shareData = {
            title: title,   // 分享标题
            desc: description,  // 分享描述
            url: sUrl,    // 分享链接
            imgUrl: ActConfig.shareIcon, // 分享logo url
        }
        console.log('[slugSdkShare] 分享类型---'+shareType,shareData);
        switch (shareType) {
            case 1://微信好友
                customBrowserInterface.sendToWeixinWithUrl(2, shareData.title, shareData.desc, shareData.url, shareData.imgUrl);
                break;
            case 2://微信朋友圈
                customBrowserInterface.sendToWeixinWithUrl(1, shareData.title, shareData.desc, shareData.url, shareData.imgUrl);
                break;
            case 3://QQ好友
                customBrowserInterface.sendToQQ(2, shareData.title, shareData.desc, shareData.url, shareData.imgUrl);
                break;
            case 4://QQ空间
                customBrowserInterface.sendToQQ(1, shareData.title, shareData.desc, shareData.url, shareData.imgUrl);
                break;
            default:
                alert(`[slugSdkShare] 分享类型错误，请检查逻辑~`)
                break;
        }
    },
    // msdkV5分享
    msdkShare:function msdkShare(shareType, sUrl, title = '', desc = '') {
        ActTools.isNull(title) && (title = ActConfig.shareInfo.title)
        ActTools.isNull(desc) && (desc = ActConfig.shareInfo.desc)
        var shareJsonObj = {};
        switch (shareType) {
            case 1://微信好友
                shareJsonObj = {
                    "channel": "WeChat",
                    "MsdkMethod": "sendMsgWebView",
                    "actionReport": "MSG_INVITE",
                    "desc": desc,
                    "imagePath": ActConfig.shareIcon,
                    "link": sUrl,
                    "messageExt": "messageExt",
                    "tailLogo": "WECHAT_SNS_JUMP_APP",
                    "thumbPath": ActConfig.shareIcon,
                    "title": title,
                    "type": 10001,
                    "user": ""
                };
                break;
            case 2://微信朋友圈
                shareJsonObj = {
                    "channel": "WeChat",
                    "MsdkMethod": "shareWebView",
                    "actionReport": "MSG_INVITE",
                    "desc": desc,
                    "imagePath": ActConfig.shareIcon,
                    "link": sUrl,
                    "messageExt": "messageExt",
                    "tailLogo": "WECHAT_SNS_JUMP_APP",
                    "thumbPath": ActConfig.shareIcon,
                    "title": title,
                    "type": 10001,
                    "user": ""
                };
                break;
            case 3://QQ好友
                shareJsonObj = {
                    "channel": "QQ",
                    "MsdkMethod": "sendMsgWebView",
                    "actionReport": "MSG_INVITE",
                    "desc": desc,
                    "imagePath": ActConfig.shareIcon,
                    "link": sUrl,
                    "messageExt": "messageExt",
                    "tailLogo": "WECHAT_SNS_JUMP_APP",
                    "thumbPath": ActConfig.shareIcon,
                    "title": title,
                    "type": 10001,
                    "user": ""
                };
                break;
            case 4://QQ空间
                shareJsonObj = {
                    "channel": "QQ",
                    "MsdkMethod": "shareWebView",
                    "actionReport": "MSG_INVITE",
                    "desc": desc,
                    "imagePath": ActConfig.shareIcon,
                    "link": sUrl,
                    "messageExt": "messageExt",
                    "tailLogo": "WECHAT_SNS_JUMP_APP",
                    "thumbPath": ActConfig.shareIcon,
                    "title": title,
                    "type": 10001,
                    "user": ""
                };
                break;
            default:
                alert(`[slugSdkShare] 分享类型错误，请检查逻辑~`);
                break;
        }
        console.log('[msdkV5Share] shareType'+shareType ,jsonObj);
        msdkCall(JSON.stringify(jsonObj));
    },
    //msdk 相关方法处理
    useMSDK:function useMSDK(option) {
        const CloseWebView = '{"MsdkMethod":"closeWebView","key":"value"}';
        let SetFullScreen = '{"MsdkMethod":"setFullScreen","isFullScreen":true}';//默认全屏，若不需要，可以自行关闭
        let SetPortraitScreen = "";
        let SetLandscapeScreen = "";
        if (!ActConfig.msdkFull) {
            console.log(`[useMSDK] msdk webview not full`)
            SetFullScreen = '';
        }
        switch (option) {
            case 'Vertical'://竖屏展示
                if (ActTools.isIOS()) {
                    SetPortraitScreen = '{"MsdkMethod":"setScreenOrientation","screenOrientation":"1"}';//iOS-竖屏
                } else {
                    SetPortraitScreen = '{"MsdkMethod":"setScreenOrientation","screenOrientation":"7"}';//安卓-竖屏
                }
                console.log(`[useMSDK] Vertical 竖屏展示:`, SetPortraitScreen)
                setTimeout(function () {
                    console.log(`[useMSDK] setTimeout 150 start`)
                    msdkCall(SetFullScreen)
                    msdkCall(SetPortraitScreen)
                }, 150)
                break;
            case 'Landscape'://横屏展示
                if (ActTools.isIOS()) {
                    SetLandscapeScreen = '{"MsdkMethod":"setScreenOrientation","screenOrientation":"3"}';//iOS-横屏
                } else {
                    SetLandscapeScreen = '{"MsdkMethod":"setScreenOrientation","screenOrientation":"6"}';//安卓-横屏
                }
                console.log(`[useMSDK] Landscape 横屏展示:`, SetLandscapeScreen)
                setTimeout(function () {
                    console.log(`[useMSDK] setTimeout 150 start`)
                    msdkCall(SetFullScreen)
                    msdkCall(SetLandscapeScreen)
                }, 150)
                break;
            case 'close':
                msdkCall(CloseWebView);
                break;
            default:
                alert(`[useMSDK] 不存在的方法，请检查入参~`)
        }
    },
    //slug 返回和关闭
    slugReturnGame: function () {
        ActTools.loadScript("https://op.qq.com/act/a20231127op/js/browser_adapt.js", function () {
            //todo 增加兼容，微社区(526987)返回上一级，游戏中心(525622)关闭浏览器，默认关闭浏览器
            if (milo.request("ingameorient")) {
                console.log(`[slugReturnGame] 微社区返回上一级`)
                history.back();
            } else {
                console.log(`[slugReturnGame] 非微社区入口`)
                customBrowserInterface.closeWebview();
            }
        });
    },
    // milo-next的分享方式
    nextMobileShare:function nextMobileShare(sendUrl, title = '', description = '', shareSuccessCallback = null) {
        ActTools.isNull(title) && (title = ActConfig.shareInfo.title)
        ActTools.isNull(description) && (description = ActConfig.shareInfo.desc)
        console.log(`[nextMobileShare] sendUrl==title==description==icon`,sendUrl,title,description,ActConfig.shareIcon)
        var opts = {
            wx_appid : 'wx7303bdca1d6e9cd1', //微信公众号appid
            title: title,// 分享标题，默认为活动页面标题（可手动调整）
            desc: description, //分享活动简介
            link: sendUrl, //分享链接
            imgUrl: ActConfig.shareIcon, //分享后朋友看到的图标
            /*微信分享回调【不需要可不写】*/
            WXtrigger: function (res) { //微信点击事件回调
                console.log("[nextMobileShare] 微信点击回调\n"+JSON.stringify(res));
            },
            WXsuccess: function (res) { //微信分享成功回调
                console.log("[nextMobileShare] 微信分享成功回调\n"+JSON.stringify(res));
            },
            WXcancel: function (res) { //微信分享取消回调
                console.log("[nextMobileShare] 微信分享取消回调\n"+JSON.stringify(res));
            },
            WXfail: function (res) { //微信分享失败回调
                console.log("[nextMobileShare] 微信分享失败回调\n"+JSON.stringify(res));
            },

            QQcallback:function(res){//qq成功、失败、或取消的回调
                // 该方法会被群聊打击，新活动不推荐使用。建议单独调用ARK分享
                console.log("[nextMobileShare] QQ分享之后回调回调\n"+JSON.stringify(res));
            },
            QQtrigger:function(res){//qq触发事件的回调
                // 该方法会被群聊打击，新活动不推荐使用。建议单独调用ARK分享
                console.log("[nextMobileShare] QQ分享触发回调\n"+JSON.stringify(res));
            },
            qqBrowserCallback: function(data){
                //data.code ==1 表示能分享
                //data.code ==-1 表示不能分享
                //data.code == 0 表示未知
                console.log("[nextMobileShare] QQ浏览器分享触发回调\n"+JSON.stringify(data));
            }
        };
        Milo.mobileShare.initShareAll(opts)
    },
    nextMsdkShare:function nextMsdkShare(shareType, sUrl, title = '', desc = '') {
        ActTools.isNull(title) && (title = ActConfig.shareInfo.title)
        ActTools.isNull(desc) && (desc = ActConfig.shareInfo.desc)
        var msdkMethod = 'sendMsgWebView';
        var channel = 'QQ';
        switch (shareType) {
            case 1://微信好友
                msdkMethod = 'sendMsgWebView';
                channel = 'WeChat';
                break;
            case 2://微信朋友圈
                msdkMethod = 'shareWebView';
                channel = 'WeChat';
                break;
            case 3://QQ好友
                msdkMethod = 'sendMsgWebView';
                channel = 'QQ';
                break;
            case 4://QQ空间
                msdkMethod = 'shareWebView';
                channel = 'QQ';
                break;
            default:
                alert(`[slugSdkShare] 分享类型错误，请检查逻辑~`)
                break;
        }
        var opts = {
            withPop: false,//默认为true,表示唤起底部选择分享平台的默认弹窗，样式见下图。设为false则需要主动传递具体msdk分享参数
            title: title,//分享标题，默认为活动页面标题（可手动调整）
            desc: desc,//分享活动简介
            url: sUrl,//分享链接
            paramsV5: {//msdkV5分享参数
                msdkMethod: msdkMethod,
                channel: channel,
                title: title,
                desc: desc,
                url: sUrl,
                imgUrl: ActConfig.shareIcon,//控制在20k以下
            }
        };
        Milo.mobileShare.msdkShare(opts)
    },
});
//通用tools方法
var ActTools = (_ActTools = {
    //根据对应环境进行登录态校验逻辑
    getPlatform: function getPlatform() { //1-微信，2-QQ，3-msdk，4-slugsdk，5-小程序内嵌，6-第三方，7-PC
        return ActTools.isSlug() ? 4 : ActTools.isMSDK() ? 3 : ActTools.isMini() ? 5 : ActTools.isQQ() ? 2 : ActTools.isWeChat() ? 1 : ActTools.isPhone() ? 6 : 7;
    },
    //自写方法，获取url的参数
    getQueryString:function getQueryString(name, url = window.location.href) {
        url = url.replace(/#+.*$/, ""), params = url.substring(url.indexOf("?") + 1, url.length).split("&"), param = {};
        for (var i = 0; i < params.length; i++) {
            var pos = params[i].indexOf("=");
            var key = params[i].substring(0, pos);
            param[key] = params[i].substring(pos + 1)
        }
        return typeof param[name] == "undefined" ? "" : param[name]
    },
    //获取当前页面路径
    getPathUrl:function getPathUrl() {
        var str = window.location.protocol + "//" + window.location.host + window.location.pathname;
        if (str.indexOf("html") != -1) {
            return str.substr(0, str.lastIndexOf('/'))
        } else {
            return str;
        }
    },
    //url添加参数
    addQueryParam:function addQuery(url, ...params) {
        for (var i = 0; i < params.length - 1; i += 2) {
            var name = params[i];
            var value = params[i + 1];
            var value2 = ActTools.getQueryString(name, url);
            if (!ActTools.isNull(value2)) {
                var replace = `${name}=${value}`;
                var search = `${name}=${value2}`;
                url = url.replace(search, replace);
                continue;
            }
            var params2 = name + "=" + value;
            var flag = url.indexOf("?") == -1 ? "?" : "&";
            url += flag + params2;
        }
        return url;
    },
    //加载js，可重复加载
    loadScript:function loadScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        if (script.readyState) {//IE
            script.onreadystatechange = function () {
                if (this.readyState == 'complete' || script.readyState == "loaded") {
                    script.onreadystatechange = null;
                    callback();
                }
            }
        } else {//其他浏览器
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        head.appendChild(script);
    },
    //同一界面跳转，携带参数
    goToSameUrl:function goToSameUrl(url, isHistory = true) {
        var href = window.location.href;
        var index = href.indexOf("?");
        var params = "";
        if (index != -1) {
            params = href.substr(index + 1, href.length - 1);
        }
        //params为空不需要flag
        var flag = params == "" ? "" : (url.indexOf("?") == -1 ? "?" : "&");
        var newUrl = url + flag + params;
        console.log(`[goToSameUrl] newUrl:`,newUrl);
        if (isHistory) {
            window.location.replace(newUrl);
        } else {
            window.location.href = newUrl;
        }
    },
    openDebug:function openDebug(callback) {
        ActTools.loadScript("https://op.qq.com/act/a20231127op/js/eruda.js", function(){
            eruda.init();
            console.log(`[openDebug] url:`+ window.location.href);
            if (!ActTools.isNull(callback) && (typeof callback) == "function") {
                callback();
            }
        });
    },
    openVConsole:function openVConsole(callback) {
        ActTools.loadScript("https://op.qq.com/act/a20231127op/js/vconsole.min.js", function(){
            var vConsole = new VConsole()
            console.log(`[openVConsole] url:`+ window.location.href);
            if (!ActTools.isNull(callback) && (typeof callback) == "function") {
                callback();
            }
        });
    },
    //tde代理
    openHyTDE: function (isIdipTest = true) {
        if (ActConfig.env == 0) {
            console.log("[openHyTDE] 正式环境不做转化");return;
        }
        //替换hyrz.qq.com为hyrz.tdeproxy.qq.com，增加参数_tde_id=7568（idip测试）、_tde_id=7567(idip正式)
        //7568-idip测试外网访问token: b367e844-5287-458f-ad12-9d4a4c
        //7567idip正式外网访问token: 642c8a73-802b-4777-ad10-4c8e2d
        var href = window.location.href;
        if (href.indexOf("hyrz.tdeproxy.qq.com") != -1) {
            console.log("[openHyTDE] tde已生效");return;
        }
        var s = href.replace("hyrz.qq.com", "hyrz.tdeproxy.qq.com");
        if (isIdipTest) {
            s = ActTools.addQueryParam(s, "_tde_id", "7568");
        } else {
            s = ActTools.addQueryParam(s, "_tde_id", "7567");
        }
        history.replaceState('','',s);
    },
    openUATDE: function (isIdipTest = true) {
        if (ActConfig.env == 0) {
            console.log("正式环境不做转化");return;
        }
        alert(`tde模式，自动跳转中，若页面需要输入token，请联系开发~`)
        //替换aqtw.qq.com为aqtw.tdeproxy.qq.com，增加参数_tde_id=9336（idip测试）、_tde_id=9337(idip正式)
        //idip测试token：b4bffd31-6645-410b-b101-0902a9352d97
        //idip正式token：28fa4e1e-7e4b-4bdd-835e-20e4fd619ebb
        var href = window.location.href;
        if (href.indexOf("aqtw.tdeproxy.qq.com") != -1) {
            console.log("[openUATDE] tde已生效");return;
        }
        var s = href.replace("aqtw.qq.com", "aqtw.tdeproxy.qq.com");
        if (isIdipTest) {
            s = ActTools.addQueryParam(s, "_tde_id", "9336");
        } else {
            s = ActTools.addQueryParam(s, "_tde_id", "9337");
        }
        history.replaceState('','',s);
    },
    //生成 [n,m] 的随机整数
    randomNum:function randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    },
    //头像预处理，http转换https，微信头像/40替换/96等
    dealHeadUrl:function dealHeadUrl(headUrl) {
        if (ActTools.isNull(headUrl)) {
            //todo 业务需提供默认头像
            console.log(`头像为空，请检查逻辑~`)
            return "";
        }
        headUrl = headUrl.replace('http:', 'https:')
        headUrl = headUrl.replace('s=40', 's=100')  //老版milo的qc互联头像
        headUrl = headUrl.replace('/40?', '/100?')
        headUrl = headUrl.replace('/40', '/100')    //手Q头像
        var reg = /^(https?:\/\/wx\.qlogo\.(cn|com)\/).+\/40$/
        if (reg.test(headUrl)) {
            headUrl = headUrl.replace('/40', '/96');    //处理微信头像的异常
        }
        return headUrl
    },
    //多余字符应省略号标识
    CheckStringLength:function CheckStringLength(str, length) {
        if (str.length > length) {
            return str.substring(0, length) + '...';
        } else {
            return str;
        }
    },
    //结合env，转换area
    dealAreaId:function dealAreaId(area = null) {
        return ActTools.isWeChatDev(area) ? ActConfig.wxEnvAreaMap[ActConfig.env] :
            ActConfig.qqEnvAreaMap[ActConfig.env];
    },
    isWeChatDev:function isWeChatDev(areaId = null) {
        var areaId2 = ActTools.isNull(areaId) ? parseInt(ActGlobal.user.sArea) : parseInt(areaId);
        var wxEnvAreaList = Object.values(ActConfig.wxEnvAreaMap);
        return wxEnvAreaList.indexOf(areaId2) != -1;
    },
    isQQDev:function isQQDev(areaId = null) {
        var areaId2 = ActTools.isNull(areaId) ? parseInt(ActGlobal.user.sArea) : parseInt(areaId);
        var qqEnvAreaList = Object.values(ActConfig.qqEnvAreaMap);
        return qqEnvAreaList.indexOf(areaId2) != -1;
    },
    //跳转至qq客户端，可从第三方拉起QQ客户端
    goToQQ:function goToQQ() {
        var flag = window.location.href.indexOf("?") != -1 ? '&' : '?';  // true
        var goToUrl = window.location.href + flag + '_wv=1';
        window.location.href = "//gp.qq.com/act/a20180718jump_qq/index.html?url=" + goToUrl;
    },
    isInGame:function isInGame() {//判断是否为游戏内环境，支持msdk、sulg
        return  (/msdk/i.test(window.navigator.userAgent.toLowerCase()) || navigator.userAgent.indexOf("TIEM Ingame Browser/") != -1);
    },
    isMSDK:function isMSDK() {//判断带登录态的游戏内msdk环境
        return (ActTools.getQueryString('itopencodeparam') != '' && /msdk/i.test(window.navigator.userAgent.toLowerCase()));
    },
    isSlug:function isSlug() {//判断带登录态的游戏内slug环境
        return (ActTools.getQueryString('itopencodeparam') != '' && navigator.userAgent.indexOf("TIEM Ingame Browser/") != -1);
    },
    isIOS:function isIOS() {
        var ua = window.navigator.userAgent.toLowerCase();
        return /iphone|ipod|ipad/i.test(ua);
    },
    isAndroid:function isAndroid() {
        var ua = window.navigator.userAgent.toLowerCase();
        return /android/i.test(ua);
    },
    isWeChat:function isWeChat() {
        return /MicroMessenger/gi.test(window.navigator.userAgent);
    },
    isQQ:function isQQ() {
        return window.navigator.userAgent.toLowerCase().match(/ qq\//i);
    },
    isTBS:function isTBS() {// 是否tbs内核
        return /TBS/ig.test(window.navigator.userAgent);
    },
    isQQBrowser:function isQQBrowser() {// 是否手机QQ浏览器
        /* 由于使用了QQ浏览器内核，部分手机的微信中会显示 MicroMessenger + MQQBrowser，所要先排除微信
             手Q的内置浏览器，也改成了 MQQBrowser 的内核，需要先排除*/
        if (ActTools.isWeChat() || ActTools.isQQ() || ActTools.isTBS()) {
            return false;
        }
        return /MQQBrowser/ig.test(window.navigator.userAgent);
    },
    isMini:function isMini() {   //带登录态的小程序内嵌
        return (ActTools.getQueryString('miloMpLoginParams') != '' && /miniProgram/i.test(window.navigator.userAgent.toLowerCase()));
    },
    isPhone:function isPhone() {
        return /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(window.navigator.userAgent);
    },
    isTgClub:function isTgClub() {//心悦俱乐部
        return /tgclub/.test(window.navigator.userAgent.toLowerCase());
    },
    isYYB:function isYYB() {//应用宝
        var ua = window.navigator.userAgent;
        return ua.match(/\/qqdownloader\/(\d+)(?:\/(appdetail|external|sdk))?/)
    },
    isTV:function isTV() {//腾讯视频环境
        return /(QQLive|WeTV)(HD|Kid)?(Browser|_MAC)?[\s/]*(\d+(\.\d+)*)/i.test(window.navigator.userAgent);
    },
    isNull:function isNull(v) {
        switch (typeof v) {
            case undefined://新增undefined判断
                return true;
            case 'undefined':
                return true;
            case 'string':
                if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
                break;
            case 'boolean':
                return false;
                break;
            case 'number':
                if (isNaN(v)) return true;
                break;
            case 'object':
                if (null === v || v.length === 0) return true;
                for (var i in v) {
                    return false;
                }
                return true;
        }
        return false;
    },
    // 正则匹配手机号
    isMatchPhone:function isMatchPhone(phone) {
        var pattern = /^1[3456789]\d{9}$/;
        return pattern.test(phone);
    },
    // 正则匹配QQ号
    isMatchQq:function isMatchQq(qq) {
        var pattern = /^[1-9]\d{4,19}$/;
        console.log(pattern.test(qq))
        return pattern.test(qq);
    },
    // 正则匹配微信号
    isMatchWeChat:function isMatchWeChat(wechat) {
        var pattern = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
        return pattern.test(wechat);
    },
    changeLocalStorage: function changeLocalStorage() {//更改游戏内的localStorage
        if (ActTools.isMSDK() || ActTools.isSlug()) {
            console.log("[changeLocalStorage] 复写localStorage");
            if (!window.hasOwnProperty("localStorage")) {
                console.log("[changeLocalStorage] 环境中不存在localStorage,重新赋值");
                window.localStorage = {};
            }
            if (!ActGlobal.hasOwnProperty("localStorageCache")) {
                ActGlobal.localStorageCache = {};
            }
            window.localStorage.getItem = function (key) {
                console.log("[changeLocalStorage] localStorageCache is:", ActGlobal.localStorageCache);
                return ActGlobal.localStorageCache[key];
            };
            window.localStorage.setItem = function (key, value) {
                console.log("[changeLocalStorage] localStorageCache is:", ActGlobal.localStorageCache);
                ActGlobal.localStorageCache[key] = value;
            };
        }
    },
});

/************************************业务特性逻辑 start**********************************************************************/
let flow_commit_roleInfo = {};// 自定义绑定弹框查询角色
var ActFunRed = (_ActFunRed= {// 含小区的活动均可复用这套流程，先查最近区服再提交绑定
    dealBindProcess :function dealBindProcess(bindAreaInfo, mainRes) {//初始化成功获取到区服信息，处理绑定相关逻辑
        console.log(`[dealBindProcess] start =====>bindAreaInfo`, bindAreaInfo)
        if(ActGlobal.user.isGame && ActGlobal.user.isGame == true){//端内逻辑
            console.log(`[dealBindProcess] 端内逻辑,slug or msdk`)
            if(ActGlobal.user.sArea == bindAreaInfo.Farea && ActGlobal.user.sPlatId == bindAreaInfo.FplatId
                && ActGlobal.user.sPartition == bindAreaInfo.FPartition && ActGlobal.user.sRole == bindAreaInfo.FroleId){//端内逻辑，判断后台返回与url获取是否一致
                console.log(`[dealBindProcess] 此时后台记录与当前环境一致，直接渲染页面`);
                ActGlobal.user.isBind = true;
                ActGlobal.user.bindInfo = bindAreaInfo;
                ActGlobal.user.sGameOpenid = bindAreaInfo.Fuin;
                ActGlobal.user.sArea = bindAreaInfo.Farea;
                ActGlobal.user.sPlatId = bindAreaInfo.FplatId;
                ActGlobal.user.sRole = bindAreaInfo.FroleId;
                ActGlobal.user.sPartition = bindAreaInfo.FPartition;
                let sRoleName = decodeURIComponent(bindAreaInfo.FroleName);
                try {
                    ActGlobal.user.sRoleName = decodeURIComponent(sRoleName);
                } catch (e) {
                    console.log(`[dealBindProcess] decodeURIComponent roleName is err`, e)
                    ActGlobal.user.sRoleName = sRoleName;
                }
                CommonReq.showBindInfo(false, mainRes);
            }else{//走自动提交流程到后台，然后调用初始化接口
                console.log(`[dealBindProcess] 此时后台记录与当前环境不一致，走自动提交流程到后台，然后调用初始化接口`);
                ActFunRed.autoBindRole(ActGlobal.user.sArea, ActGlobal.user.sPlatId, ActGlobal.user.sPartition, ActGlobal.user.sRole,
                    CommonReq.showBindInfo, CommonReq.autoBindRoleFail);
            }
        }else {//双端、pc正常；小程序，历史绑定>小程序透传区服，直接渲染即可
            console.log(`[dealBindProcess] 双端、pc正常；小程序，历史绑定>小程序透传区服，直接渲染即可`);
            ActGlobal.user.isBind = true;
            ActGlobal.user.bindInfo = bindAreaInfo;
            ActGlobal.user.sGameOpenid = bindAreaInfo.Fuin;
            ActGlobal.user.sArea = bindAreaInfo.Farea;
            ActGlobal.user.sPlatId = bindAreaInfo.FplatId;
            ActGlobal.user.sRole = bindAreaInfo.FroleId;
            ActGlobal.user.sPartition = bindAreaInfo.FPartition;
            let sRoleName = decodeURIComponent(bindAreaInfo.FroleName);
            try {
                ActGlobal.user.sRoleName = decodeURIComponent(sRoleName);
            } catch (e) {
                console.error(`[dealBindProcess] decodeURIComponent roleName is err`, e)
                ActGlobal.user.sRoleName = sRoleName;
            }
            CommonReq.showBindInfo(false, mainRes);
        }
    },
    miloRoleSelector :function miloRoleSelector() {//初始化1次弹窗
        console.log(`[miloRoleSelector] init 活动期间初始化1次即可`)
        var obj = {
            "customizeAreaStyle": true,//支持自定义样式，默认false
            "iAreaChooseType": 2,
            "channel": 'auto',//过滤渠道 可选值: weixin qq auto(根据登录态自动) no(默认)
            "gameId": ActConfig.gameName,
            "customDom":{
                "pipInfoId": "milo_custom_PIPInfo",
                "tempAreaId":'milo_custom_tempArea',
                "areaId":'milo_custom_area',
                "platidId":'milo_custom_platid',
                "partitionId": 'milo_custom_partition',
                "roleId": 'milo_custom_role_selector',
                "errorMsgId": 'milo_custom_error_message'
            },
            "customAreaDefaultText":{
                "tempArea": '请选择平台',
                "area": '请选择大区',
                "platid": '请选择平台',
                "partition": '请选择小区',
                "role": '请选择角色'
            },
            "openToOpen": { //openid转换相关参数和gopenid相关参数,具体参考参数说明
                "sAMSTrusteeship": 1, //标记是否需要走微信/QQ托管,默认为0(1:走微信/QQ托管,0:不走微信/QQ托管)
                "ams_targetappid_qc": ActConfig.ams_targetappid_qc, //托管转换的目标appid(一般为游戏的互联登录appid)
                "ams_targetappid_wx": ActConfig.ams_targetappid_wx, //托管转换的目标appid(一般为游戏的微信appid)
                "oGopenidParams": {//gopenid体系专用
                    "needGopenid": 1,
                    "isPreengage": 1
                }
            },
            "roleCallback": function (res) {
                console.log(`[miloRoleSelector] roleCallback suc`,res);
                if(ActTools.isNull(res)){//需要处理无角色的弹窗展示
                    console.error(`[miloRoleSelector] 无角色`)
                    alert(`请选择正确的区服信息`)
                    return false;
                }
                //获取角色成功，这里可以触发提交流程
                var selectedRole = res[0];
                var roleData = {
                    "sRoleId": selectedRole.roleId,
                    "sRoleName": selectedRole.roleName,
                    "sArea": selectedRole.area,
                    "sPartition": selectedRole.partition,
                    "sMd5str": selectedRole.md5str,
                    "sCheckparam": selectedRole.checkparam,
                    "roleSex": selectedRole.roleSex,
                    "roleJob": selectedRole.roleJob,
                    "sAreaName": selectedRole.sAreaName,
                }
                if (selectedRole.platid) {
                    roleData.sPlatId = selectedRole.platid
                }
                roleData.sRoleName = encodeURI(encodeURI(roleData.sRoleName));
                Object.assign(flow_commit_roleInfo, roleData);
            },
            "fail": function (err) {
                console.error(`[miloRoleSelector] fail`,err);
            }
        }
        Milo.customAreaDomId(obj);
    },
    showRolePop :function showRolePop() {
        // 查询是否授权
        ActFun.queryAuth(function (){
            closeDialog();//关闭最近登录区服弹窗
            $('.milo-PIPContainer').hide()
            //$("#milo_area-dialog").show(); // 展示绑定角色弹窗
            TGDialogS(`milo_area-dialog`);
        }, function (){
            closeDialog();//关闭最近登录区服弹窗
            $('.milo-PIPContainer').show()
            //$("#milo_area-dialog").show(); // 展示绑定角色弹窗
            TGDialogS(`milo_area-dialog`);
        })
    },
    submitRoleInfo :function submitRoleInfo() {// 提交绑定大区
        console.log(`[submitRoleInfo] 提交`, flow_commit_roleInfo);
        if (!$('#milo_custom_area').val() || $('#milo_custom_area').val() == 'empty') {
            alert('请选择平台');return false;
        }
        if (!$('#milo_custom_platid').val() || $('#milo_custom_platid').val() == 'empty') {
            alert('请选择系统');return false;
        }
        if (!$('#milo_custom_partition').val() || $('#milo_custom_partition').val() == 'empty') {
            alert('请选择区服');return false;
        }
        if (!$('#milo_custom_role_selector').val() || $('#milo_custom_role_selector').val() == 'empty') {
            alert('请选择角色');return false;
        }
        //todo 调用自动提交绑定，避免转服问题影响，处理flow_commit_roleInfo进行提交字段
        ActFunRed.autoBindRole(flow_commit_roleInfo.sArea, flow_commit_roleInfo.sPlatId, flow_commit_roleInfo.sPartition, flow_commit_roleInfo.sRole,
            CommonReq.showBindInfo, CommonReq.autoBindRoleFail);
    },
    /**
     * 提交绑定（适用于最近登录区服、端内、小程序）
     * @returns {Array}
     * @param sArea
     * @param sPlatId
     * @param sPartition
     * @param sRole
     * @param sucCallBack
     * @param failCallBack
     */
    autoBindRole :function autoBindRole(sArea, sPlatId, sPartition, sRole, sucCallBack, failCallBack) {
        console.log(`[autoBindRole] sArea, sPlatId, sPartition,sRole====>`,sArea, sPlatId, sPartition, sRole)
        var actId = ActTools.isNull(ActConfig.ideNum) ? ActConfig.activityNum : ActConfig.ideNum;//兼容ide和管线
        var autoBindRoleFlow = {
            "actId": actId,
            "token": ActConfig.autoBindRole,
            "loading": true, // 开启loading浮层,默认不开启
            "sData": {
                "sArea": sArea,
                "sPlatId": sPlatId,
                "sPartition": sPartition,
                "sRole": sRole,//当前账号体系需要传入角色id
            },
            "success": function(res){
                console.log(`[autoBindRole] suc`,res);
                var bindRes = res['details']['jData']['bindRes']['data'];//有角色才会返回这个阶段
                //todo 重新赋值全局变量
                ActGlobal.user.isBind = true;
                ActGlobal.user.sGameOpenid = bindRes['Fuin'];
                ActGlobal.user.sArea = bindRes['Farea'];//获取到的真实areaid
                ActGlobal.user.sPartition = bindRes['FPartition'];
                ActGlobal.user.sPlatId = bindRes['FplatId'];
                ActGlobal.user.sRole = bindRes['FroleId'];
                ActGlobal.user.sRoleName = decodeURIComponent(decodeURIComponent(bindRes['FroleName']));
                //处理授权状态
                if ($('.milo-PIPContainer').css('display') !== 'none' && $('.milo_custom_PIPInfo').is(':checked')) {// 确认授权
                    ActFun.setAuth(function (){
                        console.log('[autoBindRole] setPIPInfo-->写入授权成功');
                        sucCallBack(true, bindRes);
                    }, function (){
                        console.log('[autoBindRole] setPIPInfo-->写入授权失败');
                        sucCallBack(true, bindRes);
                    })
                }else{
                    sucCallBack(true, bindRes);
                }
            },
            "fail": function(res){
                console.log(`[autoBindRole] fail`,res);
                if(res.iRet == 101 || res.details.iRet == 101){
                    console.error(`[autoBindRole] 登录态失效~`)
                    ActFun.loginFail(CommonReq.loginFail);
                    failCallBack(res);
                }else{
                    failCallBack(res);
                }
            }
        }
        Milo.emit(autoBindRoleFlow);
    },
    /**
     * 最近登录区服拉取
     * @returns {Array}
     * @param sucCallBack
     * @param failCallBack
     */
    queryRoleList :function queryRoleList(sucCallBack, failCallBack) {
        var queryCallBack = function () {
            var actId = ActTools.isNull(ActConfig.ideNum) ? ActConfig.activityNum : ActConfig.ideNum;//兼容ide和管线
            var queryRoleFlow = {
                "actId": actId,
                "token": ActConfig.queryRoleList,
                "loading": true, // 开启loading浮层,默认不开启
                "sData": {
                    "sArea":ActGlobal.user.sArea,
                    "sPlatId":ActGlobal.user.sPlatId
                },
                "success": function(res){
                    console.log(`[queryRoleList] suc`,res);
                    var recentRoleList = res['details']['jData']['recentRoleList'];
                    sucCallBack(recentRoleList);
                },
                "fail": function(res){
                    console.log(`[queryRoleList] fail`,res);
                    if(res.iRet == 101 || res.details.iRet == 101 ){
                        console.error(`[queryRoleList] 登录态失效~`)
                        ActFun.loginFail(CommonReq.loginFail);
                        failCallBack();
                    }else{
                        failCallBack();
                    }
                }
            }
            Milo.emit(queryRoleFlow);
        }
        //获取当前渠道的列表
        if (ActGlobal.user.sArea == 1) {
            if (ActGlobal.user.sPlatId == 1) {
                ActFunRed.getPartitionAction('wx', 'android', queryCallBack)
            } else{
                ActFunRed.getPartitionAction('wx', 'ios', queryCallBack)
            }
        } else {//PC
            if (ActGlobal.user.sPlatId == 1) {
                ActFunRed.getPartitionAction('qq', 'android', queryCallBack)
            } else{
                ActFunRed.getPartitionAction('qq', 'ios', queryCallBack)
            }
        }
    },
    //拉取区服信息
    queryQfName :function queryQfName(queryCallBack) {
        //获取当前渠道的列表
        if (ActGlobal.user.sArea == 1) {
            if (ActGlobal.user.sPlatId == 1) {
                ActFunRed.getPartitionAction('wx', 'android', queryCallBack)
            } else{
                ActFunRed.getPartitionAction('wx', 'ios', queryCallBack)
            }
        } else {//PC
            if (ActGlobal.user.sPlatId == 1) {
                ActFunRed.getPartitionAction('qq', 'android', queryCallBack)
            } else{
                ActFunRed.getPartitionAction('qq', 'ios', queryCallBack)
            }
        }
    },
    /**
     * 执行方法(获取当前系统所有大区名称列表)
     * @param areaType wx/qq
     * @param platType ios/android
     * @param callBack
     * @returns {Array}
     */
    getPartitionAction :function getPartitionAction(areaType, platType, callBack) {
        if (areaType == "wx") {
            return ActFunRed.WXPartitionInfo(platType, callBack);
        } else if (areaType == "qq") {
            return ActFunRed.QQPartitionInfo(platType, callBack);
        } else {
            return [];
        }
    },
    /**
     * 获取微信区服信息
     * @param type
     * @param callBack
     * @returns {*}
     * @constructor
     */
    WXPartitionInfo :function WXPartitionInfo(type, callBack) {
        loadScript(["//gameact.qq.com/comm-htdocs/js/game_area/op_WX_server_select.js"  + "?_rand=" + Math.random()], function (loaded1) {
            var iosPartition = [];
            var androidPartition = [];
            var repl = "";
            for (var i = 0; i < OPServerSelect.STD_DATA.length; i++) {
                if (OPServerSelect.STD_DATA[i]['sk'] == "android") {
                    var key = OPServerSelect.STD_DATA[i]['v'];
                    if (OPServerSelect.STD_DATA[i]['t'].indexOf("区") != -1) {
                        repl = key + "区";
                    } else {
                        repl = key;
                    }
                    androidPartition[key] = OPServerSelect.STD_DATA[i]['t'].replace(repl, '');
                } else {
                    var key = OPServerSelect.STD_DATA[i]['v'];
                    if (OPServerSelect.STD_DATA[i]['t'].indexOf("区") != -1) {
                        repl = key + "区";
                    } else {
                        repl = key;
                    }
                    iosPartition[key] = OPServerSelect.STD_DATA[i]['t'].replace(repl, '');
                }
            }
            if(ActGlobal.user.sPlatId == 2){//pc
                ActGlobal.user.qf_name = androidPartition.concat(iosPartition);
            }else {
                ActGlobal.user.qf_nameArr.AndArr = androidPartition;
                ActGlobal.user.qf_nameArr.iOSArr = iosPartition;
            }
            callBack();
        });

    },
    /**
     * 获取手Q区服信息
     * @param type
     * @param callBack
     * @returns {*}
     * @constructor
     */
    QQPartitionInfo :function QQPartitionInfo(type, callBack){
        loadScript(["//gameact.qq.com/comm-htdocs/js/game_area/op_SQ_server_select.js" + "?_rand=" + Math.random()], function (loaded1) {
            var iosPartition = [];
            var androidPartition = [];
            var repl = "";
            for (var i = 0; i < OPServerSelect.STD_DATA.length; i++) {
                if (OPServerSelect.STD_DATA[i]['sk'] == "android") {
                    var key = OPServerSelect.STD_DATA[i]['v'];
                    if (OPServerSelect.STD_DATA[i]['t'].indexOf("区") != -1) {
                        repl = key + "区";
                    } else {
                        repl = key;
                    }
                    androidPartition[key] = OPServerSelect.STD_DATA[i]['t'].replace(repl, '');
                } else {
                    var key = OPServerSelect.STD_DATA[i]['v'];
                    if (OPServerSelect.STD_DATA[i]['t'].indexOf("区") != -1) {
                        repl = key + "区";
                    } else {
                        repl = key;
                    }
                    iosPartition[key] = OPServerSelect.STD_DATA[i]['t'].replace(repl, '');
                }
            }
            if(ActGlobal.user.sPlatId == 2){//pc
                ActGlobal.user.qf_name = androidPartition.concat(iosPartition);
            }else {
                ActGlobal.user.qf_nameArr.AndArr = androidPartition;
                ActGlobal.user.qf_nameArr.iOSArr = iosPartition;
            }
            callBack();
        });

    },
    /**
     * 获取所有环境区服信息
     * @param callBack
     * @returns {*}
     * @constructor
     */
    DevPartitionInfo :function DevPartitionInfo(callBack) {
        console.log(`[DevPartitionInfo] 区分正式，测试环境的区服列表拉取`)
        loadScript(["//gameact.qq.com/comm-htdocs/js/game_area/op_server_select.js"  + "?_rand=" + Math.random()], function (loaded1) {
            for (var i = 0; i < OPServerSelect.STD_DATA.length; i++) {
                //console.log(`[DevPartitionInfo] i===》`+i, OPServerSelect.STD_DATA[i]);//[OPServerSelect.STD_DATA[i]['v']]
                if(!ActGlobal.user.qf_nameArr[OPServerSelect.STD_DATA[i]['c']]){
                    ActGlobal.user.qf_nameArr[OPServerSelect.STD_DATA[i]['c']] = [];
                }
                if(!ActGlobal.user.qf_nameArr[OPServerSelect.STD_DATA[i]['c']][0]){
                    ActGlobal.user.qf_nameArr[OPServerSelect.STD_DATA[i]['c']][0] = [];
                }
                ActGlobal.user.qf_nameArr[OPServerSelect.STD_DATA[i]['c']][OPServerSelect.STD_DATA[i]['v']] = OPServerSelect.STD_DATA[i]['t'];
            }
            if (!ActTools.isNull(callBack) && (typeof callBack) == "function") {
                callBack();
            }
        });
    },
    /*
    * 处理默认分享
    * */
    initShare :function () {
        if(ActTools.isMini()){//小程序分享
            console.log(`[initShare] 初始化1次小程序分享`)
            //todo 如果小程序内嵌需要隐藏什么内容，可以在这补充
            $(".btnmy").hide()
            $('#bindBtnTxt').hide()
            ActFun.miniShare(ActConfig.mainUrl);//初始化1次分享
        }else if(!ActTools.isInGame()){//双端处理
            console.log(`[initShare] 初始化1次M端分享`)
            $(".btnmy").show();
            ActFun.callMiloShare(ActConfig.mainUrl);//初始化1次分享
        }else {
            console.log(`[initShare] msdk，绑定退出功能`)
            /*//初始化游戏内配置
            ActFun.useMSDK(ActConfig.msdkPosition);//固定浏览器屏幕方向*/
        }
    },
});
/************************************业务特性逻辑 end************************************************************************/

//加载msdk的相关js
if (ActTools.isMSDK() && typeof connectWebViewJavascriptBridge === "undefined") {
    var uniqueId = 1
    var msdkiOSHandler
    function showWebviewLog(message, data) {
        var log = document.getElementById('log')
        var el = document.createElement('div')
        el.className = 'logLine'
        el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
        if (log && log.children && log.children.length) {
            log.insertBefore(el, log.children[0]);
        } else if (log) {
            log.appendChild(el);
        } else {
            //
        }
    }
    window.onerror = function (err) {
        showWebviewLog('window.onerror: ' + err)
    }
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }
    function isiOS() {
        var ua = window.navigator.userAgent.toLowerCase();
        return /iphone|ipod|ipad/i.test(ua);
    }
    setupWebViewJavascriptBridge(function (bridge) {
        msdkiOSHandler = bridge.callHandler
        bridge.registerHandler('MSDKJSHandler', function (data, responseCallback) {
            showWebviewLog('ObjC called MSDKJSHandler with', data);
            alert(data)
        })
    })
    function msdkCall(data) {
        console.log('msdkCall invoked -- start');
        if (isiOS()) {
            msdkiOSHandler('MSDKCall', data, null)
        } else {
            if (data.indexOf("nativeCallJS") > -1) {
                console.log('msdkCall invoked nativeCallJS : ' + data);
                alert(data)
            } else {
                console.log('msdkCall invoked : ' + data);
                prompt(data)
            }
        }
    }
    window.msdkCall = msdkCall;// 将 msdkCall 函数设置为全局变量
}