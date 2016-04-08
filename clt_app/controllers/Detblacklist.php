<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Getblacklist extends CI_Controller {

    function __construct() {
		parent::__construct();
	}

    public function index(){
        $rt_str = '';
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
                $data = array(
                    'mac' => $mac,
                );
                $this->db->select('cmd');
                $query = $this->db->get_where('tbl_blackpros',$data);
                $data1 = $query->result_array();
                foreach($data1 as $k2 => $v2){
                    $cmd_arr[] = $v2['cmd'];
                }
                $rt_str = implode('|',array_unique($cmd_arr));
                if($rt_str != ''){
                    $rt_str = $rt_str.'|';
                }
            }
        }
        exit($rt_str);
    }
}