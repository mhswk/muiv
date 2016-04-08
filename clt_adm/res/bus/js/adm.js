//fnpage_clt_new_task
function fnpage_clt_new_task(navln_p,navlv_p,navln,navlv){
    $('.mi-r-bnav').html('<span>'+navlv_p+'</span><i class="fa fa-arrow-right"></i><span>'+navlv+'</span>');
    //console.log(navln_p);
    //console.log(navl_m_data);
    //$('.mi-r').html('clt_new_list');
}
//fnpage_clt_new_package
function fnpage_clt_new_package(navln_p,navlv_p,navln,navlv){
    $('.mi-r-bnav').html('<span>'+navlv_p+'</span><i class="fa fa-arrow-right"></i><span>'+navlv+'</span>');
    //console.log(navln_p);
    //console.log(navl_m_data);
    //$('.mi-r').html('clt_new_list');
}

//fnpage_oclientlist
function fnwinc_oclt_add(m_me){
    var win_tid_t = '#'+m_me.m_ldata.m_id+' .mui-win-t';
    var win_tid_c = '#'+m_me.m_ldata.m_id+' .mui-win-c';
    $(win_tid_t+' .mui-icons').addClass('mui-icons-add fa fa-plus');
    //console.log(m_me);
    $(win_tid_t+' .title').html('添加任务--客户端['+m_me.m_cdata.client_mac+']');
    var m_oclt_add = _.extend({},mv.m);
    var v_oclt_add = _.extend({},mv.v);
    m_oclt_add.m_bind([v_oclt_add]);
    m_oclt_add.m_ldata.m_tgt = win_tid_c;
    m_oclt_add.m_ldata.m_ms = {'f_m_me':m_me}
    v_oclt_add.v_tpls.index = _.template('<%var m_me = m_me;//console.log(m_me);%>'+
    '<div class="mui-form"><form>'+
        '<input type="hidden" name="data[client_mac]" value="<%=m_me.m_cdata.client_mac%>" />'+
        '<input type="hidden" name="client_ip" value="<%=m_me.m_cdata.client_ip%>" />'+
        '<input type="hidden" name="vm_server" value="<%=m_me.m_cdata.vm_server%>" />'+
        '<input type="hidden" name="data[os_type]" value="<%=m_me.m_cdata.os_type%>" />'+
        '<ul class="mui-box">'+
            '<li><span class="mui-ipt-checkbox"><i class="fa fa-square-o"></i><input type="checkbox" name="data[update_vm]" value="yes"/></span>更改虚拟机设置</li>'+
            '<li>'+
                '<div class="col-l">虚拟机服务器：</div>'+
                '<div class="col-r"><input name="data[vm_server]" class="mui-ipt-text" type="text" value="<%=m_me.m_cdata.vm_server%>" /></div>'+
            '</li>'+
            '<li>'+
                '<div class="col-l">服务器http端口：</div>'+
                '<div class="col-r"><input name="data[vm_port]" class="mui-ipt-text" type="text" value="<%=m_me.m_cdata.vm_port%>" /></div>'+
            '</li>'+
        '</ul>'+
        '<ul class="mui-box">'+
            '<li><span class="mui-ipt-checkbox"><i class="fa fa-square-o"></i><input type="checkbox" name="data[update_net]" value="yes" /></span>更改虚拟机设置</li>'+
            '<li>'+
                '<div class="col-l">设置新IP地址：</div>'+
                '<div class="col-r"><input name="data[client_ip]" class="mui-ipt-text" type="text" value="<%=m_me.m_cdata.client_ip%>" /></div>'+
            '</li>'+
            '<li>'+
                '<div class="col-l">设置子网掩码：</div>'+
                '<div class="col-r"><input name="data[client_netmask]" class="mui-ipt-text" type="text" value="<%=m_me.m_cdata.client_netmask%>" /></div>'+
            '</li>'+
            '<li>'+
                '<div class="col-l">设置网关：</div>'+
                '<div class="col-r"><input name="data[client_gateway]" class="mui-ipt-text" type="text" value="<%=m_me.m_cdata.client_gateway%>" /></div>'+
            '</li>'+
            '<li>'+
                '<div class="col-l">设置DNS：</div>'+
                '<div class="col-r"><input name="data[client_dns]" class="mui-ipt-text" type="text" value="<%=m_me.m_cdata.client_dns%>" /></div>'+
            '</li>'+
        '</ul>'+
        '<ul class="mui-box">'+
            '<li><span class="mui-ipt-checkbox"><i class="fa fa-square-o"></i><input type="checkbox" name="data[update_version]" value="yes" /></span>升级软件版本</li>'+
        '</ul>'+
        '<ul class="mui-box">'+
            '<li><span class="mui-ipt-checkbox"><i class="fa fa-square-o"></i><input type="checkbox" name="data[action]" value="shutdown" /></span>关闭终端</li>'+
        '</ul>'+
    '</form></div>'+
    '<div class="mui-form-btns"><span class="mui-ipt-btn mui-clk-save">保存</span><span class="mui-ipt-btn mui-clk-cancel">取消</span></div>'+
    '');
    v_oclt_add.v_evts.clk_cancel = function(m_me){
        $(m_me.m_ldata.m_tgt+' .mui-clk-cancel').on('click',function(){
            m_me.m_rset(m_me.m_cdata);
        });
    };
    v_oclt_add.v_evts.clk_save = function(m_me){
        $(m_me.m_ldata.m_tgt+' .mui-clk-save').on('click',function(){
            $f_odatas = muifn.form.odatas(m_me.m_ldata.m_tgt+' form');
            $.post('/index.php/manager/creatework/',$f_odatas,function(jdata){
                //console.log(jdata);
                if(jdata.type == 'error'){
                    muifn.msgbox.err(jdata.info,'失败提示');
                }else if(jdata.type == 'success'){
                    muifn.msgbox.suc(jdata.info,'成功提示');
                }
            },'json');
        });
    };
    m_oclt_add.m_rset(m_me.m_cdata);
}

