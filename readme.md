# # 轮播图的封装

使用方法

```javascript
var carousel = new lbCarousel(options);

//  options为对象
//	参数	wrap: 图片集合的父元素id,该父元素下请全为要轮播的元素(无需添加假图);
//		 arror: 左右三角的父元素id(请自己设置样式和位置) 请勿将三角元素放入轮播图内;
//		 play: 自动轮播(boolean);默认为false;
//		 cycle: 小圆点(有默认样式可以自行通过设置样式覆盖) (boolean) ;默认为false;
```



例如:

```html
  <div id="car">

    <ul id="carwrap">
      <li><img src="./imgs/1.jpg" alt=""></li>
      <li><img src="./imgs/2.jpg" alt=""></li>
      <li><img src="./imgs/3.jpg" alt=""></li>
      <li><img src="./imgs/4.jpg" alt=""></li>
      <li><img src="./imgs/5.jpg" alt=""></li>
      <li><img src="./imgs/6.jpg" alt=""></li>
      <li><img src="./imgs/7.jpg" alt=""></li>
      <li><img src="./imgs/8.jpg" alt=""></li>
    </ul>
  </div>

  <div id="arr">
    <div class="left">
      < </div>
        <div class="right">
          >
        </div>
    </div>
```

```javascript
      var carousel = new lbCarousel({
        wrap: 'carwrap',
        arror: 'arr',
        play: true,
        cycle: true
      });
```



如有bug , 欢迎指出!!!