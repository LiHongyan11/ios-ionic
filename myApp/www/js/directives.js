angular.module('starter.directives',[]).
directive("accordion", function () {
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        template:"<div class='list order-list' ng-transclude></div>",
        controller:function(){
        	var expanders=[];
        	this.gotOpened=function(selectedExpander){
        		angular.forEach(expanders,function(e){
        			if (selectedExpander!=e) {
        				e.showText=false;
        			}
        		});
        	}
        	this.addExpander=function(e){
        		expanders.push(e);
        	}
            this.getObject=function(e){
                return $scope.unPays;
            }
        }
    }
}).
directive("expander", function () {
    return {
        require: "^?accordion",
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {
        	orderNumber:"=aa",
        	orderTime:"=bb"
        },
        template:"<div>"+
                "<div class='lists' ng-click='toggleText()'>"+
				"<div class='item item-icon-left  ion-chevron-down'>"+
                "<p class='orderNumber'>{{orderNumber}}</p>"+
                "<p class='orderTime'>{{orderTime}}</p>"+
                "<div class='btns'>"+
                "<a class='cancel' ng-click='cancel($event,$parent.$index)'>删除订单</a>"+
                "</div>"+
                "</div>"+	
                "</div>"+
                "<div ng-transclude ng-show='showText'>"+
                "</div>"+
                "</div>",
        link: function (scope,element,attris,accordionController) {
            scope.showText=false;
            accordionController.addExpander(scope);
            scope.toggleText=function(){
            	scope.showText=!scope.showText;
            	accordionController.gotOpened(scope);
            }
            scope.pays=accordion1Controller.getObject();
        },
        controller:function($scope,$http){
            $scope.cancel=function(e,index){
                e.stopPropagation();
                $http({
                    method:'post',
                    url:DOMAINNAME + '/user/userDeleteOrCancelOrder',
                    params:{
                        orderID:$scope.orderNumber
                    }
                })
                .success(function(data){
                    if(data.status == 'success'){
                       $scope.pays.splice(index,1);
                    }
                })  
            }

        }
    }
})
.directive("accordion1", function () {
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        template:"<div class='list order-list' ng-transclude></div>",
        controller:function($scope){
            var expanders=[];
            this.gotOpened=function(selectedExpander){
                angular.forEach(expanders,function(e){
                    if (selectedExpander!=e) {
                        e.showText=false;
                    }
                });
            }
            this.addExpander=function(e){
                expanders.push(e);
            }
            this.getObject=function(e){
                return $scope.unPays;
            }

        }
    }
}).
directive("expander1", function () {
    return {
        require: "^?accordion1",
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {
            orderNumber:"=aa",
            orderTime:"=bb",
            allPrice:"=cc"
        },
        template:"<div>"+
                "<div class='lists' ng-click='toggleText()'>"+
                "<div class='item item-icon-left  ion-chevron-down'>"+
                "<p class='orderNumber'>{{orderNumber}}</p>"+
                "<p class='orderTime'>{{orderTime}}</p>"+
                "<p class='allPrice'>{{allPrice}}</p>"+
                "<div class='btns'>"+
                "<a class='cancel' ng-click='cancel($event,$parent.$index)'>取消订单</a>"+
                "<a class='allPrice' ng-click='buy($event)'>购买</a>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "<div ng-transclude ng-show='showText'>"+
                "</div>"+
                "</div>",
        link: function (scope,element,attris,accordion1Controller) {
            scope.showText=false;
            accordion1Controller.addExpander(scope);
            scope.toggleText=function(){
                scope.showText=!scope.showText;
                accordion1Controller.gotOpened(scope);
            };
            scope.unPays=accordion1Controller.getObject();
        },
        controller:function($scope,$http,datas,$state){
            $scope.cancel=function(e,index){
                e.stopPropagation();
                $http({
                    method:'post',
                    url:DOMAINNAME + '/user/userDeleteOrCancelOrder',
                    params:{
                        orderID:$scope.orderNumber
                    }
                })
                .success(function(data){
                    if(data.status == 'success'){
                       $scope.unPays.splice(index,1);
                    }
                    else{
                        alert(data.message);
                    }
                })  
            };
            $scope.buy = function(e){
                e.stopPropagation();
                $http({
                        method:'post',
                        url:DOMAINNAME + '/user/getPaymentPages',
                        params:{
                            orderId:$scope.orderNumber
                        }
                    })
                    .success(function(data){
                        datas.orderInfo = data;
                        //alert(datas.orderInfo);
                        $state.go('orderInfo');
                    })
            }

        }
    }
})
.directive('datePicker',function(){
    return{
        // restrict:'AE',
        // require:'?ngModel', 
        // link:function(scope,element,attris){
        //     //$('#picker_1').datePicker({followOffset : [0, 24]});
        //     element.datePicker({
        //        inline: true,
        //        followOffset : [0, 25],
        //        dateFormat: 'dd-mm-yy',
        //        onSelect: function(dateText) {
        //            var modelPath = $(this).attr('ng-model');
        //            putObject(modelPath, scope, dateText);
        //            scope.$apply();
        //        }
        //    });
        // }
        //强制AngularJS把指令限定为只支持属性  
            restrict: 'A',  
            //总是和ng-model配合使用  
            require:'?ngModel',  
            scope: {  
                //此方法需要与预先定义好，然后传递给视图控制器中的指令  
                select: '&' //把我们所引用的select函数绑定到右边的作用域中  
            },  
            link: function(scope, element, attrs, ngModel) {  
                if(!ngModel) return;  
                  
                var optionsObj = {};  
                  
                optionsObj.dataFormat = 'mm/dd/yy';  
                var updateModel = function(dateTxt) {  
                    scope.$apply(function() {  
                        //调用AngularJS内部的工具更新双向绑定关系  
                        ngModel.$setViewValue(dateTxt);  
                    });  
                };  
                  
                optionsObj.onSelect = function(dateTxt, picker) {  
                    updateModel(dateTxt);  
                    if(scope.select) {  
                        scope.$apply(function() {  
                            scope.select({date: dateTxt});  
                        });  
                    }  
                };  
                  
                ngModel.$render = function() {  
                    //使用AngularJS内部的'binding-specific'变量  
                    element.datePicker('setDate', ngModel.$viewValue || '');  
                };  
                element.datePicker(optionsObj);  
            }

    }

})
.directive('onFinishRender', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
})
.directive('tabSlideBox', ['$timeout', '$window', '$ionicSlideBoxDelegate', '$ionicScrollDelegate',
    function($timeout, $window, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

        return {
            restrict: 'A, E, C',
            link: function(scope, element, attrs, ngModel) {

                var ta = element[0],
                    $ta = element;
                $ta.addClass("tabbed-slidebox");
                if (attrs.tabsPosition === "bottom") {
                    $ta.addClass("btm");
                }

                function renderScrollableTabs() {
                    var iconsDiv = angular.element(ta.querySelector(".tsb-icons")),
                        icons = iconsDiv.find("a"),
                        wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"),
                        totalTabs = icons.length;
                    var scrollDiv = wrap.querySelector(".scroll");

                    angular.forEach(icons, function(value, key) {
                        var a = angular.element(value);
                        a.on('click', function() {
                            $ionicSlideBoxDelegate.slide(key);
                        });
                    });

                    var initialIndex = attrs.tab;
                    //Initializing the middle tab
                    if (typeof attrs.tab === 'undefined' || (totalTabs <= initialIndex) || initialIndex < 0) {
                        initialIndex = 0;
                    }

                    //If initial element is 0, set position of the tab to 0th tab 
                    if (initialIndex == 0) {
                        setPosition(0);
                    }

                    $timeout(function() {
                        $ionicSlideBoxDelegate.slide(initialIndex);
                    }, 0);
                }

                function setPosition(index) {
                    var iconsDiv = angular.element(ta.querySelector(".tsb-icons")),
                        icons = iconsDiv.find("a"),

                        wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"),
                        totalTabs = icons.length;
                    var scrollDiv = wrap.querySelector(".scroll");

                    var middle = iconsDiv[0].offsetWidth / 6;
                    var curEl = angular.element(icons[index]);
                    if (curEl && curEl.length) {
                        var curElWidth = curEl[0].offsetWidth,
                            curElLeft = curEl[0].offsetLeft;

                        angular.element(iconsDiv[0].querySelector(".active")).removeClass("active");
                        angular.element(iconsDiv[0].querySelector(".selected")).removeClass("selected");
                        curEl.addClass("active");
                        curEl.addClass("selected");
                        /*新增*/
                        angular.element(iconsDiv[0].querySelector(".ion-ios7-clock-outline")).removeClass("ion-ios7-clock-outline");
                        angular.element(iconsDiv.find("i")[index]).addClass("ion-ios7-clock-outline");
                        var leftStr = (middle - (curElLeft) - curElWidth / 2 +5);
                        //If tabs are not scrollable
                        if (!scrollDiv) {
                            var leftStr = (middle - (curElLeft) - curElWidth / 2 + 5) + "px";
                            wrap.style.webkitTransform = "translate3d(" + leftStr + ",0,0)";
                        } else {
                            //If scrollable tabs
                            var wrapWidth = wrap.offsetWidth;
                            var currentX = Math.abs(getX(scrollDiv.style.webkitTransform));
                            var leftOffset = 100;
                            var elementOffset = 40;
                            //If tabs are reaching right end or left end
                            if (((currentX + wrapWidth) < (curElLeft + curElWidth + elementOffset)) || (currentX > (curElLeft - leftOffset))) {
                                if (leftStr > 0) {
                                    leftStr = 0;
                                }
                                //Use this scrollTo, so when scrolling tab manually will not flicker
                                $ionicScrollDelegate.scrollTo(Math.abs(leftStr), 0, true);
                            }
                        }
                    }
                };

                function getX(matrix) {
                    matrix = matrix.replace("translate3d(", "");
                    matrix = matrix.replace("translate(", "");
                    return (parseInt(matrix));
                }
                var events = scope.events;
                events.on('slideChange', function(data) {
                    setPosition(data.index);
                });
                events.on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    renderScrollableTabs();
                });

                renderScrollableTabs();
            },
            controller: function($scope, $attrs, $element) {
                function SimplePubSub() {
                    var events = {};
                    return {
                        on: function(names, handler) {
                            names.split(' ').forEach(function(name) {
                                if (!events[name]) {
                                    events[name] = [];
                                }
                                events[name].push(handler);
                            });
                            return this;
                        },
                        trigger: function(name, args) {
                            angular.forEach(events[name], function(handler) {
                                handler.call(null, args);
                            });
                            return this;
                        }
                    };
                };
                $scope.events = new SimplePubSub();

                $scope.slideHasChanged = function(index) {
                    $scope.events.trigger("slideChange", {
                        "index": index
                    });
                };

                $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    $scope.events.trigger("ngRepeatFinished", {
                        "event": ngRepeatFinishedEvent
                    });
                });
            }
        };

    }
])
.directive("passwordVerify", function() {
        return {
            require: "ngModel",
            scope: {
                passwordVerify: '='
            },
            link: function(scope, element, attrs, ctrl) {
                scope.$watch(function() {
                    var combined;

                    if (scope.passwordVerify || ctrl.$viewValue) {
                        combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                    }
                    return combined;
                }, function(value) {
                    if (value) {
                        ctrl.$parsers.unshift(function(viewValue) {
                            var origin = scope.passwordVerify;
                            if (origin !== viewValue) {
                                ctrl.$setValidity("passwordVerify", false);
                                return undefined;
                            } else {
                                ctrl.$setValidity("passwordVerify", true);
                                return viewValue;
                            }
                        });
                    }
                });
            }
        };
    });


