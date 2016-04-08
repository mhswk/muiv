mpg.n_cltlist = {};
mdata.n_cltlist = {};
mpg.n_cltlist.c_load  = function(pnav_n,pnav_v,nav_n,nav_v){
    $('#mvtgt_mbox').attr({'gridn':'grid_n_cltlist'});
    $('.mi-r-bnav').html('<span>'+pnav_v+'</span><i class="fa fa-arrow-right"></i><span>'+nav_v+'</span>');
    mpg.n_cltlist.gird.c_load();
}
mpg.n_cltlist.gird = mui.plug.grid.obj();
mpg.n_cltlist.gird.c_bb = function(){
    var $mcr = this;
    $mcr.m_dataf.os_arch = '';
    $mcr.m_dataf.field = 'clt_sn';
    $mcr.m_dataf.page_now = 1;
    $mcr.m_dataf.page_per = 5;
    $mcr.m_datal.v_url = '/index.php/n_cltlist/lists/';
    $mcr.m_datal.v_ts = 300000;
    $mcr.m_datal.v_attr.tgt = '#mvtgt_mbox';
    $mcr.m_datal.v_attr.cn = 'grid_n_cltlist';
    $mcr.m_datal.v_tpls.gctl = _.template('<%//console.log($mcr);%>'+
        '<%=mui.des.txt("des-os_arch","平台：")%>'+
        '<%=mui.ipt.slt("os_arch",{"":"所有","arm":"ARM","x86":"x86"},$mcr.m_dataf.os_arch)%>'+
        '<%=mui.des.txt("des-field","搜索项：")%>'+
        '<%=mui.ipt.slt("field",{"clt_sn":"SN码","sw_cversion":"当前版本"},$mcr.m_dataf.field)%>'+
        '<%=mui.des.txt("des-kwd","关键词：")%>'+
        '<%=mui.ipt.text("kwd")%>'+
    '');
    $mcr.m_datal.v_tpls.gpctl = _.template(''+
        '<%=mui.btn.dels()%>'+
        '<%=mui.btn.delss()%>'+
    '');
    $mcr.m_datal.v_attr.ths = [
        {'t':_.template('<%=mui.ipt.ckb("gckba","all")%>')(),
        'v':_.template('<%var $rdata = $mcr.m_datac.data[$ri];%>'+
        '<%=mui.ipt.ckb("gckb",$ri)%>'+
        '')
        },
        {'t':'SN码','v':'clt_sn'},
        {'t':'软件名','v':'sw_ename'},
        {'t':'当前版本','v':'sw_cversion'},
        {'t':'可更新版本','v':'sw_nversion'},
        {'t':'连线','v':_.template('<%var $rdata = $mcr.m_datac.data[$ri];%>'+
        '<% if($rdata.on_line == "yes"){%>'+
        '连接'+
        '<% }else{%>'+
        '断开'+
        '<% }%>')},
        {'t':'系统','v':'os_name'},
        {'t':'平台','v':'os_arch'},
        {'t':'位数','v':'os_bit'},
        {'t':'主机名','v':'hostname'},
        {'t':'虚拟机服务器','v':'vm_server'},
        {'t':'服务器http端口','v':'vm_port'},
        {'t':'IP','v':'clt_ip'},
        {'t':'子网掩码','v':'clt_netmask'},
        {'t':'网关','v':'clt_gateway'},
        {'t':'DNS','v':'clt_dns'},
        {'t':'更新时间','v':'update_time'},
        {'t':'操作','v':_.template(''+
            '<%=mui.btn.addi("btn-naddtask",$ri,"添加任务")%>'+
            '<%=mui.btn.seti("btn-nadmpros",$ri,"管理进程")%>'+
        '')},
    ];
}
mpg.n_cltlist.gird.c_aa = function(){
    var $mcr = this;
    $('#mvtgt_mbox>.grid_n_cltlist>.mui-plug-grid-ctl>.mui-ipt-slt input').on('change',function(){
        if($(this).attr('name') == 'os_arch'){
            $mcr.m_dataf.os_arch = $(this).val();
            $mcr.m_dataf.page_now = 1;
            $mcr.v_render();
        }
        if($(this).attr('name') == 'field'){
            $mcr.m_dataf.field = $(this).val();
        }
    });
    $('#mvtgt_mbox>.grid_n_cltlist>.mui-plug-grid-ctl>input[name="kwd"]').on('keydown',function(evt){
        if(evt.keyCode==13){
            $mcr.m_dataf.kwd = $(this).val();
            $mcr.m_dataf.page_now = 1;
            $mcr.v_render();
        }
    });
    $('#mvtgt_mbox>.grid_n_cltlist>.mui-plug-grid-page>.mui-plug-grid-page-ctl .btn-dels').on('click',function(){
        mpg.n_cltlist.gird.cfm_dels.c_load();
    });
    $('#mvtgt_mbox>.grid_n_cltlist>.mui-plug-grid-page>.mui-plug-grid-page-ctl .btn-delss').on('click',function(){
        mpg.n_cltlist.gird.cfm_delss.c_load();
    });
    $('#mvtgt_mbox>.grid_n_cltlist .btn-naddtask').on('click',function(){
        mpg.n_cltlist.win_add_task.m_datal.v_data.row = $mcr.m_datac.data[$(this).attr('val')];
        mpg.n_cltlist.win_add_task.c_load();
    });
    $('#mvtgt_mbox>.grid_n_cltlist .btn-nadmpros').on('click',function(){
        mpg.n_cltlist.win_adm_pros.m_datal.v_data.row = $mcr.m_datac.data[$(this).attr('val')];
        mpg.n_cltlist.win_adm_pros.c_load();
    });
}
//mpg.n_cltlist.gird.cfm_dels
mpg.n_cltlist.gird.cfm_dels = mui.win.confirm.obj();
mpg.n_cltlist.gird.cfm_dels.c_bb = function(){
    var $c = this,$v_attr = $c.m_datal.v_attr;
    $v_attr.msg = '是否删除所选客户端？';
}
mpg.n_cltlist.gird.cfm_dels.c_ee = function($rt){
    var $mcr = mpg.n_cltlist.gird;
    if($rt){
        var $clt_sn = [];
        $("#mvtgt_mbox>.grid_n_cltlist input[name='gckb']").each(function(){
            if($(this).prop('checked') == true){
                $clt_sn.push($mcr.m_datac.data[$(this).val()].clt_sn);
            }
        });
        $.post('/index.php/n_cltlist/dels/',{'sub':1,'clt_sn':$clt_sn},function(jdata){
            if(jdata.type == 'error'){
                mpg.n_cltlist.gird.cfm_dels.msg_err.c_load();
            }else if(jdata.type == 'success'){
                mpg.n_cltlist.gird.cfm_dels.msg_suc.c_load();
            }
        },'json');
    }
}
//mpg.n_cltlist.gird.cfm_delss
mpg.n_cltlist.gird.cfm_delss = mui.win.confirm.obj();
mpg.n_cltlist.gird.cfm_delss.c_bb = function(){
    var $c = this,$v_attr = $c.m_datal.v_attr;
    $v_attr.msg = '是否清空客户端？';
}
mpg.n_cltlist.gird.cfm_delss.c_ee = function($rt){
    var $mcr = mpg.n_cltlist.gird;
    if($rt){
        $.post('/index.php/n_cltlist/delss/',{'sub':1},function(jdata){
            if(jdata.type == 'error'){
                mpg.n_cltlist.gird.cfm_delss.msg_err.c_load();
            }else if(jdata.type == 'success'){
                mpg.n_cltlist.gird.cfm_delss.msg_suc.c_load();
            }
        },'json');
    }
}
//mpg.n_cltlist.gird.cfm_dels.msg_err
mpg.n_cltlist.gird.cfm_dels.msg_err = mui.win.msg.obj();
mpg.n_cltlist.gird.cfm_dels.msg_err.c_bb = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.type = 'err';
    $v_attr.title = '操作失败';
    $v_attr.msg = '删除所选客户端失败！';  
}
//mpg.n_cltlist.gird.cfm_dels.msg_suc
mpg.n_cltlist.gird.cfm_dels.msg_suc = mui.win.msg.obj();
mpg.n_cltlist.gird.cfm_dels.msg_suc.c_bb = function(){
    var $obj_cltlist = mpg.n_cltlist.gird;
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.type = 'suc';
    $v_attr.title = '操作成功';
    $v_attr.msg = '删除所选客户端成功！';
    $obj_cltlist.m_dataf.page_now = 1;
    $obj_cltlist.v_render();
}
//mpg.n_cltlist.gird.cfm_delss.msg_err
mpg.n_cltlist.gird.cfm_delss.msg_err = mui.win.msg.obj();
mpg.n_cltlist.gird.cfm_delss.msg_err.c_bb = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.type = 'err';
    $v_attr.title = '操作失败';
    $v_attr.msg = '清空客户端失败！';  
}
//mpg.n_cltlist.gird.cfm_delss.msg_suc
mpg.n_cltlist.gird.cfm_delss.msg_suc = mui.win.msg.obj();
mpg.n_cltlist.gird.cfm_delss.msg_suc.c_bb = function(){
    var $obj_cltlist = mpg.n_cltlist.gird;
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.type = 'suc';
    $v_attr.title = '操作成功';
    $v_attr.msg = '清空客户端成功！';
    $obj_cltlist.m_dataf.page_now = 1;
    $obj_cltlist.v_render();
}
//mpg.n_cltlist.win_add_task
mpg.n_cltlist.win_add_task = mui.win.win.obj();
mpg.n_cltlist.win_add_task.c_aa = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    mpg.n_cltlist.win_add_task.lyt_rc.m_datal.v_data.row = $mcr.m_datal.v_data.row;
    mpg.n_cltlist.win_add_task.lyt_rc.c_load();
}
mpg.n_cltlist.win_add_task.c_bb = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.cn = 'win_naddtask';
    $v_attr.title = '添加任务--客户端['+$mcr.m_datal.v_data.row.clt_sn+']';
    $v_attr.width = '680px';
    $v_attr.height = '360px';
}
//mpg.n_cltlist.win_add_task.lyt_rc
mpg.n_cltlist.win_add_task.lyt_rc = mui.lyt.rc.obj();
mpg.n_cltlist.win_add_task.lyt_rc.c_aa = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    var $v_row = $mcr.m_datal.v_data.row;
    mdata.n_cltlist_addtask_o = {
        'clt_sn':$v_row.clt_sn,
        'u_hostname':'off',
        'hostname':$v_row.hostname,
        'u_vm':'off',
        'vm_server':$v_row.vm_server,
        'vm_port':$v_row.vm_port,
        'u_net':'off',
        'clt_ip':$v_row.clt_ip,
        'clt_netmask':$v_row.clt_netmask,
        'clt_gateway':$v_row.clt_gateway,
        'clt_dns':$v_row.clt_dns,
        'u_version':'off',
        'shutdown':'off',
    };
    mdata.n_cltlist_addtask = _.extend({},mdata.n_cltlist_addtask_o);
    $('body').off('n_cltlist_addtask');
    $('body').on('n_cltlist_addtask',function(evt){
        var nn = 'n_cltlist_addtask';
        var $datas = mdata[nn];
        if($datas['u_hostname']=='on'){
            $('*[ele_nn="'+nn+'"].g_u_hostname').removeAttr('disabled');
        }else{
            $('*[ele_nn="'+nn+'"].g_u_hostname').attr({'disabled':''});
        }
        if($datas['u_vm']=='on'){
            $('*[ele_nn="'+nn+'"].g_u_vm').removeAttr('disabled');
        }else{
            $('*[ele_nn="'+nn+'"].g_u_vm').attr({'disabled':''});
        }
        if($datas['u_net']=='on'){
            $('*[ele_nn="'+nn+'"].g_u_net').removeAttr('disabled');
        }else{
            $('*[ele_nn="'+nn+'"].g_u_net').attr({'disabled':''});
        }
    });
    $('*[ele_nn="n_cltlist_addtask"][ele_n="btn_save"]').on('click',function(){
        var $datas = _.extend({},mdata['n_cltlist_addtask']);
        $datas.sub = 1;
        $.post('/index.php/n_worklist/add/',$datas,function(jdata){
            if(jdata.type == 'error'){
                mpg.n_cltlist.win_add_task.c_close();
                var msg_err = mui.win.msg.obj();
                msg_err.c_bb = function(){
                    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
                    $v_attr.type = 'err';
                    $v_attr.title = '操作失败';
                    $v_attr.msg = '添加任务失败';  
                }
                msg_err.c_load();
            }else if(jdata.type == 'success'){
                mpg.n_cltlist.win_add_task.c_close();
                var msg_suc = mui.win.msg.obj();
                msg_suc.c_bb = function(){
                    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
                    $v_attr.type = 'cuc';
                    $v_attr.title = '操作成功';
                    $v_attr.msg = '添加任务成功';  
                }
                msg_suc.c_load();
            }
        },'json');
    });
    $('*[ele_nn="n_cltlist_addtask"][ele_n="btn_cancel"]').on('click',function(){
        mdata.n_cltlist_addtask = _.extend({},mdata.n_cltlist_addtask_o);
        $('body').trigger('mdata_nn_init',['n_cltlist_addtask']);
    });
    $('body').trigger('mdata_nn_init',['n_cltlist_addtask']);
    //form<-
}
mpg.n_cltlist.win_add_task.lyt_rc.c_bb = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    mdata.n_cltlist.addtask = {};
    mdata.n_cltlist.addtask.clt_sn = $mcr.m_datal.v_data.row.clt_sn;
    $mcr.m_datal.v_attr = {
        'tgt':'.win_naddtask .mui-win-win-cnt',
        'id':'lyt_naddtask',
        'cele_r':[
            {'cele_c':[
                {'html':_.template(''+
                    '<%=mui.ele.ckb("n_cltlist_addtask","u_hostname","","更改主机名")%>'+
                '')},
                {'html':$.noop},
            ]},
            {'cele_c':[
                {'html':_.template(''+
                    '<%=mui.ele.des("n_cltlist_addtask","des_hostname","主机名：","g_u_hostname")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.text("n_cltlist_addtask","hostname","","g_u_hostname")%>'+
                '')},
                {'html':$.noop},
            ]},
            {'cele_c':[
                {'html':_.template(''+
                    '<%=mui.ele.ckb("n_cltlist_addtask","u_vm","","更改虚拟机设置")%>'+
                '')},
                {'html':$.noop}
            ]},
            {'cele_c':[
                {'html':_.template(''+
                    '<%=mui.ele.des("n_cltlist_addtask","des_vm_server","虚拟机服务器：","g_u_vm")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.text("n_cltlist_addtask","vm_server","","g_u_vm")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.des("n_cltlist_addtask","des_vm_port","虚拟机http端口：","g_u_vm")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.text("n_cltlist_addtask","vm_port","","g_u_vm")%>'+
                '')},
                {'html':$.noop},
            ]},
            {'cele_c':[
                {'html':_.template(''+
                    '<%=mui.ele.ckb("n_cltlist_addtask","u_net","","更改网络设置")%>'+
                '')},
                {'html':$.noop}
            ]},
            {'cele_c':[
                {'html':_.template(''+
                    '<%=mui.ele.des("n_cltlist_addtask","des_clt_ip","设置新IP地址：","g_u_net")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.text("n_cltlist_addtask","clt_ip","","g_u_net")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.des("n_cltlist_addtask","des_clt_netmask","设置子网掩码：","g_u_net")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.text("n_cltlist_addtask","clt_netmask","","g_u_net")%>'+
                '')},
                {'html':$.noop},
            ]},
            {'cele_c':[
                {'html':_.template(''+
                    '<%=mui.ele.des("n_cltlist_addtask","des_clt_gateway","设置网关：","g_u_net")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.text("n_cltlist_addtask","clt_gateway","","g_u_net")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.des("n_cltlist_addtask","des_clt_dns","设置DNS：","g_u_net")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.text("n_cltlist_addtask","clt_dns","","g_u_net")%>'+
                '')},
                {'html':$.noop},
            ]},
            {'cele_c':[
                {'html':_.template(''+
                    '<%=mui.ele.ckb("n_cltlist_addtask","u_version","","升级软件版本")%>'+
                '')},
                {'html':$.noop}
            ]},
            {'cele_c':[
                {'html':_.template(''+
                    '<%=mui.ele.ckb("n_cltlist_addtask","shutdown","","关闭终端")%>'+
                '')},
                {'html':$.noop}
            ]},
            {'cele_c':[
                {'html':_.template(''+
                    '<%=mui.ele.btn_btn("n_cltlist_addtask","btn_save","保存")%>'+
                '')},
                {'html':_.template(''+
                    '<%=mui.ele.btn_btn("n_cltlist_addtask","btn_cancel","取消")%>'+
                '')},
                {'html':$.noop}
            ]}
        ],
    };
}
//mpg.n_cltlist.win_adm_pros
mpg.n_cltlist.win_adm_pros = mui.win.win.obj();
mpg.n_cltlist.win_adm_pros.c_aa = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    //mpg.n_cltlist.win_adm_pros.lyt_lr.m_datal.v_data.row = $mcr.m_datal.v_data.row;
    mpg.n_cltlist.win_adm_pros.cr.c_load();
}
mpg.n_cltlist.win_adm_pros.c_bb = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.cn = 'win_nprosadm';
    $v_attr.title = '进程管理--客户端['+$mcr.m_datal.v_data.row.clt_sn+']';
    $v_attr.width = '780px';
    $v_attr.height = '450px';
}
//mpg.n_cltlist.wprosadm.cr
mpg.n_cltlist.win_adm_pros.cr = mui.lyt.cr.obj();
mpg.n_cltlist.win_adm_pros.cr.c_aa = function(){
    mpg.n_cltlist.win_adm_pros.gird.c_load();
    mpg.n_cltlist.win_adm_pros.base.c_load();
    mdata.n_bpros_edit_o = {
        'sn': mpg.n_cltlist.win_adm_pros.m_datal.v_data.row.clt_sn,
        'bpros_cmd':'',
    };
    mdata.n_bpros_edit = _.extend({},mdata.n_bpros_edit_o);
    $('body').trigger('mdata_nn_init',['n_bpros_edit']);
    $('*[ele_nn="n_bpros_edit"][ele_n="btn_ppros"]').on('click',function(){
        var $datas = _.extend({},mdata['n_bpros_edit']);
        $datas.sub = 1;
        $.post('/index.php/n_process/btn_ppros/',$datas,function(jdata){
            mpg.n_cltlist.win_adm_pros.base.c_load();
        },'json');
    });
    $('*[ele_nn="n_bpros_edit"][ele_n="btn_cpros"]').on('click',function(){
        var $datas = _.extend({},mdata['n_bpros_edit']);
        $datas.sub = 1;
        $.post('/index.php/n_process/btn_cpros/',$datas,function(jdata){
            mpg.n_cltlist.win_adm_pros.base.c_load();
        },'json');
    });
}
mpg.n_cltlist.win_adm_pros.cr.c_bb = function(){
    var $mcr = this;
    $mcr.m_datal.v_attr.tgt = '.win_nprosadm .mui-win-win-cnt';
    $mcr.m_datal.v_attr.id = 'nw_pros';
    $mcr.m_datal.v_attr.cr_c = [
        {'cr_r':[
            {'html':_.template(''+
                '<%=mui.ele.text("n_bpros_edit","bpros_cmd","","g_u_net")%>'+
                '<%=mui.ele.btn_btn("n_bpros_edit","btn_ppros","（添加|删除）私有黑名单")%>'+
                '<%=mui.ele.btn_btn("n_bpros_edit","btn_cpros","（添加|删除）公共黑名单")%>'+
            ''),'cn':'n_bpros_edit'},
            {'html':_.template(''+
                '<div class="title">kill进程列表</div>'+
                '<div class="cnt"></div>'+
            ''),'cn':'n_kpros'},
            {'html':_.template(''+
                '<div class="title">私有进程黑名单</div>'+
                '<div class="cnt"></div>'+
            ''),'cn':'n_ppros'},
            {'html':_.template(''+
                '<div class="title">公共进程黑名单</div>'+
                '<div class="cnt"></div>'+
            ''),'cn':'n_cpros'},
        ]},
        {'cr_r':[
            {'html':$.noop,'cn':'nw_pros_list','gridn':'grid_nplist'}
        ]},
    ];
}
mpg.n_cltlist.win_adm_pros.gird = mui.plug.grid.obj();
mpg.n_cltlist.win_adm_pros.gird.c_aa = function(){
    $('#nw_pros .btn_pros_del').on('click',function(){
        var $mcr = mpg.n_cltlist.win_adm_pros.gird;
        var $sn = mpg.n_cltlist.win_adm_pros.m_datal.v_data.row.clt_sn;
        var $pids = [];
        $("#nw_pros input[name='gckb']").each(function(){
            if($(this).prop('checked') == true){
                $pids.push($mcr.m_datac.data[$(this).val()].pid);
            }
        });
        $.post('/index.php/n_process/delpros/',{'sub':1,'pids':$pids,'sn':$sn},function(jdata){
            mpg.n_cltlist.win_adm_pros.gird.m_dataf.page_now = 1;
            mpg.n_cltlist.win_adm_pros.gird.v_render();
            mpg.n_cltlist.win_adm_pros.base.c_load();
        },'json');
    });
}
mpg.n_cltlist.win_adm_pros.gird.c_bb = function(){
    var $mcr = this;
    $mcr.m_dataf.sn = mpg.n_cltlist.win_adm_pros.m_datal.v_data.row.clt_sn;
    $mcr.m_dataf.page_now = 1;
    $mcr.m_dataf.page_per = 5;
    $mcr.m_datal.v_url = '/index.php/n_process/lists/';
    $mcr.m_datal.v_ts = 300000;
    $mcr.m_datal.v_attr.tgt = '#nw_pros .nw_pros_list';
    $mcr.m_datal.v_attr.cn = 'grid_nplist';
    $mcr.m_datal.v_tpls.gctl = _.template(''+
    '');
    $mcr.m_datal.v_tpls.gpctl = _.template(''+
        '<%=mui.btn.dels("btn_pros_del","删除进程")%>'+
    '');
    $mcr.m_datal.v_attr.ths = [
        {'t':_.template('<%=mui.ipt.ckb("gckba","all")%>')(),
        'v':_.template('<%var $rdata = $mcr.m_datac.data[$ri];%>'+
        '<%=mui.ipt.ckb("gckb",$ri)%>'+
        '')
        },
        {'t':'uid','v':'uid'},
        {'t':'pid','v':'pid'},
        {'t':'time','v':'time'},
        {'t':'cmd','v':'cmd'},
    ];
}

mpg.n_cltlist.win_adm_pros.base = mui.plug.base.obj();
mpg.n_cltlist.win_adm_pros.base.c_bb = function(){
    var $mcr = this;
    $mcr.m_datal.v_url = '/index.php/n_process/baselist/';
    $mcr.m_dataf.sn = mpg.n_cltlist.win_adm_pros.m_datal.v_data.row.clt_sn;
}
mpg.n_cltlist.win_adm_pros.base.c_aa = function(){
    var $mcr = this;
    $('#nw_pros .n_kpros>.cnt').html($mcr.m_datac.n_kpros);
    $('#nw_pros .n_ppros>.cnt').html($mcr.m_datac.n_ppros);
    $('#nw_pros .n_cpros>.cnt').html($mcr.m_datac.n_cpros);
}
