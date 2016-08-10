(function(){
    //模拟单选
    var checkOnes = $('.j-sex').find('.check');
    checkOnes.on('click', function(){
        checkOnes.removeClass('checked')
        $(this).addClass('checked');
    });

    //模拟select下拉
    var selects = $('.club-a-select'),
        curPanel = selects.find('.club-a-selected'),
        sItem = selects.find('.club-a-select-item');

    curPanel.click(function(){
        var em = $(this).find('em');
        sItem.show().find('li').click(function(){
            em.html($(this).text());
            sItem.hide();
        });
    });
    $(document).click(function(e){
        var target = $(e.target);
        if($.isEmptyObject(target.closest('.club-a-selected')[0])){
            sItem.hide();
        }
    });

    //上传图片本地预览
    if($('.club-a-upload-file').length){
        uploadPic();
    }
    function uploadPic(){
        var uploadPic = $('.club-a-upload img')[0]; //获取显示图片的div元素
        var uploadFile = $('.club-a-upload-file')[0]; //获取选择图片的input元素
        //这边是判断本浏览器是否支持这个API。
        if(typeof FileReader==='undefined'){
            return false;
        }else{
            uploadFile.addEventListener('change',readFile,false); //如果支持就监听改变事件，一旦改变了就运行readFile函数。
        }
        function readFile(){
            var file = this.files[0]; //获取file对象
            //判断file的类型是不是图片类型。
            if(!/jpg|jpeg|png|gif/.test(file.type)){
                alert("格式不对！");
                return false;
            }

            var reader = new FileReader(); //声明一个FileReader实例
            reader.readAsDataURL(file); //调用readAsDataURL方法来读取选中的图像文件
            //最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片
            reader.onload = function(e){
                uploadPic.src = this.result;
            }
        }
    }


    //赛事回顾划过
    $('.j-back').find('li').on({
        'mouseenter' : function(){
            $(this).addClass('active').siblings().removeClass('active');
        },
        'mouseleave' : function(){
            $(this).removeClass('active');
        }
    });
})();