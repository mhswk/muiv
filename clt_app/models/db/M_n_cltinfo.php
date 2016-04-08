<?php
class M_n_cltinfo extends CI_Model{
    private $tbn = 'n_cltinfo';
    public function __construct(){
        parent::__construct();
    }
    public function rows(){
        $query = $this->db->get($this->tbn);
        return $query->result_array();
    }
    public function rows_slt($args,$dst=false){
        $this->db->select($args);
        if($dst){
            $this->db->distinct();
        }
        $query = $this->db->get($this->tbn);
        return $query->result_array();
    }
    public function row_wslt($args,$w){
        $this->db->select($args);
        if(is_array($w)){
            $this->db->where($w);
        }
        $query = $this->db->get($this->tbn);
        return $query->row_array();
    }
    public function u($us){
        $this->db->update_batch($this->tbn,$us,'clt_sn');
    }
}