<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//session
class Sess{
    //初始化session
    public function __construct(){
        session_start();
    }
    //获取用户
    public function usr(){
        return 'admin';
        /*if(isset($_SESSION['phpCAS'])){
            if(isset($_SESSION['phpCAS']['user'])){
                return $_SESSION['phpCAS']['user'];
            }
        }
        return null;*/
    }
    //登录
    public function login(){
        header("location:/cas/index.php");
    }
    //退出
    public function logout(){
        header("location:/cas/index.php?logout=");
    }
}
?>