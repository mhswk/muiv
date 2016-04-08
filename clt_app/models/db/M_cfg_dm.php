<?php
class M_cfg_dm extends CI_Model{
    private $tbn = 'cfg_dm';
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
        $this->db->update_batch($this->tbn,$us,'v_k');
    }
}