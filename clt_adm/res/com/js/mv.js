//a b c d e f g h i j k l m n o p q r s t u v w x y z
var mv = {};
mv.c = {};
mv.c.c_init = function(){
    var $c = this;
    $c.c_load = $.noop;
    $c.c_a = $.noop;
    $c.c_aa = $.noop;
    $c.c_b = $.noop;
    $c.c_bb = $.noop;
    $c.c_c = $.noop;
    $c.c_close = $.noop;
    $c.c_d = $.noop;
    $c.c_e = $.noop;
    $c.c_ee = $.noop;
    $c.m_datac = {};
    $c.m_dataf = {};
    $c.m_datal = {'v_tpls':{'idx':$.noop},'v_stv':null,'v_ts':0,'v_tsc':0,'v_tsce':0,'v_set':'r','v_url':'v_url','v_chg':false,'v_attr':{}};
    $c.m_datao = {};
    $c.m_datag = {};
}
mv.c.c_render = function(){
    var $c = this;
    $c.c_b();
    $c.c_bb();
    $c.v_render();
}
mv.c.v_render = function(){
    var $c = this;
    if($c.m_datal.v_set == 'r'){
        $.post($c.m_datal.v_url,$c.m_dataf,function(json){
            $c.m_datag = json;
            $c.v_load();
        },'json');
    }else{
        $c.v_load();
    }
    clearInterval($c.m_datal.v_stv);
    if($c.m_datal.v_ts >= 1){
        if($c.m_datal.v_tsce <= 0){
            $c.m_datal.v_stv = setInterval(function(){
                $c.v_render();
            },$c.m_datal.v_ts);
        }else if($c.m_datal.v_tsce > $c.m_datal.v_tsc + 1){
            $c.m_datal.v_tsc = $c.m_datal.v_tsc + 1;
            $c.m_datal.v_stv = setInterval(function(){
                $c.v_render();
            },$c.m_datal.v_ts);
        }
    }
}
mv.c.v_load = function(){
    var $c = this;
    if($c.m_datal.v_chg){
        if($c.m_datao != $c.m_datag){
            $c.m_datao = $c.m_datag;
        }
    }else{
        $c.m_datao = $c.m_datag;
    }
    $c.c_d();
    $c.v_view();
    
}
mv.c.v_view = function(){
    var $c = this;
    $c.c_c();
    $c.c_a();
    $c.c_aa();
}



mv.m = {};
mv.m.bind = function($v){
    var $m = this;
    $m.v = $v;
    $m.init();
};
mv.m.init = function(){
    var $m = this;
    $m.data_c = {};
    $m.data_f = {};
    $m.data_l = {'fn_a':$.noop,'fn_aa':$.noop,'fn_b':$.noop,'fn_bb':$.noop,'fn_c':$.noop,'fn_d':$.noop,'fn_dd':$.noop,'fn_e':$.noop,'fn_ee':$.noop,'fn_tpl':$.noop,'fn_tpls':{},'v_stv':null,'v_ts':0,'v_tsc':0,'v_tsce':0,'v_set':'r','v_url':'v_url','v_chg':false,'v_attr':{}};
    $m.data_o = {};
    $m.data_g = {};
};
mv.m.render = function(){
    var $m = this;
    $m.v.view($m);
    //console.log(this);
    /*var $m = this;
    $m.data_l.fn_b($m);
    $m.data_l.fn_bb($m);
    if($m.data_l.v_set == 'r'){//remote
        $.post($m.data_l.v_url,$m.data_f,function(json){
            if(json.success){
                if($m.data_l.v_chg){
                    if($m.data_c != json.data){
                        $m.data_c = json.data;
                        $m.v.v($m);
                    }
                }else{
                    $m.data_c = json.data;
                    $m.v.v($m);
                }
            }
        },'json');
    }else if($m.data_l.v_set == 'l'){//local
        var $data = arguments[0]?arguments[0]:{};
        if($m.data_l.v_chg){
            if($m.data_c != $data){
                $m.data_c = $data;
                $m.v.v($m);
            }
        }else{
            $m.data_c = $data;
            $m.v.v($m);
        }
    }
    clearInterval($m.data_l.v_stv);
    if($m.data_l.v_ts >= 1){
        if($m.data_l.v_tsce <= 0){
            $m.data_l.v_stv = setInterval(function(){
                $m.load();
            },$m.data_l.v_ts);
        }else if($m.data_l.v_tsce > $m.data_l.v_tsc){
            $m.data_l.v_tsc = $m.data_l.v_tsc + 1;
            $m.data_l.v_stv = setInterval(function(){
                $m.load();
            },$m.data_l.v_ts);
        }
    }*/
}
/*mv.m.load = function(){
    var m_me = this;
    $.post(m_me.data_l.load_url,m_me.data_f,function(json){
        if(json.success){
            m_me.set(json.data);
        }
    },'json');
}*/
mv.v = {};
mv.v.view = function($m){
    $m.data_l.fn_c($m);
    //console.log($m);
    /*$m.data_l.fn_d($m);
    $m.data_l.fn_dd($m);
    $m.data_l.fn_c($m);
    $m.data_l.fn_a($m);
    $m.data_l.fn_aa($m);*/
}


