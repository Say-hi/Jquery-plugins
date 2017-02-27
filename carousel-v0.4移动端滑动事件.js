/**
 * Created by vcc on 2016/12/15.
 * Ŀ�깦�ܣ���ָ���ĸ���������Ⱦ���룬���趨��С�����ݸ�����id����ѡ���ֲ�Ч�����ֻ��˾��л���Ч��,ʹ��ǰ��Ҫ����Jquery�⣬�������ʵ�ִ���
 */
//�ֲ�ͼ���캯��
function Carousel(opts){
    //����̳�
    for(var key in opts){
        this[key] = opts[key];
    }
    //��ʱ����ӵ�this������
    this.timerId = null;
    //ҳ���ʼ��
    this.init();
    //�����ʽ
    this.addStyle();
}
//�滻ԭ��
Carousel.prototype = {
    //ָ���캯��
    constructor:Carousel,
    //��ʼ��
    init: function () {
        //��Ⱦ����
        this.renderDOM();
        //���¼�
        this.beindEvents();
    },
    //��Ⱦ����
    renderDOM: function () {
        var _this = this;
        //������������
        var baseDomStr = '<div id="js_slider" class="w-slider">' +
                    '<div class="slider">' +
                        '<div class="slider-main" id="slider_main_block"></div>' +
                    '</div>' +
                    '<div class="slider-ctrl" id="slider_ctrl"></div>' +
                '</div>';
        //����Jquer����
        this.$baseDomStr = $(baseDomStr);
        //ͼƬ����
        $.each(this.data, function (i, v) {
            _this.addPicture(v.href, v.src);
        })
        //����СԲ
        this.addCircle();
        //�����ɺ�����ݲ��뵽ҳ����
        $(this.parentDom).append(this.$baseDomStr);
    },
    //���¼�
    beindEvents: function () {
        var _this = this;
        //ͼƬ����
        var index = 0;
        //�Զ�����
        this.autoPlay(index);
        //������������¼�
        $(".slider-main-img").eq(0).css("opacity",1).siblings().css("opacity",0);
        $(".slider-ctrl-con").on("mouseenter click", function () {
            clearInterval(_this.timerId);
            console.log($(this).index());
            index = $(this).index();
            $(".slider-main-img").eq(index).stop().animate({opacity:1},800).siblings().stop().animate({opacity:0},700);
        }).on("mouseleave", function () {
            _this.autoPlay(index+1);
        })
        this.mobileSwipe();
    },
    //���һ��ͼƬ
    addPicture: function (href,src) {
        var addStr = '<div class="slider-main-img"><a href="[[href]]"><img src="[[src]]" alt=""/></a></div>';
        addStr = addStr.replace('[[href]]',href).replace('[[src]]',src);
        this.$baseDomStr.find(".slider-main").append(addStr);
    },
    //��̬����СԲȦ
    addCircle: function () {
        var _this = this;
        $.each(this.data, function (i) {
            _this.$baseDomStr.find("#slider_ctrl").append($("<span class='slider-ctrl-con'></span>"));
        })
    },
    //�����ʽ
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
    //�Զ��ֲ�
    autoPlay: function (index) {
        var _this = this;
        _this.timerId = setInterval(function () {
            if(index>$(".slider-main-img").length-1){index=0;}
            $(".slider-main-img").eq(index++).stop().animate({opacity:1},800).siblings().stop().animate({opacity:0},700);
        },5000)
    },
    //�����¼�
    mobileSwipe: function () {
        var startX,moveX,distanceX=0;
        var dom = $(".w-slider")[0];
        dom.addEventListener("touchstart", function (e) {
            startX = e.touches[0].clientX;
            console.log(startX);
        })
        dom.addEventListener("touchmove", function (e) {
            moveX = e.touches[0].clientX;
            distanceX = moveX - startX;
            console.log(distanceX);
        })
        dom.addEventListener("touchend", function () {
            if(Math.abs(distanceX)>100){
                if(distanceX>0){

                }else if(distanceX<0){

                }
            }
        })
    }
}