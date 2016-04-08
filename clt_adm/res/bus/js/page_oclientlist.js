var p_oclientlist = {};
//批量删除客户端
p_oclientlist.btn_dels = {};
p_oclientlist.btn_dels.evt = function(m_me){
    var cdata = m_me.m_cdata.data;
    $('#gid_oclientlist>.mui-gpage .btn-dels').on('click',function(){
        mui.win.confirm.c(function($rt){
            if($rt){
                var client_mac = [];
                $("#gid_oclientlist input[name='gckb']").each(function(){
                    if($(this).prop('checked') == true){
                        client_mac.push(cdata[$(this).val()].client_mac);
                    }
                });
                $.post('/index.php/manager/delclient/',{'sub':1,'clients':client_mac},function(jdata){
                    if(jdata.type == 'error'){
                        mui.win.msg.c(function($m){
                            var $datal_m = $m.data_l.mui_win_msg; 
                            $datal_m.type = 'err';
                            $datal_m.title = '操作失败'; 
                            $datal_m.msg = '删除所选客户端失败！';
                        });
                    }else if(jdata.type == 'success'){
                        mui.win.msg.c(function($m){
                            var $datal_m = $m.data_l.mui_win_msg; 
                            $datal_m.type = 'suc';
                            $datal_m.title = '操作成功'; 
                            $datal_m.msg = '删除所选客户端成功！';
                        });
                        m_me.m_fdata.page_now = 1;
                        m_me.m_load();
                    }
                },'json');
            }
        },function($m){
            $m.data_l.mui_win_confirm.msg='是否删除所选客户端列表？';
        });
    });
}
//清空客户端
p_oclientlist.btn_delss = {};
p_oclientlist.btn_delss.evt = function(m_me){
    var $m1 = m_me;
    $('#gid_oclientlist>.mui-gpage .btn-delss').on('click',function(){
        mui.win.confirm.c(function($rt){
            if($rt){
                $.post('/index.php/manager/emptyclient/',{'sub':1},function(jdata){
                    if(jdata.type == 'error'){
                        mui.win.msg.c(function($m){
                            var $datal_m = $m.data_l.mui_win_msg; 
                            $datal_m.type = 'err';
                            $datal_m.title = '操作失败'; 
                            $datal_m.msg = '清空客户端列表失败！';
                        });
                    }else if(jdata.type == 'success'){
                        mui.win.msg.c(function($m){
                            var $datal_m = $m.data_l.mui_win_msg; 
                            $datal_m.type = 'suc';
                            $datal_m.title = '操作成功'; 
                            $datal_m.msg = '清空客户端列表成功！';
                        });
                        m_me.m_fdata.page_now = 1;
                        m_me.m_load();
                    }
                },'json');
            }
        },function($m){
            $m.data_l.mui_win_confirm.msg='是否清空客户端列表？';
        });
    });
}

