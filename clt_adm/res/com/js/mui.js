//a b c d e f g h i j k l m n o p q r s t u v w x y z
var mpage = {};//old
var mdata = {};//my data
var mcr = {};//my core
var mpg = {};//my page
var mui = {};//my ui
////////->mcr
//c_init -> c_load
mcr.c_init = function(){
    var $mcr = this;
    $mcr.c_load = $.noop;//mrc ctl load
    $mcr.c_a = $.noop;//in after->c_aa
    $mcr.c_aa = $.noop;//out after
    $mcr.c_b = $.noop;//in before->c_bb
    $mcr.c_bb = $.noop;//out before->c_d
    $mcr.c_c = $.noop;//create->c_a
    $mcr.c_close = $.noop;
    $mcr.c_d = $.noop;//data processing->c_c
    $mcr.c_e = $.noop;
    $mcr.c_ee = $.noop;
    $mcr.m_datac = {};//last data
    $mcr.m_dataf = {};//form data
    //local data
    $mcr.m_datal = {'v_data':{},'v_ele':{},'v_tpls':{'idx':$.noop},'v_stv':null,'v_ts':0,'v_tsc':0,'v_tsce':0,'v_post':true,'v_url':'v_url','v_chg':false,'v_attr':{}};
    $mcr.m_datao = {};//old data
    $mcr.m_datag = {};//new data
}
mcr.c_render = function(){
    var $mcr = this;
    $mcr.c_b();
    $mcr.c_bb();
    $mcr.v_render();
}
mcr.v_render = function(){
    var $mcr = this;
    if($mcr.m_datal.v_post == true){
        $.post($mcr.m_datal.v_url,$mcr.m_dataf,function(json){
            $mcr.m_datag = json;
            $mcr.v_load();
        },'json');
    }else{
        $mcr.v_load();
    }
    clearInterval($mcr.m_datal.v_stv);
    if($mcr.m_datal.v_ts >= 1){
        if($mcr.m_datal.v_tsce <= 0){
            $mcr.m_datal.v_stv = setInterval(function(){
                $mcr.v_render();
            },$mcr.m_datal.v_ts);
        }else if($mcr.m_datal.v_tsce > $mcr.m_datal.v_tsc + 1){
            $mcr.m_datal.v_tsc = $mcr.m_datal.v_tsc + 1;
            $mcr.m_datal.v_stv = setInterval(function(){
                $mcr.v_render();
            },$mcr.m_datal.v_ts);
        }
    }
}
mcr.v_load = function(){
    var $mcr = this;
    if($mcr.m_datal.v_chg){
        if($mcr.m_datao != $mcr.m_datag){
            $mcr.m_datao = $mcr.m_datag;
            $mcr.c_d();
            $mcr.v_view();
        }
    }else{
        $mcr.m_datao = $mcr.m_datag;
        $mcr.c_d();
        $mcr.v_view();
    }
}
mcr.v_view = function(){
    var $mcr = this;
    $mcr.c_c();
    $mcr.c_a();
    $mcr.c_aa();
}
////////<-mcr
//>>>mui-btn
mui.btn = {};
//>mui-btn-btn
mui.btn.add = function(){
    var $cn = arguments[0]?arguments[0]:'btn-add';//cname
    var $v = arguments[1]?arguments[1]:'添加';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-add <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-plus"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.addi = function(){
    var $cn = arguments[0]?arguments[0]:'btn-add';//cname
    var $val = arguments[1];//val
    var $t = arguments[2]?arguments[2]:'添加';//title
    var $disa = arguments[3]?arguments[3]:false;//disable
    var $tpl = _.template(''+
    '<i val="<%=$val%>" class="mui-btn-addi fa fa-plus <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$val:$val,$t:$t,$disa:$disa});
}
mui.btn.btn = function(){
    var $cn = arguments[0]?arguments[0]:'btn-name';//cname
    var $v = arguments[1]?arguments[1]:'按钮';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-btn <%=$cn%> <%if($disa){%>mui-disable<%}%>"><%=$v%></span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.del = function(){
    var $cn = arguments[0]?arguments[0]:'btn-del';//cname
    var $v = arguments[1]?arguments[1]:'删除';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-del <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-remove"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.deli = function(){
    var $cn = arguments[0]?arguments[0]:'btn-del';//cname
    var $t = arguments[1]?arguments[1]:'删除';//title
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<i class="mui-btn-deli fa fa-remove <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$t:$t,$disa:$disa});
}
mui.btn.dels = function(){
    var $cn = arguments[0]?arguments[0]:'btn-dels';//cname
    var $v = arguments[1]?arguments[1]:'批量删除';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-dels <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-trash-o"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.delsi = function(){
    var $cn = arguments[0]?arguments[0]:'btn-dels';//cname
    var $t = arguments[1]?arguments[1]:'批量删除';//title
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<i class="mui-btn-delsi fa fa-trash-o <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$t:$t,$disa:$disa});
}
mui.btn.delss = function(){
    var $cn = arguments[0]?arguments[0]:'btn-delss';//cname
    var $v = arguments[1]?arguments[1]:'清空';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-delss <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-recycle"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.delssi = function(){
    var $cn = arguments[0]?arguments[0]:'btn-delss';//cname
    var $t = arguments[1]?arguments[1]:'清空';//title
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<i class="mui-btn-delssi fa fa-recycle <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$t:$t,$disa:$disa});
}
mui.btn.edit = function(){
    var $cn = arguments[0]?arguments[0]:'btn-edit';//cname
    var $v = arguments[1]?arguments[1]:'编辑';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-edit <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-pencil-square-o"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.editi = function(){
    var $cn = arguments[0]?arguments[0]:'btn-edit';//cname
    var $t = arguments[1]?arguments[1]:'编辑';//title
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<i class="mui-btn-editi fa fa-pencil-square-o <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$t:$t,$disa:$disa});
}
mui.btn.next = function(){
    var $cn = arguments[0]?arguments[0]:'btn-next';//cname
    var $v = arguments[1]?arguments[1]:'下一页';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-next <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-step-forward"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.nexti = function(){
    var $cn = arguments[0]?arguments[0]:'btn-next';//cname
    var $t = arguments[1]?arguments[1]:'下一页';//title
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<i class="mui-btn-nexti fa fa-step-forward <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$t:$t,$disa:$disa});
}
mui.btn.nnext = function(){
    var $cn = arguments[0]?arguments[0]:'btn-nnext';//cname
    var $v = arguments[1]?arguments[1]:'尾页';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-nnext <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-fast-forward"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.nnexti = function(){
    var $cn = arguments[0]?arguments[0]:'btn-nnext';//cname
    var $t = arguments[1]?arguments[1]:'尾页';//title
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<i class="mui-btn-nnexti fa fa-fast-forward <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$t:$t,$disa:$disa});
}
mui.btn.ppre = function(){
    var $cn = arguments[0]?arguments[0]:'btn-ppre';//cname
    var $v = arguments[1]?arguments[1]:'首页';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-ppre <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-fast-backward"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.pprei = function(){
    var $cn = arguments[0]?arguments[0]:'btn-ppre';//cname
    var $t = arguments[1]?arguments[1]:'首页';//title
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<i class="mui-btn-pprei fa fa-fast-backward <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$t:$t,$disa:$disa});
}
mui.btn.pre = function(){
    var $cn = arguments[0]?arguments[0]:'btn-pre';//cname
    var $v = arguments[1]?arguments[1]:'上一页';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-pre <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-step-backward"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.prei = function(){
    var $cn = arguments[0]?arguments[0]:'btn-pre';//cname
    var $t = arguments[1]?arguments[1]:'上一页';//title
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<i class="mui-btn-prei fa fa-step-backward <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$t:$t,$disa:$disa});
}
mui.btn.refresh = function(){
    var $cn = arguments[0]?arguments[0]:'btn-refresh';//cname
    var $v = arguments[1]?arguments[1]:'刷新';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-refresh <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-refresh"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.refreshi = function(){
    var $cn = arguments[0]?arguments[0]:'btn-refresh';//cname
    var $t = arguments[1]?arguments[1]:'刷新';//title
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<i class="mui-btn-refreshi fa fa-refresh <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$t:$t,$disa:$disa});
}
mui.btn.set = function(){
    var $cn = arguments[0]?arguments[0]:'btn-edit';//cname
    var $v = arguments[1]?arguments[1]:'设置';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-btn-set <%=$cn%> <%if($disa){%>mui-disable<%}%>">'+
        '<i class="fa fa-cog"></i>'+
        '<span><%=$v%></span>'+
    '</span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
mui.btn.seti = function(){
    var $cn = arguments[0]?arguments[0]:'btn-edit';//cname
    var $val = arguments[1];//value
    var $t = arguments[2]?arguments[2]:'设置';//title
    var $disa = arguments[3]?arguments[3]:false;//disable
    var $tpl = _.template(''+
    '<i val="<%=$val%>" class="mui-btn-seti fa fa-cog <%=$cn%> <%if($disa){%>mui-disable<%}%>" title="<%=$t%>"></i>'+
    '');
    return $tpl({$cn:$cn,$val:$val,$t:$t,$disa:$disa});
}
//<<<mui-btn
//>>>mui-des
mui.des = {};
mui.des.txt = function(){
    var $cn = arguments[0]?arguments[0]:'des-txt';//cname
    var $v = arguments[1]?arguments[1]:'描述';//value
    var $disa = arguments[2]?arguments[2]:false;//disable
    var $tpl = _.template(''+
    '<span class="mui-des-txt <%=$cn%><%if($disa){%> mui-disable<%}%>"><%=$v%></span>'+
    '');
    return $tpl({$cn:$cn,$v:$v,$disa:$disa});
}
//<<<mui-des
//>>>mui-ele
mui.ele = {};
//>mui-ele-btn_btn
mui.ele.btn_btn = function(){
    var $attr = {};
    $attr.ele_nn = arguments[0]?arguments[0]:'ele_btn_nn';
    $attr.ele_n = arguments[1]?arguments[1]:'ele_btn_n';
    $attr.ele_v = arguments[2];
    $attr.ele_ty = 'mui-ele-btn-btn';
    var $tpl = _.template(''+
    '<span ele_ty="<%=$attr.ele_ty%>" ele_nn="<%=$attr.ele_nn%>" ele_n="<%=$attr.ele_n%>"><%=$attr.ele_v%></span>'+
    '');
    return $tpl({$attr:$attr});
}
//<mui-ele-btn_btn
//>mui-ele-ckb
mui.ele.ckb = function(){
    var $attr = {};
    $attr.ele_nn = arguments[0]?arguments[0]:'ele_nn';
    $attr.ele_n = arguments[1]?arguments[1]:'ele_n';
    $attr.ele_v = arguments[2]?'on':'off';
    $attr.ele_des = arguments[3]?arguments[3]:'';
    $attr.ele_cn = arguments[4]?arguments[4]:'ele_cn';
    $attr.ele_ty = 'mui-ele-ckb';
    var $tpl = _.template(''+
    '<span ele_ty="<%=$attr.ele_ty%>" ele_nn="<%=$attr.ele_nn%>" ele_n="<%=$attr.ele_n%>" ckd="<%if($attr.ele_v=="on"){%>on<%}else{%>off<%}%>" class="<%=$attr.ele_cn%>">'+
        '<i class="fa fa-check-square-o"></i><span><%=$attr.ele_des%></span>'+
    '</span>'+
    '');
    return $tpl({$attr:$attr});
}
//<mui-ele-ckb
//>mui-ele-des
mui.ele.des = function(){
    var $attr = {};
    $attr.ele_nn = arguments[0]?arguments[0]:'ele_nn';
    $attr.ele_n = arguments[1]?arguments[1]:'ele_n';
    $attr.ele_des = arguments[2]?arguments[2]:'';
    $attr.ele_cn = arguments[3]?arguments[3]:'ele_cn';
    $attr.ele_ty = 'mui-ele-des';
    var $tpl = _.template(''+
    '<span ele_ty="<%=$attr.ele_ty%>" ele_nn="<%=$attr.ele_nn%>" ele_n="<%=$attr.ele_n%>" class="<%=$attr.ele_cn%>">'+
        '<%=$attr.ele_des%>'+
    '</span>'+
    '');
    return $tpl({$attr:$attr});
}
//<mui-ele-des
//>mui-ele-text
mui.ele.text = function(){
    var $attr = {};
    $attr.ele_nn = arguments[0]?arguments[0]:'ele_nn';
    $attr.ele_n = arguments[1]?arguments[1]:'ele_n';
    $attr.ele_v = arguments[2];
    $attr.ele_cn = arguments[3]?arguments[3]:'ele_cn';
    $attr.ele_ty = 'mui-ele-text';
    var $tpl = _.template(''+
    '<input ele_ty="<%=$attr.ele_ty%>" ele_nn="<%=$attr.ele_nn%>" ele_n="<%=$attr.ele_n%>" class="<%=$attr.ele_cn%>" type="text" value="<%=$attr.ele_v%>" />'+
    '');
    return $tpl({$attr:$attr});
}
//<mui-ele-des
//<<<mui-ele
//>>>mui-ipt
mui.ipt = {};
mui.ipt.ckb = function(){
    var $n = arguments[0];//name
    var $v = arguments[1];//value
    var $ckd = arguments[2]?arguments[2]:false;//[true|false]
    var $tpl = _.template(''+
    '<span class="mui-ipt-ckb <%if($ckd){%>mui-ipt-ckb-ckd<%}%>">'+
        '<i class="fa fa-check-square-o"></i>'+
        '<input type="checkbox" name="<%=$n%>" value="<%=$v%>" <%if($ckd){%>checked<%}%> />'+
    '</span>'+
    '');
    return $tpl({$n:$n,$v:$v,$ckd:$ckd});
}
mui.ipt.ckb_evt = function(){
    $('body').on('click','.mui-ipt-ckb',function(){
        if($(this).children('input[type="checkbox"]').prop('checked')){
            $(this).children('input[type="checkbox"]').prop('checked',false);
            $(this).removeClass('mui-ipt-ckb-ckd');
        }else{
            $(this).children('input[type="checkbox"]').prop('checked',true);
            $(this).addClass('mui-ipt-ckb-ckd');
        }
    });
}
mui.ipt.slt = function(){
    var $name = arguments[0]?arguments[0]:'';//input name
    var $kvs = arguments[1]?arguments[1]:{};
    var $sltd = arguments[2]?arguments[2]:'';//['k1',..]
    var $up_down = arguments[3]?arguments[3]:'down';//['up'|'down']
    var $tpl = _.template(''+
    '<span class="mui-ipt-slt mui-ipt-slt-<%=$up_down%>">'+
        '<span class="mui-ipt-slt-l">'+
            '<%_.each($kvs,function($v,$k){%>'+
            '<span class="mui-ipt-slt-opt <%if($k==$sltd){%>mui-ipt-sltd<%}%>" value="<%=$k%>"><%=$v%></span>'+
            '<%});%>'+
        '</span>'+
        '<span class="mui-ipt-slt-v"><span class="mui-ipt-slt-des"><%=$kvs[$sltd]%></span><input class="mui-ipt-slt-n" type="hidden" name="<%=$name%>" value="<%=$sltd%>" /></span>'+
        '<span class="mui-ipt-slt-r"><i class="fa fa-sort-down"></i></span>'+
    '</span>'+
    '');
    return $tpl({$name:$name,$kvs:$kvs,$sltd:$sltd,$up_down:$up_down});
}
mui.ipt.slt_evt = function(){
    $('body').on('click','.mui-ipt-slt-r',function(){
        var this_r = $(this).parents('.mui-ipt-slt');
        if($(this_r).children('.mui-ipt-slt-l').is(':visible')){
            $(this_r).children('.mui-ipt-slt-l').hide();
        }else{
            if($(this_r).hasClass('mui-ipt-slt-up')){
                $(this_r).find('.mui-ipt-slt-opt').css({'top':'calc(-'+100*$(this_r).find('.mui-ipt-slt-opt').length+'% - 2px)'});
            }else{
                $(this_r).find('.mui-ipt-slt-opt').css({'top':'calc(100% + 1px)'});
            }
            $(this_r).children('.mui-ipt-slt-l').show();
        }
    });
    $('body').on('click','.mui-ipt-slt-opt',function(){
        var this_r = $(this).parents('.mui-ipt-slt');
        $(this_r).find('.mui-ipt-slt-opt').removeClass('mui-ipt-sltd');
        $(this).addClass('mui-ipt-sltd');
        $(this_r).find('.mui-ipt-slt-des').html($(this).html());
        $(this_r).find('.mui-ipt-slt-n').val($(this).attr('value'));
        $(this_r).find('.mui-ipt-slt-r').click();
        $(this_r).find('input').trigger('change');
    });
}
mui.ipt.text = function(){
    var $n = arguments[0]?arguments[0]:'ipt_name';//input name
    var $v = arguments[1];//input value
    var $cn = arguments[2]?arguments[2]:'ipt-text';//class name
    var $disa = arguments[3]?arguments[3]:false;//disable
    var $tpl = _.template(''+
    '<input<%if($disa){%> disabled<%}%> name="<%=$n%>" class="mui-ipt-text <%=$cn%>" type="text" value="<%=$v%>" />'+
    '');
    return $tpl({$n:$n,$v:$v,$cn:$cn,$disa:$disa});
}
//<<<mui-ipt
//>>>mui-lyt
mui.lyt = {};
//>mui-lyt-cr
mui.lyt.cr = {};
mui.lyt.cr.c_a = function(){
    $.noop;
};
mui.lyt.cr.c_b = function(){
    var $mcr = this;
    $mcr.c_d = mui.lyt.cr.c_d;
    $mcr.c_c = mui.lyt.cr.c_c;
    $mcr.c_a = mui.lyt.cr.c_a;
    $mcr.m_datal.v_tpls.idx = mui.lyt.cr.tpls_idx;
    $mcr.m_datal.v_post = false;
    $mcr.m_datal.v_attr = {
        'tgt':'',//.cn|#id
        'id':'',//id
        'cn':'cr_n',//cn
        'cr_c':[
            {'cr_r':[
                {'html':$.noop,'cn':'cn_n1','gridn':'gridn'},
                {'html':$.noop,'cn':'cn_n2','gridn':'gridn'}
            ]},
            {'cr_r':[
                {'html':$.noop,'cn':'cn_n3','gridn':'gridn'}
            ]},
        ],
    };
}
mui.lyt.cr.c_c = function(){
    var $mcr = this;
    $($mcr.m_datal.v_attr.tgt).html($mcr.m_datal.v_tpls.idx($mcr));
}
mui.lyt.cr.c_d = function(){
    $.noop;
};
mui.lyt.cr.c_load = function(){
    var $mcr = this;
    $mcr.c_b = mui.lyt.cr.c_b;
    $mcr.c_render();
}
mui.lyt.cr.obj = function(){
    var $mcr = _.extend({},mcr);
    $mcr.c_init();
    $mcr.c_load = mui.lyt.cr.c_load;
    return $mcr;
}
mui.lyt.cr.tpls_idx = function($mcr){
    var tpl = _.template('<div lyt_ty="cr" class="<%=$mcr.m_datal.v_attr.cn%>" id="<%=$mcr.m_datal.v_attr.id%>">'+
        '<%_.each($mcr.m_datal.v_attr.cr_c,function($v1,$k1,$l1){%>'+
            '<div lyt_tyt="cr-c" lyt_tyn="cr-c-<%=$k1%>">'+
            '<%_.each($v1.cr_r,function($v2,$k2,$l2){%>'+
                '<div lyt_tyt="cr-r" lyt_tyn="cr-r-<%=$k1%>" class="<%=$v2.cn%>" gridn="<%=$v2.gridn%>"><%=$v2.html({$mcr:$mcr})%></div>'+
            '<%});%>'+
            '</div>'+
        '<%});%>'+
    '</div>');
    return tpl({$mcr:$mcr});
}
//<mui-lyt-cr
//>mui-lyt-rc
mui.lyt.rc = {};
mui.lyt.rc.c_a = function(){
}
mui.lyt.rc.c_b = function(){
    var $mcr = this;
    $mcr.c_d = mui.lyt.rc.c_d;
    $mcr.c_c = mui.lyt.rc.c_c;
    $mcr.c_a = mui.lyt.rc.c_a;
    $mcr.m_datal.v_tpls.idx = mui.lyt.rc.tpls_idx;
    $mcr.m_datal.v_post = false;
    $mcr.m_datal.v_attr = {
        'tgt':'#mvtgt_mbox',
        'id':'lyt-rc-name',
        'cele_r':[
            {'cele_c':[
                {'html':$.noop},
                {'html':$.noop}
            ]},
            {'cele_c':[
                {'html':$.noop},
                {'html':$.noop}
            ]}
        ],
    };
}
mui.lyt.rc.c_c = function(){
    var $mcr = this;
    $($mcr.m_datal.v_attr.tgt).html($mcr.m_datal.v_tpls.idx($mcr));
}
mui.lyt.rc.c_d = function(){
    var $mcr = this;
    if($mcr.m_datao.success == true){
        $mcr.m_datac = $mcr.m_datao.data;
    }
}
mui.lyt.rc.c_load = function(){
    var $mcr = this;
    $mcr.c_b = mui.lyt.rc.c_b;
    $mcr.c_render();
}
mui.lyt.rc.obj = function(){
    var $mcr = _.extend({},mcr);
    $mcr.c_init();
    $mcr.c_load = mui.lyt.rc.c_load;
    return $mcr;
}
mui.lyt.rc.tpls_idx = function($mcr){
    var tpl = _.template(''+
    '<div class="mui-lyt-rc" id="<%=$mcr.m_datal.v_attr.id%>">'+
        '<%_.each($mcr.m_datal.v_attr.cele_r,function($v1,$k1,$l1){%>'+
            '<div class="mui-lyt-rc-row mui-lyt-rc-row-<%=$k1%>">'+
            '<%_.each($v1.cele_c,function($v2,$k2,$l2){%>'+
                '<div class="mui-lyt-rc-row-col mui-lyt-rc-row-col-<%=$k2%>"><%=$v2.html({$mcr:$mcr})%></div>'+
            '<%});%>'+
            '</div>'+
        '<%});%>'+
    '</div>');
    return tpl({$mcr:$mcr});
}
//<mui-lyt-div
//<<<mui-lyt
//>>>mui-page
mui.page = {};
//<<<mui-page
//>>>mui-plug
//>mui-plug-base
mui.plug = {};
mui.plug.base = {};
mui.plug.base.c_a = function(){
    $.noop;
}
mui.plug.base.c_b = function(){
    var $mcr = this;
    $mcr.c_d = mui.plug.base.c_d;
    $mcr.c_c = mui.plug.base.c_c;
    $mcr.c_a = mui.plug.base.c_a;
    $mcr.m_datal.v_post = true;
    $mcr.m_datal.v_url = 'base_url';
    $mcr.m_dataf.sub = 1;
}
mui.plug.base.c_c = function(){
    $.noop;
}
mui.plug.base.c_d = function(){
    var $mcr = this;
    $mcr.m_datac = $mcr.m_datao;
}
mui.plug.base.c_load = function(){
    var $mcr = this;
    $mcr.c_b = mui.plug.base.c_b;
    $mcr.c_render();
}
mui.plug.base.obj = function(){
    var $mcr = _.extend({},mcr);
    $mcr.c_init();
    $mcr.c_load = mui.plug.base.c_load;
    return $mcr;
}
//<mui-plug-base
//>mui-plug-grid
mui.plug.grid = {};
mui.plug.grid.c_a = function(){
    var $mcr = this;
    var $tgt = '.'+$mcr.m_datal.v_attr.cn;
    var $tgt_gpage = $tgt+' .mui-plug-grid-page';
    var $page_count = Math.ceil($mcr.m_datac.data_count/$mcr.m_dataf.page_per);
    $($tgt_gpage+'>.btn-ppre').on('click',function(){
        if(!$(this).hasClass('mui-disable')){
            $mcr.m_dataf.page_now = 1;
            $mcr.v_render();
        }
    });
    $($tgt_gpage+'>.btn-pre').on('click',function(){
        if(!$(this).hasClass('mui-disable')){
            $mcr.m_dataf.page_now = $mcr.m_dataf.page_now - 1;
            $mcr.v_render();
        }
    });
    $($tgt_gpage+'>.btn-next').on('click',function(){
        if(!$(this).hasClass('mui-disable')){
            $mcr.m_dataf.page_now = $mcr.m_dataf.page_now + 1;
            $mcr.v_render();
        }
    });
    $($tgt_gpage+'>.btn-nnext').on('click',function(){
        if(!$(this).hasClass('mui-disable')){
            $mcr.m_dataf.page_now = $page_count;
            $mcr.v_render();
        }
    });
    $($tgt_gpage+' .mui-ipt-slt input').on('change',function(){
        $mcr.m_dataf.page_now = 1;
        $mcr.m_dataf.page_per = $(this).val();
        $mcr.v_render();
    });
    $($tgt_gpage+'>.btn-refresh').on('click',function(){
        $mcr.v_render();
    });
    $($tgt_gpage+'>.page-now').on('keydown',function(evt){
        if(evt.keyCode==13){
            var $page_now = parseInt($(this).val());
            if(_.isNaN($page_now)){
                $page_now = 1;
            }else if($page_now < 1){
                $page_now = 1;
            }else if($page_now >= $page_count){
                $page_now = $page_count;
            }
            $mcr.m_dataf.page_now = $page_now;
            $mcr.v_render();
        }
    });
    $($tgt+' input[name="gckba"]').parent('.mui-ipt-ckb').on('click',function(){
        if($(this).children('input').prop('checked')){
            $($tgt+' input[name="gckb"]').prop('checked',false);
            $($tgt+' input[name="gckb"]').parent('.mui-ipt-ckb').removeClass('mui-ipt-ckb-ckd');
        }else{
            $($tgt+' input[name="gckb"]').prop('checked',true);
            $($tgt+' input[name="gckb"]').parent('.mui-ipt-ckb').addClass('mui-ipt-ckb-ckd');
        }
    });
}
mui.plug.grid.c_b = function(){
    var $mcr = this;
    $mcr.c_d = mui.plug.grid.c_d;
    $mcr.c_c = mui.plug.grid.c_c;
    $mcr.c_a = mui.plug.grid.c_a;
    $mcr.m_dataf.page_now = 1;
    $mcr.m_dataf.page_per = 2;
    $mcr.m_datal.v_tpls.idx = mui.plug.grid.tpls_idx;
    $mcr.m_datal.v_post = true;
    $mcr.m_datal.v_url = 'grid_url';
    $mcr.m_datal.v_ts = 0;
    $mcr.m_datal.v_tsce = 0;
    $mcr.m_datal.v_attr = {
        'tgt':'',
        'cn':'grid_cn',
        'ths':[],//[{'t':'','v':''}]
        'fn_ctl': $.noop,
    };
}
mui.plug.grid.c_c = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    if($v_attr.cn == $($v_attr.tgt).attr('gridn')){
        $($v_attr.tgt).html($mcr.m_datal.v_tpls.idx($mcr));
    }else{
        clearInterval($mcr.m_datal.v_stv);
    }
}
mui.plug.grid.c_d = function(){
    var $mcr = this;
    if($mcr.m_datao.success == true){
        $mcr.m_datac = $mcr.m_datao.data;
    }
}
mui.plug.grid.c_load = function(){
    var $mcr = this;
    $mcr.c_b = mui.plug.grid.c_b;
    $mcr.c_render();
}
mui.plug.grid.obj = function(){
    var $mcr = _.extend({},mcr);
    $mcr.c_init();
    $mcr.c_load = mui.plug.grid.c_load;
    return $mcr;
}
mui.plug.grid.tpls_idx = function($mcr){
    var tpl =  _.template('<%//console.log($mcr);%>'+
    '<div class="mui-plug-grid <%=$mcr.m_datal.v_attr.cn%>">'+
        '<div class="mui-plug-grid-ctl">'+
            '<%=$mcr.m_datal.v_tpls.gctl({$mcr:$mcr})%>'+
        '</div>'+
        '<div class="mui-plug-grid-tbl">'+
            '<table class="mui-tbl" cellpadding="0" cellspacing="0">'+
                '<%if(_.isArray($mcr.m_datal.v_attr.ths)){%>'+
                '<tr class="mui-rth">'+
                    '<%_.each($mcr.m_datal.v_attr.ths,function(th){%>'+
                    '<th><%=th.t%></th>'+
                    '<%});%>'+
                '</tr>'+
                '<%}%>'+
                '<%_.each($mcr.m_datac.data,function(tr,$ri){%>'+
                '<tr class="mui-rtd">'+
                    '<%_.each($mcr.m_datal.v_attr.ths,function(th){%>'+
                    '<td><%if(_.isFunction(th.v)){%>'+
                    '<%=th.v({$mcr:$mcr,$ri:$ri})%>'+
                    '<%}else{%>'+
                    '<%=tr[th.v]%>'+
                    '<%}%></td>'+
                    '<%});%>'+
                '</tr>'+
                '<%});%>'+
            '</table>'+
        '</div>'+
        '<% var $page_count = Math.ceil($mcr.m_datac.data_count/$mcr.m_dataf.page_per);%>'+
        '<div class="mui-plug-grid-page">'+
            '<%if($mcr.m_dataf.page_now <= 1){%>'+
                '<%=mui.btn.pprei("","",true)%>'+
                '<%=mui.btn.prei("","",true)%>'+
            '<%}else{%>'+
                '<%=mui.btn.pprei()%>'+
                '<%=mui.btn.prei()%>'+
            '<%}%>'+
            '<%=mui.des.txt("","第")%>'+
            '<%=mui.ipt.text("page_now",$mcr.m_dataf.page_now,"page-now")%>'+
            '<%=mui.des.txt("","页，共")%>'+
            '<%=mui.des.txt("",$page_count)%>'+
            '<%=mui.des.txt("","页")%>'+
            '<%=mui.des.txt("",$mcr.m_datac.data_count)%>'+
            '<%=mui.des.txt("","条")%>'+
            '<%if($mcr.m_dataf.page_now >= $page_count){%>'+
                '<%=mui.btn.nexti("","",true)%>'+
                '<%=mui.btn.nnexti("","",true)%>'+
            '<%}else{%>'+
                '<%=mui.btn.nexti()%>'+
                '<%=mui.btn.nnexti()%>'+
            '<%}%>'+
            '<%=mui.btn.refreshi()%>'+
            '<%=mui.des.txt("","每页")%>'+
            '<%=mui.ipt.slt("page_per",{2:2,5:5,10:10},$mcr.m_dataf.page_per,"up")%>'+
            '<%=mui.des.txt("","条")%>'+
            '<div class="mui-plug-grid-page-ctl">'+
                '<%=$mcr.m_datal.v_tpls.gpctl($mcr)%>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '');
    return tpl({$mcr:$mcr});
}
//<mui-plug-grid
//<<<mui-plug
//>>>mui-win
mui.win = {};
//>mui-win-confirm
mui.win.confirm = {};
mui.win.confirm.c_a = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $($v_attr.tgt+'>.'+$v_attr.cn).css({
        'width':$v_attr.width,
        'height':$v_attr.height,
        'top':$v_attr.top,
        'left':$v_attr.left,
    });
    //->move
    $($v_attr.tgt+'>.'+$v_attr.cn+'>.mui-win-confirm-top').off('mousedown');
    $($v_attr.tgt+'>.'+$v_attr.cn+'>.mui-win-confirm-top').on('mousedown',function(e1){
        var $w_left = $($v_attr.tgt+'>.'+$v_attr.cn).offset().left;
        var $w_top = $($v_attr.tgt+'>.'+$v_attr.cn).offset().top;
        var $e1_px = e1.pageX;
        var $e1_py = e1.pageY;
        $(document).off('mousemove');
        $(document).mousemove(function(e2){
            var $w_gleft = $w_left + (e2.pageX - $e1_px);
            var $w_gtop = $w_top + (e2.pageY - $e1_py);
            $v_attr.left = $w_gleft;
            $v_attr.top = $w_gtop;
            $($v_attr.tgt+'>.'+$v_attr.cn).css({
                'width':$v_attr.width,
                'height':$v_attr.height,
                'top':$v_attr.top,
                'left':$v_attr.left,
            });
        });
        $(document).on('mouseup',function(){
            $(document).off('mousemove');
        });
    });
    //<-move
    //->close
    $($v_attr.tgt+'>.'+$v_attr.cn+'>.mui-win-confirm-top>.btn-del').on('click',function(){
        $mcr.c_close();
    });
    //<-close
    //->yes
    $($v_attr.tgt+'>.'+$v_attr.cn+'>.mui-win-confirm-btns>.btn-yes').on('click',function(){
        $mcr.c_close();
        $mcr.c_ee(true);
    });
    //<-yes
    //->no
    $($v_attr.tgt+'>.'+$v_attr.cn+'>.mui-win-confirm-btns>.btn-no').on('click',function(){
        $mcr.c_close();
    });
    //<-no
}
mui.win.confirm.c_b = function(){
    $mcr.c_d = mui.win.confirm.c_d;
    $mcr.c_c = mui.win.confirm.c_c;
    $mcr.c_a = mui.win.confirm.c_a;
    $mcr.c_close = mui.win.confirm.c_close;
    $mcr.m_datal.v_tpls.idx = mui.win.confirm.tpls_idx;
    $mcr.m_datal.v_post = false;
    $mcr.m_datal.v_attr = {
        'tgt': 'body',
        'cn':'confirm-cn',
        'title':'操作确认',
        'msg':'是否确认操作？',
        'width': '300px',
        'height': '150px',
        'top':'calc((100% - 150px)/2)',
        'left':'calc((100% - 300px)/2)',
        'des':{'yes':'是','no':'否','btn_del':'关闭窗口'},
    };
}
mui.win.confirm.c_c = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $mcr.c_close();
    $($v_attr.tgt).append($mcr.m_datal.v_tpls.idx($mcr));
}
mui.win.confirm.c_close = function(){
    $('.mui-win-one2').remove();
}
mui.win.confirm.c_d = function(){}
mui.win.confirm.c_load = function(){
    $mcr = this;
    $mcr.c_b = mui.win.confirm.c_b;
    $mcr.c_render();
}
mui.win.confirm.obj = function(){
    var $mcr = _.extend({},mcr);
    $mcr.c_init();
    $mcr.c_load = mui.win.confirm.c_load;
    return $mcr;
}
mui.win.confirm.tpls_idx = function($mcr){
    var tpl = _.template('<%var $v_attr=$mcr.m_datal.v_attr;%>'+
    '<div class="mui-win-confirm mui-win-one2 <%=$v_attr.cn%>">'+
        '<div class="mui-win-confirm-top">'+
            '<i class="mui-icons-ask fa fa-question"></i>'+
            '<span class="title"><%=$v_attr.title%></span>'+
            '<%=mui.btn.deli("btn-del",$v_attr.des.btn_del)%>'+
        '</div>'+
        '<div class="mui-win-confirm-cnt">'+
            '<span class="mui-win-confirm-msg"><%=$v_attr.msg%></span>'+
        '</div>'+
        '<div class="mui-win-confirm-btns">'+
            '<%=mui.btn.btn("btn-yes",$v_attr.des.yes)%>'+
            '<%=mui.btn.btn("btn-no",$v_attr.des.no)%>'+
        '</div>'+
    '</div>');
    return tpl({$mcr:$mcr});
}
//<mui-win-confirm
//>mui-win-msg
mui.win.msg = {};
mui.win.msg.c_a = function(){
    $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $($v_attr.tgt+'>.'+$v_attr.cn).css({
        'width':$v_attr.width,
        'height':$v_attr.height,
        'top':$v_attr.top,
        'left':$v_attr.left,
    });
    //->move
    $($v_attr.tgt+'>.'+$v_attr.cn+'>.mui-win-msg-top').off('mousedown');
    $($v_attr.tgt+'>.'+$v_attr.cn+'>.mui-win-msg-top').on('mousedown',function(e1){
        var $w_left = $($v_attr.tgt+'>.'+$v_attr.cn).offset().left;
        var $w_top = $($v_attr.tgt+'>.'+$v_attr.cn).offset().top;
        var $e1_px = e1.pageX;
        var $e1_py = e1.pageY;
        $(document).off('mousemove');
        $(document).mousemove(function(e2){
            var $w_gleft = $w_left + (e2.pageX - $e1_px);
            var $w_gtop = $w_top + (e2.pageY - $e1_py);
            $v_attr.left = $w_gleft;
            $v_attr.top = $w_gtop;
            $($v_attr.tgt+'>.'+$v_attr.cn).css({
                'width':$v_attr.width,
                'height':$v_attr.height,
                'top':$v_attr.top,
                'left':$v_attr.left,
            });
        });
        $(document).on('mouseup',function(){
            $(document).off('mousemove');
        });
    });
    //<-move
    //->close
    $($v_attr.tgt+'>.'+$v_attr.cn+'>.mui-win-msg-top>.mui-btn-deli').on('click',function(){
        $mcr.c_close();
    });
    //<-close
}
mui.win.msg.c_b = function(){
    var $mcr = this;
    $mcr.c_d = mui.win.msg.c_d;
    $mcr.c_c = mui.win.msg.c_c;
    $mcr.c_close = mui.win.msg.c_close;
    $mcr.c_a = mui.win.msg.c_a;
    $mcr.m_datal.v_tpls.idx = mui.win.msg.tpls_idx;
    $mcr.m_datal.v_post = false;
    $mcr.m_datal.v_attr = {
        'tgt': 'body',
        'cn':'win-msg',
        'type':'info',//err,suc,warn
        'title':'标题',
        'msg':'内容',
        'width': '200px',
        'height': '120px',
        'top':'calc(100% - 120px - 12px)',
        'left':'calc(100% - 200px - 12px)',
        'des':{'btn_del':'关闭窗口'},
    };
}
mui.win.msg.c_c = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $mcr.c_close();
    $($v_attr.tgt).append($mcr.m_datal.v_tpls.idx($mcr));
}
mui.win.msg.c_close = function(){
    $('.mui-win-one3').remove();
}
mui.win.msg.c_d = function(){}
mui.win.msg.c_load = function(){
    var $mcr = this;
    $mcr.c_b = mui.win.msg.c_b;
    $mcr.c_render();
}
mui.win.msg.obj = function(){
    var $mcr = _.extend({},mcr);
    $mcr.c_init();
    $mcr.c_load = mui.win.msg.c_load;
    return $mcr;
}
mui.win.msg.tpls_idx = function($mcr){
    var tpl = _.template('<%var $v_attr = $mcr.m_datal.v_attr;%>'+
    '<div class="mui-win-msg mui-win-one3 mui-win-msg-<%=$v_attr.type%> <%=$mcr.m_datal.v_attr.cn%>">'+
        '<div class="mui-win-msg-top">'+
            '<i class="fa fa-commenting-o"></i>'+
            '<span class="title"><%=$v_attr.title%></span>'+
            '<%=mui.btn.deli("btn-del",$v_attr.des.btn_del)%>'+
        '</div>'+
        '<div class="mui-win-msg-cnt">'+
            '<span class="mui-win-msg-msg"><%=$v_attr.msg%></span>'+
        '</div>'+
    '</div>');
    return tpl({$mcr:$mcr});
}
//<mui-win-msg
//>mui-win-win
mui.win.win = {};
mui.win.win.c_a = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    //->width,height.left,top
    if($v_attr.tcblcr == 'tl'){
        $v_attr.top = '0px';
        $v_attr.left = '0px';
    }else if($v_attr.tcblcr == 'tc'){
        $v_attr.top = '0px';
        $v_attr.left = 'calc((100% - '+$v_attr.width+')/2)';
    }else if($v_attr.tcblcr == 'tr'){
        $v_attr.top = '0px';
        $v_attr.left = 'calc(100% - '+$v_attr.width+' - 10px)';
    }else if($v_attr.tcblcr == 'cl'){
        $v_attr.top = 'calc((100% - '+$v_attr.height+')/2)';
        $v_attr.left = '0px';
    }else if($v_attr.tcblcr == 'cc'){
        $v_attr.top = 'calc((100% - '+$v_attr.height+')/2)';
        $v_attr.left = 'calc((100% - '+$v_attr.width+')/2)';
    }else if($v_attr.tcblcr == 'cr'){
        $v_attr.top = 'calc((100% - '+$v_attr.height+')/2)';
        $v_attr.left = 'calc(100% - '+$v_attr.width+' - 10px)';
    }else if($v_attr.tcblcr == 'bl'){
        $v_attr.top = 'calc(100% - '+$v_attr.height+' - 10px)';
        $v_attr.left = '0px';
    }else if($v_attr.tcblcr == 'bc'){
        $v_attr.top = 'calc(100% - '+$v_attr.height+' - 10px)';
        $v_attr.left = 'calc((100% - '+$v_attr.width+')/2)';
    }else if($v_attr.tcblcr == 'br'){
        $v_attr.top = 'calc(100% - '+$v_attr.height+' - 10px)';
        $v_attr.left = 'calc(100% - '+$v_attr.width+' - 10px)';
    }
    $('.'+$v_attr.cn).css({
        'width':$v_attr.width,
        'height':$v_attr.height,
        'top':$v_attr.top,
        'left':$v_attr.left,
    });
    //<-width,height
    //->resize
    $('.'+$v_attr.cn).off('mousedown');
    $('.'+$v_attr.cn).on('mousemove',function(e1){
        var $w_left = $(this).offset().left;
        var $w_top = $(this).offset().top;
        var $w_w = $(this).width();
        var $w_h = $(this).height();
        var $e1_px = e1.pageX;
        var $e1_py = e1.pageY;
        if($e1_px - $w_left <= 5 && $e1_py - $w_top <= 5){
            $(this).css({'cursor':'nw-resize'});
        }else if($e1_px - $w_left < $w_w - 5 && $e1_py - $w_top <= 5){
            $(this).css({'cursor':'n-resize'});
        }else if($e1_px - $w_left >= $w_w - 5 && $e1_py - $w_top <= 5){
            $(this).css({'cursor':'ne-resize'});
        }else if($e1_px - $w_left >= $w_w - 5 && $e1_py - $w_top < $w_h - 5){
            $(this).css({'cursor':'e-resize'});
        }else if($e1_px - $w_left >= $w_w - 5 && $e1_py - $w_top >= $w_h - 5){
            $(this).css({'cursor':'se-resize'});
        }else if($e1_px - $w_left > 5 && $e1_py - $w_top >= $w_h - 5){
            $(this).css({'cursor':'s-resize'});
        }else if($e1_px - $w_left <= 5 && $e1_py - $w_top >= $w_h - 5){
            $(this).css({'cursor':'sw-resize'});
        }else if($e1_px - $w_left <= 5 && $e1_py - $w_top > 5){
            $(this).css({'cursor':'w-resize'});
        }else{
            $(this).css({'cursor':'default'});
        }
    });
    $('.'+$v_attr.cn).off('mousedown');
    $('.'+$v_attr.cn).on('mousedown',function(e1){
        if($v_attr.big == false){
            var $m1 = this;
            var $w_left = $(this).offset().left;
            var $w_top = $(this).offset().top;
            var $w_w = $(this).width();
            var $w_h = $(this).height();
            var $e1_px = e1.pageX;
            var $e1_py = e1.pageY;
            $(document).one('mouseup',function(e2){
                console.log($rs_x);
                var $rs_x = $e1_px - e2.pageX;
                var $rs_y = $e1_py - e2.pageY;
                if($e1_px - $w_left <= 5){
                    $v_attr.width = $w_w + $rs_x;
                    $v_attr.left = $w_left - $rs_x;
                }else if($e1_px - $w_left >= $w_w - 5){
                    $v_attr.width = $w_w - $rs_x;
                }
                if($e1_py - $w_top <= 5){
                    $v_attr.height = $w_h + $rs_y;
                    $v_attr.top = $w_top - $rs_y;
                }else if($e1_py - $w_top >= $w_h - 5){
                    $v_attr.height = $w_h - $rs_y;
                }
                $($m1).css({
                    'width':$v_attr.width,
                    'height':$v_attr.height,
                    'top':$v_attr.top,
                    'left':$v_attr.left,
                });
            });
        }
    });
    //<-resize
    //->move
    $('.'+$v_attr.cn+'>.mui-win-win-top').off('mousedown');
    $('.'+$v_attr.cn+'>.mui-win-win-top').on('mousedown',function(e1){
        var $w_left = $('.mui-win-win').offset().left;
        var $w_top = $('.mui-win-win').offset().top;
        var $e1_px = e1.pageX;
        var $e1_py = e1.pageY;
        $(document).off('mousemove');
        $(document).mousemove(function(e2){
            var $w_gleft = $w_left + (e2.pageX - $e1_px);
            var $w_gtop = $w_top + (e2.pageY - $e1_py);
            $v_attr.left = $w_gleft;
            $v_attr.top = $w_gtop;
            $('.'+$v_attr.cn).css({
                'width':$v_attr.width,
                'height':$v_attr.height,
                'top':$v_attr.top,
                'left':$v_attr.left,
            });
        });
        $(document).on('mouseup',function(){
            $(document).off('mousemove');
        });
    });
    //<-move
    //->close
    $('.'+$v_attr.cn+' .mui-win-win-close').on('click',function(){
        $mcr.c_close();
    });
    //<-close
    //->big
    $('.'+$v_attr.cn+' .mui-win-win-big').on('click',function(){
        if($v_attr.big){
            $v_attr.big = false;
            $('.'+$v_attr.cn).css({
                'width':$v_attr.width,
                'height':$v_attr.height,
                'top':$v_attr.top,
                'left':$v_attr.left,
            });
        }else{
            $v_attr.big = true;
            $('.'+$v_attr.cn).css({
                'width':'calc(100% - 10px)',
                'height':'calc(100% - 10px)',
                'left':'0px',
                'top':'0px',
            });
        }
    });
    //<-big
}
mui.win.win.c_b = function(){
    var $mcr = this;
    $mcr.c_d = mui.win.win.c_d;
    $mcr.c_c = mui.win.win.c_c;
    $mcr.c_close = mui.win.win.c_close;
    $mcr.c_a = mui.win.win.c_a;
    $mcr.m_datal.v_ele.wmask = mui.win.wmask.obj();
    $mcr.m_datal.v_tpls.idx = mui.win.win.tpls_idx;
    $mcr.m_datal.v_post = false;
    $mcr.m_datal.v_attr = {
        'tgt': 'body',
        'cn': 'win_cname',
        'title': 'title',
        'width': '500px',
        'height': '200px',
        'tcblcr': 'cc',//[tl,tc,tr,cl,cc,cr,bl,bc,br]
        'big':false,
        'left':'',
        'top':'',
    };
}
mui.win.win.c_c = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $mcr.c_close();
    $mcr.m_datal.v_ele.wmask.c_load();
    $($v_attr.tgt).append($mcr.m_datal.v_tpls.idx($mcr));
}
mui.win.win.c_close = function(){
    var $mcr = this;
    $mcr.m_datal.v_ele.wmask.c_close();
    $('.mui-win-one').remove();
}
mui.win.win.c_d = function(){
}
mui.win.win.c_load = function(){
    var $mcr = this;
    $mcr.c_b = mui.win.win.c_b;
    $mcr.c_render();
}
mui.win.win.obj = function(){
    var $mcr = _.extend({},mcr);
    $mcr.c_init();
    $mcr.c_load = mui.win.win.c_load;
    return $mcr;
}
mui.win.win.tpls_idx = function($mcr){
    var tpl = _.template('<%$v_attr = $mcr.m_datal.v_attr;%>'+
    '<div class="mui-win-one mui-win-win <%=$v_attr.cn%>">'+
        '<div class="mui-win-win-top">'+
            '<i class="mui-icons mui-icons-add fa fa-plus"></i>'+
            '<span class="title"><%=$v_attr.title%></span>'+
            '<i class="fa fa-close mui-win-win-close"></i>'+
            '<i class="fa fa-clone mui-win-win-big"></i>'+
        '</div>'+
        '<div class="mui-win-win-cnt">cnt</div>'+
    '</div>'+
    '');
    return tpl({$mcr:$mcr});
}
//<mui-win-win
//>mui-win-wmask
mui.win.wmask = {};
mui.win.wmask.c_a = function(){
}
mui.win.wmask.c_b = function(){
    var $mcr = this;
    $mcr.c_d = mui.win.wmask.c_d;
    $mcr.c_c = mui.win.wmask.c_c;
    $mcr.c_close = mui.win.wmask.c_close;
    $mcr.c_a = mui.win.wmask.c_a;
    $mcr.m_datal.v_tpls.idx = mui.win.wmask.tpls_idx;
    $mcr.m_datal.v_post = false;
    $mcr.m_datal.v_attr = {
        'tgt': 'body',
    };
}
mui.win.wmask.c_c = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $mcr.c_close();
    $($v_attr.tgt).append($mcr.m_datal.v_tpls.idx($mcr));
}
mui.win.wmask.c_close = function(){
    $('.mui-win-wmask').remove();
}
mui.win.wmask.c_d = function(){
}
mui.win.wmask.c_load = function(){
    var $mcr = this;
    $mcr.c_b = mui.win.wmask.c_b;
    $mcr.c_render();
}
mui.win.wmask.obj = function(){
    var $mcr = _.extend({},mcr);
    $mcr.c_init();
    $mcr.c_load = mui.win.wmask.c_load;
    return $mcr;
}
mui.win.wmask.tpls_idx = function($mcr){
    var tpl = _.template(''+
    '<div class="mui-win-wmask"></div>');
    return tpl({$mcr:$mcr});
}
//<mui-win-wmask
//<<<mui-win

