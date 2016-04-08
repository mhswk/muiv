<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class N_process extends CI_Controller {
    function __construct(){
		parent::__construct();
	}

    public function lists(){
        $ipt['page_now'] = intval($this->input->post('page_now'));
        $ipt['page_per'] = intval($this->input->post('page_per'));
        $ipt['sn'] = trim($this->input->post('sn'));
        $sch['start'] = ($ipt['page_now']-1)*$ipt['page_per'];
        $sch['num'] = $ipt['page_per'];
        
        $this->db->from('n_process');
        $this->db->where('sn',$ipt['sn']);
        $rt['data_count'] = $this->db->count_all_results();
        
        $this->db->where('sn',$ipt['sn']);
        $this->db->limit($sch['num'],$sch['start']);
        $query = $this->db->get('n_process');
        $rt['data'] = $query->result_array();
        
        echo json_encode(array('success'=>true,'data'=>array('data_count'=>$rt['data_count'],'data'=>$rt['data'])));
    }
    
    public function delpros(){
        if($this->input->post('sub')){
            $sn = $this->input->post('sn');
            $pids = $this->input->post('pids');
            $this->db->delete('n_delprocess',array('sn'=>$sn));
            $data = array();
            foreach($pids as $pid){
                $data[] = array('sn'=>$sn,'pid'=>$pid);
            }
            $this->db->insert_batch('n_delprocess',$data);
            $this->comm->msg_suc('操作成功！');
        }
        $this->comm->msg_err('操作失败！');
    }
    
    public function adddelcpros(){//公有黑名单添加删除
        if($this->msg){error_msg($this->msg);}
        if($this->input->post('dosubmit')){
            $mac = $this->input->post('mac');
            $cmd = $this->input->post('cmd');
            if(!empty($mac)){
                $this->db->select('client_mac');
                $query = $this->db->get('tbl_clientinfo');
                $mac_arr = array();
                $data = $query->result_array();
                foreach($data as $k => $v){
                    $mac_arr[] = $v['client_mac'];
                }
                if(in_array($mac,$mac_arr)){
                    $data = array(
                        'mac' => 'public',
                        'cmd' => $cmd
                    );
                    $query = $this->db->get_where('tbl_blackpros',$data);
                    if($query->num_rows() > 0){
                        $this->db->delete('tbl_blackpros',$data);
                        success_msg('公有黑名单'.$cmd.'删除成功');
                    }else{
                        $this->db->insert('tbl_blackpros',$data);
                        success_msg('公有黑名单'.$cmd.'添加成功');
                    }
                }
                
                
            }
        }
    }
    
    public function adddelppros(){//私有黑名单添加删除
        if($this->msg){error_msg($this->msg);}
        if($this->input->post('dosubmit')){
            $mac = $this->input->post('mac');
            $cmd = $this->input->post('cmd');
            if(!empty($mac)){
                $this->db->select('client_mac');
                $query = $this->db->get('tbl_clientinfo');
                $mac_arr = array();
                $data = $query->result_array();
                foreach($data as $k => $v){
                    $mac_arr[] = $v['client_mac'];
                }
                if(in_array($mac,$mac_arr)){
                    $data = array(
                        'mac' => $mac,
                        'cmd' => $cmd
                    );
                    $query = $this->db->get_where('tbl_blackpros',$data);
                    if($query->num_rows() > 0){
                        $this->db->delete('tbl_blackpros',$data);
                        success_msg('私有黑名单'.$cmd.'删除成功');                        
                    }else{
                        $this->db->insert('tbl_blackpros',$data);
                        success_msg('私有黑名单'.$cmd.'添加成功');
                    }
                }
                
            }
        }
    }
    private function n_kpros($sn){
        if($sn){
            $query = $this->db->get_where('n_delprocess',array('sn' => $sn));
            $pids = array();
            foreach ($query->result_array() as $row){
                $pids[] = $row['pid'];
            }
            $rt_str = implode('|',$pids);
            return $rt_str;
        }
    }
    private function n_cppros($sn){
        if($sn){
            $query = $this->db->get_where('n_blackpros',array('sn' => $sn));
            $pids = array();
            foreach ($query->result_array() as $row){
                $pids[] = $row['cmd'];
            }
            $rt_str = implode('|',$pids);
            return $rt_str;
        }
    }
    public function baselist(){
        if($this->input->post('sub')){
            $sn = $this->input->post('sn');
            $rt = array('n_kpros'=>$this->n_kpros($sn),'n_ppros'=>$this->n_cppros($sn),'n_cpros'=>$this->n_cppros('public'));
            echo json_encode($rt);
        }
    }
    public function btn_ppros(){
        if($this->input->post('sub')){
            $sn = $this->input->post('sn');
            $cmd = trim($this->input->post('bpros_cmd'));
            if($cmd != ''){
                $query = $this->db->get_where('n_blackpros',array('sn' => $sn,'cmd'=>$cmd));
                if($query->num_rows()>0){
                    $this->db->delete('n_blackpros',array('sn' => $sn,'cmd'=>$cmd));
                }else{
                    $this->db->insert('n_blackpros',array('sn' => $sn,'cmd'=>$cmd));
                }
                $this->comm->msg_suc('操作成功！');
            }
            $this->comm->msg_err('操作失败！');
        }
    }
    public function btn_cpros(){
        if($this->input->post('sub')){
            $sn = 'public';
            $cmd = $this->input->post('bpros_cmd');
            if($cmd != ''){
                $query = $this->db->get_where('n_blackpros',array('sn' => $sn,'cmd'=>$cmd));
                if($query->num_rows()>0){
                    $this->db->delete('n_blackpros',array('sn' => $sn,'cmd'=>$cmd));
                }else{
                    $this->db->insert('n_blackpros',array('sn' => $sn,'cmd'=>$cmd));
                }
                $this->comm->msg_suc('操作成功！');
            }
            $this->comm->msg_err('操作失败！');
        }
    }
}
