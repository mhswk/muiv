<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class N_cltinfo extends CI_Controller{
    function __construct(){
		parent::__construct();
	}
    //客户端信息提交
    public function post(){
        $ipt['clt_sn'] = trim($this->input->post('clt_sn'));
        $ipt['sw_ename'] = trim($this->input->post('sw_ename'));
        $ipt['sw_cversion'] = trim($this->input->post('sw_cversion'));
        $ipt['os_name'] = trim($this->input->post('os_name'));
        $ipt['os_arch'] = trim($this->input->post('os_arch'));
        $ipt['os_bit'] = trim($this->input->post('os_bit'));
        if($ipt['clt_sn']!=''){
            $rpl_data = array(
                'clt_sn' => $ipt['clt_sn'],
                'sw_ename' => $ipt['sw_ename'],
                'sw_cversion' => $ipt['sw_cversion'],
                'os_name' => $ipt['os_name'],
                'os_arch' => $ipt['os_arch'],
                'os_bit' => $ipt['os_bit'],
                'update_time' => date('Y-m-d H:i:s')
            );
            if($this->db->replace('n_cltinfo',$rpl_data)){
                exit('success');
            }
        }
        exit('failed');
    }
}
