<?php
class M_n_upkgsinfo extends CI_Model{
    private $tbn = 'n_upkgsinfo';
    public function __construct(){
        parent::__construct();
    }
    public function iu($us){
        $usi = array();
        $usu = array();
        $oids = array();
        $rows_id = $this->rows_slt('id',true);
        foreach($rows_id as $row){
            $oids[] = $row['id'];
        }
        foreach($us as $row){
            if(in_array($row['id'],$oids)){
               $usu[] = $row;
            }else{
               $usi[] = $row;
            }
        }
        if(count($usi)>0){
            $this->db->insert_batch($this->tbn,$usi);    
        }
        if(count($usu)>0){
            $this->db->update_batch($this->tbn,$usu,'id');
        }
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
    public function row_n(){
        $this->db->where('status !=','yes');
        $query = $this->db->get($this->tbn);
        return $query->first_row('array');
    }
}