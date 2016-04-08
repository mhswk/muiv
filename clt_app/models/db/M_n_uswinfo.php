<?php
class M_n_uswinfo extends CI_Model{
    private $tbn = 'n_uswinfo';
    public function __construct(){
        parent::__construct();
    }
    public function d_ni($ni_ids){
        $this->db->where_not_in('csw_tk',$ni_ids);
        $this->db->delete($this->tbn);
    }
    public function iu($us){
        $usi = array();
        $usu = array();
        $oids = array();
        $rows_id = $this->rows_slt('usw_id',true);
        foreach($rows_id as $row){
            $oids[] = $row['usw_id'];
        }
        foreach($us as $row){
            if(in_array($row['usw_id'],$oids)){
               $usu[] = $row;
            }else{
               $usi[] = $row;
            }
        }
        if(count($usi)>0){
            $this->db->insert_batch($this->tbn,$usi);    
        }
        if(count($usu)>0){
            $this->db->update_batch($this->tbn,$usu,'usw_id');
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
    public function rows_wslt($args,$w){
        $this->db->select($args);
        if(is_array($w)){
            $this->db->where($w);
        }
        $this->db->order_by('usw_vnum','ASC');
        $query = $this->db->get($this->tbn);
        return $query->result_array();
        
    }
}