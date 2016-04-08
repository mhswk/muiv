<?php
class M_cfg_threads extends CI_Model{
    private $tbn = 'cfg_threads';
    public function __construct(){
        parent::__construct();
    }
    public function rows(){
        $query = $this->db->get($this->tbn);
        return $query->result_array();
    }
    public function row($id){
        $query = $this->db->get_where($this->tbn,array('id' => $id));
        $row = $query->row_array();
        return $row;
    }
    public function u($us){
        $this->db->update_batch('cfg_threads',$us,'id');
    }
}