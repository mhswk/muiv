<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//新版客户端列表
class N_clientlist extends CI_Controller{
    function __construct(){
        parent::__construct();
        if(!$this->sess->usr()){
            $this->sess->login();
        }
    }
    public function nclist(){
        $ipt['page_now'] = intval($this->input->post('page_now'));
        $ipt['page_per'] = intval($this->input->post('page_per'));
        $ipt['os_type'] = trim($this->input->post('os_type'));
        $ipt['field'] = trim($this->input->post('field'));
        $ipt['kwd'] = trim($this->input->post('kwd'));
        $sch['start'] = ($ipt['page_now']-1)*$ipt['page_per'];
        $sch['num'] = $ipt['page_per'];
        
        $this->db->from('n_clientinfo');
        if(!empty($ipt['os_type'])){
            $this->db->where('os_type',$ipt['os_type']);
        }
        if(!empty($ipt['field']) && !empty($ipt['kwd'])){
            $this->db->like($ipt['field'],$ipt['kwd']);
        }
        $rt['data_count'] = $this->db->count_all_results();
        
        if(!empty($ipt['os_type'])){
            $this->db->where('os_type',$ipt['os_type']);
        }
        if(!empty($ipt['field']) && !empty($ipt['kwd'])){
            $this->db->like($ipt['field'],$ipt['kwd']);
        }
        $this->db->limit($sch['num'],$sch['start']);
        $query = $this->db->get('n_clientinfo');
        $rt['data'] = $query->result_array();
        
        echo json_encode(array('success'=>true,'data'=>array('data_count'=>$rt['data_count'],'data'=>$rt['data'])));
    }
}