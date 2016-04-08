mpg.n_worklist = {};
mpg.n_worklist.c_load  = function(pnav_n,pnav_v,nav_n,nav_v){
    $('#mvtgt_mbox').attr({'gridn':'grid_n_worklist'});
    $('.mi-r-bnav').html('<span>'+pnav_v+'</span><i class="fa fa-arrow-right"></i><span>'+nav_v+'</span>');
    mpg.n_worklist.gird.c_load();
}
mpg.n_worklist.gird = mui.plug.grid.obj();
mpg.n_worklist.gird.c_bb = function(){
    var $mcr = this;
    $mcr.m_dataf.os_arch = '';
    $mcr.m_dataf.field = 'clt_sn';
    $mcr.m_dataf.page_now = 1;
    $mcr.m_dataf.page_per = 5;
    $mcr.m_datal.v_url = '/index.php/n_worklist/lists/';
    $mcr.m_datal.v_ts = 5000;
    $mcr.m_datal.v_attr.tgt = '#mvtgt_mbox';
    $mcr.m_datal.v_attr.cn = 'grid_n_worklist';
    $mcr.m_datal.v_tpls.gctl = _.template('<%//console.log($mcr);%>'+
        '<%=mui.des.txt("des-field","搜索项：")%>'+
        '<%=mui.ipt.slt("field",{"clt_sn":"SN码"},$mcr.m_dataf.field)%>'+
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
        {'t':'主机名','v':'hostname'},
        {'t':'虚拟机服务器','v':'vm_server'},
        {'t':'虚拟机http端口','v':'vm_port'},
        {'t':'IP','v':'clt_ip'},
        {'t':'子网掩码','v':'clt_netmask'},
        {'t':'网关','v':'clt_gateway'},
        {'t':'DNS','v':'clt_dns'},
        {'t':'更改主机名','v':'u_hostname'},
        {'t':'更改虚拟机设置','v':'u_vm'},
        {'t':'更改网络设置','v':'u_net'},
        {'t':'升级软件','v':'u_version'},
        {'t':'关闭终端','v':'shutdown'},
        {'t':'添加时间','v':'c_ts'},
    ];
}
mpg.n_worklist.gird.c_aa = function(){
    var $mcr = this;
    $('#mvtgt_mbox>.grid_n_worklist>.mui-plug-grid-ctl>.mui-ipt-slt input').on('change',function(){
        if($(this).attr('name') == 'os_arch'){
            $mcr.m_dataf.os_arch = $(this).val();
            $mcr.m_dataf.page_now = 1;
            $mcr.v_render();
        }
        if($(this).attr('name') == 'field'){
            $mcr.m_dataf.field = $(this).val();
        }
    });
    $('#mvtgt_mbox>.grid_n_worklist>.mui-plug-grid-ctl>input[name="kwd"]').on('keydown',function(evt){
        if(evt.keyCode==13){
            $mcr.m_dataf.kwd = $(this).val();
            $mcr.m_dataf.page_now = 1;
            $mcr.v_render();
        }
    });
    $('#mvtgt_mbox>.grid_n_worklist>.mui-plug-grid-page>.mui-plug-grid-page-ctl .btn-dels').on('click',function(){
        mpg.n_worklist.gird.cfm_dels.c_load();
    });
    $('#mvtgt_mbox>.grid_n_worklist>.mui-plug-grid-page>.mui-plug-grid-page-ctl .btn-delss').on('click',function(){
        mpg.n_worklist.gird.cfm_delss.c_load();
    });
}
mpg.n_worklist.gird.cfm_dels = mui.win.confirm.obj();
mpg.n_worklist.gird.cfm_dels.c_bb = function(){
    var $c = this,$v_attr = $c.m_datal.v_attr;
    $v_attr.msg = '是否删除所选任务？';
}
mpg.n_worklist.gird.cfm_dels.c_ee = function($rt){
    var $mcr = mpg.n_worklist.gird;
    if($rt){
        var $clt_sn = [];
        $("#mvtgt_mbox>.grid_n_worklist input[name='gckb']").each(function(){
            if($(this).prop('checked') == true){
                $clt_sn.push($mcr.m_datac.data[$(this).val()].clt_sn);
            }
        });
        $.post('/index.php/n_worklist/dels/',{'sub':1,'clt_sn':$clt_sn},function(jdata){
            if(jdata.type == 'error'){
                mpg.n_worklist.gird.cfm_dels.msg_err.c_load();
            }else if(jdata.type == 'success'){
                mpg.n_worklist.gird.cfm_dels.msg_suc.c_load();
            }
        },'json');
    }
}
mpg.n_worklist.gird.cfm_delss = mui.win.confirm.obj();
mpg.n_worklist.gird.cfm_delss.c_bb = function(){
    var $c = this,$v_attr = $c.m_datal.v_attr;
    $v_attr.msg = '是否清空任务列表？';
}
mpg.n_worklist.gird.cfm_delss.c_ee = function($rt){
    var $mcr = mpg.n_worklist.gird;
    if($rt){
        $.post('/index.php/n_worklist/delss/',{'sub':1},function(jdata){
            if(jdata.type == 'error'){
                mpg.n_worklist.gird.cfm_delss.msg_err.c_load();
            }else if(jdata.type == 'success'){
                mpg.n_worklist.gird.cfm_delss.msg_suc.c_load();
            }
        },'json');
    }
}
mpg.n_worklist.gird.cfm_dels.msg_err = mui.win.msg.obj();
mpg.n_worklist.gird.cfm_dels.msg_err.c_bb = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.type = 'err';
    $v_attr.title = '操作失败';
    $v_attr.msg = '删除所选任务失败！';  
}
mpg.n_worklist.gird.cfm_dels.msg_suc = mui.win.msg.obj();
mpg.n_worklist.gird.cfm_dels.msg_suc.c_bb = function(){
    var $obj_cltlist = mpg.n_worklist.gird;
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.type = 'suc';
    $v_attr.title = '操作成功';
    $v_attr.msg = '删除所选任务成功！';
    $obj_cltlist.m_dataf.page_now = 1;
    $obj_cltlist.v_render();
}
mpg.n_worklist.gird.cfm_delss.msg_err = mui.win.msg.obj();
mpg.n_worklist.gird.cfm_delss.msg_err.c_bb = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.type = 'err';
    $v_attr.title = '操作失败';
    $v_attr.msg = '清空任务失败！';  
}
mpg.n_worklist.gird.cfm_delss.msg_suc = mui.win.msg.obj();
mpg.n_worklist.gird.cfm_delss.msg_suc.c_bb = function(){
    var $obj_cltlist = mpg.n_worklist.gird;
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.type = 'suc';
    $v_attr.title = '操作成功';
    $v_attr.msg = '清空任务成功！';
    $obj_cltlist.m_dataf.page_now = 1;
    $obj_cltlist.v_render();
}
