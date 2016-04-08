<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class N_cltlist extends CI_Controller{
    function __construct(){
        parent::__construct();
        if(!$this->sess->usr()){
            $this->sess->login();
        }
    }
    public function lists(){
        $ipt['page_now'] = intval($this->input->post('page_now'));
        $ipt['page_per'] = intval($this->input->post('page_per'));
        $ipt['os_arch'] = trim($this->input->post('os_arch'));
        $ipt['field'] = trim($this->input->post('field'));
        $ipt['kwd'] = trim($this->input->post('kwd'));
        $sch['start'] = ($ipt['page_now']-1)*$ipt['page_per'];
        $sch['num'] = $ipt['page_per'];
        
        $this->db->from('n_cltinfo');
        if(!empty($ipt['os_arch'])){
            $this->db->where('os_arch',$ipt['os_arch']);
        }
        if(!empty($ipt['field']) && !empty($ipt['kwd'])){
            $this->db->like($ipt['field'],$ipt['kwd']);
        }
        $rt['data_count'] = $this->db->count_all_results();
        
        if(!empty($ipt['os_arch'])){
            $this->db->where('os_arch',$ipt['os_arch']);
        }
        if(!empty($ipt['field']) && !empty($ipt['kwd'])){
            $this->db->like($ipt['field'],$ipt['kwd']);
        }
        $this->db->limit($sch['num'],$sch['start']);
        $query = $this->db->get('n_cltinfo');
        $rt['data'] = $query->result_array();
        
        echo json_encode(array('success'=>true,'data'=>array('data_count'=>$rt['data_count'],'data'=>$rt['data'])));
    }
    public function dels(){
        $sub = intval($this->input->post('sub'));
        $clt_sn = $this->input->post('clt_sn');
        if($sub){
            if(empty($clt_sn)){
                $this->comm->msg_err('请选择要删除的客户端记录！');
            }else{
                $this->db->where_in('clt_sn',$clt_sn);
                $this->db->delete('n_cltinfo');
                if($this->db->affected_rows()){
                    $this->comm->msg_suc('操作成功！');
                }
            }
            $this->comm->msg_err('操作失败！');
        }
    }
    public function delss(){
        if($this->input->post('sub')){
            $this->db->empty_table('n_cltinfo');
            if($this->db->affected_rows()){
				$this->comm->msg_suc('操作成功！');
			}
            $this->comm->msg_err('操作失败！');
        }
    }
}