p_oclientlist.addtask = {};
p_oclientlist.addtask.b_tpl = function($m){
    var tpl = _.template('<%console.log($m);%>'+
    '<div class="mui-form"><form>'+
        '<input type="hidden" name="data[client_mac]" value="6c:90:b1:ff:02:79">'+
        '<input type="hidden" name="client_ip" value="192.168.20.172">'+
        '<input type="hidden" name="vm_server" value="61.164.221.3">'+
        '<input type="hidden" name="data[os_type]" value="arm">'+
        '<ul class="mui-box">'+
            '<li><%=mui.ipt.ckb.c("data[update_vm]","yes")%><%=mui.des.txt.c("更改虚拟机设置")%></li>'+
            '<li><div class="col-l"><%=mui.des.txt.c("虚拟机服务器：")%></div><div class="col-r"><input name="data[vm_server]" class="mui-ipt-text" type="text" value="61.164.221.3"></div></li>'+
            '<li><div class="col-l"><%=mui.des.txt.c("服务器http端口：")%></div><div class="col-r"><input name="data[vm_port]" class="mui-ipt-text" type="text" value="9091"></div></li>'+
        '</ul>'+
    '</form></div>'+
    '<div class="mui-form-btns">'+
        '<span class="mui-ipt-btn mui-clk-save">保存</span>'+
        '<span class="mui-ipt-btn mui-clk-cancel">取消</span>'+
    '</div>'+
    '');
    return tpl({$m:$m});
}
p_oclientlist.addtask.b_rendering = function($m){
    $('.otask_add>.mui-win-win-cnt').html($m.v.tpl($m));
};
p_oclientlist.addtask.b = function($m){
    $m.v.tpl = p_oclientlist.addtask.b_tpl;
    $m.v.rendering = p_oclientlist.addtask.b_rendering;
};
p_oclientlist.addtask.c = function(){
    var $fna = arguments[0]?arguments[0]:$.noop;
    var $fnb = arguments[1]?arguments[1]:$.noop;
    var $m = _.extend({},mv.m);
    var $v = _.extend({},mv.v);
    $m.bind($v);
    p_oclientlist.addtask.b($m);
    $fnb($m);
    $m.rset();
    $fna($m)
}
p_oclientlist.addtask.evt = function(m_me){
    var $m1 = m_me;
    var $tgt_gid = '#'+$m1.m_ldata.m_id;
    $($tgt_gid+' .btn-addtask').on('click',function(){
        $r_i = $(this).parents('.mui-row-td').find('input[name="gckb"]').val();
        $r_data = $m1.m_cdata.data[$r_i];
        mui.win.win.c(function($m1){
            p_oclientlist.addtask.c(function($m2){
                //console.log('cs2');
            },function($m2){
                $m2.data_l.r_data = $r_data;
            });
        },function($m1){
            $m1.data_l.mui_win_win.cn = 'otask_add';
            $m1.data_l.mui_win_win.title = '添加任务';
        });
    });
}


