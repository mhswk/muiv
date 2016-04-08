<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//后台进程程序
class N_daemon extends CI_Controller{
    function __construct(){
		parent::__construct();
	}
    //后台管理进程开启
    public function bloop(){
        $fp = @fsockopen('192.168.16.32','80');
        if($fp){
            $out = "POST /cs.php \r\n";
            $out .= "Host: 192.168.16.32\r\n";
            $out .= "Connection: Close\r\n\r\n";
            fwrite($fp,$out);
            while (!feof($fp)){
                echo fgets($fp, 128);
            }
            fclose($fp);
        }
        //phpinfo();
        //phpinfo();
        /*$query = $this->db->get('n_syscfg');
        $cfg = array();
        foreach($query->result() as $row){
            $cfg[$row->cfg_key] = $row->cfg_val;
        }
        ignore_user_abort(true);
        set_time_limit(0);
        ob_end_clean();
        header("Connection: close");
        header("HTTP/1.1 200 OK");
        print_r($cfg);*/
        /*$query = $this->db->get('n_syscfg');
        $cfg = array();
        foreach($query->result() as $row){
            $cfg[$row->cfg_key] = $row->cfg_val;
        }
        while($cfg['loop_byes']=='yes'){
            if(time() - $cfg['loop_btime_last'] > $cfg['loop_btime']){
                $r_data = array(
                    'cfg_key' => 'loop_btime_last',
                    'cfg_val'  => time(),
                );
                $this->db->replace('n_syscfg',$r_data);
            }
            sleep($cfg['loop_btime']);
        }*/
    }
    //获取配置文件
    public function cs(){
        //获取系统配置
        $query = $this->db->get('n_syscfg');
        $cfg = array();
        foreach($query->result() as $row){
            $cfg[$row->cfg_key] = $row->cfg_val;
        }
        //获取当前软件列表
        $this->db->select('sw_ename,sw_cversion');
        $this->db->distinct();
        $query = $this->db->get('n_cltinfo');
        $csw = array();
        foreach($query->result() as $row){
            $csw[] = array(
                'sw_ename' => $row->sw_ename,
                'sw_cversion' => $row->sw_cversion,
                'customer_code' => $cfg['customer_code']
            );
        }
        if($cfg['loop_yes'] == 'yes'){
            print_r($cfg);
        }
        
        foreach($csw as $k1=>$v1){
            print_r($v1);
        }
    }
}