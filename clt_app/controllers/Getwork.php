<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Getwork extends CI_Controller {

    function __construct() {
		parent::__construct();
	}

    public function index(){
        $mac = trim($this->input->get_post('mac'));

        if(empty($mac)) exit('Get parameter [mac] failed!');

        $this->db->where('client_mac', $mac);
        $this->db->limit(1);
        $query = $this->db->get('worklist');

        if($query->num_rows()){
            $data = $query->row_array();
            $this->db->delete('worklist',array('client_mac'=>$mac));
            $this->db->delete('clientinfo',array('client_mac'=>$mac));
            $str='';
            if($data['update_vm']=='yes')
                $str.='vm_server='.$data['vm_server'].'|vm_port='.$data['vm_port'].'|vm_sport='.$data['vm_sport'].'|vm_domain='.$data['vm_domain'].'|';
            if($data['update_net']=='yes')
                $str.='ip='.$data['client_ip'].'|gateway='.$data['client_gateway'].'|netmask='.$data['client_netmask'].'|dns='.$data['client_dns'].'|';
            if($data['update_version']=='yes')
                $str.='version=yes|';
            if(! empty($data['action']))
                $str.='action='.$data['action'].'|';
            exit($str);
        }
        else {
            exit('');
        }
    }
}