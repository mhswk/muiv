mpg.n_syscfg = {};
mpg.n_syscfg.c_load  = function(pnav_n,pnav_v,nav_n,nav_v){
    $('#mvtgt_mbox').attr({'pn':'lyt_n_syscfg'});
    $('.mi-r-bnav').html('<span>'+pnav_v+'</span><i class="fa fa-arrow-right"></i><span>'+nav_v+'</span>');
    mpg.n_syscfg.lyt_rc.c_load();
}
mpg.n_syscfg.lyt_rc = mui.lyt.rc.obj();
mpg.n_syscfg.lyt_rc.c_aa = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    var $tgt = '#'+$v_attr.id;
    $($tgt+' .btn_cancel').on('click',function(){
        $mcr.c_load();
    });
    $($tgt+' .btn_save').on('click',function(){
        mpg.n_syscfg.lyt_rc.cfm_save.c_load();
    });
}
mpg.n_syscfg.lyt_rc.c_bb = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $mcr.m_datal.v_post = true;
    $mcr.m_datal.v_url = 'index.php/n_syscfg/';
    $v_attr.tgt = '#mvtgt_mbox';
    $v_attr.id = 'lyt_n_syscfg';
    $v_attr.cele_r = [
        {'cele_c':[
            {'html':_.template(''+
                '<%=mui.des.txt("des_customer_code","客户编号：")%>'+
            '')},
            {'html':_.template(''+
                '<%=mui.ipt.text("customer_code",$mcr.m_datac.customer_code)%>'+
            '')}
        ]},
        {'cele_c':[
            {'html':_.template(''+
                '<%=mui.des.txt("des_f_dir","下载目录：")%>'+
            '')},
            {'html':_.template(''+
                '<%=mui.ipt.text("f_dir",$mcr.m_datac.f_dir)%>'+
            '')}
        ]},
        {'cele_c':[
            {'html':_.template(''+
                '<%=mui.des.txt("des_sync_url","同步地址：")%>'+
            '')},
            {'html':_.template(''+
                '<%=mui.ipt.text("sync_url",$mcr.m_datac.sync_url)%>'+
            '')}
        ]},
        {'cele_c':[
            {'html':_.template(''+
                '<%=mui.des.txt("des_onlinetsout","连线超时：")%>'+
            '')},
            {'html':_.template(''+
                '<%=mui.ipt.text("onlinetsout",$mcr.m_datac.onlinetsout)%>'+
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
mpg.n_syscfg.lyt_rc.cfm_save = mui.win.confirm.obj();
mpg.n_syscfg.lyt_rc.cfm_save.c_bb = function(){
    var $c = this,$v_attr = $c.m_datal.v_attr;
    $v_attr.msg = '是否确认修改系统配置？';
}
mpg.n_syscfg.lyt_rc.cfm_save.c_ee = function($rt){
    if($rt){
        var $sys_cfg = mpg.n_syscfg.lyt_rc,$sys_cfg_attr = $sys_cfg.m_datal.v_attr;
        var $tgt = '#'+$sys_cfg_attr.id;
        $fdata = {};
        $fdata.sub = true;
        $fdata.customer_code = $($tgt+' :input[name=customer_code]').val();
        $fdata.f_dir = $($tgt+' :input[name=f_dir]').val();
        $fdata.sync_url = $($tgt+' :input[name=sync_url]').val();
        $fdata.onlinetsout = $($tgt+' :input[name=onlinetsout]').val();
        $.post("index.php/n_syscfg/save/",$fdata,function(data){
            if(data.success == true){
                mpg.n_syscfg.lyt_rc.cfm_save.msg_suc.c_load();
            }else{
                mpg.n_syscfg.lyt_rc.cfm_save.msg_err.c_load();
            }
        },'json');
    }
}
mpg.n_syscfg.lyt_rc.cfm_save.msg_err = mui.win.msg.obj();
mpg.n_syscfg.lyt_rc.cfm_save.msg_err.c_bb = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.type = 'err';
    $v_attr.title = '操作失败';
    $v_attr.msg = '修改配置失败！';
}
mpg.n_syscfg.lyt_rc.cfm_save.msg_suc = mui.win.msg.obj();
mpg.n_syscfg.lyt_rc.cfm_save.msg_suc.c_bb = function(){
    var $mcr = this,$v_attr = $mcr.m_datal.v_attr;
    $v_attr.type = 'suc';
    $v_attr.title = '操作成功';
    $v_attr.msg = '修改配置成功！';
}
