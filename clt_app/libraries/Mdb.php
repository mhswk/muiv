<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//Mdb
class Mdb{
    private $CI;
    public $tbn;
    //初始化Mdb
    public function __construct(){
        $this->CI = & get_instance();
    }
    //设置表名
    public function tbn($n=''){
        if($n!=''){
            $this->tbn = $n;
        }
        return $this->tbn;
    }
    //获取配置信息
    public function cfg(){
        $query = $this->CI->db->get($this->tbn);
        $cfg = array();
        foreach($query->result() as $row){
            $cfg[$row->cfg_key] = $row->cfg_val;
        }
        return $cfg;
    }
    public function iu($iu_id,$iu_db){
        if($this->res_num_where($iu_id)>0){
            $this->CI->db->where($iu_id);
            $this->CI->db->update($this->tbn,$iu_db);
        }else{
            $iu_db = array_merge($iu_id,$iu_db);
            $this->CI->db->insert($this->tbn,$iu_db);
        }
        return true;
    }
    //结果数据量where
    public function res_num_where($id=array('id'=>0)){
        $rstc = $this->CI->db->where($id)->count_all_results($this->tbn);
        return $rstc;
    }
    //结果数据量like
    public function res_num_like($id=array('id'=>0)){
        $rstc = $this->CI->db->like($id)->count_all_results($this->tbn);
        return $rstc;
    }
    
    
    public function u($tbn,$id_arr,$db_arr){
        $rstc = $this->CI->db->where(array('id'=>5))->count_all_results('n_upkgsinfo');
        echo $rstc;
    }
}
?>