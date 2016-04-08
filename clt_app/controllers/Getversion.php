<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Getversion extends CI_Controller {

    function __construct() {
		parent::__construct();
	}

    public function index(){
        $path = "./upload/arm/version";
        if( file_exists( $path ) )
        {
            $body = file_get_contents($path);
            exit($body);//输入文件内容
        }
        else
        {
            exit('version=');
        }
    }
}
