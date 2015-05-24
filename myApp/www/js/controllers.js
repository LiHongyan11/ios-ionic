angular.module('starter.controllers', [])
    /*登陆controller*/
    .controller('LoginCtrl', function($scope, $http, $location, ipCookie, $timeout) {
        $scope.login = function(userData) {
            $http({
                    method: 'get',
                    url: DOMAINNAME + "/login",
                    params: {
                        account: userData.username,
                        password: userData.password,
                    }
                })
                .success(function(data, status, headers, config) {
                    if (data.status == 'success') {
                        exChange = 'true';
                        realname = data.userData.realName;
                        $location.url('/tab/dash/courseList');
                    }
                })
                .error(function() {
                    alert(data.message);
                    $location.url('/login');
                })
        }

    })
    /*注册controller*/
    .controller('RegisterCtrl', function($scope, $http, $location, iosapp) {

        $scope.account = iosapp.account;
        $scope.userData = {
            sex: "0"
        }
        $scope.register = function(userData) {
            $http({
                    method: 'post',
                    url: DOMAINNAME + "/register",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        account: userData.username,
                        password: userData.password1,
                        realName: userData.realname,
                        sex: userData.sex,
                        birthday: userData.birthday,
                        phoneNumber: userData.phone,
                        email: userData.email,
                        qqNumber: userData.QQ
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }

                })
                .success(function(data) {

                    if (data.status == 'success') {
                        $location.url('/registerSuccess');
                        iosapp.account = data.account;
                    } else {
                        alert(data.message);
                    }
                })
                .error(function() {
                    $location.url('/register');
                })
        }
    })
    /*首页controller*/
    .controller('DashCtrl', function($scope, $http, $state, $location, $ionicSlideBoxDelegate,instance,datas) {
        if(window.localStorage.getItem('kowns') == 'true'){
                $scope.kowns = true;
        }
        $http({
                url:DOMAINNAME + '/user/getAllMessage'
            })
            .success(function(data){
                if(data.status == 'success'){
                    $scope.num = data.unMessageData.length;
                        //alert( $scope.num);
                    $scope.mes = function(){
                        datas.messageData = data.messageData;
                        datas.unMessageData = data.unMessageData;
                        
                        $state.go('tab.mesCent.notRead');
                    }
                }
                else{
                    //alert(data.message);
                }
            })
        /*$scope.mes = function(){
            $http({
                url:DOMAINNAME + '/user/getAllMessage'
            })
            .success(function(data){
                if(data.status == 'success'){
                    
                }
                else{
                    alert(data.message);
                }
            })
        };*/
        /*$http({
                url: DOMAINNAME + "/getCourseTimeTable"
            })
            .success(function(data) {
                $scope.times = [];
                if (data.status == 'success') {
                    for (key in data.timeTable) {
                        $scope.times.push(key);
                    }
                    $scope.toggleClass = function(){
                        var next = this.$$nextSibling;
                        var prev = this.$$prevSibling;
                        while(next!=undefined){
                            next.isSelected = false;
                            next.isActive = false;
                            next = next.$$nextSibling;
                        }
                        while(prev!=undefined){
                            prev.isSelected = false;
                            prev.isActive = false;
                            prev = prev.$$prevSibling;
                        }

                        this.isSelected = true;
                        this.isActive = true;
                    };

                }
            });*/
        $http({
                method: 'get',
                url: "http://23981515.com:7080/getCourseTimeTable"
            })
            .success(function(data) {
                $scope.dataTables=[];
                $scope.times = [];
                if (data.status == 'success') {
                    $ionicSlideBoxDelegate.update();
                    for (key in data.timeTable) {
                        $scope.times.push(key);
                        // for (var i = 0; i < data.timeTable[key].length; i++) {
                        //     $scope.dataTables.push(data.timeTable[key][i]);
                        //     console.log( $scope.dataTables);
                        // }
                        $scope.dataTables.push(data.timeTable[key]);
                    }
                }
            });

        $scope.kown = function(){
            this.checked = true;
            if(this.checked){
                $scope.kowns = true;
            }     
        };
        $scope.never = function(){
            window.localStorage.setItem('kowns','true');
            
        };
        $scope.play = function(curriculumAlias){
            $http({
                method:'post',
                url:DOMAINNAME + '/user/videoPlay',
                data:{
                    alias:curriculumAlias
                }
            })
            .success(function(data){
                if(data.status == 'success'){
                    instance.live = data.live;
                    instance.curriculumName = data.curriculumName;
                    instance.curriculumAlias = data.curriculumAlias;
                    $state.go('tab.video');
                }
                else{
                    alert(data.message);
                }
            })
        }

    })
    /*找课controller*/
    .controller('FindLessonsCtrl', function($scope, $http, $location, iosapp, $state,datas) {
        $http({
                url:DOMAINNAME + '/user/getAllMessage'
            })
            .success(function(data){
                if(data.status == 'success'){
                    $scope.num = data.unMessageData.length;
                        //alert( $scope.num);
                    $scope.mes = function(){
                        datas.messageData = data.messageData;
                        datas.unMessageData = data.unMessageData;
                        
                        $state.go('tab.mesCent.notRead');
                    }
                }
                else{
                    //alert(data.message);
                }
            })
        $scope.selected = [];
        $scope.tmp = [];
        $scope.result = iosapp.result;
        $http({
                method: 'get',
                url: DOMAINNAME + '/getCatalogAndTag'
            })
            .success(function(data) {
                $scope.data = data;
            })
            .error(function() {});

        $scope.find = function(selected) {
            for (var i = 0; i < $scope.selected.length; i++) {

                if ($scope.selected[i] == undefined) {
                    continue;
                } else {
                    $scope.tmp.push($scope.selected[i]);

                }
            }

            var newNum = $scope.tmp.join(';');
            iosapp.newNum = newNum;
            //$scope.page = iosapp.page;
            $http({
                    method: 'get',
                    url: DOMAINNAME + '/curriculumSearch',
                    params: {
                        tags: newNum + ';'
                    }
                })
                .success(function(data) {
                    $state.go("result");
                    iosapp.result = data.result;
                })
                .error(function() {

                })

        }
    })
    /*结算controller*/
     .controller('BalanceCtrl', function($scope, $http, iosapp, $state,datas) {
        $scope.objs = [];
        $scope.row = {alias:'',belong:''};
        
        $http({
               method: 'get',
               url: DOMAINNAME + '/user/getShoppingCartPage'
        })
        .success(function(data) {
            if(data.status == 'success'){
                $scope.data = data.shopping;
                $scope.total = 0;
                for (var i=0; i < data.shopping.length; i++) {
                    $scope.total +=  data.shopping[i].appPrice;
                }
                for(var j=0;j<data.shopping.length;j++){
                    $scope.row.alias = data.shopping[j].alias;
                    $scope.row.belong = data.shopping[j].belong;
                    $scope.objs.push(JSON.stringify($scope.row));
                }
            }
            else{
                alert(data.message);
            }
        })
        .error(function() {

        });
        $scope.clear = function() {
            $http({
                    method: 'post',
                    url: DOMAINNAME + '/user/cleanShoppingCart'
                })
                .success(function(data) {
                    $scope.data = null;
                    $scope.total = 0;                      
                })
                .error(function() {

                })
        };
        $scope.balance = function() {
            //alert($scope.objJason);
            $http({    
                 method: 'post',
                 url: DOMAINNAME + '/user/commitOrder',
                 data:{
                    goodModels:'['+$scope.objs+']'
                 }
            })
            .success(function(data) {
                 if (data.status == 'success') {
                    $scope.data = null;
                    $scope.total = 0;
                    $http({
                        method:'post',
                        url:DOMAINNAME + '/user/getPaymentPages',
                        params:{
                            orderId:data.orderId
                        }
                    })
                    .success(function(data){
                        
                        if(data.status == 'success'){;
                            //alert($scope.data.orderId);
                            datas.orderInfo = data;
                            $state.go('orderInfo');
                        }
                        else{
                            alert(data.message);
                        }
                    })

                } else {
                    alert(data.message);
                }           
            })
            .error(function() {})
        };        

    })
    /*订单信息*/
    .controller('OrderInfoCtrl',function($scope,$http,datas){
        $scope.infos = datas.orderInfo;
        /*$scope.showInfo = function() {//将返回数据解析为html
            return $sce.trustAsHtml($scope.infos);
        };*/
        $scope.pay = function(){
            $http({
                method:'get',
                url:DOMAINNAME + '/user/goPayment',
                params:{
                   orderId: $scope.infos.orderId
                }
            })
            .success(function(data){

            })
        }
    })
    /*我的controller*/
    .controller('MyAccountCtrl', function($scope, $ionicSlideBoxDelegate,$http,$state,$location,$ionicPopup,$ionicSlideBoxDelegate,datas) {
        $scope.state = '登录';
        $scope.real = '未登录';
        $http({
                url:DOMAINNAME + '/user/getAllMessage'
            })
            .success(function(data){
                if(data.status == 'success'){
                    $scope.num = data.unMessageData.length;
                    $scope.mes = function(){
                        datas.messageData = data.messageData;
                        datas.unMessageData = data.unMessageData;
                        
                        $state.go('tab.mesCent.notRead');
                    }
                }
                else{
                    //alert(data.message);
                }
            })
        $http({
            url:DOMAINNAME + '/getAdvertisement'
        })
        .success(function(data){
            $ionicSlideBoxDelegate.update();
            $scope.data = data.image;
        })
        $scope.myOrder = function(){
            $http({
                url:DOMAINNAME + '/user/getUserOrderForm'
            })
            .success(function(data){
                if(data.status == 'success'){
                    datas.payOrderForms = data.payOrderForms;
                    datas.unPayOrderForms = data.unPayOrderForms;
                    $state.go('tab.myOrder.notPay');
                }
                else if(data.message == '未登录'){
                       var confirmPopup = $ionicPopup.confirm({
                         title: '提示',
                         template: '你尚未登录，是否现在去登录?',
                         scope: $scope,
                         buttons:[
                            {text:'取消'},
                            {
                                text:'登录',
                                type: 'button-positive',
                                onTap:function(){
                                   $state.go('login'); 
                                }
                            }
                         ]
                       });
                }
                else{
                    alert(data.message);
                }
            })
        };
        $scope.changeInfo = function(){
            $http({
                url:DOMAINNAME + '/user/modifyUserMessage'
            })
            .success(function(data){
                if(data.status == undefined){
                    datas.ctn = data;
                    $state.go('changeInfo');
                }
                else if(data.message == '未登录'){
                       var confirmPopup = $ionicPopup.confirm({
                         title: '提示',
                         template: '你尚未登录，是否现在去登录?',
                         scope: $scope,
                         buttons:[
                            {text:'取消'},
                            {
                                text:'登录',
                                type: 'button-positive',
                                onTap:function(){
                                   $state.go('login'); 
                                }
                            }
                         ]
                       });
                }
                else{
                    alert(data.message);
                }
            })
        };
        $scope.myClass = function(){
            $http({
                url:DOMAINNAME + '/user/getUserAllCurriculum'
            })
            .success(function(data){
                if(data.status == 'success'){
                    datas.noOverdueData = data.noOverdueData;
                    datas.overdueData = data.overdueData;
                    $state.go('tab.myClass.myClassList');
                }
                else if(data.message == '未登录'){
                       var confirmPopup = $ionicPopup.confirm({
                         title: '提示',
                         template: '你尚未登录，是否现在去登录?',
                         scope: $scope,
                         buttons:[
                            {text:'取消'},
                            {
                                text:'登录',
                                type: 'button-positive',
                                onTap:function(){
                                   $state.go('login'); 
                                }
                            }
                         ]
                       });
                }
                else{
                    alert(data.message);
                }
            })
        };
        $scope.message = function(){
            $http({
                url:DOMAINNAME + '/user/getAllMessage'
            })
            .success(function(data){
                if(data.status == 'success'){
                    datas.messageData = data.messageData;
                    datas.unMessageData = data.unMessageData;
                    $state.go('tab.mesCent.notRead');
                }
                else if(data.message == '未登录'){
                       var confirmPopup = $ionicPopup.confirm({
                         title: '提示',
                         template: '你尚未登录，是否现在去登录?',
                         scope: $scope,
                         buttons:[
                            {text:'取消'},
                            {
                                text:'登录',
                                type: 'button-positive',
                                onTap:function(){
                                   $state.go('login'); 
                                }
                            }
                         ]
                       });
                }
                else{
                    alert(data.message);
                }
            })
        };
        $scope.mes = function(){
            $http({
                url:DOMAINNAME + '/user/getAllMessage'
            })
            .success(function(data){
                if(data.status == 'success'){
                    $state.go('tab.mesCent.notRead');
                }
                else{
                    alert(data.message);
                }
            })
        };
        /*$scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        };*/
        if(exChange == 'true'){
            $scope.state = '注销登录';
            $scope.real = realname;
            $scope.cancel = function(){
                $http({
                    url:DOMAINNAME + '/user/loginOut'
                })
                .success(function(data){
                    if(data.status == 'success'){
                        $scope.state = '登录';
                        $scope.real = '未登录';
                        alert('注销成功');
                        exChange = 'false';
                    }
                    else{
                        alert(data.message);
                    }
                })
            }
        }
        else{
            $scope.state = '登录';
            $scope.real = '未登录';
        }
    })
    /*播放页*/
    .controller('VideoCtrl', function($scope, $http,instance) {
        $scope.live = instance.live;
        $scope.curriculumName = instance.curriculumName;
        $scope.curriculumAlias = instance.curriculumAlias;
        $scope.show = false;
        
        if($scope.live.flag == true){
            $scope.route = $scope.live.routes[0].value;
            jwplayer("myElement").setup({
                "flashplayer":"/jwplayer/player.swf",
                "height":"250px",
                'file': $scope.route,
                'width': '100%'
            });
            $scope.show = true;
        }     
        $scope.askQuestion = function(askCtn) {
            if($scope.live.flag == false){
                alert('课程未到播放时间，不能提问');
                return false;
            }
            else{
                $http({
                    method:'post',
                    url: DOMAINNAME + '/user/askQuestion',
                    data:{
                        tAlias:$scope.live.teacher.alias,
                        question:askCtn.ctn,
                        curAlias:$scope.curriculumAlias
                    }
                })
                .success(function(data) {
                    if(data.status == 'success'){
                        askCtn.ctn = '';
                        alert('提问成功');
                    }
                    else{
                        alert(data.message);
                    }
                })
                .error(function() {})
            }
            
        }
    })
    /*查询结果*/
    /*.controller('ResultCtrl', function($scope) {
    })*/
    /*注册协议*/
    .controller('ProtocolCtrl', function($scope,$state) {
        $scope.next=function(){
            $state.go('register');
        }
    })
    /*验证手机*/
    /*.controller('checkPhoneCtrl', function($scope) {
    })*/
    /*我的课程*/
    .controller('MyClassCtrl', function($scope,$state) {
        $scope.onSwipeLeft=function(){
            $state.go('tab.myClass.myClassList');
        }
        $scope.onSwipeRight=function(){
            $state.go('tab.myClass.myOverClass');
        }
    })
    /*我的订单*/
    .controller('MyOrderCtrl', function($scope, $http,$state) {
        $scope.onSwipeLeft=function(){
            $state.go('tab.myOrder.notPay');
        }
        $scope.onSwipeRight=function(){
            $state.go('tab.myOrder.payOrder');
        }
    })
    /*我的已支付订单*/
    .controller('PayOrderCtrl', function($scope,$http,datas) {
        $scope.Pays = datas.payOrderForms;
    })
    /*我的未支付订单*/
    .controller('NotPayCtrl', function($scope,$http,datas) {
        $scope.unPays = datas.unPayOrderForms;
    })
    /*我的课程列表*/
    .controller('MyClassListCtrl', function($scope,$http,instance,$state,datas) {
        $scope.noOver = datas.noOverdueData;
        $scope.lookCourse = function(alias){
            $http({
                method:'post',
                url:DOMAINNAME + '/user/videoPlay',
                data:{
                    alias:alias
                }
            })
            .success(function(data){
                if(data.status == 'success'){
                    instance.live = data.live;
                    instance.curriculumName = data.curriculumName;
                    instance.curriculumAlias = data.curriculumAlias;
                    $state.go('tab.video');
                }
                else{
                    alert(data.message);
                }
            })
        };
        $scope.goOn = function(alias){
            $http({
                method:'get',
                url:DOMAINNAME + '/user/addGoodToShoppingCart',
                params:{
                    alias:alias
                }
            })
            .success(function(data){
                if(data.status == 'success'){
                    alert('加入购物车成功，请去个人中心结算');
                }
                else{
                    alert(data.message);
                }
            })
        }

    })
    /*我的过期课程列表*/
    .controller('MyOverClassCtrl', function($scope,$http,datas) {
        $scope.over = datas.overdueData;
        $scope.buy = function(alias){
            $http({
                method:'get',
                url:DOMAINNAME + '/user/addGoodToShoppingCart',
                params:{
                    alias:alias
                }
            })
            .success(function(data){
                if(data.status == 'success'){
                    alert('加入购物车成功，请去个人中心结算');
                }
                else{
                    alert(data.message);
                }
            })
        };
        $scope.move = function(alias,index){
            $http({
                method:'post',
                url:DOMAINNAME + '/user/removeEndCur',
                data:{
                    alias:alias
                }
            })
            .success(function(data){
                if(data.status == 'success'){
                    $scope.over.splice(index,1);
                    alert('移除课程成功');
                }
                else{
                    alert(data.message);
                }
            })
        }
    })
    /*引导页*/
    .controller('GuideCtrl', function($scope, $ionicSlideBoxDelegate, $state) {
        window.localStorage.setItem("guide", "guide_hide");
        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.enjoy = function() {
            $state.go('tab.dash.courseList');
        }
    })

