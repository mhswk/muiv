<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {
	private $_username;
	private $msg;

	function __construct() {
		parent::__construct();
		$this->_username=getUserLoged();
		if(false===$this->_username) $this->msg='请登录';
	}
	
	public function index() { //主界面
		if($this->msg){	error_msg($this->msg,array('jumpUrl'=>'/index.php/home/login/'));	}
		$this->load->view('home/index',array('username'=>$this->_username));
	}

	public function login() { //登录
		if(! $this->msg){ header("location:/index.php/home/index/"); }
		else {
            $this->load->view('home/login',array());
        }
	}

	public function checklogin(){ //检查用户名、密码
		$username=trim($this->input->post('username'));
		$password=$this->input->post('password');
		if(! preg_match("/\S+/",$username)){
			error_msg('',array('data'=>array('el'=>'#msg_user','msg'=>'用户名不能为空！')));
		}
		else if(! preg_match("/^\w+$/",$username)){
			error_msg('',array('data'=>array('el'=>'#msg_user','msg'=>'用户名必须由字母、数字或下划线组成！')));
		}
		else if(! preg_match("/\S+/",$password)){
			error_msg('',array('data'=>array('el'=>'#msg_pwd','msg'=>'密码不能为空！')));
		}
		else if(true!==$r=chkUsrPswd($username,usrPwdEncryt($password))) {
			error_msg('',array('data'=>array('el'=>($r['obj']=='user'?'#msg_user':'#msg_pwd'),'msg'=>$r['msg'])));
		}
		else {
			$this->load->library('session');
			$this->session->set_userdata('username', $username);
			success_msg('',array('data'=>array('msg'=>'登录成功！','url'=>'/index.php/home/index/')));
		}
	}

	public function logout(){ //注销、退出
		$this->load->library('session');
		$this->session->unset_userdata('username');
		$jumpUrl=$this->input->get('jumpUrl');
		header("location:".(empty($jumpUrl)?"/index.php/home/login/":$jumpUrl));
	}

}