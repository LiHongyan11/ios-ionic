// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var DOMAINNAME = "http://23981515.com:7080";
var IMAGESERVER = "http://23981515.com:80";
var exChange = 'false';
var realname = '未登录';
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'ipCookie'])

.run(function($ionicPlatform, $rootScope, $state, $stateParams) {

        $rootScope.$state = $state; //私人定制
        $rootScope.$stateParams = $stateParams; //私人定制
        // try {
        //     var guide = window.localStorage.getItem("guide");
        //     if (guide == null) {
        //         $state.go('tab.dash.courseList');
        //     }
        // } catch (e) {
        //     alert('设备不支持');
        // }
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .value('iosapp', {
        account: '',
        coursePrice: '',
        favorablePrice: '',
        courseName: '',
        result: '',
        newNum: ''
    })
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
        /*cors跨域*/
        $httpProvider.defaults.withCredentials = true;
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //配置路由地址
        $stateProvider

        /*登陆*/
            .state('login', {
                url: "/login",
                views: {
                    'main': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            /*注册*/
            .state('register', {
                url: "/register",
                views: {
                    'main': {
                        templateUrl: 'templates/register.html',
                        controller: 'RegisterCtrl'
                    }
                }
            })

        /*引导页*/
        .state('guide', {
            url: "/guide",
            views: {
                'main': {
                    templateUrl: 'templates/guide.html',
                    controller: 'GuideCtrl'
                }
            }
        })

        /*tab页面*/
        .state('tab', {
            url: "/tab",
            abstract: true,
            views: {
                'main': {
                    templateUrl: "templates/tabs.html"
                }
            }
        })

        /*首页*/
        .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            /*找课*/
            .state('tab.findlessons', {
                url: '/findlessons',
                views: {
                    'tab-findlessons': {
                        templateUrl: 'templates/tab-findlessons.html',
                        controller: 'FindLessonsCtrl'
                    }
                }
            })
            /*结算*/
            .state('balance', {
                url: '/balance',
                views: {
                    'main': {
                        templateUrl: 'templates/tab-balance.html',
                        controller: 'BalanceCtrl'
                    }
                }
            })
            /*我的*/
            .state('tab.myaccount', {
                url: '/myaccount',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-myaccount.html',
                        controller: 'MyAccountCtrl'
                    }
                }
            })
            /*播放页*/
            .state('tab.video', {
                url: '/video',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-video.html',
                        controller: 'VideoCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                        }
                    }
                }
            })
            /*查询结果*/
            .state('result', {
                url: '/result',
                views: {
                    'main': {
                        templateUrl: 'templates/tab-result.html',
                        controller: 'ResultCtrl'
                    }
                }
            })
            /*注册协议*/
            .state('protocol', {
                url: '/protocol',
                views: {
                    'main': {
                        templateUrl: 'templates/protocol.html',
                        controller: 'ProtocolCtrl'
                    }
                }
            })
            /*验证手机*/
            /*.state('checkPhone', {
                url: '/checkPhone',
                views: {
                    'main': {
                        templateUrl: 'templates/checkPhone.html',
                        controller: 'CheckPhoneCtrl'
                    }
                }
            })*/
            /*注册成功提示*/
            .state('registerSuccess', {
                url: '/registerSuccess',
                views: {
                    'main': {
                        templateUrl: 'templates/registerSuccess.html',
                        controller: 'RegisterCtrl'
                    }
                }
            })
            /*订单信息*/
            .state('orderInfo', {
                url: '/orderInfo',
                views: {
                    'main': {
                        templateUrl: 'templates/orderInfo.html',
                        controller: 'OrderInfoCtrl'
                    }
                }
            })
            /*我的课程*/
            .state('tab.myClass', {
                url: '/myClass',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-myClass.html',
                        controller: 'MyClassCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                          }
                    }
                }
            })
            /*我的课程列表*/
            .state('tab.myClass.myClassList', {
                url: '/myClassList',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-myClass.html',
                        controller: 'MyClassCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                          }
                    },
                    'myClass-myClassList': {
                        templateUrl: 'templates/tab-myClass-myClassList.html',
                        controller: 'MyClassListCtrl'
                    }
                }
            })
            /*我的过期课程列表*/
            .state('tab.myClass.myOverClass', {
                url: '/myOverClass',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-myClass.html',
                        controller: 'MyClassCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                          }
                    },
                    'myClass-myClassList': {
                        templateUrl: 'templates/tab-myClass-myOverClass.html',
                        controller: 'MyOverClassCtrl'
                    }
                }
            })
            /*我的订单*/
            .state('tab.myOrder', {
                url: '/myOrder',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-myOrder.html',
                        controller: 'MyOrderCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                        }
                    }
                }
            })
            /*我的已支付订单*/
            .state('tab.myOrder.payOrder', {
                url: '/payOrder',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-myOrder.html',
                        controller: 'MyOrderCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                        }
                    },
                    'myOrder-myOrderList': {
                        templateUrl: 'templates/tab-myOrder-payOrder.html',
                        controller: 'PayOrderCtrl'
                    }
                }
            })
            /*我的未支付订单*/
            .state('tab.myOrder.notPay', {
                url: '/notPay',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-myOrder.html',
                        controller: 'MyOrderCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                        }
                    },
                    'myOrder-myOrderList': {
                        templateUrl: 'templates/tab-myOrder-notPay.html',
                        controller: 'NotPayCtrl'
                    }
                }
            })
            /*留言反馈*/
            .state('board', {
                url: '/board',
                views: {
                    'main': {
                        templateUrl: 'templates/tab-board.html',
                        controller: 'BoardCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                        }
                    }
                }
            })
            /*修改信息*/
            .state('changeInfo', {
                url: '/changeInfo',
                views: {
                    'main': {
                        templateUrl: 'templates/tab-changeInfo.html',
                        controller: 'ChangeInfoCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                        }
                    }
                }
            })

        /*消息中心*/
        .state('tab.mesCent', {
                url: '/mesCent',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-mesCent.html',
                        controller: 'MesCenterCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                        }
                    },
                    'tab-dash': {
                        templateUrl: 'templates/tab-mesCent.html',
                        controller: 'MesCenterCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                        }
                    },
                    'tab-findlessons': {
                        templateUrl: 'templates/tab-mesCent.html',
                        controller: 'MesCenterCtrl',
                        resolve: {
                            //loggedin: checkLoggedin//验证登陆状态
                        }
                    }
                }
            })
            /*已读消息*/
            .state('tab.mesCent.isRead', {
                url: '/isRead',
                views: {
                    'mesCent-ReadList': {
                        templateUrl: 'templates/tab-mesCent-isRead.html',
                        controller: 'IsReadCtrl'
                    }
                }
            })
            /*未读消息*/
            .state('tab.mesCent.notRead', {
                url: '/notRead',
                views: {
                    'mesCent-ReadList': {
                        templateUrl: 'templates/tab-mesCent-notRead.html',
                        controller: 'NotReadCtrl'
                    }
                }
            })
            /*已读消息内容*/
            .state('tab.mesCtn1', {
                url: '/mesCtn1/:id',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-message-ctn1.html',
                        controller: 'MessageCtn1Ctrl'
                    }
                }
            })
            /*未读消息内容*/
            .state('tab.mesCtn2', {
                url: '/mesCtn2/:id',
                views: {
                    'tab-myaccount': {
                        templateUrl: 'templates/tab-message-ctn2.html',
                        controller: 'MessageCtn2Ctrl'
                    }
                }
            });

        //默认路由跳转地址
        $urlRouterProvider.otherwise('/tab/dash');

    })
    .config(function($httpProvider) {

        $httpProvider.defaults.transformRequest = function(obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        };

        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        //判断是否已登陆账户
          /*var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope, $cookieStore) {
            // Initialize a new promise
            var deferred = $q.defer();
            var token = '';
            if ($cookieStore.get('tokenState')) {
                token = $cookieStore.get('tokenState');
            }

            $http({
                method: 'GET',
                url: apiUrl + '/api/Common/Member/Identity',
                headers: { "Authorization": "Bearer " + token }
            }).
            success(function (data, status, headers, config) {
                $timeout(deferred.resolve, 0);
            }).
            error(function (data, status, headers, config) {
                $timeout(function () { deferred.reject(); }, 0);
                $location.url('/login');
            });

            return deferred.promise;
          };

          $httpProvider.responseInterceptors.push(function ($q, $location) {
            return function(promise) {
              return promise.then(
                // Success: just return the response
                function(response) {
                    return response;
                },
                // Error: check the error status to get only the 401
                function(response) {
                    if (response.status === 401)
                        $location.url('/login');
                    return $q.reject(response);
                }
              );
            };
          });*/
    });
