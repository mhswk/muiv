<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Process extends CI_Controller {

    function __construct() {
		parent::__construct();
        $this->_username=getUserLoged();
		if(false===$this->_username) $this->msg='请登录';
	}

    public function proslist(){
        if($this->msg){error_msg($this->msg);}
        $page = intval($this->input->post('page'));
        $limit = intval($this->input->post('limit'));
        $start = intval($this->input->post('start')); //偏移量
        $sort = trim($this->input->post('sort')); //排序字段
        $dir = $this->input->post('dir')=='ASC'?'ASC':'DESC'; //排序顺序
        $mac = trim($this->input->post('mac'));
        
        $query = $this->db->get_where('tbl_process',array('mac'=>$mac));
        $total = $query->num_rows();
        $query = $this->db->from('tbl_process')->where('mac',$mac)->order_by($sort,$dir)->limit($limit,$start)->get();
        $data = $query->result_array();
        echo json_encode(array('total'=>$total,'data'=>$data));
    }
    
    public function delpros(){
        if($this->msg){error_msg($this->msg);}
        if($this->input->post('dosubmit')){
            $mac = $this->input->post('mac');
            $pids = $this->input->post('pids');
            $this->db->delete('tbl_delprocess',array('mac'=>$mac));
            $data = array();
            foreach($pids as $pid){
                $data[] = array('mac'=>$mac,'pid'=>$pid);
            }
            $this->db->insert_batch('tbl_delprocess',$data);
            success_msg('设置客户端删除pid成功！');
        }
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
    
    public function ccmds(){//公共黑名单
        if($this->msg){error_msg($this->msg);}
        $rt_str = '';
        if($this->input->post('dosubmit')){
            $mac = $this->input->post('mac');
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
                    );
                    $this->db->select('cmd');
                    $query = $this->db->get_where('tbl_blackpros',$data);
                    $cmd_arr = array();
                    $data1 = $query->result_array();
                    foreach($data1 as $k2 => $v2){
                        $cmd_arr[] = $v2['cmd'];
                    }
                    $rt_str = implode('|',$cmd_arr);
                }
            }
        }
        success_msg($rt_str);
    }
    
    public function pcmds(){//私有黑名单
        if($this->msg){error_msg($this->msg);}
        $rt_str = '';
        if($this->input->post('dosubmit')){
            $mac = $this->input->post('mac');
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
                    );
                    $this->db->select('cmd');
                    $query = $this->db->get_where('tbl_blackpros',$data);
                    $cmd_arr = array();
                    $data1 = $query->result_array();
                    foreach($data1 as $k2 => $v2){
                        $cmd_arr[] = $v2['cmd'];
                    }
                    $rt_str = implode('|',$cmd_arr);
                }
            }
        }
        success_msg($rt_str);
    }
    
    public function kills(){//删除进程名单
        if($this->msg){error_msg($this->msg);}
        $rt_str = '';
        if($this->input->post('dosubmit')){
            $mac = $this->input->post('mac');
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
                    );
                    $this->db->select('pid');
                    $query = $this->db->get_where('tbl_delprocess',$data);
                    $pid_arr = array();
                    $data1 = $query->result_array();
                    foreach($data1 as $k2 => $v2){
                        $pid_arr[] = $v2['pid'];
                    }
                    $rt_str = implode('|',$pid_arr);
                }
            }
        }
        success_msg($rt_str);
    }
}