//(v_b1.0)
var muicfg = {};
var muifn = {};
var muitpl = {};
//->muicfg-win
muicfg.win = {};
muicfg.win.confirm = {};
muicfg.win.confirm.tgt = 'body';
//<-muicfg-win
//->muifn-win
muifn.win = {};
//<-muifn-win

//->muitpl-win
muitpl.win = {};
muitpl.win.confirm = function(){
    var $title = arguments[0]?arguments[0]:'title';
    var $content = arguments[1]?arguments[1]:'content';
    var $fn = arguments[2];
    var $tgt = muicfg.win.confirm.tgt;
    $($tgt).append(''+
    '<div class="mui-win-confirm">'+
        '<div class="mui-win-confirm-t"><i class="fa fa-cog"></i><span>'+$title+'</span><i class="fa fa-close mui-win-confirm-close"></i></div>'+
        '<div class="mui-win-confirm-c">'+$content+'</div>'+
    '</div>'+
    '');
    $($tgt+' .mui-win-confirm-close').on('click',function(){
        $($tgt+' .mui-win-confirm').remove();
    });
}
//<-muitpl-win

//--->muifn-ipt
muifn.ipt = {};
//<---muifn-ipt
//--->mui-des
muitpl.des = {};
muitpl.des.txt = function(){
    var $v = arguments[0];//value
    var $cn = arguments[1]?arguments[1]:'des-txt';//class name
    var $disa = arguments[2]?arguments[2]:false;//class name
    var $tpl = _.template(''+
    '<span class="mui-des-txt <%=$cn%><%if($disa){%> mui-disable<%}%>"><%=$v%></span>'+
    '');
    return $tpl({$v:$v,$cn:$cn,$disa:$disa});
}
//<---mui-des
//--->mui-ipt

