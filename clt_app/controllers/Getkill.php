<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Getkill extends CI_Controller {

    function __construct() {
		parent::__construct();
	}

    public function index(){
        $mac = trim($this->input->get_post('mac'));
        if(empty($mac)) exit('Get parameter [mac] failed!');
        $query = $this->db->get_where('tbl_delprocess',array('mac'=>$mac));
        $pids = array();
        if($query->num_rows()>0){
            foreach ($query->result() as $row){
                $pids[] = $row->pid;
            }
        }
        $pids = trim(implode('|',$pids));
        if($pids != ''){
            $this->db->delete('tbl_delprocess',array('mac'=>$mac));
            exit($pids.'|');
        }else{
            exit();
        }
    }
}