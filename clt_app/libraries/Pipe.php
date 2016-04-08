<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//pipe
class Pipe{
    public function post_send($data=array(),$tgt='/index.php/daemon/base',$url='127.0.0.1',$port='80'){
        $f_data_arr = $data;
        $f_data_str = http_build_query($f_data_arr);
        $f_data_len = strval(strlen($f_data_str));
        $fp = stream_socket_client('tcp://'.$url.':'.$port);
        if($fp){
            $out = "POST ".$tgt." HTTP/1.1\r\n";
            $out .= "Host: ".$url.":".$port."\r\n";
            $out .= "Content-Type: application/x-www-form-urlencoded\r\n";
            $out .= "User-Agent: Mozilla 4.0\r\n";
            $out .= "Content-Length: ".$f_data_len."\r\n";
            $out .= "Connection: Close\r\n\r\n".$f_data_str;
            fwrite($fp,$out);
            /*while(!feof($fp)){
                echo fgets($fp,1024);
            }*/
            fclose($fp);
        }
    }
}
?>