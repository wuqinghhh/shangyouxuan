//作用：需要将所有的dom元素以及相关的资源全部加载完毕之后，再来实现的事件函数
window.onload = function () {
  //声明一个记录点击的缩略图下标
  var bigimgIndex = 0
  //路街导航的数据渲染
  navPathDataBind()
  function navPathDataBind() {
    /*
    思路：
    1.需要先获取路径导航的页面元素（navPath）
    2.再来获取所需要的数据（data.js=>goodData.Path）
    3.由于数据是需要动态产生的，那么相应的dom元素也应该是动态产生的，含义需要创建dom元素，根据数据的数量创建dom元素
    4.在遍历数据创建dom元素的最后一条，只创建a标签，不创建i标签
    */

    //1.获取页面导航的元素对象
    var navPath = document.querySelector('#wrapper #content .contentMain #navPath ');
    // console.log(navPath);
    //2.获取数组
    var path = goodData.path;
    // console.log(path);
    //3.遍历数组
    for (var i = 0; i < path.length; i++) {
      if (i == path.length - 1) {
        //只要创建a标签且没有herf属性
        var aNode = document.createElement('a');
        aNode.innerText = path[i].title;
        navPath.appendChild(aNode)
      } else {
        //4.创建a标签
        var aNode = document.createElement('a');
        aNode.href = path[i].url;
        aNode.innerText = path[i].title;

        //5.创建i标签
        var iNode = document.createElement('i');
        iNode.innerText = '/';

        //6.让navPath元素来追加a和i
        navPath.appendChild(aNode)
        navPath.appendChild(iNode)
      }
    }
  }

  //放大镜的移入移出效果
  bigClassBind()
  function bigClassBind() {
    /*
  思路：
  1.获取小图框元素对象，并且设置鼠标移入事件（onmouseenter）
  2.动态创建蒙版元素和大图框和大图片的元素
  3.移出时需移出蒙版元素和大图框
  
  */

    // 1.获取小图框元素
    var smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic')
    //获取leftTop元素
    var leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop')
    //获取数据
    var imagessrc = goodData.imagessrc
    //2.设置鼠标移入事件
    smallPic.onmouseenter = function () {
      // console.log(111) 打断点看函数是否生效
      //3.创建蒙版元素
      var maskDiv = document.createElement('div')
      maskDiv.className = "mask"
      //4.创建大图框元素
      var BigPic = document.createElement('div')
      BigPic.id = "bigPic"
      //5.创建大图片元素
      var BigImg = document.createElement('img')
      BigImg.src = imagessrc[bigimgIndex].b
      //6.大图框追加大图片
      BigPic.appendChild(BigImg)
      //7.小图框追加蒙版元素
      smallPic.appendChild(maskDiv)
      //8.让leftTop元素追加大图框元素
      leftTop.appendChild(BigPic)
      //设置鼠标移动事件
      smallPic.onmousemove = function (event) {
        //event.clientX 鼠标点距离浏览器左侧x的值
        //getBoundingClientRect().left 小图框距离浏览器的可视距离
        //maskDiv.offsetWidth/2  蒙版元素宽度的一半     offsetWidth为元素的占位宽度
        var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2
        var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2

        //判断 判断鼠标移动区域是否超出小图框的边界范围
        if (left < 0) {
          left = 0
        } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
          left = smallPic.clientWidth - maskDiv.offsetWidth
        }
        if (top < 0) {
          top = 0
        } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
          top = smallPic.clientHeight - maskDiv.offsetHeight
        }

        //设置left和top属性   下面这两句的left和top不是一个值  右边的是变量名 左边的是属性的方位值
        maskDiv.style.left = left + 'px'
        maskDiv.style.top = top + 'px'

        //移动的比例关系 = 蒙版元素移动的距离 / 大图片元素移动的距离
        //蒙版元素移动的距离 = 小图框的宽度 - 蒙版元素的宽度
        //大图片元素移动的距离 = 大图片元素的宽度 - 大图框的宽度
        // var scale = (smallPic.clientWidth-maskDiv.offsetWidth)/(BigImg.offsetWidth-BigPic.clientWidth)
        var scale = 0.8
        // console.log(scale) //0.495
        //
        BigImg.style.left = -left / scale + 'px'
        BigImg.style.top = -top / scale + 'px'
      }


      //9.设置移出事件
      smallPic.onmouseleave = function () {
        //让小图框移出蒙版元素            注意：smallPic和maskDiv必须是直接的子父关系，否则报错
        smallPic.removeChild(maskDiv)
        //让leftTop元素移除大图框
        leftTop.removeChild(BigPic)
      }

    }
  }

  //动态渲染放大镜缩略图的数据
  thumbnailData()
  function thumbnailData() {
    /*
   思路：
   1.先获取piclist元素下的ul
   2.再获取data.js里面的goodData 下的imagessrc
   3.遍历数组，根据数组长度创建li元素
   4.让Ul遍历追加li元素
   */
    //1.获取piclist元素下的ul
    var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')
    // console.log(ul)
    //2.再获取data.js里面的imagessrc
    var imagessrc = goodData.imagessrc
    //console.log(imagessrc)
    //3.遍历数组，根据数组长度创建li元素
    for (var i = 0; i < imagessrc.length; i++) {
      //4.创建li元素
      var newLi = document.createElement("li")
      //5.创建img元素
      var newImg = document.createElement("img")
      newImg.src = imagessrc[i].s
      //6.让li追加img元素
      newLi.appendChild(newImg)
      //7.让ul追加li元素
      ul.appendChild(newLi)

    }

  }

  //点击缩略图的效果
  thumbnailDataClick()
  function thumbnailDataClick() {
    /*
    思路：
    1.获取所有li元素，并且循环发生点击事件
    2.点击缩略图需要确定其下标位置来来找到对应的小图路径和大图路径来取代现有的src值
    */

    //1.获取所有li元素，并且循环发生点击事件
    var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li ')
    //获取小图的路径
    var smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img')
    //获取数据
    var imagessrc = goodData.imagessrc
    //小图路径需要默认和imagessrc的第1个元素的小图路径一致
    smallPic_img.src = imagessrc[0].s
    //循环发生点击事件
    for (var i = 0; i < liNodes.length; i++) {
      //console.log(i)
      //在点击事件之前，给每一个元素都添加上自定义的下标
      liNodes[i].index = i   /*还可以通过setAttribute('index',i)这种方法 */
      liNodes[i].onclick = function () {
        var idx = this.index /*事件函数中的this永远指向的是实际发生事件的目标源对象 */
        //console.log(idx)
        bigimgIndex = idx
        //变换小图路径
        smallPic_img.src = imagessrc[idx].s
      }
    }
  }

  //点击缩略图左右两端的箭头的效果
  thumbnailLeftRightClick()
  function thumbnailLeftRightClick() {
    /* 思路：
    1.获取左右两边的箭头
    2.获取可视的div和ul以及li元素
    3.计算 （起点  步长 总运动的距离）
    4.发生点击事件
    */
    //1.获取左右两边的箭头
    var prev = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.prev')
    var next = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.next')

    //2.获取可视的div和ul以及li元素
    var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')
    var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li')
    //console.log(picList,ul,li)

    //3计算 （起点  步长 总体运动的距离值）
    //计算起点
    var start = 0
    //计算步长
    var step = (liNodes[0].offsetWidth + 20) * 2
    //计算总体运动的距离值  = ul的总宽度 - div的宽度 = （总图片的数量 - div里面的可看到的图片数量）*（li单张图片的宽度 + margin-right的长度）
    var endPosition = (liNodes.length - 6) * (liNodes[0].offsetWidth + 20)
    //console.log(endPosition)

    //4.发生点击事件
    //点击左边按钮
    prev.onclick = function () {
      start -= step
      if (start < 0) {
        start = 0
      }
      ul.style.left = -start + "px"
    }
    //点击右边按钮
    next.onclick = function () {
      start += step
      if (start > endPosition) {
        start = endPosition
      }
      ul.style.left = -start + "px"
    }

  }

  //商品详情数据的动态渲染
  rightTopData()
  function rightTopData() {
    /* 
    思路：
    1、查找rightTop元素
    2.查找data.js->goodData->goodsDetail
    3.建立一个字符串变量，将原来的布局结构粘进来，将所对应的数据放在对应的位置重新渲染出来
    */
    // 1、查找rightTop元素
    var rightTop = document.querySelector('#wrapper #content .contentMain #center .right .rightTop')
    //2.查找data.js->goodData->goodsDetail
    var goodsDetail = goodData.goodsDetail
    //3.建立一个字符串(双引号、单引号、模板字符串)变量， 我们这里用模板字符串
    //模板字符串替换数据 ${变量}
    var s = ` <h3>${goodsDetail.title} </h3>
      <p>${goodsDetail.recommend}</p>
      <div class="priceWrap">
        <div class="priceTop">
            <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格 </span>
            <div class="price">
              <span>￥</span>
              <p>${goodsDetail.price}</p>
              <i>降价通知</i>
            </div>
            <p>
              <span>累计评价</span>
              <span>${goodsDetail.evaluateNum}</span>
            </p>
        </div>
        <div class="priceBottom">
          <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
          <p>
            <span>${goodsDetail.promoteSales.type}</span>
            <span>${goodsDetail.promoteSales.content}
            </span>
          </p>
        </div>
      </div>
      <div class="support">
        <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
        <p>${goodsDetail.support}</p>
      </div>
      <div class="address">
        <span>配&nbsp;送&nbsp;至</span>
        <p>${goodsDetail.address}</p>
</div> `

    //4.重新渲染rightTop数据
    rightTop.innerHTML = s;

  }

  //商品参数数据的动态渲染
  rightBottomData()
  function rightBottomData() {
    /* 
  思路：
  1.找rightBottom元素
  2.找data.js-> goodData->goodsDetail->crumbData
  3.由于数据是一个数组，需要遍历，有一个元素则需要有一个对应的dl元素对象（dt dd）
  */
    // 1.找rightBottom里面的chooseWrap元素
    var chooseWrap = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap')

    //2.找data.js-> goodsDetail->crumbData
    var crumbData = goodData.goodsDetail.crumbData

    //3.遍历数组
    for (var i = 0; i < crumbData.length; i++) {
      //4.创建dl  元素
      var dlNode = document.createElement('dl')
      //5.创建 dt 元素
      var dtNode = document.createElement('dt')
      dtNode.innerText = crumbData[i].title
      //6.dl追加dt
      dlNode.appendChild(dtNode)
      //7.遍历crumbData->data元素
      for (var j = 0; j < crumbData[i].data.length; j++) {
        //创建dd元素
        var ddNode = document.createElement('dd')
        ddNode.innerText = crumbData[i].data[j].type
        ddNode.setAttribute("price", crumbData[i].data[j].changePrice)   //给每一个dd身上都添加一个自定义属性
        //让dl来追加dd
        dlNode.appendChild(ddNode)
      }

      //8.chooseWrap追加dl
      chooseWrap.appendChild(dlNode)
    }

  }

  //点击商品参数之后的颜色排他效果
  clickddBind()
  function clickddBind() {
    /* 
    每一行dd文字颜色排他效果
    思路：
    1.获取所有的dl元素，取其中第一个dl下的dd元素做测试。
    测试完毕之后在对应的dl第一行下标的前面再嵌套一个for循环，目的是为了变换下标
    2，循环所有的dd元素，并且添加点击事件
    3.确定实际发生事件的目标源对象设置其文字颜色为红色，然后给其他所有的元素颜色都重置为基础颜色#666
    =================================================================================

    点击dd之后产生的mark标记     重点
    思路：
    1.首先创建一个容器来装点击dd之后产生的元素值（用数组），确定数组的起始长度
    2.然后再将点击的dd元素值根据对应的下标写入到数组中


    */
    //1.获取所有的dl元素，取其中第一个dl下的dd元素做测试
    var dlNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap dl')

    var choose = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .choose')
     //创建一个容器来装点击dd之后产生的元素值（用数组），确定数组的起始长度
    var arr = new Array(dlNodes.length)
    arr.fill(0) 
   // console.log(arr) //[0, 0, 0, 0]
    for (var i = 0; i < dlNodes.length; i++) {
      //加一个立即执行函数   闭包
      (function(i){ //这里的i是行参
         //取其中第一个dl下的dd元素
      var ddNodes = dlNodes[i].querySelectorAll('dd')
     // console.log(ddNodes) //可以拿到每一行的每一个的dd,然后可以发生点击事件
      //2.遍历当前所有的dd元素
      for (var j = 0; j < ddNodes.length; j++) {
      

        ddNodes[j].onclick = function () {
          //console.log(i)//i会输出3，不是我们想要的实际目标源对象
          // console.log(this) //this：表示哪一个元素真实发生了事件

          //清空choose元素
          choose.innerText = ""  //目的为了使效果不会追加
          for (var k = 0; k < ddNodes.length; k++) {
            ddNodes[k].style.color = "#666"; //给非选中的元素颜色设置为#666
          }
          /* 排他效果的思路：
          第二个for循环里面是这样的：
           ddNodes[0].style.color = "#666";
           ddNodes[1].style.color = "#666";
           ddNodes[2].style.color = "#666";
          假设我们点击的是第二个元素，下标为1
          则下面这句：this.style.color = "red"; 相当于 ddNodes[1].style.color =  "red";
          执行完第二个for循环，再执行下一句，所以红色会覆盖掉#666颜色，其他的未选中的则执行了#666颜色
          */
          this.style.color = "red";


     //点击哪一个dd元素动态产生一个新的mark标记元素
          arr[i] = this
          changePriceBind(arr) //传的是实参
         //遍历arr数组，将非0的值写入到arr数组中
         arr.forEach(function(value,index){
           //console.log(value)
           //只要为真，则动态创建mark标记
           if(value){
             //创建div元素
            var markDiv = document.createElement("div")
            //并且设置class属性
            markDiv.className = "mark"
            //并且设置值
            markDiv.innerText = value.innerText
            //创建a元素
            var aNode = document.createElement('a')
            //并且设置值
            aNode.innerText = "x"
            //并且设置下标
            aNode.setAttribute('index',index)
            //让div追加a元素
            markDiv.appendChild(aNode)
            //让choose循环追加div
            choose.appendChild(markDiv)
           }
         })

         //获取所有的a标签，并且循环发生点击事件
        var aNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .choose .mark a')
        // console.log (aNodes)
          for(var n=0;n<aNodes.length;n++){
            aNodes[n].onclick = function(){
              //获取点击的a标签身上的index下标
              var idx1 = this.getAttribute('index')
              //恢复数组中对应下标元素的值
              arr[idx1] =0 
              //查找对应下标的那个dl行中的所有的dd元素
              var ddList = dlNodes[idx1].querySelectorAll('dd')
             //遍历所有的dd元素
             for(var m=0;m<ddList.length;m++){
               //其余dd文字颜色为#666
              ddList[m].style.color = "#666"
             }
             //默认第一个dd文字颜色恢复为红色
             ddList[0].style.color = "red"

             //删除对应下标位置的mark标记
             choose.removeChild(this.parentNode)

             //调用价格函数
             changePriceBind(arr)
            }
          }


        }
      }
    
      })(i)  //这里的i是实参，
     
    }
   
  }

  //价格变动的函数声明
  function changePriceBind(arr){  //形参
    /* 
    思路：
    1、获取price元素
    2.给每一个dd标签身上都默认设置一个自定义的属性，用来记录变化的价格
    3.遍历arr数组，将dd元素身上新变换的价格与已有的价格（5299）相加
    4.将计算结果重新渲染到p标签
    */
   //1 获取price元素
   var oldPrice = document.querySelector('#wrapper #content .contentMain #center .right .rightTop .priceWrap .priceTop .price p ')
  //2.给每一个dd标签身上都默认设置一个自定义的属性，用来记录变化的价格
   //3.遍历arr数组，将dd元素身上新变换的价格与已有的价格（5299）相加
      //在for循环之前，需要取出默认的价格
      var price = goodData.goodsDetail.price
     // console.log(price) 5299
      for(var i = 0;i<arr.length;i++){
      //判断如果arr[i]不为0，则打印
      if(arr[i]){
        //拿到的price是一个字符串，要数据类型转换为数字类型,再用一个变量存储起来
       // console.log(Number(arr[i].getAttribute('price')))
        var changePrice= Number(arr[i].getAttribute('price'))
        //最终的价格
        price = price + changePrice
       // console.log(price)
      }

  }
  oldPrice.innerText = price
    //4.将变化后的价格写入下面的选择搭配中间区域的左侧标签中
    var leftPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p')
    leftPrice.innerText = '￥'+ price;
    //5.遍历选择搭配的复选框是否有选中的，
    var ipts =  document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input')
    var newPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i')
    //判断是否有选中的复选框
    for(var j = 0 ;j<ipts.length;j++){
      if(ipts[j].checked){
        price = price + ipts[j].value
      }
    }
    //6.若无选中的，则右侧的套餐价价格重新渲染
    newPrice.innerText = '￥'+ price;


  }

  //选择搭配中间区域复选框选中之后套餐价变动效果
  choosePrice()
 function choosePrice(){
 /* 
 思路：
 1.获取中间区域所有的复选框元素
 2.遍历这些元素，取出他们身上的价格与左边的基础价格进行累加，然后套餐价显示价格
 */

 //1.获取中间区域所有的复选框元素
 var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input')
 var leftPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p')
 var newPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i')
// console.log(newPrice)
 //2.遍历这些元素 取出他们身上的价格，与基础价格进行累加，然后套餐价显示新的价格
 for(var i = 0 ;i<ipts.length;i++){
 ipts[i].onclick = function(){
  var oldPrice =Number(leftPrice.innerText.slice(1))
  console.log(oldPrice)
    //判断哪个复选框被选中，所以进行二次遍历
    for(var j=0;j<ipts.length;j++){
      if(ipts[j].checked){
        //新的价格 = 左侧价格+选中复选框的附加价格
       oldPrice = oldPrice + Number(ipts[j].value)
      }
    }
    //3.套餐价显示新价格
   newPrice.innerText = '￥'+ oldPrice
 }
 }
 }

 //封装一个公共的选项卡函数
 function Tab (tabBtns,tabConts){
   /*
   思路：
   1.拿到被点击的元素 tabBtns
   2.拿到被切换显示的元素   tabConts
   
   */
  for(var i= 0;i<tabBtns.length;i++){
    tabBtns[i].index = i; //拿到li里面下标
    tabBtns[i].onclick = function(){
      for(var j = 0;j<tabBtns.length;j++){
        //未显示的元素隐藏
        tabBtns[j].className =''
        tabConts[j].className =''
      }
      //被点击的元素样式变换
      this.className = "active"
      tabConts[this.index].className = "active"
    }
  }
 }

 //点击左侧选项卡
 leftTab()
 function leftTab(){
 //拿到被点击的元素
 var h4s= document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4')
 //拿到被切换的元素
 var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideContent>div')
 //调用封装好的函数
 Tab(h4s,divs)
 }
  //点击右侧选项卡
  rightTab()
  function rightTab(){
  //拿到被点击的元素
  var lis = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .bottomDetail .tabBtns li ')
  //拿到被切换的元素
  var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .bottomDetail .tabContents div')
  //调用封装好的函数
 Tab(lis,divs)
  }

  //右边侧边栏的点击效果
  rightAsideBind()
  function rightAsideBind(){
    /* 
    思路：
    1.找按钮元素
    2.记录初始状态，对按钮进行点击事件,并且判断,若为关闭，则展开，若展开则关闭（flag取反）
    3.若为展开则设置对应的按钮和侧边栏效果，关闭也是如此
    */

    //1 找按钮元素
    var btns = document.querySelector('#wrapper .rightAside .btns')
    //记录初始状态
    var flag = true //默认是关闭的状态
    //查找侧边栏元素
    var rightAside = document.querySelector('#wrapper .rightAside')
    //发生点击事件
    btns.onclick = function(){
      if(flag){
        //需要展开
        btns.className = 'btns btnsOpen'
        rightAside.className = 'rightAside asideOpen'
      }else{
        //需要关闭
        btns.className = 'btns btnsClose'
        rightAside.className = 'rightAside asideClose'
      }
      flag = !flag
    }
  }

}