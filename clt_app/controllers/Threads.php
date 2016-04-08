<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//threads
class Threads extends CI_Controller{
    function __construct(){
		parent::__construct();
        $this->load->model('db/m_cfg_dm');
        $this->load->model('db/m_cfg_threads');
        $this->load->model('db/m_n_syscfg');
        $this->load->model('db/m_n_cltinfo');
        $this->load->model('db/m_n_cswinfo');
        $this->load->model('db/m_n_uswinfo');
        $this->load->model('db/m_n_upkgsinfo');
        $this->load->model('m_pkg');
	}
    public function cs(){
        /*$n_syscfg = $this->m_n_syscfg->kv();
        //print_r($n_syscfg);
        $pkg_n = 'f_down/2/pk32_2.zip';
        $this->load->helper('download');
        force_download($pkg_n,null);*/
    }
    //threads admin
    public function admin(){
        $ipt['id'] = $this->input->post('id');
        $pid = 0;
        $cfg_dm = $this->m_cfg_dm->kv();
        $row_cfg_threads = $this->m_cfg_threads->row($ipt['id']);
        $pid = $cfg_dm['pid'];
        ignore_user_abort(true);
        set_time_limit(0);
        while($cfg_dm['pid'] == $pid && $cfg_dm['enable'] == 'yes' && $row_cfg_threads['enable'] == 'yes'){
            $cfg_dm = $this->m_cfg_dm->kv();
            $row_cfg_threads = $this->m_cfg_threads->row($ipt['id']);
            $us = array();
            $us[] = array(
                'id' => $ipt['id'],
                'lasttime' => date('Y-m-d H:i:s')
            );
            $this->m_cfg_threads->u($us);
            $this->$row_cfg_threads['tgt']($ipt['id']);
            sleep($row_cfg_threads['sleep']);
        }
    }
    //online adm
    private function trd_n_online(){
        $n_syscfg = $this->m_n_syscfg->kv();
        $rows_n_cltinfo = $this->m_n_cltinfo->rows();
        $us = array();
        foreach($rows_n_cltinfo as $row){
            $onlie = '';
            if(time() - strtotime($row['update_time']) > $n_syscfg['onlinetsout']){
                $onlie = 'no';
            }else{
                $onlie = 'yes';
            }
            $us[] = array(
                'clt_sn' => $row['clt_sn'],
                'on_line' => $onlie
            );
        }
        $this->m_n_cltinfo->u($us);
    }
    //threads n_cswinfo refresh
    private function trd_n_csw(){
        $n_syscfg = $this->m_n_syscfg->kv();
        $rows_n_cltinfo = $this->m_n_cltinfo->rows_slt('sw_ename,sw_cversion',true);
        $us = array();
        foreach($rows_n_cltinfo as $row){
            $tk_args = array(
                'software_ename' => trim($row['sw_ename']),
                'current_version' => trim($row['sw_cversion']),
                'customer_code' => trim($n_syscfg['customer_code'])
            );
            ksort($tk_args);
            $tk_salt = $n_syscfg['customer_code'];
            $tk_num = md5(implode('',$tk_args).'{'.$tk_salt.'}');
            $us[] = array(
                'csw_tk' => $tk_num,
                'csw_ename' => trim($row['sw_ename']),
                'csw_version' => trim($row['sw_cversion']),
                'csw_customer_code' => trim($n_syscfg['customer_code']),
                'update_time' => date('Y-m-d H:i:s')
            );
        }
        $this->m_n_cswinfo->iud($us);
    }
    //threads n_uswinfo refresh
    public function trd_n_usw(){
        $ni_ids = array();
        $n_syscfg = $this->m_n_syscfg->kv();
        $rows_csw_tk = $this->m_n_cswinfo->rows_slt('csw_tk',true);      
        foreach($rows_csw_tk as $row){
            $ni_ids[] = $row['csw_tk'];
        }
        $this->m_n_uswinfo->d_ni($ni_ids);
        $rows_csw = $this->m_n_cswinfo->rows();
        $ius_pkg = array();
        $ius_usw = array();
        foreach($rows_csw as $row){
            $header = array();
            $ch = curl_init();
            $curl = $n_syscfg['sync_url'].'/software/check/'.$row['csw_customer_code'].'/'.$row['csw_ename'].'/'.$row['csw_version'];
            $header[] = "TOKEN: ".$row['csw_tk'];
            curl_setopt($ch,CURLOPT_URL,$curl);
            curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            curl_setopt($ch,CURLOPT_HEADER,0);
            $output = curl_exec($ch);
            curl_close($ch);
            $rt = json_decode($output,true);
            if(is_array($rt)){
                $rows_usw = $rt['data'];
                foreach($rows_usw as $row1){
                    $pkgids = array();
                    foreach($row1['packages'] as $row2){
                        $pkgids[] = $row2['id'];
                        $ius_pkg[] = array(
                            'id' => $row2['id'],
                            'arch' => strtolower(implode(',',$row2['arch'])),
                            'os' => strtolower(implode(',',$row2['os'])),
                            'bits' => strtolower(implode(',',$row2['bits'])),
                            'md5' => $row2['md5'],
                            'customer_code' => $n_syscfg['customer_code'],
                            'update_time' => date('Y-m-d H:i:s')
                        );
                    }
                    $ius_usw[] = array(
                        'usw_id' => md5($row['csw_tk'].$row1['versionLabel']),
                        'csw_tk' => $row['csw_tk'],
                        'usw_version' => $row1['versionLabel'],
                        'usw_vnum' => $row1['version'],
                        'usw_pkgids' => implode(',',$pkgids),
                        'update_time' => date('Y-m-d H:i:s')
                    );
                }
            }
        }
        $this->m_n_upkgsinfo->iu($ius_pkg);
        $this->m_n_uswinfo->iu($ius_usw);
    }
    //threads n_pkgdown
    private function trd_n_pkgdown(){
        ob_end_clean();
        set_time_limit(600);
        $this->m_pkg->pkg_down();
    }
    private function trd_n_pkgrf(){
        $n_syscfg = $this->m_n_syscfg->kv();
        $rows_n_cltinfo = $this->m_n_cltinfo->rows_slt('clt_sn,os_name,os_arch,os_bit,sw_ename,sw_cversion',true);
        $uswpkg_infos = array();
        foreach($rows_n_cltinfo as $row){    
            $uswpkg_info = array(
                'clt_sn' => '',
                'sw_nversion' => '',
                'sw_npkgid' => ''
            );
            $slt_sw_info = '';
            $tk_args = array(
                'software_ename' => trim($row['sw_ename']),
                'current_version' => trim($row['sw_cversion']),
                'customer_code' => trim($n_syscfg['customer_code'])
            );
            $tk_salt = $n_syscfg['customer_code'];
            $csw_tk = $this->m_pkg->token_create($tk_args,$tk_salt);
            $uswpkg_info['clt_sn'] = $row['clt_sn'];
            $uswpkg_info['os_name'] = $row['os_name'];
            $uswpkg_info['os_arch'] = $row['os_arch'];
            $uswpkg_info['os_bit'] = $row['os_bit'];
            $uswpkg_info['csw_tk'] = $csw_tk;
            $slt_sw_info = $this->m_n_uswinfo->rows_wslt('usw_version,usw_vnum,usw_pkgids',array('csw_tk'=>$csw_tk));
            if(is_array($slt_sw_info)){
                foreach($slt_sw_info as $slt_row){
                    $slt_upkgids = explode(',',$slt_row['usw_pkgids']);
                    foreach($slt_upkgids as $slt_upkgid){
                        $slt_pkg = $this->m_n_upkgsinfo->row_wslt('id,arch,os,bits,status',array('id'=>$slt_upkgid));
                        if($slt_pkg['status'] == 'yes' && in_array($uswpkg_info['os_name'],explode(',',$slt_pkg['os'])) && in_array($uswpkg_info['os_arch'],explode(',',$slt_pkg['arch'])) && in_array($uswpkg_info['os_bit'],explode(',',$slt_pkg['bits']))){
                            $uswpkg_info['sw_nversion'] = $slt_row['usw_version'];
                            $uswpkg_info['sw_npkgid'] = $slt_pkg['id'];
                        }
                    }
                }
            }
            $uswpkg_infos[] = $uswpkg_info;
        }
        $us_swpkgs = array();
        foreach($uswpkg_infos as $row){
            $us_swpkgs[] = array(
                'clt_sn' => $row['clt_sn'],
                'sw_nversion' => $row['sw_nversion'],
                'sw_npkgid' => $row['sw_npkgid'],
            );
        }
        $this->m_n_cltinfo->u($us_swpkgs);
    }
}