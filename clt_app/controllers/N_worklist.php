<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//新版客户端列表
class N_worklist extends CI_Controller{
    function __construct(){
        parent::__construct();
        $this->load->model('db/m_n_worklist');
        if(!$this->sess->usr()){
            $this->sess->login();
        }
    }
    public function lists(){
        $ipt['page_now'] = intval($this->input->post('page_now'));
        $ipt['page_per'] = intval($this->input->post('page_per'));
        $ipt['field'] = trim($this->input->post('field'));
        $ipt['kwd'] = trim($this->input->post('kwd'));
        $sch['start'] = ($ipt['page_now']-1)*$ipt['page_per'];
        $sch['num'] = $ipt['page_per'];
        
        $this->db->from('n_worklist');
        if(!empty($ipt['field']) && !empty($ipt['kwd'])){
            $this->db->like($ipt['field'],$ipt['kwd']);
        }
        $rt['data_count'] = $this->db->count_all_results();
        
        if(!empty($ipt['field']) && !empty($ipt['kwd'])){
            $this->db->like($ipt['field'],$ipt['kwd']);
        }
        $this->db->limit($sch['num'],$sch['start']);
        $query = $this->db->get('n_worklist');
        $rt['data'] = $query->result_array();
        
        echo json_encode(array('success'=>true,'data'=>array('data_count'=>$rt['data_count'],'data'=>$rt['data'])));
    }
    public function add(){
        $sub = intval($this->input->post('sub'));
        $ipt['clt_sn'] = trim($this->input->post('clt_sn'));
        $ipt['u_hostname'] = trim($this->input->post('u_hostname'));
        $ipt['hostname'] = trim($this->input->post('hostname'));
        $ipt['u_vm'] = trim($this->input->post('u_vm'));
        $ipt['vm_server'] = trim($this->input->post('vm_server'));
        $ipt['vm_port'] = trim($this->input->post('vm_port'));
        $ipt['u_net'] = trim($this->input->post('u_net'));
        $ipt['clt_ip'] = trim($this->input->post('clt_ip'));
        $ipt['clt_netmask'] = trim($this->input->post('clt_netmask'));
        $ipt['clt_gateway'] = trim($this->input->post('clt_gateway'));
        $ipt['clt_dns'] = trim($this->input->post('clt_dns'));
        $ipt['u_version'] = trim($this->input->post('u_version'));
        $ipt['shutdown'] = trim($this->input->post('shutdown'));
        $ipt['c_ts'] = date('Y-m-d H:i:s');
        if($this->m_n_worklist->r($ipt)){
            $this->comm->msg_suc('操作成功！');
        }
        $this->comm->msg_err('操作失败！');
    }
    public function dels(){
        $sub = intval($this->input->post('sub'));
        $clt_sn = $this->input->post('clt_sn');
        if($sub){
            if(empty($clt_sn)){
                $this->comm->msg_err('请选择要删除的任务！');
            }else{
                $this->db->where_in('clt_sn',$clt_sn);
                $this->db->delete('n_worklist');
                if($this->db->affected_rows()){
                    $this->comm->msg_suc('操作成功！');
                }
            }
            $this->comm->msg_err('操作失败！');
        }
    }
    public function delss(){
        if($this->input->post('sub')){
            $this->db->empty_table('n_worklist');
            if($this->db->affected_rows()){
				$this->comm->msg_suc('操作成功！');
			}
            $this->comm->msg_err('操作失败！');
        }
    }
}