/*留言反馈*/
.controller('BoardCtrl', function($scope, $ionicPopup, $timeout, $http, $location,$state) {
        $scope.showPopup = function() {
            $http({
                url:DOMAINNAME + '/user/modifyUserMessage'
            })
            .success(function(data){
                if(data.status == undefined){
                    $scope.message = {};

                    // An elaborate, custom popup
                    var myPopup = $ionicPopup.prompt({
                        template: '<input type="text" ng-model="message.text">',
                        title: '请留言',
                        scope: $scope,
                        buttons: [{
                            text: '取消'
                        }, {
                            text: '<b>保存</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                if (!$scope.message.text) {
                                    //don't allow the user to close unless he enters wifi password
                                    e.preventDefault();
                                } else {
                                    return $scope.message.text;
                                }
                            }
                        }, ]

                    });
                    myPopup.then(function(res) {
                        if(res != null){
                            $http({
                                method: 'post',
                                url: DOMAINNAME + "/user/addLeaveMessage",
                                data: {
                                    message: res
                                }
                            })
                            .success(function(data) {
                                if (data.status == 'success') {
                                    alert('留言成功');
                                } 
                                else {
                                    alert(data.message);
                                }
                            })
                            .error(function() {});
                        }
                    });
                } else if(data.message == '未登录'){
                       var confirmPopup = $ionicPopup.confirm({
                         title: '提示',
                         template: '你尚未登录，是否现在去登录?',
                         scope: $scope,
                         buttons:[
                            {text:'取消'},
                            {
                                text:'登录',
                                type: 'button-positive',
                                onTap:function(){
                                   $state.go('login'); 
                                }
                            }
                         ]
                       });
                }
                else{
                    alert(data.message);
                }
            })
            

        };



    })
    /*修改信息*/
    .controller('ChangeInfoCtrl', function($scope, $http,datas) {
        $scope.userData = datas.ctn;
        $scope.change = function(userData){
            $scope.updateMyText = function(date) {  
                $scope.myText = 'Selected';  
            };
            //alert(userData.birthday);
            $http({
                method:'post',
                url: DOMAINNAME + '/user/modifyUserMessage',
                data:{
                    account:userData.account,
                    realName:userData.realName,
                    sex:userData.sex,
                    birthday:userData.birthday,
                    email:userData.email,
                    phoneNumber:userData.phoneNumber,
                    qq:userData.qqNumber
                }
            })
            .success(function(data){
                if(data.status == 'success'){
                    alert('修改成功');
                }
            })
            .error(function(){
                alert();
            })
        }
    })
    /*消息中心*/
    .controller('MesCenterCtrl', function($scope,$ionicNavBarDelegate,$state) {
        $scope.goBack=function(){
            $ionicNavBarDelegate.back();
        }
        $scope.onSwipeLeft=function(){
            $state.go('tab.mesCent.notRead');
        }
        $scope.onSwipeRight=function(){
            $state.go('tab.mesCent.isRead');
        }
    })
    /*已读消息*/
    .controller('IsReadCtrl', function($scope,$http,datas,$ionicPopup) {
        $http({
                url:DOMAINNAME + '/user/getAllMessage'
        })
        .success(function(data){
            $scope.messages = data.messageData;
            $scope.findIndex = function(index){
                datas.mesIndex2 = index;
            };
            $scope.delete = function(id,index){
                var confirmPopup = $ionicPopup.confirm({
                         title: '提示',
                         template: '是否要删除消息？',
                         scope: $scope,
                         buttons:[
                            {text:'否'},
                            {
                                text:'是',
                                //type: 'button-positive',
                                onTap:function(){
                                    $http({
                                        method:'post',
                                        url:DOMAINNAME + '/user/deleteMessage',
                                        data:{
                                            id:id
                                        }
                                    })
                                    .success(function(data){
                                        if(data.status == 'success'){
                                            $scope.messages.splice(index,1);
                                        }
                                        else{
                                            alert(data.message);
                                        }
                                    })
                                }
                            }
                         ]
                    });
                
            }
        })
        
    })
    /*未读消息*/
    .controller('NotReadCtrl', function($scope,$http,datas) {
        $scope.messages = datas.unMessageData;
        datas.num = datas.unMessageData.length;
        $scope.findIndex = function(index){
            datas.mesIndex1 = index;
            $http({
                method:'post',
                url:DOMAINNAME + '/user/updateStatus',
                data:{
                    id:datas.unMessageData[index].id
                }
            })
            .success(function(data){
                if(data.status == 'success'){
                    $scope.messages.splice(index,1);
                    datas.flagIndex = index;
                }
            })
        }
    })
    /*已读消息内容*/
    .controller('MessageCtn1Ctrl', function($scope,$http,datas,$stateParams) {
        $scope.message = datas.messageData[datas.mesIndex2];
    })
    /*未读消息内容*/
    .controller('MessageCtn2Ctrl', function($scope,$http,datas,$stateParams) {
        $scope.message = datas.unMessageData[datas.mesIndex1];
    })
    /*查询结果*/
    .controller('ResultCtrl', function($scope, $http, iosapp,$state,$ionicPopup) {

        $scope.result = iosapp.result;
        $scope.page = 1;
        $scope.doRefresh = function() {
            $http({
                    method: 'get',
                    url: DOMAINNAME + '/curriculumSearch',
                    params: {
                        tags: iosapp.newNum + ';',
                        pageNumber: ++$scope.page
                    }
                })
                .success(function(data) {
                    if(data.result==null) return;
                    for (var i = 0; i < data.result.length; i++) {
                        $scope.result.unshift(data.result[i]);
                    }
                    
                })
                .error(function() {

                })
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };
        $scope.addShopCart = function(alias){
            $http({
                method:'get',
                url:DOMAINNAME + '/user/addGoodToShoppingCart',
                params:{
                    alias:alias
                }
            })
            .success(function(data){
                if(data.status == 'success'){
                    var confirmPopup = $ionicPopup.confirm({
                         title: '提示',
                         template: '加入购物车成功，是否现在去结算?',
                         scope: $scope,
                         buttons:[
                            {text:'取消'},
                            {
                                text:'结算',
                                type: 'button-positive',
                                onTap:function(){
                                   $state.go('balance'); 
                                }
                            }
                        ]
                    });
                }
                else{
                    alert(data.message);
                }
            })
        }

    })
    .controller('HomeTabCtrl', function($scope,$state) {
        $scope.onTabSelected = function() {
            $state.go('tab.dash');
        }
    })
     .controller('LessonsTabCtrl', function($scope,$state) {
        $scope.onTabSelected = function() {
            $state.go('tab.findlessons');
        }
    })
     .controller('AccountTabCtrl', function($scope,$state) {
        $scope.onTabSelected = function() {
            $state.go('tab.myaccount');
        }
    });



