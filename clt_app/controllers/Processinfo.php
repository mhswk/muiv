<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Processinfo extends CI_Controller {

    function __construct() {
		parent::__construct();
	}

    public function index(){
        $mac = trim($this->input->post('mac'));
        if(empty($mac))exit('post parameter [mac] failed!');
        $info = trim($this->input->post('info'));
        
        $this->db->delete('tbl_process',array('mac'=>$mac));
        $query = $this->db->get_where('tbl_clientinfo',array('client_mac'=>$mac));
        if($query->num_rows()>0){
            $process = explode(';',$info);
            $pros = array();
            if(is_array($process)){
                foreach($process as $val){
                    $var_arr = explode('|',$val);
                    $pros[] = array('mac'=>$mac,'uid'=>$var_arr[0],'pid'=>$var_arr[1],'time'=>$var_arr[2],'cmd'=>$var_arr[3]);
                }
            }
            $this->db->insert_batch('tbl_process',$pros);
        }
        exit('successfully');
    }
}
