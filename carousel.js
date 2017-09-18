(function (window) {
  function lbCarousel(options) {
    if (!options || typeof options != 'object') {
      throw 'options is not define or options is not a obj';
      return;
    };
    //  参数确认 父元素包裹的容器wrap
    //  三角id  arror
    //  是否要小圆点  cycle
    //  是否自动轮播  autoPlay
    if (!options.wrap) {
      throw "wrap is not define.Please enter the container's Id ";
      return;
    }

    if (!options.arror) {
      throw "arror is not define.Please enter the arror's Id";
      return;
    }

    if (options.time && typeof options.time != 'number') {
      throw "Please enter one number";
      return;
    }

    var wrap = options.wrap;
    var arror = options.arror;

    this.play = options.play ? options.play : false;

    this.cycle = options.cycle ? options.cycle : false;

    this.time = options.time ? options.time : 3000;

    this.fatherEle = document.getElementById(wrap);
    this.arrorList = document.getElementById(arror);
    this.lists = this.fatherEle.children;

    this.listWidth = this.lists[0].offsetWidth;
    this.num = 0;
    this.cycleNum = 0;
    this.fatherElePositionLeft = 0;
    this.listsLength = 0;
    this.timer = null;


    this.init();
  }
  lbCarousel.prototype = {
    constructor: lbCarousel,
    init: function () {
      this.createCarousel();
    },
    createCarousel: function () {

      //  拿到父元素
      var fatherEle = this.fatherEle;

      //  子元素为轮播图的各个小图
      var lists = this.lists;

      //  lists数量记录
      this.listsLength = lists.length;

      //  clone第一张放在最后一个座位假图
      var fadeList = lists[0].cloneNode(true);
      fatherEle.appendChild(fadeList);

      //  lists数量记录 (包括加图片的数量)
      this.listsLength = lists.length;


      //  获取轮播主体的位置
      var fatherElePositionLeft = fatherEle.offsetLeft;
      this.fatherElePositionLeft = fatherElePositionLeft;

      //  list单个大小
      var listWidth = this.listWidth

      //  获取三角
      var arrorList = this.arrorList;
      var leftArror = arrorList.children[0];
      var rightArror = arrorList.children[1];


      //----------------------------------------------------------------------------------------

      //  创建圆点块
      if (this.cycle) this.littleCycle();

      //  参数初始化
      var _self = this;
      var cycleFunc = this.littleCycleChange;

      if (this.cycle) cycleFunc(this);
      //  关于事件的传参 和 取得当前构造函数 
      //  在外面包裹一层function
      leftArror.onclick = function () {
        _self.clickLeftArror(function (_self) {
          if (_self.cycle) {
            //  左点击事件 
            _self.cycleNum--;
            cycleFunc(_self);
          }

        }(_self));
      };



      //  右
      rightArror.onclick = function () {
        _self.clickRightArror(function (_self) {
          if (_self.cycle) {
            //  右点击事件           
            _self.cycleNum++;
            cycleFunc(_self);
          }
        }(_self));
      };

      if (this.cycle) this.selectCycle();

      //  自动播放
      if (this.play) this.autoPlay();

    },

    //  事件函数的第一个参数必须为Event
    clickRightArror: function (callback) {
      console.log(this.num)
      var fatherEle = this.fatherEle;
      var listWidth = this.listWidth;
      var fatherElePositionLeft = this.fatherElePositionLeft;
      if (Math.abs(this.num) == this.listsLength - 1) {
        fatherEle.style.left = fatherElePositionLeft + 'px';
        this.num = 0;
      }
      this.num--;

      this.animate(fatherEle, this.num * listWidth + fatherElePositionLeft);


      //  假图变为第一张
      callback && callback();
    },

    clickLeftArror: function (callback) {
      var fatherEle = this.fatherEle;
      var listWidth = this.listWidth;
      var fatherElePositionLeft = this.fatherElePositionLeft;

      //  转到第一张图的时候换成最后一张图(假图)
      if (this.num == 0) {
        this.num = -(this.listsLength - 1);
        fatherEle.style.left = fatherElePositionLeft + this.num * listWidth + 'px';
      }
      this.num++;



      this.animate(fatherEle, this.num * listWidth + fatherElePositionLeft);
      callback && callback();
    },

    littleCycle: function () {
      var lists = this.fatherEle.children;

      //  创造包裹小圆点的盒子
      var div = document.createElement('div');
      div.className += 'cycleWrap';
      this.fatherEle.parentNode.appendChild(div);

      // 找到包裹小圆点的盒子
      var cycleWrap = div;

      //  设置盒子样式
      cycleWrap.style.padding = '8px 12px';
      cycleWrap.style.backgroundColor = 'rgba(255,255,255,0.3)';
      cycleWrap.style.position = 'absolute';
      cycleWrap.style.borderRadius = '34px';
      cycleWrap.style.bottom = '0px';
      cycleWrap.style.left = this.listWidth / 2 + 'px';
      cycleWrap.style.marginLeft = -((lists.length - 1) * 10 + 12 * 2) / 2 + 'px';


      //  小圆点数量      
      for (var i = 0; i < lists.length - 1; i++) {
        var div = document.createElement('div');
        div.className = 'everyCycle';

        //  小圆点浮动
        div.style.float = 'left';
        cycleWrap.appendChild(div);

        //  小圆点样式
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.borderRadius = '50%';
        div.style.backgroundColor = '#fff';
        if (i) {
          div.style.marginLeft = '5px';
        }
      }

    },
    littleCycleChange: function (_self) {

      //  找到小点对象
      var everyCycles = document.getElementsByClassName('everyCycle');

      //  初始点
      var cycleNum = cycleNum ? cycleNum : 0;

      //  圆点同步

      //  直接与构造函数中的cycleNum 绑定
      //  不与轮播相关只和点击次数关联
      //  以点击事件加或减cycleNum然后关联到函数属性上关联到每个圆点
      if (_self.cycleNum < 0) {
        _self.cycleNum = _self.listsLength - 2;
      }
      if (_self.cycleNum > _self.listsLength - 2) {
        _self.cycleNum = 0;
      }

      //  哪个小圆点被选中
      for (var i = 0; i < everyCycles.length; i++) {
        everyCycles[i].style.backgroundColor = '#fff';
      }
      everyCycles[_self.cycleNum].style.backgroundColor = 'red';

    },
    selectCycle: function () {
      var everyCycles = document.getElementsByClassName('everyCycle');
      var _self = this;

      //  所有圆点注册点击事件
      for (var i = 0; i < everyCycles.length; i++) {

        //  闭包传参为的是点的一一对应
        //  轮播图同步
        //  轮播图对应的num同步
        (function (j) {
          everyCycles[j].onclick = function () {
            _self.cycleNum = j;
            _self.num = -j;
            _self.littleCycleChange(_self);
            _self.animate(_self.fatherEle, -_self.cycleNum * _self.listWidth + _self.fatherElePositionLeft);
          }
        })(i)
      }


    },
    autoPlay: function () {
      var _self = this;
      var timer = null;
      var cycleWrap = document.getElementsByClassName('cycleWrap')[0];
      var time = this.time

      //  自动播放
      clearInterval(timer);
      timer = setInterval(function () {
        _self.clickRightArror();
        if (_self.cycle) {

          _self.cycleNum++;
          _self.littleCycleChange(_self);

        }
      }, time);

      //  鼠标移动上去清空计时器


      this.fatherEle.onmouseover = function () {
        clearInterval(timer);
      }

      cycleWrap.onmouseover = function () {

        clearInterval(timer);
      }


      this.arrorList.onmouseover = function () {
        clearInterval(timer);
      }


      //  鼠标离开开启计时器
      this.fatherEle.onmouseout = function () {

        timer = setInterval(function () {
          _self.clickRightArror();
          _self.cycleNum++;
          _self.littleCycleChange(_self);
        }, time);

      }
    },
    animate: function (ele, target, speed) {
      clearInterval(ele.timer)
      ele.timer = setInterval(function () {
        var leader = ele.offsetLeft;
        var step = (target - leader) / 10;
        var speed = speed ? speed : 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        ele.style.left = leader + 'px';
        if (leader == target) {
          clearInterval(ele.timer)
        }
      }, speed);


    }


  }

  window.lbCarousel = lbCarousel;
})(window)