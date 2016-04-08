<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class GetJason extends CI_Controller {

    function __construct() {
		parent::__construct();
	}

    public function index(){
        $path = "./upload/arm/jason";
        if( file_exists( $path ) )
        {
            exit('jason');//输入文件内容
        }
        else
        {
            exit('');
        }
    }
}
