$( window  ).load(function(){
    $('.intro_1_home').addClass('animated fadeInUp');
    $('.intro_1_home').removeClass('content_hidden');
    $('.intro_2').removeClass('content_hidden');
    $('.footer').removeClass('content_hidden');
    
    setTimeout(function () {
      // Do something after 1 seconds
        $('.play_video_btn').addClass('animated bounce');
    }, 2000);

});



jQuery(document).ready(function ($) {

    $(window).stellar();

    var links = $('#navbar').find('li');
    var scrolling = false;

    var randomstring = '';

    slide = $('.slide');
    mywindow = $(window);
    htmlbody = $('body');
    // $('.play_video_btn').addClass('animated flipInX');
    // $('.register_btn').addClass('animated flipInX');
    

    $('.intro_1_home').addClass('content_hidden');
    $('.intro_2').addClass('content_hidden');
    $('.footer').addClass('content_hidden');

    Parse.initialize("rrRPMw9cunDmhOU193LlY8dPqbunEi7ISMhJ5aBg", "lRYHDiN7OEJFjWXQIXDMZj6IJqjd13Z0c9LxFhuH");
    randomString();
  

    // $("#refresh_captcha").click(function(){
    //     randomString();
    // });


     
    function randomString() {
           // Genrate random string

        var chars = "123456789ABCDEFGHIJKLMNPQRSTUVWXTZ";

        var string_length = 5;  //Length of Captcha
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        // console.log(randomstring);
        // Getting canvas variable 
        var tCtx;
        if(!document.getElementById('textCanvas')){
            return;
        }else{
            tCtx = document.getElementById('textCanvas').getContext('2d');
        }

        tCtx.font= "normal 24px Verdana";  //set text fonts option for  canvas,html5 canvas: Text Option
        tCtx.strokeStyle = "#000000";    //html5 canvas: Text Option
        tCtx.clearRect(0,0,100,40);        //Clear previous Canvas for redraw our captcha
        tCtx.strokeText(randomstring,0,20,100);  //Stroke random string to canvas
        tCtx.textBaseline = "middle";                  //html5 canvas: Text Option,line in middle of text

        // imageElem.src = tCtx.canvas.toDataURL(); // provide canvas url to image src
        //image 
    }


    $("#createWindowYoutube").on('click', function(){
    $.Dialog({
        overlay: true,
        shadow: false,
        flat: true,
        icon: '<i class="icon-play"></i>',
        title: '預告搶先看',
        content: '',
        onShow: function(_dialog){
            var html = [
                '<iframe src="//player.vimeo.com/video/95352653" width="640" height="481" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
            ].join("");
            $.Dialog.content(html);
        }
    });
    });




    $(".applyWindow").on('click', function(){
    var context = "<i class='icon-checkmark'></i> <b>請務必詳細閱讀以下切結事項</b><ol><li>我對著日光燈發誓，今天本人所陳述的事情都是真的，絕無半點虛假。</li><li>我保證，今天秉持著朋友的情誼與信任，在場絕對不會偷生氣，偷生氣就喝涼水，並且日後不會有報復行為。</li><li>討論的事件，必須是自身相關，請勿爆料，留點故事給別人幹。活動過程中，如需問候其家人，只限一等親內。</li><li>活動過程中，可帶語助詞但是不能人身攻擊或帶有種族歧視意味。</li><li>活動過程中，請保持你的幽默感，認真就輸了！</li><li>當日活動，我只會帶著一顆會噗通噗通狂跳的心和會動的嘴巴，不會攜帶槍砲彈藥等危險物品，否則魯一輩子。</li><li>為了我的腎臟，我不會在現場喝飲料。</li><li><b>本活動的宗旨是維修各位的友誼，在活動結束後，決不向相關人士提起法律訴訟。</b></li></ol>";

    $.Dialog({
        overlay: true,
        shadow: false,
        flat: true,
        icon: '<i class="icon-libreoffice"></i>',
        title: '報名賭蘭切結書',
        content: '',
        width: 650,
        onShow: function(_dialog){
            var html = ['<div class="notice marker-on-top bg-white span7 offset1">'+context+'</div><br/><button class="large span6 offset1" id="apply_btn">點此視同同意以上事項，並進入報名頁面</button>'
            ].join("");
            $.Dialog.content(html);
            $('#apply_btn').click(function(e){
               document.location.href = '/dulamhua/signup';
            });
        }
    });
    });
    
    $('#apply_form').submit(function(e){
        e.preventDefault();
        var this_form = $(this).serializeArray();
        if(this_form[0].value==='' || this_form[1].value===''){
            var not2 = $.Notify.show("請務必輸入required欄位，謝謝");
            return;
        }else if(randomstring !== this_form[3].value){
            var not2 = $.Notify.show("請輸入正確驗證碼！");
            return
        }
        $('#send_btn').html('為您報名中...');

        var user = Parse.Object.extend("xdadsxxs1user");
        var pair = Parse.Object.extend("pair");
        var user = new user();
        var pair = new pair();
        user.save({names: this_form[0].value, method: this_form[1].value, others: this_form[2].value},
        {
              success: function(object) {
                var id = object.id;
                var names = Parse.Object.extend("nickname");
                var query = new Parse.Query(names);
                query.notEqualTo("createdAt", "2015-04-30T16:38:15.891Z");
                query.limit(1);
                query.find({
                  success: function(object) {
                      var deletedObj = object[0];
                      if(!deletedObj){
                         $('#send_btn').html('報名失敗!');
                         $('.apply_infor').html('<div class="panel bg-white"><div class="panel-header bg-lightBlue fg-white"><i class="icon-smiley"></i> 報名未開放或已截止</div><div class="panel-content"><h2>抱歉，報名已截止或未開放 :(</h2></div></div>');
                         return;
                      }
                      var nicknames = object[0].get('name');

                      deletedObj.destroy({
                            success: function(myObject) {
                                 pair.save({fluidId: id, name: nicknames},
                                 {
                                    success: function(object) {
                                           $('#send_btn').html('報名完成!');
                                            $('.apply_infor').html('<div class="panel bg-white"><div class="panel-header bg-lightBlue fg-white"><i class="icon-smiley"></i> 恭喜您成功取得賭爛資格</div><div class="panel-content"><h2>這是屬於您的小秘密:</h2><h2 class="fg-red">您的流水號: '+id+'</h2><h2 class="fg-red">您的暱稱為: '+nicknames+'</h2><h2>此資訊稍縱即逝，一旦重新整理頁面便無法重新取得，所以請務必<span class="fg-red">抄下或拍下以上資訊</span>，以便主持人於活動現場對號開始賭爛，另外，除非您身旁有第二人，不然只有您擁有此資訊，絕對地隱密。</h2></div></div>'); 
                                    },
                                    error: function(error) {
                                          $('#send_btn').html('報名失敗!');
                                          $('.apply_infor').html('<div class="panel bg-white"><div class="panel-header bg-lightBlue fg-white"><i class="icon-smiley"></i> 伺服器錯誤</div><div class="panel-content"><h2>抱歉，伺服器出現一點錯誤，請稍後或重新整理後繼續報名 :(</h2></div></div>');
                                    }
                                  });       
                            },
                            error: function(myObject, error) {
                                 $('#send_btn').html('報名失敗!');
                                 $('.apply_infor').html('<div class="panel bg-white"><div class="panel-header bg-lightBlue fg-white"><i class="icon-smiley"></i> 伺服器錯誤</div><div class="panel-content"><h2>抱歉，伺服器出現一點錯誤，請稍後或重新整理後繼續報名 :(</h2></div></div>');
                            }
                      });  
                  },
                  error: function(error) {
                    $('#send_btn').html('報名失敗!');
                                 $('.apply_infor').html('<div class="panel bg-white"><div class="panel-header bg-lightBlue fg-white"><i class="icon-smiley"></i> 伺服器錯誤</div><div class="panel-content"><h2>抱歉，伺服器出現一點錯誤，請稍後或重新整理後繼續報名 :(</h2></div></div>');
                  }
                });


               
              },
              error: function(object, error) {
                 $('#send_btn').html("報名尚未開放");
              }});
    });
    // slide.waypoint(function (event, direction) {
    //     dataslide = $(this).attr('data-slide');
    //     if (direction === 'down'){
    //         $('#navbar li[data-slide="'+dataslide+'"]').addClass('active').prev().removeClass('active');
    //         if(dataslide==2){
    //             $('#scrollToTop').fadeIn();                
    //             $('#scrollToTop').removeClass('content-hidden');
    //         }            
    //     }
    //     else{
    //         $('#navbar li[data-slide="'+dataslide+'"]').addClass('active').next().removeClass('active');
    //         if(dataslide==2){
    //             $('#scrollToTop').fadeOut();      
    //             $('#scrollToTop').addClass('content-hidden');
    //         }
    //     }
    // }, { offset: 73 });
 
    $('#scrollToTop').click(function (e){
         htmlbody.animate({
            scrollTop: 0
        }, 800, 'easeInOutQuint');
    });

    // mywindow.scroll(function () {
    //     if (mywindow.scrollTop() == 0) {
    //         $('#navbar li[data-slide="1"]').addClass('active');
    //         $('#navbar li[data-slide="2"]').removeClass('active');
    //     }
    // });

    // function goToByScroll(dataslide) {
    //     htmlbody.animate({
    //         scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top-71
    //     }, 1500, 'easeInOutQuint');

    //     scrolling = false;
    // }


    // links.click(function (e) {
    //     if(scrolling){
    //         return;
    //     }else{
    //         scrolling = true;
    //     }
    //     e.preventDefault();
    //     dataslide = $(this).attr('data-slide');
    //     goToByScroll(dataslide);
    // });


});