function fnpage_oclientlist(pnav_n,pnav_v,nav_n,nav_v){
    $('.mi-r-bnav').html('<span>'+pnav_v+'</span><i class="fa fa-arrow-right"></i><span>'+nav_v+'</span>');
    //var m_oclientlist = _.extend({},mv.b);
    var m_oclientlist = _.extend({},mv.m);
    var v_oclientlist = _.extend({},mv.v);
    m_oclientlist.m_bind([v_oclientlist]);
    m_oclientlist.m_ldata.m_id = 'gid_oclientlist';
    m_oclientlist.m_fdata.os_type = '';
    m_oclientlist.m_fdata.field = 'client_mac';
    m_oclientlist.m_ldata.m_tgt = '#mvtgt_mbox';
    m_oclientlist.m_ldata.m_url = '/index.php/manager/clientlist/';
    m_oclientlist.m_ldata.ths = [
        {'t':_.template('<%=mui.ipt.ckb.c("gckba","all")%>')(),
        'v':_.template('<%var $m_me = $m_me,$ri = $ri;$rdata = $m_me.m_cdata.data[$ri];%>'+
        '<%=mui.ipt.ckb.c("gckb",$ri)%>'+
        '')
        },
        {'t':'客户端SN','v':'client_sn'},
        {'t':'客户端MAC','v':'client_mac'},
        {'t':'IP','v':'client_ip'},
        {'t':'子网掩码','v':'client_netmask'},
        {'t':'网关','v':'client_getway'},
        {'t':'DNS','v':'client_dns'},
        {'t':'软件版本','v':'client_version'},
        {'t':'硬件版本','v':'hw_version'},
        {'t':'虚拟机服务器','v':'vm_server'},
        {'t':'服务器http端口','v':'vm_port'},
        {'t':'平台','v':'os_type'},
        {'t':'最后更新时间','v':'update_time'},
        {'t':'状态','v':'status'},
        {'t':'操作','v':
        _.template('<%var $m_me = $m_me,$ri = $ri;$rdata = $m_me.m_cdata.data[$ri];%>'+
            '<%=muitpl.btn.addi("btn-addtask","添加任务")%>'+
            '<%=muitpl.btn.seti("btn-admpros","管理进程")%>'+
        ''),
        },
        {'t':'操作','v':
        _.template('<%var $m_me = $m_me,$ri = $ri;$rdata = $m_me.m_cdata.data[$ri];%>'+
            '<i class="fa fa-plus mui-grid-radd" mui-grid-ri="<%=$ri%>" title="添加任务"></i>'+
            '<i class="fa fa-cog mui-grid-radm" mui-grid-ri="<%=$ri%>" title="管理进程"></i>'+
        ''),
        },
    ];
    m_oclientlist.m_ldata.m_ctpls.gpctl = _.template('<%//console.log($m_me);%>'+
    '<div class="mui-gpctl">'+
        '<%=muitpl.btn.edit("btn-edits","批量编辑")%>'+
        '<%=mui.btn.dels()%>'+
        '<%=mui.btn.delss()%>'+
    '</div>'+
    '');
    m_oclientlist.m_ldata.m_cc.gctl = _.template('<%//console.log(m_me);%>'+
        '<%=muitpl.des.txt("平台：","des-os_type")%>'+
        '<%=muitpl.ipt.slt("os_type",{"":"所有","arm":"ARM","x86":"x86"},m_me.m_fdata.os_type)%>'+
        '<%=muitpl.des.txt("搜索项：","des-field")%>'+
        '<%=muitpl.ipt.slt("field",{"client_mac":"客户端MAC","client_ip":"IP","vm_server":"客户端服务器名"},m_me.m_fdata.field)%>'+
        '<%=muitpl.des.txt("关键词：","des-kwd")%>'+
        '<%=muitpl.ipt.text("kwd")%>'+
    '');
    v_oclientlist.v_tpls.index = muitpl.grid;
    v_oclientlist.v_evts.grid = muifn.grid;
    v_oclientlist.v_evts.gctl_slt = function(m_me){
        var $tgt_gid = '#'+m_me.m_ldata.m_id;
        $($tgt_gid+'>.mui-gctl>.mui-ipt-slt input').on('change',function(){
            if($(this).attr('name') == 'os_type'){
                m_me.m_fdata.os_type = $(this).val();
                m_me.m_fdata.page_now = 1;
                m_me.m_load();
            }
            if($(this).attr('name') == 'field'){
                m_me.m_fdata.field = $(this).val();
            }
        });
    }
    v_oclientlist.v_evts.gctl_kwd = function(m_me){
        var $tgt_gid = '#'+m_me.m_ldata.m_id;
        $($tgt_gid+'>.mui-gctl>input[name="kwd"]').on('keydown',function(evt){
            if(evt.keyCode==13){
                m_me.m_fdata.kwd = $(this).val();
                m_me.m_fdata.page_now = 1;
                m_me.m_load();
            }
        });
    }
    v_oclientlist.v_evts.btn_dels = p_oclientlist.btn_dels.evt;
    v_oclientlist.v_evts.btn_delss = p_oclientlist.btn_delss.evt;
    v_oclientlist.v_evts.btn_addtask = p_oclientlist.addtask.evt;
    
    v_oclientlist.v_evts.radd = function(m_me){
        $('#gid_oclientlist .mui-grid-radd').on('click',function(){
            var g_ri = $(this).attr('mui-grid-ri');
            var g_rdata = m_me.m_cdata.data[g_ri];
            var m_win = _.extend({},mv.m);
            var v_win = _.extend({},mv.v);
            m_win.m_bind([v_win]);
            m_win.m_ldata.m_id = 'mvid_oclt_add';
            m_win.m_ldata.m_tgt = '.mui-winbox';
            v_win.v_tpls.index = muitpl_win;
            v_win.v_evts.win_evt = muievt_win;
            v_win.v_evts.mui_win_c = function(m_me){//窗口内容
                fnwinc_oclt_add(m_me);
            };
            m_win.m_set(g_rdata);
        });
    };
    v_oclientlist.v_evts.radm = function(m_me){
        /*$('#gid_oclientlist .mui-grid-radm').on('click',function(){
            var g_ri = $(this).attr('mui-grid-ri');
            var g_data = m_me.m_data.data[g_ri];
            mui_win.open();
        });*/
    };
    m_oclientlist.m_fdata.page_now = 1;
    m_oclientlist.m_fdata.page_per = 2;
    
    m_oclientlist.m_load();
}