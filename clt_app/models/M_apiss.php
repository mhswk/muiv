<?php
class M_apiss extends CI_Model{
    public function __construct(){
        parent::__construct();
    }
    //token num
    public function token_num($tk_args,$tk_salt){
        ksort($tk_args);
        $tk_num = md5(implode('',$tk_args).'{'.$tk_salt.'}');
        return $tk_num;
    }
    //pkg down
    public function pkg_down(){
        $this->db->where('status !=','yes');
        $query = $this->db->get('n_upkgsinfo');
        $row = $query->first_row('array');
        if(is_array($row)){
            $tk_args = array('customer_code'=>$row['customer_code'],'software_package_id'=>$row['id']);
            $tk_salt = $row['customer_code'];
            $this->load->library('mdb');
            $this->mdb->tbn('n_syscfg');
            $n_syscfg = $this->mdb->cfg();
            $tk_num = $this->token_create($tk_args,$tk_salt);
            $burl = $n_syscfg['sync_url'];
            
            $ch = curl_init();
            $curl = $burl.'/software/download/'.$row['customer_code'].'/'.$row['id'];
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
            $pkg_arr['id'] = $row['id'];
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
                unset($pkg_arr['id']);
                $this->mdb->tbn('n_upkgsinfo');
                $iu_id = array('id' => $id);
                $iu_db = $pkg_arr;
                $this->mdb->iu($iu_id,$iu_db);
            }
        }
    }
    
    //token create
    public function token_create($tk_args,$tk_salt){
        ksort($tk_args);
        $tk_num = md5(implode('',$tk_args).'{'.$tk_salt.'}');
        return $tk_num;
    }
    //check version newer
    public function ck_vnewer($args_arr,$salt){
        $cfg = $this->config->item('cfg');
        $burl = $cfg['apiss_burl'];
        ksort($args_arr);
        $tk_num = $this->token_create($args_arr,$salt);
        $ch = curl_init();
        $curl = $burl.'/software/check/'.$args_arr['customer_code'].'/'.$args_arr['software_ename'].'/'.$args_arr['current_version'];
        $header[] = "TOKEN: ".$tk_num;
        curl_setopt($ch,CURLOPT_URL,$curl);
        curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_HEADER,0);
        $output = curl_exec($ch);
        curl_close($ch);
        $rt = json_decode($output,true);
        return $rt;
    }
    //software package down
    public function spkg_down($args_arr,$salt){
        $cfg = $this->config->item('cfg');
        $burl = $cfg['apiss_burl'];
        ksort($args_arr);
        $tk_num = $this->token_create($args_arr,$salt);
        $ch = curl_init();
        $curl = $burl.'/software/download/'.$args_arr['customer_code'].'/'.$args_arr['software_package_id'];
        //$curl = 'http://www.baidu.com';
        $header[] = "TOKEN: ".$tk_num;
        curl_setopt($ch,CURLOPT_URL,$curl);
        curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_HEADER,1);
        $rt_msg = curl_exec($ch);
        $rt_info=curl_getinfo($ch);
        curl_close($ch);
        echo 'cs';
        /*if($rt_info['http_code']==200){
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
        return $rt;*/
    }
}