muitpl.ipt = {};
muitpl.ipt.text = function(){
    var $n = arguments[0]?arguments[0]:'ipt_name';//input name
    var $v = arguments[1];//input value
    var $cn = arguments[2]?arguments[2]:'ipt-text';//class name
    var $disa = arguments[3]?arguments[3]:false;//disable
    var $tpl = _.template(''+
    '<input<%if($disa){%> disabled<%}%> name="<%=$n%>" class="mui-ipt-text <%=$cn%>" type="text" value="<%=$v%>" />'+
    '');
    return $tpl({$n:$n,$v:$v,$cn:$cn,$disa:$disa});
}
//<---mui-ipt


//->mui_msgbox(mhs2016/1/5)
muicfg.msgbox = {};
muicfg.msgbox.tgt = 'body';

muifn.msgbox = {};
muifn.msgbox.info = function(){
    var $info = arguments[0]?arguments[0]:'msg';
    var $title = arguments[1]?arguments[1]:'title';
    var $ts = arguments[2]?arguments[2]:0;
    var $type = arguments[3]?arguments[3]:'msg';//err|msg|suc|warn
    var $st;
    var $msg_type;
    if($type=='err'){
        $msg_type = 'mui-msgbox-err';
    }else if($type=='suc'){
        $msg_type = 'mui-msgbox-suc';
    }else if($type=='warn'){
        $msg_type = 'mui-msgbox-warn';
    }else{
        $msg_type = 'mui-msgbox-msg';
    }
    clearTimeout($st);
    $(muicfg.msgbox.tgt+' .mui-msgbox').remove();
    $(muicfg.msgbox.tgt).append(''+
    '<div class="mui-msgbox '+$msg_type+'">'+
        '<div class="mui-msgbox-t"><i class="fa fa-commenting-o"></i><span>'+$title+'</span><i class="fa fa-close mui-msgbox-close"></i></div>'+
        '<div class="mui-msgbox-c">'+$info+'</div>'+
    '</div>'+
    '');
    $(".mui-msgbox").animate({ 
        right: 0,
        bottom: 0
    },600,'',function(){
        $(muicfg.msgbox.tgt+' .mui-msgbox-close').on('click',function(){
            clearTimeout($st);
            $(muicfg.msgbox.tgt+' .mui-msgbox').remove();
        });
        if($ts > 1){
            $st = setTimeout(function(){
                $(muicfg.msgbox.tgt+' .mui-msgbox-close').click();
            },1000*$ts);
        }
        $(muicfg.msgbox.tgt+' .mui-msgbox-t').off('mousedown');
        $(muicfg.msgbox.tgt+' .mui-msgbox-t').on('mousedown',function(e1){
            var $me_m1 = this;
            var $tgt = $(muicfg.msgbox.tgt+' .mui-msgbox'); 
            var $tgt_l = $tgt.offset().left;
            var $tgt_t = $tgt.offset().top;
            var $e1_pX = e1.pageX;
            var $e1_pY = e1.pageY;
            $(document).off('mousemove');
            $(document).mousemove(function(e2){
                var $pL = $tgt_l + (e2.pageX - $e1_pX);
                var $pT = $tgt_t + (e2.pageY - $e1_pY);
                $tgt.offset({left: $pL,top: $pT});
            });
            $(document).on('mouseup',function(){
                $(document).off('mousemove');
            });
        });
    });
}
//message box error
muifn.msgbox.err = function(){
    var $info = arguments[0]?arguments[0]:'error message';
    var $title = arguments[1]?arguments[1]:'error';
    var $ts = arguments[2]?arguments[2]:0;
    muifn.msgbox.info($info,$title,$ts,'err');
};
//message box message
muifn.msgbox.msg = function($info){
    var $info = arguments[0]?arguments[0]:'message';
    var $title = arguments[1]?arguments[1]:'message';
    var $ts = arguments[2]?arguments[2]:0;
    muifn.msgbox.info($info,$title,$ts,'msg');
};
//message box success
muifn.msgbox.suc = function($info){
    var $info = arguments[0]?arguments[0]:'success message';
    var $title = arguments[1]?arguments[1]:'success';
    var $ts = arguments[2]?arguments[2]:0;
    muifn.msgbox.info($info,$title,$ts,'suc');
};
//message box warning
muifn.msgbox.warn = function($info){
    var $info = arguments[0]?arguments[0]:'warning message';
    var $title = arguments[1]?arguments[1]:'warning';
    var $ts = arguments[2]?arguments[2]:0;
    muifn.msgbox.info($info,$title,$ts,'warn');
};
//<-mui_msgbox

