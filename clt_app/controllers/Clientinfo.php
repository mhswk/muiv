<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Clientinfo extends CI_Controller {

    function __construct() {
		parent::__construct();
	}

    public function index(){
        $ip = trim($this->input->post('ip'));
        $mac = trim($this->input->post('mac'));
		$sn = trim($this->input->post('sn'));
        $gateway = trim($this->input->post('gateway'));
        $netmask = trim($this->input->post('netmask'));
        $dns = trim($this->input->post('dns'));
        $version = trim($this->input->post('version'));
        $hw_version = trim($this->input->post('hw_ver'));
        $os_type = trim($this->input->post('os_type')); //终端平台

        $vm_server = trim($this->input->post('vm_server')); //虚拟机名
        $vm_port = trim($this->input->post('vm_port'));
        $vm_sport = trim($this->input->post('vm_sport'));
        $vm_domain = trim($this->input->post('vm_domain'));

        #if(empty($ip)) exit('Get parameter [ip] failed!');
        #else if(empty($mac)) exit('Get parameter [mac] failed!');
        #else if(empty($version)) exit('Get parameter [version] failed!');
        #else if(empty($os_type)) exit('Get parameter [os_type] failed!');
        
        $this->db->where('client_mac', $mac);
        $query = $this->db->get('clientinfo');
        if($query->num_rows()){
            $this->db->where('client_mac', $mac);
            $this->db->update('clientinfo',
                array(
                    'vm_server'=>$vm_server,'vm_port'=>$vm_port,'vm_sport'=>$vm_sport,'vm_domain'=>$vm_domain,
                    'client_sn'=>$sn,'client_ip'=>$ip,'client_netmask'=>$netmask,'client_gateway'=>$gateway,'client_dns'=>$dns,'client_version'=>$version,'hw_version'=>$hw_version,
                    'os_type'=>$os_type,'update_time'=>date('Y-m-d H:i:s')
                    
                )
            );
        }
        else {
            $this->db->insert('clientinfo',
                array(
                    'vm_server'=>$vm_server,'vm_port'=>$vm_port,'vm_sport'=>$vm_sport,'vm_domain'=>$vm_domain,
                    'client_sn'=>$sn,'client_mac'=>$mac,'client_ip'=>$ip,'client_netmask'=>$netmask,'client_gateway'=>$gateway,'client_dns'=>$dns,'client_version'=>$version,'hw_version'=>$hw_version,
                    'os_type'=>$os_type,'update_time'=>date('Y-m-d H:i:s'))
            );
        }

        if($this->db->affected_rows()){
            exit('successfully');
        }
        else exit('failed');
    }
}
