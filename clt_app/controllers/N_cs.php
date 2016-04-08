<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//管理页面
class N_cs extends CI_Controller{
    function __construct(){
        parent::__construct();
        if(!$this->sess->usr()){
            $this->sess->login();
        }
    }
    //主页
	public function vnew_list(){
        $this->load->model('m_apiss');
        $args_arr = array('customer_code'=>'C20150001','software_ename'=>'vdiClient','current_version'=>'v1.0.0-Release');
        $v_news = $this->m_apiss->ck_vnewer($args_arr,$args_arr['customer_code']);
        print_r($v_news);
	}
    public function spkg_down(){
        set_time_limit(300);
        $this->load->model('m_apiss');
        $args_arr = array('customer_code'=>'C20150001','software_package_id'=>2);
        //phpinfo();
        $spkg = $this->m_apiss->spkg_down($args_arr,$args_arr['customer_code']);
        //print_r($spkg);
        /*Header('Content-type: '.$spkg['Content-Type']);
        Header('Content-Disposition: '.$spkg['Content-Disposition']);
        Header('Accept-Ranges: bytes');
        Header('Accept-Length: '.strlen($spkg['body']));
        print_r($spkg['body']);
        //file_put_contents('fdown/pkg1.zip',$spkg['body']);
        //print_r($spkg);*/
	}
}