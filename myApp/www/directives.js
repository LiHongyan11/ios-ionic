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
                "<a class='cancel' href=''>删除订单</a>"+
                "</div>"+
                "</div>"+	
                "</div>"+
                "<div ng-transclude ng-show='showText'>"+
                "</div>",
        link: function (scope,element,attris,accordionController) {
            scope.showText=false;
            accordionController.addExpander(scope);
            scope.toggleText=function(){
            	scope.showText=!scope.showText;
            	accordionController.gotOpened(scope);
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
                "<a class='cancel' ng-click='cancel($event,orderNumber)'>取消订单</a>"+
                "<a class='allPrice' ng-click='buy()'>购买</a>"+
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
        controller:function($scope,$http){
            $scope.cancel=function($event,orderNumber){
                console.log($scope.unPays);
                $event.stopPropagation();
                // $http({
                //     method:'post',
                //     url:'http://23981515.com:7080/user/userDeleteOrCancelOrder',
                //     params:{
                //         orderID:$scope.orderNumber
                //     }
                // })
                // .success(function(data){
                //     if(data.status == 'success'){
                //         // $scope.unPays.splice(index,1);
                //         alert($scope.unPays.orderNumber.indexOf($scope.orderNumber))
                //     }
                // })  
                
                
            }
            // $scope.cancel=function($event,orderNumber){
            //     console.log($scope.unPays);

            // }

        }
    }
});


