<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Download extends CI_Controller {

    function __construct() {
		parent::__construct();
	}

    public function x86(){ //下载x86文件 
        $filename= 'update.tar.gz'; //默认文件名
        if(file_exists("./config/soft.php")){
            $r = include("./config/soft.php");
            if(! empty($r) && ! empty($r['x86'])) $filename = $r['x86']; //获取文件名
        }
        $pathfile = './upload/x86/'.$filename;
        if(file_exists($pathfile)){
            $this->load->library('httpdownload');
            $this->httpdownload->set_byfile($pathfile);
		    $this->httpdownload->filename = $filename;
		    $this->httpdownload->download();
        }
        else exit('The file "'.$filename.'" does not exist.');
    }

    public function arm(){ //下载arm文件 
        $filename= 'update.tar.gz'; //默认文件名
        if(file_exists("./config/soft.php")){
            $r = include("./config/soft.php");
            if(! empty($r) && ! empty($r['arm'])) $filename = $r['arm']; //获取文件名
        }
        $pathfile = './upload/arm/'.$filename;
        if(file_exists($pathfile)){
            $this->load->library('httpdownload');
            $this->httpdownload->set_byfile($pathfile);
		    $this->httpdownload->filename = $filename;
		    $this->httpdownload->download();
        }
        else exit('The file "'.$filename.'" does not exist.');
    }
    public function init(){ //下载arm文件
        $filename= 'ctrip_init.sh'; //默认文件名
        if(file_exists("./config/soft.php")){
            $r = include("./config/soft.php");
            if(! empty($r) && ! empty($r['arm'])) $filename = $r['ctrip_init.sh']; //获取文件名
        }
        $pathfile = './upload/arm/'.$filename;
        if(file_exists($pathfile)){
            $this->load->library('httpdownload');
            $this->httpdownload->set_byfile($pathfile);
                    $this->httpdownload->filename = $filename;
                    $this->httpdownload->download();
        }
        else exit('The file "'.$filename.'" does not exist.');
    }
	
    public function jason(){ //下载arm文件
        $filename= 'jason_daemon'; //默认文件名
        if(file_exists("./config/soft.php")){
            $r = include("./config/soft.php");
            if(! empty($r) && ! empty($r['arm'])) $filename = $r['jason_daemon']; //获取文件名
        }
        $pathfile = './upload/arm/'.$filename;
        if(file_exists($pathfile)){
            $this->load->library('httpdownload');
            $this->httpdownload->set_byfile($pathfile);
                    $this->httpdownload->filename = $filename;
                    $this->httpdownload->download();
        }
        else exit('The file "'.$filename.'" does not exist.');
    }
    public function autostart(){ //下载arm文件
        $filename= 'sanlogic_autostart'; //默认文件名
        if(file_exists("./config/soft.php")){
            $r = include("./config/soft.php");
            if(! empty($r) && ! empty($r['arm'])) $filename = $r['sanlogic_autostart']; //获取文件名
        }
        $pathfile = './upload/arm/'.$filename;
        if(file_exists($pathfile)){
            $this->load->library('httpdownload');
            $this->httpdownload->set_byfile($pathfile);
                    $this->httpdownload->filename = $filename;
                    $this->httpdownload->download();
        }
        else exit('The file "'.$filename.'" does not exist.');
    }
    public function pingtest(){ //下载arm文件
        $filename= 'pingtest.sh'; //默认文件名
        if(file_exists("./config/soft.php")){
            $r = include("./config/soft.php");
            if(! empty($r) && ! empty($r['arm'])) $filename = $r['pingtest.sh']; //获取文件名
        }
        $pathfile = './upload/arm/'.$filename;
        if(file_exists($pathfile)){
            $this->load->library('httpdownload');
            $this->httpdownload->set_byfile($pathfile);
                    $this->httpdownload->filename = $filename;
                    $this->httpdownload->download();
        }
        else exit('The file "'.$filename.'" does not exist.');
    }
}