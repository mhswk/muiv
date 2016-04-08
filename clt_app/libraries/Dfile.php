<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//Dir File 
class Dfile{
    //初始化
    public function __construct(){
        //session_start();
    }
    //当前目录
    public function dir_n(){
        return getcwd();
    }
    //删除文件或目录
    public function rm($df_n=''){
        if(is_dir($df_n)){
            $c_files = $this->d_list($df_n);
            if($c_files){
                foreach($c_files as $k=>$v){
                    $c_df_n = $df_n.'/'.$v;
                    $this->rm($c_df_n);
                }
            }
            rmdir($df_n);
        }else{
            if(is_file($df_n)){
                unlink($df_n);
            }
        }
        return true;
    }
    //目录下文件目录列表（数组）
    public function d_list($d_n='./'){
        if(is_dir($d_n)){
            $d1_arr = scandir($d_n);
            $d2_arr = array('.','..');
            $d1_arr = array_values(array_diff($d1_arr,$d2_arr));
            if(count($d1_arr)>0){
                return $d1_arr;
            }
            return false;
        }
        return false;
    }
}
?>