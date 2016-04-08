<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//管理页面
class N_syscfg extends CI_Controller{
    function __construct(){
        parent::__construct();
        $this->load->model('db/m_n_syscfg');
        if(!$this->sess->usr()){
            $this->sess->login();
        }
    }
    //获取配置文件
    public function index(){
        $n_cfg = $this->m_n_syscfg->kv();
        $rt = array('success'=>true,'data'=>$n_cfg);
        echo json_encode($rt);
    }
    //系统配置保存
    public function save(){
        $ipt = array();
        $rt_data = false;
        $sub = $this->input->post('sub');
        $ipt['customer_code'] = $this->input->post('customer_code');
        $ipt['f_dir'] = $this->input->post('f_dir');
        $ipt['sync_url'] = $this->input->post('sync_url');
        $ipt['onlinetsout'] = $this->input->post('onlinetsout');
        if($sub == true){
            $us = array(
                array(
                    'v_k'=>'customer_code',
                    'v_v'=>$ipt['customer_code']
                ),
                array(
                    'v_k'=>'f_dir',
                    'v_v'=>$ipt['f_dir']
                ),
                array(
                    'v_k'=>'sync_url',
                    'v_v'=>$ipt['sync_url']
                ),
                array(
                    'v_k'=>'onlinetsout',
                    'v_v'=>$ipt['onlinetsout']
                ),
            );
            $this->m_n_syscfg->u($us);
            if($this->db->affected_rows()>0){
                $rt_data = true;
            }
        }
        $rt = array('success'=>$rt_data);
        echo json_encode($rt);
    }
}