//fnpage_oworklist
function fnpage_oworklist(navln_p,navlv_p,navln,navlv){
    $('.mi-r-bnav').html('<span>'+navlv_p+'</span><i class="fa fa-arrow-right"></i><span>'+navlv+'</span>');
    
    var m_oworklist = _.extend({},mv.m);
    var v_oworklist = _.extend({},mv.v);
    m_oworklist.m_bind([v_oworklist]);
    m_oworklist.m_ldata.m_id = 'gid_oworklist';
    m_oworklist.m_fdata.os_type = '';
    m_oworklist.m_fdata.field = 'client_mac';
    m_oworklist.m_ldata.m_tgt = '#mvtgt_mbox';
    m_oworklist.m_ldata.m_url = '/index.php/manager/worklist/';
    m_oworklist.m_ldata.ths = [
        {'t':_.template('<%=mui.ipt.ckb.c("gckba","all")%>')(),
        'v':_.template('<%var $m_me = $m_me,$ri = $ri;$rdata = $m_me.m_cdata.data[$ri];%>'+
        '<%=mui.ipt.ckb.c("gckb",$ri)%>'+
        '')
        },
        {'t':'平台','v':'os_type'},
        {'t':'客户端MAC','v':'client_mac'},
        {'t':'IP','v':'client_ip'},
        {'t':'子网掩码','v':'client_netmask'},
        {'t':'网关','v':'client_getway'},
        {'t':'DNS','v':'client_dns'},
        {'t':'虚拟机服务器','v':'vm_server'},
        {'t':'服务器http端口','v':'vm_port'},
        {'t':'更改虚拟机设置',
        'v':_.template('<%var $m_me = $m_me,$ri = $ri;$rdata = $m_me.m_cdata.data[$ri];%>'+
        '<% if($rdata.update_vm == "yes"){%>'+
        '<span class="mui-yes">是</span>'+
        '<%}else{%>'+
        '<span class="mui-no">否</span>'+
        '<%}%>'+
        '')
        },
        {'t':'更改网络设置',
        'v':_.template('<%var $m_me = $m_me,$ri = $ri;$rdata = $m_me.m_cdata.data[$ri];%>'+
        '<% if($rdata.update_net == "yes"){%>'+
        '<span class="mui-yes">是</span>'+
        '<%}else{%>'+
        '<span class="mui-no">否</span>'+
        '<%}%>'+
        '')
        },
        {'t':'升级软件',
        'v':_.template('<%var $m_me = $m_me,$ri = $ri;$rdata = $m_me.m_cdata.data[$ri];%>'+
        '<% if($rdata.update_version == "yes"){%>'+
        '<span class="mui-yes">是</span>'+
        '<%}else{%>'+
        '<span class="mui-no">否</span>'+
        '<%}%>'+
        '')
        },
        {'t':'关闭终端',
        'v':_.template('<%var $m_me = $m_me,$ri = $ri;$rdata = $m_me.m_cdata.data[$ri];%>'+
        '<% if($rdata.action == "shutdown"){%>'+
        '<span class="mui-yes">是</span>'+
        '<%}else{%>'+
        '<span class="mui-no">否</span>'+
        '<%}%>'+
        '')
        },
        {'t':'添加时间','v':'create_time'},
    ];
    m_oworklist.m_ldata.m_ctpls.gpctl = _.template('<%//console.log($m_me);%>'+
    '<div class="mui-gpctl">'+
        '<%=muitpl.btn.dels()%>'+
        '<%=muitpl.btn.delss()%>'+
    '</div>'+
    '');
    m_oworklist.m_ldata.m_cc.gctl = _.template('<%//console.log(m_me);%>'+
        '<%=muitpl.des.txt("平台：","des-os_type")%>'+
        '<%=muitpl.ipt.slt("os_type",{"":"所有","arm":"ARM","x86":"x86"},m_me.m_fdata.os_type)%>'+
        '<%=muitpl.des.txt("搜索项：","des-field")%>'+
        '<%=muitpl.ipt.slt("field",{"client_mac":"客户端MAC","client_ip":"IP","vm_server":"客户端服务器名"},m_me.m_fdata.field)%>'+
        '<%=muitpl.des.txt("关键词：","des-kwd")%>'+
        '<%=muitpl.ipt.text("kwd")%>'+
    '');
    v_oworklist.v_tpls.index = muitpl.grid;
    v_oworklist.v_evts.grid = muifn.grid;
    v_oworklist.v_evts.gctl_slt = function(m_me){
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
    v_oworklist.v_evts.gctl_kwd = function(m_me){
        var $tgt_gid = '#'+m_me.m_ldata.m_id;
        $($tgt_gid+'>.mui-gctl>input[name="kwd"]').on('keydown',function(evt){
            if(evt.keyCode==13){
                m_me.m_fdata.kwd = $(this).val();
                m_me.m_fdata.page_now = 1;
                m_me.m_load();
            }
        });
    }
    v_oworklist.v_evts.btn_dels = function(m_me){
        var cdata = m_me.m_cdata.data;
        var tgt_gid = '#'+m_me.m_ldata.m_id;
        $(tgt_gid+'>.mui-gpage>.mui-gpctl>.btn-dels').on('click',function(){
            mui.win.confirm.c('请确认','确定要删除所选任务吗？',function(r){
                if(r){
                    var client_mac = [];
                    $("input[name='gckb']").each(function(){
                        if($(this).prop('checked') == true){
                            client_mac.push(cdata[$(this).val()].client_mac);
                        }
                    });
                    $.post('/index.php/manager/delwork/',{'sub':1,'works':client_mac},function(jdata){
                        if(jdata.type == 'error'){
                            muifn.msgbox.err(jdata.info,'失败提示');
                        }else if(jdata.type == 'success'){
                            muifn.msgbox.suc(jdata.info,'成功提示');
                            m_me.m_fdata.page_now = 1;
                            m_me.m_load();
                        }
                    },'json');
                }
            });
        });
        
    };
    v_oworklist.v_evts.btn_delss = function(m_me){
        var cdata = m_me.m_cdata.data;
        var tgt_gid = '#'+m_me.m_ldata.m_id;
        $(tgt_gid+'>.mui-gpage>.mui-gpctl>.btn-delss').on('click',function(){
            mui.win.confirm.c('请确认','确定要清空所有任务吗？',function(r){
                if(r){
                    $.post('/index.php/manager/emptywork/',{'sub':1},function(jdata){
                        if(jdata.type == 'error'){
                            muifn.msgbox.err(jdata.info,'失败提示');
                        }else if(jdata.type == 'success'){
                            muifn.msgbox.suc(jdata.info,'成功提示');
                            m_me.m_fdata.page_now = 1;
                            m_me.m_load();
                        }
                    },'json');
                }
            });
        });    
    };
    m_oworklist.m_fdata.page_now = 1;
    m_oworklist.m_fdata.page_per = 2;
    m_oworklist.m_load();
}
//fnpage_clt_old_package
function fnpage_clt_old_package(navln_p,navlv_p,navln,navlv){
    $('.mi-r-bnav').html('<span>'+navlv_p+'</span><i class="fa fa-arrow-right"></i><span>'+navlv+'</span>');
    //console.log(navln_p);
    //console.log(navl_m_data);
    //$('.mi-r').html('clt_new_list');
}

$(document).ready(function(){
    var m_navl = _.extend({},mv.m);
    var v_navl = _.extend({},mv.v);
    m_navl.m_bind([v_navl]);
    m_navl.m_ldata.m_id = 'mvid_navl';
    m_navl.m_ldata.m_tgt = '#mvtgt_navl';
    m_navl.m_ldata.m_url = '/index.php/adm/navl_data/';
    v_navl.v_tpls.index = muitpl_navl;
    v_navl.v_evts.nav = function(m_me){
        var tgt_id = '#'+m_me.m_ldata.m_id;
        $(tgt_id+' .mui-navl-v1>.mui-clk').on('click',function(){
            $(tgt_id+' .mui-navl-v1').removeClass('mui-act');
            $(this).parent('.mui-navl-v1').addClass('mui-act');
        });
        $(tgt_id+' .mui-navl-v2>.mui-clk').on('click',function(){
            $(tgt_id+' .mui-navl-v2').removeClass('mui-act');
            $(this).parent('.mui-navl-v2').addClass('mui-act');
            $(this).parents('.mui-navl-v1').children('.mui-clk').click();
        });
        $(tgt_id+' .mui-navl-v3>.mui-clk').on('click',function(){
            $(tgt_id+' .mui-navl-v3').removeClass('mui-act');
            $(this).parent('.mui-navl-v3').addClass('mui-act');
            $(this).parents('.mui-navl-v2').children('.mui-clk').click();
        });
        //ctl
        $(tgt_id+' .mui-navl-v2>.mui-clk').on('click',function(){
            var pnav_n =$(this).parents('.mui-navl-v1').children('.mui-clk').attr('mui-navn');
            var pnav_v =$(this).parents('.mui-navl-v1').children('.mui-clk').attr('mui-navv');
            var nav_n =$(this).attr('mui-navn');
            var nav_v =$(this).attr('mui-navv');
            if($(this).attr('mui-navn') == 'p_n_cltlist'){
                mpg.n_cltlist.c_load(pnav_n,pnav_v,nav_n,nav_v);
            }else if($(this).attr('mui-navn') == 'p_n_worklist'){
                mpg.n_worklist.c_load(pnav_n,pnav_v,nav_n,nav_v);
            }else if($(this).attr('mui-navn') == 'p_n_syscfg'){
                mpg.n_syscfg.c_load(pnav_n,pnav_v,nav_n,nav_v);
            }else if($(this).attr('mui-navn') == 'oclientlist'){
                fnpage_oclientlist(pnav_n,pnav_v,nav_n,nav_v);
            }else if($(this).attr('mui-navn') == 'oworklist'){
                p_oworklist.load(pnav_n,pnav_v,nav_n,nav_v);
            }else if($(this).attr('mui-navn') == 'clt_old_package'){
                fnpage_clt_old_package(pnav_n,pnav_v,nav_n,nav_v);
            }
        });
        //auto clt
        $(tgt_id+' .mui-navl-v2:eq(0)').children('.mui-clk').click();
    };
    m_navl.m_load();
});