//(v_t1.0)
//->mui_form
muifn.form = {};
//form object datas
muifn.form.odatas = function(ftgt){
    var $o_datas = $(ftgt).serializeArray();
    var $odatas = {sub:1,ajax:1};
    _.each($o_datas,function($o_data){
        $odatas[$o_data.name] = $o_data.value;
    });
    return $odatas;
};
//<-mui_form



//->mui_win
var muitpl_win = _.template('var m_me = m_me;'+
'<div class="mui-winb"></div>'+
'<div class="mui-win" id="<%=m_me.m_ldata.m_id%>">'+
    '<div class="mui-win-t">'+
        '<i class="mui-icons"></i><span class="title">title</span>'+
        '<i class="fa fa-close mui-win-close"></i>'+
        '<i class="fa fa-square-o mui-win-big"></i>'+
    '</div>'+
    '<div class="mui-win-c"></div>'+
'</div>');

var muievt_win = function(m_me){
    $('.mui-win').on('mousemove',function(e){
        var offset_l = $(this).offset().left;
        var offset_t = $(this).offset().top;
        var e_w = $(this).width();
        var e_h = $(this).height();
        if(e.pageX - offset_l <= 5 && e.pageY - offset_t <=5){
            $(this).css({'cursor':'nw-resize'});
        }else if(e.pageX - offset_l < e_w - 5 && e.pageY - offset_t <= 5){
            $(this).css({'cursor':'n-resize'});
        }else if(e.pageX - offset_l >= e_w - 5 && e.pageY - offset_t <= 5){
            $(this).css({'cursor':'ne-resize'});
        }else if(e.pageX - offset_l >= e_w - 5 && e.pageY - offset_t < e_h - 5){
            $(this).css({'cursor':'e-resize'});
        }else if(e.pageX - offset_l >= e_w - 5 && e.pageY - offset_t >= e_h - 5){
            $(this).css({'cursor':'se-resize'});
        }else if(e.pageX - offset_l > 5 && e.pageY - offset_t >= e_h - 5){
            $(this).css({'cursor':'s-resize'});
        }else if(e.pageX - offset_l <= 5 && e.pageY - offset_t >= e_h - 5){
            $(this).css({'cursor':'sw-resize'});
        }else if(e.pageX - offset_l <= 5 && e.pageY - offset_t > 5){
            $(this).css({'cursor':'w-resize'});
        }else if(e.pageY - offset_t > 5 && e.pageY - offset_t < 10){
            $(this).css({'cursor':'move'});
        }else{
            $(this).css({'cursor':'default'});
        }
    });
    $('.mui-win').on('mousedown',function(e1){
        var offset_l = $(this).offset().left;
        var offset_t = $(this).offset().top;
        var e1_w = $(this).width();
        var e1_h = $(this).height();
        var this_1 = this;
        if(e1.pageX - offset_l <= 5){
            $(document).one('mouseup',function(e2){
                var rs_x = e1.pageX - e2.pageX;
                $(this_1).css({'width':e1_w + rs_x,'left':offset_l - rs_x});
            });
        }else if(e1.pageX - offset_l >= e1_w - 5){
            $(document).one('mouseup',function(e2){
                var rs_x = e1.pageX - e2.pageX;
                $(this_1).css({'width':e1_w - rs_x});
            });
        }
        if(e1.pageY - offset_t <= 5){
            $(document).one('mouseup',function(e2){
                var rs_y = e1.pageY - e2.pageY;
                $(this_1).css({'height':e1_h + rs_y,'top':offset_t - rs_y});
            });
        }else if(e1.pageY - offset_t >= e1_h - 5){
            $(document).one('mouseup',function(e2){
                var rs_y = e1.pageY - e2.pageY;
                $(this_1).css({'height':e1_h - rs_y});
            });
        }
        if(e1.pageY - offset_t > 5 && e1.pageY - offset_t < 10){
            $(document).one('mouseup',function(e2){
                var rs_x = e1.pageX - e2.pageX;
                var rs_y = e1.pageY - e2.pageY;
                $(this_1).css({'left':offset_l - rs_x,'top':offset_t - rs_y});
            });
        }
    });
    $('.mui-win .mui-win-big').on('click',function(){
        $('.mui-win').css({width:'100%',height:'100%',left:'0px',top:'0px'});
    });
    $('.mui-win .mui-win-close').on('click',function(){
        $('.mui-winb').css({width:'0px',height:'0px'});
        $('.mui-win').hide();
    });
};
//<-mui_win


