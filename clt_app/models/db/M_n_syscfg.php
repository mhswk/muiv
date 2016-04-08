<?php
class M_n_syscfg extends CI_Model{
    private $tbn = 'n_syscfg';
    public function __construct(){
        parent::__construct();
    }
    public function kv(){
        $query = $this->db->get($this->tbn);
        $cfg = array();
        foreach($query->result() as $row){
            $cfg[$row->v_k] = $row->v_v;
        }
        return $cfg;
    }
    public function u($us){
        if(count($us)>0){
            $this->db->update_batch($this->tbn,$us,'v_k');
        }
    }
}