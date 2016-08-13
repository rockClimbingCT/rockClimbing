(function(){
    //模拟单选
    $('.j-sex,.j-b-sex,.j-b-type').each(function(){
        var checkOnes = $(this).find('.check');
        checkOnes.on('click', function(){
            checkOnes.removeClass('checked')
            $(this).addClass('checked');
        });
    });


    //模拟select下拉
    $('.club-a-select').each(function(){
        var selects = $(this),
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
        var titleVal = $.trim($('.club-t-name-title').val()),
            nameVal = $.trim($('.club-t-name-pro').val());
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
        var titleVal = $.trim($('.club-d-name').val()),
            perVal = $.trim($('.club-d-per').val()),
            relateVal = $.trim($('.club-d-relate').val()),
            phoneVal = $.trim($('.club-d-phone').val()),
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
        var nameVal = $.trim($('.club-a-name').val()),
            authVal = $.trim($('.club-a-auth').val()),
            typeVal = $.trim($('.j-a-select').find('.club-a-selected em').html()),
            mailVal = $.trim($('.club-a-mail').val()),
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
            $('.j-a-select').parent().siblings('.club-error').html('请选择身份类型！').show();
            return false;
        }else{
            $('.j-a-select').parent().siblings('.club-error').hide();
        }
        if(mailVal == '' || !mailReg.test(mailVal)){
            $('.club-a-mail').parent().siblings('.club-error').html('请输入正确的邮箱！').show();
            return false;
        }else{
            $('.club-a-mail').parent().siblings('.club-error').hide();
        }
    });

    //性别、身份类型的隐藏域赋值
    $('.j-sex .check,.j-b-sex .check,.j-b-type .check').on('click', function(){
        $(this).parents('.club-t-items-para').siblings('.club-hidden-sex').val($(this).siblings().html());
    });

    $('.j-a-select .club-a-select-item,.j-b-select .club-a-select-item,.j-b-stand .club-a-select-item').find('li').on('click', function(){
        $(this).parents('.club-t-items-para').siblings('.club-hidden-type').val($(this).text());
    });

    $('.con-select').each(function(){
        var selects = $(this),
            curPanel = selects.find('.con-select-text'),
            sItem = selects.find('.con-select-item');

        curPanel.click(function(){
            var em = $(this).find('em');
            sItem.show().find('li').click(function(){
                em.html($(this).text());
                sItem.hide();
            });
        });
        $(document).click(function(e){
            var target = $(e.target);
            if($.isEmptyObject(target.closest('.con-select-text')[0])){
                sItem.hide();
            }
        });
    });

    //取消报名验证
    $('.club-reg-c').on('submit', function(){
        var nameVal = $.trim($('.club-reg-c-name').val()),
            authVal = $.trim($('.club-reg-c-auth').val()),
            numVal = $.trim($('.club-reg-c-num').val());

        if(nameVal == ''){
            $('.club-reg-c-name').parent().siblings('.club-error').html('姓名不能为空！').show();
            return false;
        }else{
            $('.club-reg-c-name').parent().siblings('.club-error').hide();
        }
        if(authVal == ''){
            $('.club-reg-c-auth').parent().siblings('.club-error').html('证件号码不能为空！').show();
            return false;
        }else{
            $('.club-reg-c-auth').parent().siblings('.club-error').hide();
        }
        if(numVal == ''){
            $('.club-reg-c-num').parent().siblings('.club-error').html('报名号码不能为空！').show();
            return false;
        }else{
            $('.club-reg-c-num').parent().siblings('.club-error').hide();
        }
    });

    //多选框
    var checkOnes = $('.j-b-id .check,.j-b-items .check');

    checkOnes.on('click', function() {
        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');
        } else {
            $(this).addClass('checked');
        }
    });

    $('.club-b-textarea textarea').on({
        'input propertychange' : function(){
            $('.club-b-static em').html($.trim($(this).val()).length);
        }
    });

    $('.j-b-id .check').on('click', function(){
        var array = [];
        $('.j-b-id .checked').each(function(){
            array.push($(this).siblings().html());
        });
        $(this).parents('.club-t-items-para').siblings('.j-hidden-box').val(array.join(','));
    });
    $('.j-b-items .check').on('click', function(){
        var array = [];
        $('.j-b-items .checked').each(function(){
            array.push($(this).siblings().html());
        });
        $(this).parents('.club-t-items-para').siblings('.j-hidden-box').val(array.join(','));
    });

    $('.club-b-form').on('submit', function(){
        var nameVal = $.trim($('.club-b-name').val()),                  //姓名
            idVal = $.trim($('.club-b-id').val()),                      //证件号码
            sexVal = $.trim($('.j-b-sex .club-hidden-sex').val()),      //性别
            ageVal = $.trim($('.j-b-select').parent().siblings('.club-hidden-type').val()),  //年龄
            phoneVal = $.trim($('.club-b-phone').val()),                //联系电话
            mailVal = $.trim($('.club-b-mail').val()),                  //电子邮件
            regVal = $.trim($('.j-b-type .club-hidden-sex').val()),      //户籍类型
            perval = $.trim($('.j-b-id .j-hidden-box').val()),          //参赛身份
            itemsVal = $.trim($('.j-b-items .j-hidden-box').val()),     //参赛项目
            standVal = $.trim($('.j-b-stand .club-hidden-type').val()), //代 表 队
            boxVal = $.trim($('.club-b-textBox textarea').val()),       //其他代表队
            mailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;

        if(nameVal == ''){
            $('.club-b-name').parent().siblings('.club-error').html('姓名不能为空！').show();
            return false;
        }else{
            $('.club-b-name').parent().siblings('.club-error').hide();
        }
        if(idVal == ''){
            $('.club-b-id').parent().siblings('.club-error').html('证件号码不能为空！').show();
            return false;
        }else{
            $('.club-b-id').parent().siblings('.club-error').hide();
        }
        if(ageVal == ''){
            $('.j-b-select').parent().siblings('.club-error').html('年龄不能为空！').show();
            return false;
        }else{
            $('.j-b-select').parent().siblings('.club-error').hide();
        }
        if(phoneVal == ''){
            $('.club-b-phone').parent().siblings('.club-error').html('联系电话不能为空！').show();
            return false;
        }else{
            $('.club-b-phone').parent().siblings('.club-error').hide();
        }
        if(mailVal == '' || !mailReg.test(mailVal)){
            $('.club-b-mail').parent().siblings('.club-error').html('请输入正确的电子邮件！').show();
            return false;
        }else{
            $('.club-b-mail').parent().siblings('.club-error').hide();
        }
        if(perval == ''){
            $('.j-b-id .club-b-box').parent().siblings('.club-error').html('参赛身份不能为空！').show();
            return false;
        }else{
            $('.j-b-id .club-b-box').parent().siblings('.club-error').hide();
        }
        if(itemsVal == ''){
            $('.j-b-items .club-b-box').parent().siblings('.club-error').html('参赛项目不能为空！').show();
            return false;
        }else{
            $('.j-b-items .club-b-box').parent().siblings('.club-error').hide();
        }
        if(boxVal == ''){
            $('.club-b-textBox').parent().siblings('.club-error').html('其他代表队信息不能为空！').show();
            return false;
        }else{
            $('.club-b-textBox').parent().siblings('.club-error').hide();
        }
    });
})();