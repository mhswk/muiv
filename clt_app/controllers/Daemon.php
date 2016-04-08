<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//daemon(20160318)
class Daemon extends CI_Controller{
    function __construct(){
		parent::__construct();
        $this->load->library('pipe');
        $this->load->model('db/m_cfg_dm');
        $this->load->model('db/m_cfg_threads');
	}
    //daemon start
    public function start(){
        $ipt = array();
        $ipt['usr'] = $this->input->post('usr');
        $ipt['pwd'] = $this->input->post('pwd');
        $rt = array('success'=>false);
        $cfg_dm = $this->m_cfg_dm->kv();
        if($ipt['usr'] == $cfg_dm['usr'] && md5($ipt['pwd']) == $cfg_dm['pwd']){
            $us = array();
            $us[] = array(
                'v_k' => 'enable',
                'v_v'  => 'yes',
            );
            $this->m_cfg_dm->u($us);
            $s_data = $ipt;
            $s_tgt = $cfg_dm['tgt'];
            $s_url = $cfg_dm['url'];
            $s_port = $cfg_dm['port'];
            $this->pipe->post_send($s_data,$s_tgt,$s_url,$s_port);
            $rt['success'] = true;
        }
        echo json_encode($rt);
    }
    //daemon stop
    public function stop(){
        $ipt = array();
        $ipt['usr'] = $this->input->post('usr');
        $ipt['pwd'] = $this->input->post('pwd');
        $rt = array('success'=>false);
        $cfg_dm = $this->m_cfg_dm->kv();
        if($ipt['usr'] == $cfg_dm['usr'] && md5($ipt['pwd']) == $cfg_dm['pwd']){
            $us = array();
            $us[] = array(
                'v_k' => 'enable',
                'v_v'  => 'no',
            );
            $this->m_cfg_dm->u($us);
            sleep(2);
            $us = array();
            $us[] = array(
                'v_k' => 'lasttime',
                'v_v'  => 0,
            );
            $this->m_cfg_dm->u($us);
            $rt['success'] = true;
        }
        echo json_encode($rt);
    }
    //daemon admin
    public function admin(){
        $ipt = array();
        $ipt['usr'] = $this->input->post('usr');
        $ipt['pwd'] = $this->input->post('pwd');
        $cfg_dm = $this->m_cfg_dm->kv();
        if($ipt['usr'] == $cfg_dm['usr'] && md5($ipt['pwd']) == $cfg_dm['pwd']){
            $pid = date('YmdHis').rand(1000,9999);
            if(time() - strtotime($cfg_dm['lasttime']) > $cfg_dm['timeout']){
                ignore_user_abort(true);
                set_time_limit(0);
                $us = array();
                $us[] = array(
                    'v_k' => pid,
                    'v_v'  => $pid,
                );
                $this->m_cfg_dm->u($us);
                $cfg_dm = $this->m_cfg_dm->kv();
                while($cfg_dm['enable'] == 'yes' && $cfg_dm['pid'] == $pid){
                    $us = array();
                    $us[] = array(
                        'v_k' => 'lasttime',
                        'v_v'  => date('Y-m-d H:i:s'),
                    );
                    $this->m_cfg_dm->u($us);
                    $cfg_dm = $this->m_cfg_dm->kv();
                    $this->threads();
                    sleep($cfg_dm['sleep']);
                }                
            }
        }
    }
    //daemon threads
    private function threads(){
        $cfg_dm = $this->m_cfg_dm->kv();
        $rows_cfg_threads = $this->m_cfg_threads->rows();
        foreach($rows_cfg_threads as $row){
            $lasttime = strtotime($row['lasttime']);
            if(!$lasttime){
                $lasttime = 0;
            }
            if($row['enable']=='yes' && time() - $lasttime > $row['timeout']){
                $s_data = array('id'=>$row['id']);
                $s_tgt = $cfg_dm['tgt_threads'];
                $s_url = $cfg_dm['url'];
                $s_port = $cfg_dm['port'];
                $this->pipe->post_send($s_data,$s_tgt,$s_url,$s_port);
            }  
        }
    }
}