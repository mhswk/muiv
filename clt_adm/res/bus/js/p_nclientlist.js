mpage.nclientlist = {}
mpage.nclientlist.c_load = function(pnav_n,pnav_v,nav_n,nav_v){
    $('.mi-r-bnav').html('<span>'+pnav_v+'</span><i class="fa fa-arrow-right"></i><span>'+nav_v+'</span>');   
    mpage.nclientlist.grid.c_load();
}
mpage.nclientlist.grid = mui.plug.grid.obj();
mpage.nclientlist.grid.c_aa = function(){
    
}
mpage.nclientlist.grid.c_bb = function(){
    var $c = this;
    $c.m_dataf.os_type = '';
    $c.m_dataf.field = 'client_mac';
    $c.m_dataf.page_now = 1;
    $c.m_dataf.page_per = 2;
    $c.m_datal.v_url = '/index.php/n_clientlist/nclist/';
    $c.m_datal.v_attr.tgt = '#mvtgt_mbox';
    $c.m_datal.v_attr.cn = 'grid_nclientlist';
    $c.m_datal.v_tpls.gctl = _.template(''+
        '<%=mui.des.txt("des-os_type","平台：")%>'+
        '<%=mui.ipt.slt("os_type",{"":"所有","arm":"ARM","x86":"x86"},$c.m_dataf.os_type)%>'+
        '<%=mui.des.txt("des-field","搜索项：")%>'+
        '<%=mui.ipt.slt("field",{"client_mac":"客户端MAC","client_ip":"IP","vm_server":"客户端服务器名"},$c.m_dataf.field)%>'+
        '<%=mui.des.txt("des-kwd","关键词：")%>'+
        '<%=mui.ipt.text("kwd")%>'+
    '');
    $c.m_datal.v_tpls.gpctl = _.template(''+
            '<%=mui.btn.dels()%>'+
            '<%=mui.btn.delss()%>'+
    '');
    $c.m_datal.v_attr.ths = [
        {'t':_.template('<%=mui.ipt.ckb("gckba","all")%>')(),
        'v':_.template('<%var $rdata = $c.m_datac.data[$ri];%>'+
        '<%=mui.ipt.ckb("gckb",$ri)%>'+
        '')
        },
        {'t':'客户端SN','v':'client_sn'},
        {'t':'客户端MAC','v':'client_mac'},
        {'t':'IP','v':'client_ip'},
        {'t':'子网掩码','v':'client_netmask'},
        {'t':'网关','v':'client_getway'},
        {'t':'DNS','v':'client_dns'},
        {'t':'硬件版本','v':'hw_version'},
        {'t':'虚拟机服务器','v':'vm_server'},
        {'t':'服务器http端口','v':'vm_port'},
        {'t':'软件名','v':'sft_ename'},
        {'t':'软件版本','v':'sft_v'},
        {'t':'版本号','v':'sft_vnum'},
        {'t':'平台','v':'sys_arch'},
        {'t':'操作系统','v':'sys_os'},
        {'t':'位数','v':'sys_bits'},
        {'t':'最后更新时间','v':'update_time'},
        {'t':'状态','v':'status'},
        {'t':'操作',
        /*'v':
        _.template('<%var $m_me = $m_me,$ri = $ri;$rdata = $m_me.m_cdata.data[$ri];%>'+
            '<%=muitpl.btn.addi("btn-addtask","添加任务")%>'+
            '<%=muitpl.btn.seti("btn-admpros","管理进程")%>'+
        ''),*/
        },
        /*{'t':'操作',
        'v':_.template('<%var $m_me = $m_me,$ri = $ri;$rdata = $m_me.m_cdata.data[$ri];%>'+
            '<i class="fa fa-plus mui-grid-radd" mui-grid-ri="<%=$ri%>" title="添加任务"></i>'+
            '<i class="fa fa-cog mui-grid-radm" mui-grid-ri="<%=$ri%>" title="管理进程"></i>'+
        ''),
        },*/
    ];
}
/*
mpage.nsyscfg.lyt_set = mui.lyt.rc.obj();
mpage.nsyscfg.lyt_set.c_aa = function(){
    var $c = this;
    var $tgt = '#'+$c.m_datal.v_attr.id;
    $($tgt+' .btn_cancel').on('click',function(){
        $c.c_load();
    });
    $($tgt+' .btn_save').on('click',function(){
        mpage.nsyscfg.lyt_set.cfm_save.c_load();
    });
}
mpage.nsyscfg.lyt_set.c_bb = function(){
    var $c = this,$v_attr = $c.m_datal.v_attr;
    $c.m_datal.v_url = 'index.php/n_syscfg/';
    $c.m_datal.v_set = 'r';
    $v_attr.tgt = '#mvtgt_mbox';
    $v_attr.id = 'lyt_syscfg';
    $v_attr.cele_r = [
        {'cele_c':[
            {'html':_.template(''+
                '<%=mui.des.txt("des_customer_code","客户编号：")%>'+
            '')},
            {'html':_.template(''+
                '<%=mui.ipt.text("customer_code",$c.m_datac.customer_code)%>'+
            '')}
        ]},
        {'cele_c':[
            {'html':_.template(''+
                '<%=mui.des.txt("des_loop_yes","软件包是否同步：")%>'+
            '')},
            {'html':_.template(''+
                '<%=mui.ipt.slt("loop_yes",{"yes":"是","no":"否"},$c.m_datac.loop_yes)%>'+
            '')}
        ]},
        {'cele_c':[
            {'html':_.template(''+
                '<%=mui.des.txt("des_sync_url","同步地址：")%>'+
            '')},
            {'html':_.template(''+
                '<%=mui.ipt.text("sync_url",$c.m_datac.sync_url)%>'+
            '')}
        ]},
        {'cele_c':[
            {'html':_.template(''+
                '<%=mui.des.txt("des_loop_time","同步周期(分)：")%>'+
            '')},
            {'html':_.template(''+
                '<%=mui.ipt.text("loop_time",$c.m_datac.loop_time)%>'+
            '')}
        ]},
        {'cele_c':[
            {'html':_.template(''+
                '<%=mui.des.txt("des_loop_time_last","最近同步时间：")%>'+
            '')},
            {'html':_.template(''+
                '<%=mui.ipt.text("loop_time_last",$c.m_datac.loop_time_last,"",true)%>'+
            '')}
        ]},
        {'cele_c':[
            {'html':_.template(''+
                '<%=mui.btn.btn("btn_save","保存")%>'+
                '<%=mui.btn.btn("btn_cancel","取消")%>'+
            '')}
        ]}
    ];
}
mpage.nsyscfg.lyt_set.cfm_save = mui.win.confirm.obj();
mpage.nsyscfg.lyt_set.cfm_save.c_bb = function(){
    var $c = this,$v_attr = $c.m_datal.v_attr;
    $v_attr.msg = '是否确认修改系统配置？';
}
mpage.nsyscfg.lyt_set.cfm_save.c_ee = function($rt){
    if($rt){
        var $lyt_set = mpage.nsyscfg.lyt_set,$lyt_set_v_attr = $lyt_set.m_datal.v_attr;
        var $tgt = '#'+$lyt_set_v_attr.id;
        $fdata = {};
        $fdata.sub = true;
        $fdata.customer_code = $($tgt+' :input[name=customer_code]').val();
        $fdata.loop_yes = $($tgt+' :input[name=loop_yes]').val();
        $fdata.sync_url = $($tgt+' :input[name=sync_url]').val();
        $fdata.loop_time = $($tgt+' :input[name=loop_time]').val();
        $.post("index.php/n_syscfg/save/",$fdata,function(data){
            if(data.success == true){
                mpage.nsyscfg.lyt_set.cfm_save.msg_suc.c_load();
            }else{
                mpage.nsyscfg.lyt_set.cfm_save.msg_err.c_load();
            }
        },'json');
    }
}
mpage.nsyscfg.lyt_set.cfm_save.msg_err = mui.win.msg.obj();
mpage.nsyscfg.lyt_set.cfm_save.msg_err.c_bb = function(){
    var $c = this,$v_attr = $c.m_datal.v_attr;
    $v_attr.type = 'err';
    $v_attr.title = '操作失败';
    $v_attr.msg = '修改配置失败！';
}
mpage.nsyscfg.lyt_set.cfm_save.msg_suc = mui.win.msg.obj();
mpage.nsyscfg.lyt_set.cfm_save.msg_suc.c_bb = function(){
    var $c = this,$v_attr = $c.m_datal.v_attr;
    $v_attr.type = 'suc';
    $v_attr.title = '操作成功';
    $v_attr.msg = '修改配置成功！';
}*/