//muitpl_navl
var muitpl_navl = _.template('<%m_me = m_me;%>'+
    '<ul class="mui-ul mui-navl" id="<%=m_me.m_ldata.m_id%>">'+
    '<% _.each(m_me.m_cdata,function(v1){%>'+
        '<li class="mui-navl-v1"><div class="mui-clk" mui-navn="<%=v1.nav_n%>" mui-navv="<%=v1.nav_v%>"><i class="<%=v1.nav_img%>"></i><span><%=v1.nav_v%></span></div>'+
        '<% if(v1.nav_elec){%>'+
        '<ul class="mui-ul mui-navl">'+
        '<% _.each(v1.nav_elec,function(v2){%>'+
            '<li class="mui-navl-v2"><div class="mui-clk" mui-navn="<%=v2.nav_n%>" mui-navv="<%=v2.nav_v%>"><i class="<%=v2.nav_img%>"></i><span><%=v2.nav_v%></span></div>'+
            '<% if(v2.nav_elec){%>'+
            '<ul class="mui-ul mui-navl">'+
            '<% _.each(v2.nav_elec,function(v3){%>'+
                '<li class="mui-navl-v3"><div class="mui-clk" mui-navn="<%=v3.nav_n%>" mui-navv="<%=v3.nav_v%>"><i class="<%=v3.nav_img%>"></i><span><%=v3.nav_v%></span></div>'+
                '</li>'+
            '<% });%>'+
            '</ul>'+
            '<% }%>'+
            '</li>'+
        '<% });%>'+
        '</ul>'+
        '<% }%>'+
        '</li>'+
    '<% });%>'+
    '</ul>'+
'');

