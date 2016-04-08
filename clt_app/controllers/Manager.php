<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Manager extends CI_Controller {
	private $_username;
	private $msg;

	function __construct() {
		parent::__construct();
        if(!$this->sess->usr()){
            $this->sess->login();
        }
	}
    
    public function index(){ //获取软件版本信息
        if($this->msg){ error_msg($this->msg); }
        if(file_exists("./config/soft.php")){
            $r = include("./config/soft.php");
            if(empty($r)) exit('{}');
            else exit(json_encode($r));
        }
        else exit('{}');
    }
    //客户端列表
    public function clientlist(){ 
        $ipt['page_now'] = intval($this->input->post('page_now'));
        $ipt['page_per'] = intval($this->input->post('page_per'));
        $ipt['os_type'] = trim($this->input->post('os_type'));
        $ipt['field'] = trim($this->input->post('field'));
        $ipt['kwd'] = trim($this->input->post('kwd'));
        $sch['start'] = ($ipt['page_now']-1)*$ipt['page_per'];
        $sch['num'] = $ipt['page_per'];
        
        $this->db->from('clientinfo');
        if(!empty($ipt['os_type'])){
            $this->db->where('os_type',$ipt['os_type']);
        }
        if(!empty($ipt['field']) && !empty($ipt['kwd'])){
            $this->db->like($ipt['field'],$ipt['kwd']);
        }
        $rt['data_count'] = $this->db->count_all_results();
        
        if(!empty($ipt['os_type'])){
            $this->db->where('os_type',$ipt['os_type']);
        }
        if(!empty($ipt['field']) && !empty($ipt['kwd'])){
            $this->db->like($ipt['field'],$ipt['kwd']);
        }
        $this->db->limit($sch['num'],$sch['start']);
        $query = $this->db->get('clientinfo');
        $rt['data'] = $query->result_array();
        
        echo json_encode(array('success'=>true,'data'=>array('data_count'=>$rt['data_count'],'data'=>$rt['data'])));
	}
    //删除客户端记录
    public function delclient(){
        if($this->input->post('sub')){
            $clients = $this->input->post('clients');
            if(empty($clients)){
                $this->comm->msg_err('请选择要删除的客户端记录！');
            }else{
                $this->db->where_in('client_mac',$clients);
                $this->db->delete('clientinfo');
                if($this->db->affected_rows()){
                    $this->comm->msg_suc('操作成功！');
                }
            }
            $this->comm->msg_err('操作失败！');
        }
    }
    //清空客户端记录
    public function emptyclient(){
        if($this->input->post('sub')){
            $this->db->empty_table('clientinfo');
            if($this->db->affected_rows()){
				$this->comm->msg_suc('操作成功！');
			}
            $this->comm->msg_err('操作失败！');
        }
    }
    
    public function emptyclient_dj(){ //清空客户端记录
        if($this->msg){ error_msg($this->msg); }
        if($this->input->post('dosubmit')){
            $this->db->empty_table('clientinfo');
            if($this->db->affected_rows()){
				success_msg('操作成功！');
			}
            else error_msg('操作失败！');
        }
    }
    //客户端添加任务
    public function creatework(){ 
        if($this->input->post('sub')){
            $client_ip = $this->input->post('client_ip');
            $vm_server = $this->input->post('vm_server');
            $os_type = $this->input->post('os_type');
            $data = $this->input->post('data');
            
            if(empty($data['update_vm']) && empty($data['update_net']) && empty($data['update_version']) && empty($data['action'])){
                $this->comm->msg_err('请选择操作任务！');
            }else if(empty($data['client_mac'])){
                $this->comm->msg_err('请选择要添加任务的客户端！');
            }
            
            if(empty($data['update_vm'])) {
                $data['update_vm'] = null;
                $data['vm_server'] = $vm_server;
                $data['vm_port']='';
                $data['vm_sport']='';
                $data['vm_domain']='';
            }else {
                if(empty($data['vm_server'])){
                    $this->comm->msg_err('请输入虚拟机服务器名！');
                }else if(! preg_match("/^[\w\.]+$/",$data['vm_server'])){
                    $this->comm->msg_err('虚拟机服务器名有字母、数字、下划线和点号组成!');
                }else if(empty($data['vm_port'])){
                    $this->comm->msg_err('服务器http端口！');
                }else if(! preg_match("/^\d{2,10}$/",$data['vm_port'])){
                    $this->comm->msg_err('服务器http端口由不少于2位的数字组成！');
                }
                $data['vm_sport']='';
                $data['vm_domain']='';
            }
            
            if(empty($data['update_net'])) {
                $data['update_net'] = null;
                $data['client_ip'] = $client_ip;
                $data['client_netmask']='';
                $data['client_gateway']='';
                $data['client_dns']='';
            }else {
                if(empty($data['client_ip'])){
                    $this->comm->msg_err('请输入IP地址！');
                }else if(! preg_match("/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/",$data['client_ip'])){
                    $this->comm->msg_err('请正确填写IP地址');
                }else if(empty($data['client_netmask'])){
                    $this->comm->msg_err('请输入子网掩码！');
                }else if(! preg_match("/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/",$data['client_netmask'])){
                    $this->comm->msg_err('请正确填写子网掩码');
                }else if(empty($data['client_gateway'])){
                    $this->comm->msg_err('请输入网关！');
                }else if(! preg_match("/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/",$data['client_gateway'])){
                    $this->comm->msg_err('请正确填写网关');
                }else if(empty($data['client_dns'])){
                    $this->comm->msg_err('请输入DNS！');
                }else if(! preg_match("/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/",$data['client_dns'])){
                    $this->comm->msg_err('请正确填写DNS');
                }
            }
            
            if(empty($data['update_version'])){
                $data['update_version']='';
            }
            
            if(empty($data['action'])){
                $data['action']='';
            }
            
            $data['create_time'] = date('Y-m-d H:i:s');
            
            $this->db->where('client_mac', $data['client_mac']);
            $query = $this->db->get('worklist');
            if($query->num_rows()){
                $this->db->where('client_mac', $data['client_mac']);
                $this->db->update('worklist',array(
                    'vm_server'     =>$data['vm_server'],       'vm_port'   =>$data['vm_port'],
                    'vm_sport'      =>$data['vm_sport'],        'vm_domain' =>$data['vm_domain'],

                    'client_ip'     =>$data['client_ip'],       'client_netmask'=>$data['client_netmask'],
                    'client_gateway'=>$data['client_gateway'],  'client_dns'    =>$data['client_dns'],

                    'update_vm'     =>$data['update_vm'],       'update_net'=>$data['update_net'],
                    'update_version'=>$data['update_version'],  'action'    =>$data['action'],
                    'create_time'   =>$data['create_time']
                ));
            }else{
                $this->db->insert('worklist',$data);
            }
            if($this->db->affected_rows()){
				$this->comm->msg_suc('操作成功！');
			}else{
                $this->comm->msg_err('操作失败！');
            }
        }
    }

    public function addupgradework(){ //批量升级客户端
        if($this->msg){ error_msg($this->msg); }
        if($this->input->post('dosubmit')){
            $clients = $this->input->post('clients');
            $data = $this->input->post('data');

            if(empty($data['update_vm']) && empty($data['update_version']) && empty($data['action'])) error_msg('请选择任务操作！');
            if(empty($clients)) error_msg('请选择要设置的客户端！');

            if(empty($data['update_vm'])) {
                $data['vm_server'] = '';
                $data['vm_port']='';
                $data['vm_sport']='';
                $data['vm_domain']='';
            }else {
                if(empty($data['vm_server'])) error_msg('请输入虚拟机服务器名！');
                else if(! preg_match("/^[\w\.]+$/",$data['vm_server']))  error_msg('虚拟机服务器名有字母、数字、下划线和点号组成!');
                else if(empty($data['vm_port'])) error_msg('服务器http端口！');
                else if(! preg_match("/^\d{2,10}$/",$data['vm_port']))  error_msg('服务器http端口由不少于2位的数字组成！');
                #else if(empty($data['vm_sport'])) error_msg('请输入服务器https端口！');
                #else if(! preg_match("/^\d{2,10}$/",$data['vm_sport']))  error_msg('服务器https端口由不少于2位的数字组成');
                #else if(empty($data['vm_domain'])) error_msg('请输入虚拟机域！');
                #else if(! preg_match("/^[\w\.]+$/",$data['vm_domain']))  error_msg('虚拟机域有字母、数字和下划线组成');
            }

            if(empty($data['update_version'])) $data['update_version']='';
            if(empty($data['action'])) $data['action']='';

            $create_time = date('Y-m-d H:i:s');

            $upValues = array();
            $clients = json_decode($clients,true);
            foreach($clients as $k=>$v){
                array_push($upValues,
                    "(
                        '{$v['os_type']}',
                        '{$data['vm_server']}','{$data['vm_port']}','{$data['vm_sport']}','{$data['vm_domain']}',
                        '{$v['mac']}','{$v['ip']}','{$data['update_vm']}','{$data['update_version']}','{$data['action']}','{$create_time}'
                    )"
                );
            }
            $values = join(",",$upValues);

            $query = $this->db->query("REPLACE INTO tbl_worklist (os_type,vm_server,vm_port,vm_sport,vm_domain,client_mac,client_ip,update_vm,update_version,action,create_time) VALUES ".$values);
            if($this->db->affected_rows()){
				success_msg('操作成功！');
			}
            else error_msg('操作失败！');
        }
    }
    
    public function worklist(){ //任务列表
        $ipt['page_now'] = intval($this->input->post('page_now'));
        $ipt['page_per'] = intval($this->input->post('page_per'));
        $ipt['os_type'] = trim($this->input->post('os_type'));
        $ipt['field'] = trim($this->input->post('field'));
        $ipt['kwd'] = trim($this->input->post('kwd'));
        $sch['start'] = ($ipt['page_now']-1)*$ipt['page_per'];
        $sch['num'] = $ipt['page_per'];
        
        $this->db->from('worklist');
        if(!empty($ipt['os_type'])){
            $this->db->where('os_type',$ipt['os_type']);
        }
        if(!empty($ipt['field']) && !empty($ipt['kwd'])){
            $this->db->like($ipt['field'],$ipt['kwd']);
        }
        $rt['data_count'] = $this->db->count_all_results();
        
        if(!empty($ipt['os_type'])){
            $this->db->where('os_type',$ipt['os_type']);
        }
        if(!empty($ipt['field']) && !empty($ipt['kwd'])){
            $this->db->like($ipt['field'],$ipt['kwd']);
        }
        $this->db->limit($sch['num'],$sch['start']);
        $query = $this->db->get('worklist');
        $rt['data'] = $query->result_array();
        
        echo json_encode(array('success'=>true,'data'=>array('data_count'=>$rt['data_count'],'data'=>$rt['data'])));
    }
    //删除任务记录
    public function delwork(){ 
        if($this->input->post('sub')){
            $works = $this->input->post('works');
            if(empty($works)){
                $this->comm->msg_err('请选择要删除的客户端记录！');
            }else{
                $this->db->where_in('client_mac',$works);
                $this->db->delete('worklist');
                if($this->db->affected_rows()){
                    $this->comm->msg_suc('操作成功！');
                }
            }
            $this->comm->msg_err('操作失败！');
        }
    }
    //清空任务记录
    public function emptywork(){ 
        if($this->input->post('sub')){
            $this->db->empty_table('worklist');
            if($this->db->affected_rows()){
				$this->comm->msg_suc('操作成功！');
			}
            $this->comm->msg_err('操作失败！');
        }
    }

    public function upload(){ //上传文件
        if($this->msg){ error_msg($this->msg); }
        $os_type = $this->input->post('os_type')=='arm'?'arm':'x86';
        if(empty($_FILES['updatefile']['name'])) error_msg('请选择要上传的新版软件！');

        if(file_exists("./config/soft.php")){
            $softInfo = include("./config/soft.php");
            if(empty($softInfo)) $softInfo=array();
        }
        else $softInfo=array();

		$sFilePath = "./upload/".$os_type."/".$_FILES['updatefile']['name'];
		if($_FILES['updatefile']['error']!=0||!move_uploaded_file($_FILES['updatefile']['tmp_name'],$sFilePath))
			error_msg('文件上传失败！');
        else{
            $softInfo[$os_type]=$_FILES['updatefile']['name'];
            $str = "<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');\n";
            $str.="return ".var_export($softInfo,true).";";
            file_put_contents("./config/soft.php",$str,LOCK_EX);
            #$tarFilePath = "/var/www/sanlogic_client_manager/admin/upload/".$os_type."/".$_FILES['updatefile']['name'];
            #$armFilePath = "/var/www/sanlogic_client_manager/admin/upload/".$os_type;
            $tarFilePath = "./upload/".$os_type."/".$_FILES['updatefile']['name'];
            $armFilePath = "./upload/".$os_type;
            $cmd = "tar xf ".$tarFilePath." -C ".$armFilePath;
            system($cmd);
            success_msg('文件上传成功！');
        }
    }
}