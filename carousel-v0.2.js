/**
 * Created by vcc on 2016/12/15.
 * 目标功能：在指定的父容器内渲染代码，可设定大小，根据父容器id，可选择轮播效果，手机端具有滑动效果,使用前需要调用Jquery库，面向对象实现代码
 */
//轮播图构造函数
function Carousel(opts){
    //混入继承
    for(var key in opts){
        this[key] = opts[key];
    }
    //页面初始化
    this.init();
    //添加样式
    this.addStyle();
}
//替换原型
Carousel.prototype = {
    //指向构造函数
    constructor:Carousel,
    //初始化
    init: function () {
        //渲染代码
        this.renderDOM();
        //绑定事件
        this.beindEvents();
    },
    //渲染代码
    renderDOM: function () {
        var _this = this;
        //基础代码容器
        var baseDomStr = '<div id="js_slider" class="w-slider">' +
                    '<div class="slider">' +
                        '<div class="slider-main" id="slider_main_block">' +

                        '</div>' +
                    '</div>' +
                    '<div class="slider-ctrl" id="slider_ctrl">' +
                        '<span id="slider_ctrl_prev" class="slider-ctrl-prev"></span>' +
                        '<span id="slider_ctrl_next" class="slider-ctrl-next"></span>' +
                    '</div>' +
                '</div>';
        //生成Jquer变量
        this.$baseDomStr = $(baseDomStr);
        //图片插入
        $.each(this.data, function (i, v) {
            _this.addPicture(v.href, v.src);
        })
        //生成小圆
        this.addCircle();
        //将生成后的数据插入到页面中
        $(this.parentDom).append(this.$baseDomStr);
    },
    //绑定事件
    beindEvents: function () {
        $(".slider-main-img").eq(0).css("opacity",1).siblings().css("opacity",0);
        $(".slider-ctrl-con").on("mouseenter click", function () {
            clearInterval(timerId);
            $(".slider-main-img").eq($(this).index()-2).stop().animate({opacity:1},800).siblings().stop().animate({opacity:0},700);
        }).on("mouseleave", function () {
            timerId = setInterval(function () {
                $(".slider-main-img")
            },1000)
        })
        //自动轮播
        var timerId = setInterval(function () {
            $(".slider-main-img").eq($(this).index()-2).stop().animate({opacity:1},800).siblings().stop().animate({opacity:0},700);
        },1000)
    },
    //添加一张图片
    addPicture: function (href,src) {
        var addStr = '<div class="slider-main-img"><a href="[[href]]"><img src="[[src]]" alt=""/></a></div>';
        addStr = addStr.replace('[[href]]',href).replace('[[src]]',src);
        this.$baseDomStr.find(".slider-main").append(addStr);
    },
    //动态生成小圆圈
    addCircle: function () {
        var _this = this;
        $.each(this.data, function (i) {
            _this.$baseDomStr.find("#slider_ctrl").append($("<span class='slider-ctrl-con'>"+(i+1*1)+"</span>"));
        })
    },
    //添加样式
    addStyle: function () {
        //$(".slider-main-img").css({
        //    position:"absolute",
        //    top:0,
        //    left:0
        //});
        //$(".slider-ctrl-con").css({
        //    display:"inline-block",
        //    width:"20px",
        //    height:"20px",
        //    backgroundColor:"red",
        //    borderRadius:"50%",
        //    textAlign:"center",
        //    lineHeight:"20px",
        //    marginRight:"10px",
        //})
    },
    //自动轮播
    //autoPlay: function () {
    //
    //}
}