$(document).ready(function(){
    //mdata->
    $('body').on('mdata_nn_chg',function(evt,nn){
        $('body').trigger(nn);
    });
    $('body').on('mdata_n_chg',function(evt,nn,n){
        $('body').trigger('mdata_nn_chg',[nn]);
    });
    $('body').on('mdata_ni_chg',function(evt,nn,n,i){
        $('body').trigger('mdata_n_chg',[nn,n]);
    });
    $('body').on('mdata_nn_init',function(evt,nn){
        var $datas = mdata[nn];
        _.each($datas,function(v,n){
            var $ele_ty = $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').attr('ele_ty');
            if($ele_ty == 'mui-ele-ckb'){
                if(_.isArray(v)){
                    _.each(v,function(v2,i2){
                        $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]:eq('+i2+')').attr({'ckd':v2});
                        $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]:eq('+i2+')').off('click');
                        $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]:eq('+i2+')').on('click',function(){
                            if($('*[ele_nn="'+nn+'"][ele_n="'+n+'"]:eq('+i2+')').attr('ckd')=='on'){
                                $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]:eq('+i2+')').attr({'ckd':'off'});
                                $('body').trigger('mdata_ni_set',[nn,n,i2,'off']);
                            }else{
                                $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]:eq('+i2+')').attr({'ckd':'on'});
                                $('body').trigger('mdata_ni_set',[nn,n,i2,'on']);
                            }
                        });
                    });
                }else{
                    $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').attr({'ckd':v});
                    $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').off('click');
                    $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').on('click',function(){
                        if($('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').attr('ckd')=='on'){
                            $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').attr({'ckd':'off'});
                            $('body').trigger('mdata_n_set',[nn,n,'off']);
                        }else{
                            $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').attr({'ckd':'on'});
                            $('body').trigger('mdata_n_set',[nn,n,'on']);
                        }
                    });
                }
            }else if($ele_ty == 'mui-ele-text'){
                $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').val(v);
                $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').off('change');
                $('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').on('change',function(){
                    $('body').trigger('mdata_n_set',[nn,n,$('*[ele_nn="'+nn+'"][ele_n="'+n+'"]').val()]);
                });
            }
        });
        $('body').trigger('mdata_nn_chg',[nn]);
    });
    $('body').on('mdata_nn_add',function(evt,nn){
        if(!_.has(mdata,nn)){
            mdata[nn] = {};
            $('body').trigger('mdata_nn_chg',[nn]);
        }
    });
    $('body').on('mdata_n_set',function(evt,nn,n,v){
        if(_.has(mdata,nn)){
            mdata[nn][n] = v;
            $('body').trigger('mdata_n_chg',[nn,n]);
        }
    });
    $('body').on('mdata_ni_set',function(evt,nn,n,i,v){
        if(_.has(mdata,nn)){
            if(_.has(mdata[nn],n)){
                mdata[nn][n][i] = v;
                $('body').trigger('mdata_ni_chg',[nn,n,i]);
            }
        }
    });
    $('body').on('mdata_nn_rm',function(evt,nn){
        if(_.has(mdata,nn)){
            delete(mdata[nn]);
            $('body').trigger('mdata_nn_chg',[nn]);
        }
    });
    $('body').on('mdata_n_rm',function(evt,nn,n){
        if(_.has(mdata,nn)){
            if(_.has(mdata[nn],n)){
                delete(mdata[nn][n]);
                $('body').trigger('mdata_n_chg',[nn,n]);
            }
        }
    });
    
    //<-mdata
    mui.ipt.ckb_evt();
    mui.ipt.slt_evt();
    /*mui.ele.ckb.evt();*/
});