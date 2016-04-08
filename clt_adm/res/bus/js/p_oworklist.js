var p_oworklist = {};

p_oworklist.load = function(pnav_n,pnav_v,nav_n,nav_v){
    $('.mi-r-bnav').html('<span>'+pnav_v+'</span><i class="fa fa-arrow-right"></i><span>'+nav_v+'</span>');
    var $obj_oworklist = mui.plug.grid.obj();
    $obj_oworklist.c_bb = function(){
        var $c = this;
        $c.m_dataf.os_type = '';
        $c.m_dataf.field = 'client_mac';
        $c.m_dataf.page_now = 1;
        $c.m_dataf.page_per = 2;
        $c.m_datal.v_url = '/index.php/manager/worklist/';
        $c.m_datal.v_attr.tgt = '#mvtgt_mbox';
        $c.m_datal.v_attr.cn = 'grid_oworklist';
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
            {'t':'平台','v':'os_type'},
            {'t':'客户端MAC','v':'client_mac'},
            {'t':'IP','v':'client_ip'},
            {'t':'子网掩码','v':'client_netmask'},
            {'t':'网关','v':'client_getway'},
            {'t':'DNS','v':'client_dns'},
            {'t':'虚拟机服务器','v':'vm_server'},
            {'t':'服务器http端口','v':'vm_port'},
            {'t':'更改虚拟机设置',
            'v':_.template('<%var $rdata = $c.m_datac.data[$ri];%>'+
            '<% if($rdata.update_vm == "yes"){%>'+
            '<span class="mui-yes">是</span>'+
            '<%}else{%>'+
            '<span class="mui-no">否</span>'+
            '<%}%>'+
            '')
            },
            {'t':'更改网络设置',
            'v':_.template('<%var $rdata = $c.m_datac.data[$ri];%>'+
            '<% if($rdata.update_net == "yes"){%>'+
            '<span class="mui-yes">是</span>'+
            '<%}else{%>'+
            '<span class="mui-no">否</span>'+
            '<%}%>'+
            '')
            },
            {'t':'升级软件',
            'v':_.template('<%var $rdata = $c.m_datac.data[$ri];%>'+
            '<% if($rdata.update_version == "yes"){%>'+
            '<span class="mui-yes">是</span>'+
            '<%}else{%>'+
            '<span class="mui-no">否</span>'+
            '<%}%>'+
            '')
            },
            {'t':'关闭终端',
            'v':_.template('<%var $rdata = $c.m_datac.data[$ri];%>'+
            '<% if($rdata.action == "shutdown"){%>'+
            '<span class="mui-yes">是</span>'+
            '<%}else{%>'+
            '<span class="mui-no">否</span>'+
            '<%}%>'+
            '')
            },
            {'t':'添加时间','v':'create_time'},
        ];
    }
    $obj_oworklist.c_aa = function(){
        var $c = this;
        $('#mvtgt_mbox>.grid_oworklist>.mui-plug-grid-ctl>.mui-ipt-slt input').on('change',function(){
            if($(this).attr('name') == 'os_type'){
                $c.m_dataf.os_type = $(this).val();
                $c.m_dataf.page_now = 1;
                $c.v_render();
            }
            if($(this).attr('name') == 'field'){
                $c.m_dataf.field = $(this).val();
            }
        });
        $('#mvtgt_mbox>.grid_oworklist>.mui-plug-grid-ctl>input[name="kwd"]').on('keydown',function(evt){
            if(evt.keyCode==13){
                $c.m_dataf.kwd = $(this).val();
                $c.m_dataf.page_now = 1;
                $c.v_render();
            }
        });
        $('#mvtgt_mbox>.grid_oworklist>.mui-plug-grid-page>.mui-plug-grid-page-ctl .btn-dels').on('click',function(){
            //console.log($c);
            var $obj_dels = mui.win.confirm.obj();
            console.log($obj_dels);
            /*$obj_dels.c_ee = function($rt){
                if($rt){
                    var client_mac = [];
                    $("#mvtgt_mbox>.grid_oworklist input[name='gckb']").each(function(){
                        if($(this).prop('checked') == true){
                            client_mac.push($c.m_datac.data[$(this).val()].client_mac);
                        }
                    });
                    $.post('/index.php/manager/delwork/',{'sub':1,'works':client_mac},function(jdata){
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
                    console.log(client_mac);
                }
            }
            $obj_dels.c_load();*/
        });
    }
    $obj_oworklist.c_load();
}