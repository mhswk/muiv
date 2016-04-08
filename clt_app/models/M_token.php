<?php
class M_token extends CI_Model{
    public function __construct(){
        parent::__construct();
    }
    public function get_token($tk_args,$tk_salt){
        ksort($tk_args);
        $tk_num = md5(implode('',$tk_args).'{'.$tk_salt.'}');
        return $tk_num;
    }
}