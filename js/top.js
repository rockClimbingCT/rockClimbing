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

    //俱乐部冠名验证
    $('.club-t-form').on('submit', function(){
        var titleVal = $('.club-t-name-title').val(),
            nameVal = $('.club-t-name-pro').val();
        if(titleVal == ''){
            $('.club-t-name-title').parent().siblings('.club-error').html('冠名商名称不能为空！').show();
            return false;
        }else{
            $('.club-t-name-title').parent().siblings('.club-error').hide();
        }
        if(nameVal == ''){
            $('.club-t-name-pro').parent().siblings('.club-error').html('代表队名称不能为空！').show();
            return false;
        }else{
            $('.club-t-name-pro').parent().siblings('.club-error').hide();
        }
    });

    //俱乐部资料验证
    $('.club-d-form').on('submit', function(){
        var titleVal = $('.club-d-name').val(),
            perVal = $('.club-d-per').val(),
            relateVal = $('.club-d-relate').val(),
            phoneVal = $('.club-d-phone').val(),
            phoneReg = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;

        if(titleVal == ''){
            $('.club-d-name').parent().siblings('.club-error').html('名称不能为空！').show();
            return false;
        }else{
            $('.club-d-name').parent().siblings('.club-error').hide();
        }
        if(perVal == ''){
            $('.club-d-per').parent().siblings('.club-error').html('法人不能为空！').show();
            return false;
        }else{
            $('.club-d-per').parent().siblings('.club-error').hide();
        }
        if(relateVal == ''){
            $('.club-d-relate').parent().siblings('.club-error').html('联系人不能为空！').show();
            return false;
        }else{
            $('.club-d-relate').parent().siblings('.club-error').hide();
        }
        if(phoneVal == '' || !phoneReg.test(phoneVal)){
            $('.club-d-phone').parent().siblings('.club-error').html('请输入正确的电话！').show();
            return false;
        }else{
            $('.club-d-phone').parent().siblings('.club-error').hide();
        }
    });

    //添加运动员验证
    $('.club-a-form').on('submit', function(){
        var nameVal = $('.club-a-name').val(),
            authVal = $('.club-a-auth').val(),
            typeVal = $('.club-a-select').find('.club-a-selected em').html(),
            mailVal = $('.club-a-mail').val(),
            mailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;

        if(nameVal == ''){
            $('.club-a-name').parent().siblings('.club-error').html('姓名不能为空！').show();
            return false;
        }else{
            $('.club-a-name').parent().siblings('.club-error').hide();
        }
        if(authVal == ''){
            $('.club-a-auth').parent().siblings('.club-error').html('证件号码不能为空！').show();
            return false;
        }else{
            $('.club-a-auth').parent().siblings('.club-error').hide();
        }
        if(typeVal == '请选择'){
            $('.club-a-select').parent().siblings('.club-error').html('请选择身份类型！').show();
            return false;
        }else{
            $('.club-a-select').parent().siblings('.club-error').hide();
        }
        if(mailVal == '' || !mailReg.test(mailVal)){
            $('.club-a-mail').parent().siblings('.club-error').html('请输入正确的邮箱！').show();
            return false;
        }else{
            $('.club-a-mail').parent().siblings('.club-error').hide();
        }
    });

    //性别、身份类型的隐藏域赋值
    $('.club-a-sex .check').on('click', function(){
        if($(this).siblings().html() == '男' ){
            $('.club-hidden-sex').val('男');
        }else{
            $('.club-hidden-sex').val('女');
        }
    });

    $('.club-a-select .club-a-select-item').find('li').on('click', function(){
        if($(this).text() == '中国大陆'){
            $('.club-hidden-type').val('中国大陆');
        }else if($(this).text() == '港澳台地区'){
            $('.club-hidden-type').val('港澳台地区');
        }
    });
})();