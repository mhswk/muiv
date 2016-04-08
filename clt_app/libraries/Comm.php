<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//Comm
class Comm{
    //message error
    public function msg_err($info='',$msg=array()){
        $rt_data = array('type'=>'error','info'=>$info,'msg'=>$msg);
        exit(json_encode($rt_data,true));
    }
    //message success
    public function msg_suc($info='',$msg=array()){
        $rt_data = array('type'=>'success','info'=>$info,'msg'=>$msg);
        exit(json_encode($rt_data,true));
    }
}
?>