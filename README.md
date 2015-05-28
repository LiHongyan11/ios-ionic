# ios-ionic
### Ionic是一个前端的框架，帮助开发者使用HTML5,CSS3和JavaScript做出原生应用，ionic的理念类前端开发的BootStrap，js部分是基于AngularJS框架。

##### 首先这个小项目是一个做炒股培训视频的app
* 里面包含登录注册功能；
* 分时间段查看当天课程列表和信息，支持点击时间段查看课程列表以及左右滑动查看该时间段课程列表；
* 支持按类型查找课程，购买课程；
* 可以查看个人已购买课程，已过期课程，个人订单，个人消息；
* 还支持留言功能。

##### 对于登录、注册：
在首次进入首页时会有一个注册导航，如果点击不再提醒以后，将不会再显示，这里我使用html5的本地存储localStorage来实现。

##### 对于首页课表信息的显示：
* 对于分时间段显示课程列表和支持点击时间段查看课程列表以及左右滑动查看该时间段课程列表的功能采用angularjs的指令来编写，来进行添加样式等的复杂功能；
* 左右滑动的功能采用ionic自带的标签<slide-box>进行编写，可是如果是将时间段使用ng-repeat显示出来，会导致这个标签的宽度变为0，所以在应该在它的控制器里在请求成功时添上`$ionicSlideBoxDelegate.update();`

##### 对于按类型查找课程：
* 如果要将所选类型的标签一起传给后台的话，可以使用ionic自带的ng-option指令，基本使用方法：`ng-options='character.catalogAlias+":"+key.alias as key.tagName for key in character.tag'`,;
* 对于ng-model的取值，每一个应是不一样的，但由于每个类型是循环出来的，所以不能按一般思路来控制它的唯一性，可以采用将该循环项的索引传入ng-model，比如：`ng-model='selected[$index]'`;
* 但是这样处理以后提交的值里面是包含未选择的类型的，它们的值为undefined，所以在传给后台前应进行过滤；
* 对于查询出来的结果，后台每次只返回10条数据，所以需要做一个下拉加载。

##### 对于查看个人的一些信息，课程，消息等：
在这里涉及到需要加载嵌套子视图，所以ionic并没有选择angularjs原生的路由而是选择了ui-router，加载嵌套子视图，可以使用这个标签：  
`<ion-content on-swipe-left="onSwipeLeft()" on-swipe-right="onSwipeRight()" style="margin-top:74px;" scroll="false">`<br>
`      <ion-nav-view name="myOrder-myOrderList" animation="no-animation">`<br>
`      </ion-nav-view>`<br>
`</ion-content>`<br>
然后在路由设置里的view里加载该视图名myOrder-myOrderList需要的模板以及控制器。


