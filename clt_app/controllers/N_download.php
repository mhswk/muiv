<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class N_download extends CI_Controller{
    function __construct(){
		parent::__construct();
        $this->load->model('db/m_n_syscfg');
        $this->load->model('db/m_n_cltinfo');
        $this->load->model('db/m_n_upkgsinfo');
	}
    public function info(){
        $clt_sn = trim($this->input->get_post('clt_sn'));
        $rt_info = array();
        $row_clt = $this->m_n_cltinfo->row_wslt('clt_sn,sw_ename,sw_nversion,sw_npkgid',array('clt_sn'=>$clt_sn));
        if(is_array($row_clt)){
            $row_pkg = $this->m_n_upkgsinfo->row_wslt('id,md5,pkg_n',array('id'=>$row_clt['sw_npkgid'],'status'=>'yes'));
            if(is_array($row_pkg)){
                $rt_info = array(
                    'pkg_id'=>$row_pkg['id'],
                    'sw_ename'=>$row_clt['sw_ename'],
                    'sw_nversion'=>$row_clt['sw_nversion'],
                    'pkg_n'=>$row_pkg['pkg_n'],
                    'md5'=>$row_pkg['md5']
                );
                $info = trim(implode('|',$rt_info));
                exit($info);
            }
        }
        exit('no');
    }
    public function down($pkg_id=0){
        $n_syscfg = $this->m_n_syscfg->kv();
        $row_pkg = $this->m_n_upkgsinfo->row_wslt('id,pkg_n',array('id'=>$pkg_id,'status'=>'yes'));
        $f_n = $n_syscfg['f_dir'].'/'.$row_pkg['id'].'/'.$row_pkg['pkg_n'];
        if(file_exists($f_n)){
            $this->load->helper('download');
            force_download($f_n,NULL);
        }
        exit('no');
    }
}
