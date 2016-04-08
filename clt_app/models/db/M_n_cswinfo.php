<?php
class M_n_cswinfo extends CI_Model{
    private $tbn = 'n_cswinfo';
    public function __construct(){
        parent::__construct();
    }
    public function iud($us){
        $usi = array();
        $usu = array();
        $csw_tks = array();
        $tks = array();
        $rows_csw_tk = $this->rows_slt('csw_tk',true);
        foreach($rows_csw_tk as $row){
            $csw_tks[] = $row['csw_tk'];
        }
        foreach($us as $row){
            $tks[] = $row['csw_tk'];
            if(in_array($row['csw_tk'],$csw_tks)){
               $usu[] = $row;
            }else{
               $usi[] = $row;
            }
        }
        $this->db->where_not_in('csw_tk',$tks);
        $this->db->delete($this->tbn);
        if(count($usi)>0){
            $this->db->insert_batch($this->tbn,$usi);    
        }
        if(count($usu)>0){
            $this->db->update_batch($this->tbn,$usu,'csw_tk');
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
    public function rows(){
        $query = $this->db->get($this->tbn);
        return $query->result_array();
    }
}