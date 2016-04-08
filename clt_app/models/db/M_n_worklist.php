<?php
class M_n_worklist extends CI_Model{
    private $tbn = 'n_worklist';
    public function __construct(){
        parent::__construct();
    }
    public function r($rs){
        $this->db->replace($this->tbn,$rs);
        return true;
    }
}