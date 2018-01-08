
/**
 * Created by Administrator on 2018/1/2.
 *  * options={
 *  callBack : function (res){}  // 返回选中的值 进行事件操作
 * }
 *  selected默认选择状态
 *  disabled不能选中
 */
;(function () {
    jQuery.fn.select = function (options){
        var defaults = {
            // callBack : function (res){},
            selected:null,
            disabled:true,
            wrapStyle: {
                top: '0',
                left: '0',
                width: '0',
                height: '0'
            }
        };
        var ops = $.extend({}, defaults, options);
        console.log(ops);
        //this指向$('.filter-box-jdf')
        var selectList = $(this).find('select.fromG-select-jdf option');
        var that = this;//重新保存this指向
        var html = '';
        // 读取select 标签的值
        html += '<ul class="filter-list">';
        $(selectList).each(function (idx, item){
            //获取select-options的值
            var val = $(item).val();
            //获取select的文本
            var valText = $(item).html();
            //<option value=""></option>添加selected
            var selected = $(item).attr('selected');
            //<option value=""></option>添加disabled
            var disabled = $(item).attr('disabled');
            //filter-selected控制颜色
            //如果option有selected 就添加filter-selected样式,否则为空
            var isSelected = selected ? 'filter-selected' : '';
            //如果option有disabled 就添加filter-disabled,否则为空
            var isDisabled = disabled ? 'filter-disabled' : '';
            if(selected) {
                html += '<li class="'+ isSelected +'" data-value="'+val+'"><a title="'+valText+'">'+valText+'</a></li>';
                //input天骄选中的值
                $(that).find('.filter-title-jdf').val(valText);
            }else if (disabled){
                html += '<li class="'+ isDisabled +'" data-value="'+val+'"><a>'+valText+'</a></li>';
            }else {
                html += '<li data-value="'+val+'"><a title="'+valText+'">'+valText+'</a></li>';
            };
        });
        html += '</ul>';
        $(that).append(html);//添加ul
        $(that).find('select.fromG-select-jdf').hide();
        //点击切换选择
        $(that).on('click', '.filter-input', function (){
            $(that).find('.filter-list').slideToggle(100);
            $(that).find('.filter-list').toggleClass('filter-open');
            $(that).find('.icon-filter-arrow').toggleClass('filter-show');
        });

        //点击选择列表,不包含filter-disabled
        $(that).find('.filter-list li').not('.filter-disabled').on('click', function (){
            //$(this)指向li
            //data() 方法向被选元素附加数据，或者从被选元素获取数据
            var val = $(this).data('value');
            var valText =  $(this).find('a').html();
            //input框放入获取的option文本
            $(that).find('.filter-title-jdf').val(valText);
            //filter-show控制箭头
            $(that).find('.icon-filter-arrow').toggleClass('filter-show');
            //filter-selected控制颜色
            $(this).addClass('filter-selected').siblings().removeClass('filter-selected');
            $(this).parent().slideToggle(50);
            //selectList是select.fromG-select-jdf option
            for(var i=0; i<selectList.length; i++){
                //获取select的value
                var selectVal = selectList.eq(i).val();
                //如果当前被选中的value等于option的value
                if(val == selectVal) {
                    $(that).find('select.fromG-select-jdf').val(val);
                };
            };
            // ops.callBack(val); //返回值
        });

        //其他元素被点击则收起选择,mousedown当按下鼠标按钮时，隐藏或显示元素
        $(document).on('mousedown', function(e){
            closeSelect(that, e);
        });
        $(document).on('touchstart', function(e){
            closeSelect(that, e);
        });

        function closeSelect(that, e) {
            var filter = $(that).find('.filter-list'),
                filterEl = $(that).find('.filter-list')[0];
            var filterBoxEl = $(that)[0];
            //e.target指向当前事件,不会改变指向
            var target = e.target;
            if(filterEl !== target && !$.contains(filterEl, target) && !$.contains(filterBoxEl, target)) {
                filter.slideUp(50);
                $(that).find('.filter-list').removeClass('filter-open');
                $(that).find('.icon-filter-arrow').removeClass('filter-show');
            };
        }
    };
})();



