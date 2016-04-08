<?php
class M_pkg extends CI_Model{
    public function __construct(){
        parent::__construct();
        $this->load->model('db/m_n_upkgsinfo');
        $this->load->model('db/m_n_syscfg');
    }
    public function pkg_down(){
        $row_n = $this->m_n_upkgsinfo->row_n();
        if(is_array($row_n)){
            $n_syscfg = $this->m_n_syscfg->kv();
            $tk_args = array('customer_code'=>$row_n['customer_code'],'software_package_id'=>$row_n['id']);
            $tk_salt = $row_n['customer_code'];
            $tk_num = $this->token_create($tk_args,$tk_salt);
            $burl = $n_syscfg['sync_url'];
            $ch = curl_init();
            $curl = $burl.'/software/download/'.$row_n['customer_code'].'/'.$row_n['id'];
            $header = array();
            $header[] = "TOKEN: ".$tk_num;
            curl_setopt($ch,CURLOPT_URL,$curl);
            curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            curl_setopt($ch,CURLOPT_HEADER,1);
            $rt_msg = curl_exec($ch);
            $rt_info = curl_getinfo($ch);
            curl_close($ch);
            if($rt_info['http_code']==200){
                list($rt_header,$rt_body) = explode("\r\n\r\n",$rt_msg,2);
            }
            $rt = array();
            $rt_header = explode("\r\n",$rt_header);
            unset($rt_header[0]);
            foreach($rt_header as $k=>$v){
                list($k2,$v2) = explode(": ",$v,2);
                $rt[$k2] = $v2;
            }
            $rt['body'] = $rt_body;
            $des = explode('=',$rt['Content-Disposition']);
            $pkg_arr = array();
            $pkg_arr['id'] = $row_n['id'];
            $pkg_arr['pkg_n'] = $des[1];
            $pkg_arr['content_type'] = $rt['Content-Type'];
            $pkg_arr['content_disposition'] = $rt['Content-Disposition'];
            $pkg_arr['content_md5'] = $rt['Content-MD5'];
            $pkg_arr['body'] = $rt['body'];
            if(!is_dir($n_syscfg['f_dir'])){
                mkdir($n_syscfg['f_dir']);
            }
            if(!is_dir($n_syscfg['f_dir'].'/'.$pkg_arr['id'])){
                mkdir($n_syscfg['f_dir'].'/'.$pkg_arr['id']);
            }
            $pkg_n = $n_syscfg['f_dir'].'/'.$pkg_arr['id'].'/'.$pkg_arr['pkg_n'];
            if(!file_exists($pkg_n)){
                file_put_contents($pkg_n,$pkg_arr['body']);
            }
            if(md5_file($pkg_n) == $pkg_arr['content_md5']){
                $pkg_arr['pkg_path'] = $pkg_n;
                $pkg_arr['status'] = 'yes';
                $id = $pkg_arr['id'];
                unset($pkg_arr['body']);
                $pkg_arr['down_time'] = date('Y-m-d H:i:s');
                $ius = array();
                $ius[] = $pkg_arr;
                $this->m_n_upkgsinfo->iu($ius);
            }
        }
    }
    //token create
    public function token_create($tk_args,$tk_salt){
        ksort($tk_args);
        $tk_num = md5(implode('',$tk_args).'{'.$tk_salt.'}');
        return $tk_num;
    }
}