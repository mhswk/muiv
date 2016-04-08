<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//管理页面
class Adm extends CI_Controller{
    function __construct(){
        parent::__construct();
        if(!$this->sess->usr()){
            $this->sess->login();
        }
    }
    //主页
	public function index(){
        $v_data = array(
            'usr' => $this->sess->usr(),
        );
        $this->load->view('v_adm/v_index',$v_data);
	}
    //左导航数据
    public function navl_data(){
        $data = array(
            array('nav_n'=>'clt_new','nav_v'=>'新版','nav_img'=>'fa fa-sun-o',
                'nav_elec'=>array(
                    array('nav_n'=>'p_n_cltlist','nav_v'=>'客户端列表','nav_img'=>'fa fa-tv'),
                    array('nav_n'=>'p_n_worklist','nav_v'=>'任务列表','nav_img'=>'fa fa-calendar'),
                    array('nav_n'=>'p_n_syscfg','nav_v'=>'系统设置','nav_img'=>'fa fa-cog'),
                )
            ),
        );
        $rt_data = array('success'=>true,'data'=>$data);
        echo json_encode($rt_data);
    }
    //退出
    public function logout(){
        $this->sess->logout();
    }
}
