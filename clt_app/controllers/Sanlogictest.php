<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sanlogictest extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

    public function index(){
        $sn = trim($this->input->post('sn'));
        $result = trim($this->input->post('rest'));
        $date = "echo `date +20'%y-%m-%d %H:%M:%S'` >> ./sanlogic_test/".$sn;
        system($date);
        $cmd = "echo \"".$result."\" >> ./sanlogic_test/".$sn;
        system($cmd);
        exit("done");
    }
}