mv.m.m_stv = function(ts){
    var m_me = this;
    var ts = arguments[0]?arguments[0]:0;
    clearInterval(m_me.m_ldata.m_stv);
    if(ts >= 1){
        m_me.m_load();
        m_me.m_ldata.m_stv = setInterval(function(){
            m_me.m_load();
        },ts);
    }
}
mv.m.m_load = function(){
    var m_me = this;
    $.post(m_me.m_ldata.m_url,m_me.m_fdata,function(json){
        if(json.success){
            m_me.m_set(json.data);
        }
    },'json');
}
mv.m.m_set = function(data){
    var m_me = this;
    if(m_me.m_cdata != data){
        m_me.m_cdata = data;
        _.each(m_me.m_vs,function(m_v){
            m_v.v_load(m_me);
        });
    }
}
mv.m.m_rset = function(data){
    var m_me = this;
    m_me.m_cdata = data;
    _.each(m_me.m_vs,function(m_v){
        m_v.v_load(m_me);
    });
}
mv.m.m_bind = function(vs){
    var m_me = this;
    m_me.m_init();
    _.each(vs,function(v){
       v.v_init(); 
    });
    m_me.m_vs = _.union(m_me.m_vs,vs);
},
mv.m.m_ubind = function(vs){
    var m_me = this;
    m_me.m_vs = _.difference(m_me.m_vs,vs);
},
mv.m.m_init = function(){
    var m_me = this;
    if(_.isUndefined(m_me.m_vs)){
        m_me.m_vs = [];//model views[v1,v2,..]
    }
    if(_.isUndefined(m_me.m_cdata)){
        m_me.m_cdata = {};//model rdata{}
    }
    if(_.isUndefined(m_me.m_ldata)){
        m_me.m_ldata = {};//model ldata
    }
    if(_.isUndefined(m_me.m_fdata)){
        m_me.m_fdata = {};//model fdata[page_now|page_per,..]
    }
    m_me.m_ldata.m_stv = null;//model stv
    m_me.m_ldata.m_tgt = false;//str(target html)
    m_me.m_ldata.m_tgta = false;//str(target append)
    m_me.m_ldata.m_id = null;//model id
    m_me.m_ldata.m_url = 'url';//model id
    m_me.m_ldata.m_ms = {};//model id
    m_me.m_ldata.m_ctpls = {};//child tpls
    m_me.m_ldata.m_cc = {};//child control
    m_me.m_ldata.m_load = function(){};//load
},

mv.v.v_load = function(m_me){
    var v_me = this,m_me = m_me;
    
    _.each(v_me.v_pevts,function(v_pevt){
        v_pevt(m_me);
    });
    m_me.m_ldata.m_load(m_me);
    
    if(m_me.m_ldata.m_tgt){
        $(m_me.m_ldata.m_tgt).html(v_me.v_tpls.index({m_me:m_me}));
    }
    if(m_me.m_ldata.m_tgta){
        $(m_me.m_ldata.m_tgta).append(v_me.v_tpls.index({m_me:m_me}));
    }
    
    _.each(v_me.v_evts,function(v_evt){
        v_evt(m_me);
    });
}
mv.v.v_init = function(){
    var v_me = this;
    if(_.isUndefined(v_me.v_tpl)){
        v_me.v_tpl = {};
    }
    if(_.isUndefined(v_me.v_tpls)){
        v_me.v_tpls = {};
    }
    if(_.isUndefined(v_me.v_pevts)){
        v_me.v_pevts = {};
    }
    if(_.isUndefined(v_me.v_evts)){
        v_me.v_evts = {};
    }
}
