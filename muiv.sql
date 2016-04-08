/*
SQLyog Ultimate v8.32 
MySQL - 5.6.13 : Database - muiv
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`muiv` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `muiv`;

/*Table structure for table `tbl_blackpros` */

DROP TABLE IF EXISTS `tbl_blackpros`;

CREATE TABLE `tbl_blackpros` (
  `mac` varchar(20) NOT NULL,
  `cmd` varchar(40) NOT NULL,
  PRIMARY KEY (`mac`,`cmd`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_blackpros` */

/*Table structure for table `tbl_cfg_dm` */

DROP TABLE IF EXISTS `tbl_cfg_dm`;

CREATE TABLE `tbl_cfg_dm` (
  `v_k` varchar(32) NOT NULL,
  `v_v` varchar(64) NOT NULL,
  PRIMARY KEY (`v_k`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_cfg_dm` */

insert  into `tbl_cfg_dm`(`v_k`,`v_v`) values ('enable','yes'),('sleep','1'),('timeout','5'),('lasttime','2016-03-22 17:04:19'),('pid','201603221641338520'),('usr','admin'),('pwd','e10adc3949ba59abbe56e057f20f883e'),('url','127.0.0.1'),('port','80'),('tgt','/index.php/daemon/admin'),('tgt_threads','/index.php/threads/admin');

/*Table structure for table `tbl_cfg_threads` */

DROP TABLE IF EXISTS `tbl_cfg_threads`;

CREATE TABLE `tbl_cfg_threads` (
  `id` int(12) unsigned NOT NULL,
  `tgt` varchar(64) NOT NULL,
  `enable` varchar(64) NOT NULL,
  `sleep` varchar(64) NOT NULL,
  `timeout` varchar(64) NOT NULL,
  `lasttime` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_cfg_threads` */

insert  into `tbl_cfg_threads`(`id`,`tgt`,`enable`,`sleep`,`timeout`,`lasttime`) values (1,'trd_n_csw','yes','10','30','2016-03-22 17:04:18'),(2,'trd_n_usw','yes','10','30','2016-03-22 17:04:10'),(3,'trd_n_pkgdown','yes','300','600','2016-03-22 17:01:34'),(5,'trd_n_pkgrf','yes','10','30','2016-03-22 17:04:14'),(4,'trd_n_online','yes','5','15','2016-03-22 17:04:15');

/*Table structure for table `tbl_clientinfo` */

DROP TABLE IF EXISTS `tbl_clientinfo`;

CREATE TABLE `tbl_clientinfo` (
  `vm_server` varchar(60) NOT NULL COMMENT '虚拟机服务器',
  `vm_port` varchar(10) DEFAULT NULL,
  `vm_sport` varchar(10) DEFAULT NULL,
  `vm_domain` varchar(60) DEFAULT NULL,
  `client_sn` varchar(40) NOT NULL,
  `client_mac` varchar(20) NOT NULL,
  `client_ip` varchar(40) NOT NULL,
  `client_netmask` varchar(40) DEFAULT NULL,
  `client_gateway` varchar(40) DEFAULT NULL,
  `client_dns` varchar(40) DEFAULT NULL,
  `client_version` varchar(20) NOT NULL,
  `hw_version` varchar(20) NOT NULL,
  `os_type` varchar(10) NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`client_mac`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='客户端列表';

/*Data for the table `tbl_clientinfo` */

insert  into `tbl_clientinfo`(`vm_server`,`vm_port`,`vm_sport`,`vm_domain`,`client_sn`,`client_mac`,`client_ip`,`client_netmask`,`client_gateway`,`client_dns`,`client_version`,`hw_version`,`os_type`,`update_time`) values ('61.164.221.3','9091','443','cloud.com','DX1401000122','6c:90:b1:ff:02:79','192.168.20.172','','','','2.0.3.1223','A20-V1.3','arm','2015-11-23 14:20:19'),('192.168.20.204','8080','443','cloud.com','DX1401000421','6c:90:b1:ff:03:a4','192.168.20.160','','','','2.0.2.1028','A20-V1.3','arm','2015-11-23 14:19:35'),('192.168.20.204','8080','443','cloud.com','DX1501000058','6c:90:b1:ff:0a:09','192.168.20.140','','','','2.0.3.150423','A20-V1.3','arm','2015-11-23 14:19:39'),('192.168.20.201','9091','443','cloud.com','DX0000000000','6c:90:b1:ff:06:2c','192.168.20.105','','','','2.0.3.150918','A20-V1.3','arm','2015-11-23 14:20:26');

/*Table structure for table `tbl_delprocess` */

DROP TABLE IF EXISTS `tbl_delprocess`;

CREATE TABLE `tbl_delprocess` (
  `mac` varchar(20) NOT NULL,
  `pid` varchar(40) NOT NULL,
  PRIMARY KEY (`mac`,`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_delprocess` */

insert  into `tbl_delprocess`(`mac`,`pid`) values ('6c:90:b1:ff:06:2c','6247');

/*Table structure for table `tbl_n_blackpros` */

DROP TABLE IF EXISTS `tbl_n_blackpros`;

CREATE TABLE `tbl_n_blackpros` (
  `sn` varchar(32) NOT NULL,
  `cmd` varchar(32) NOT NULL,
  PRIMARY KEY (`sn`,`cmd`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_n_blackpros` */

insert  into `tbl_n_blackpros`(`sn`,`cmd`) values ('dx0000000001','cs'),('dx0000000001','csc'),('dx0000000001','sshd'),('public','csc'),('public','sshd'),('public','sudo');

/*Table structure for table `tbl_n_cltinfo` */

DROP TABLE IF EXISTS `tbl_n_cltinfo`;

CREATE TABLE `tbl_n_cltinfo` (
  `clt_sn` varchar(32) NOT NULL,
  `sw_ename` varchar(32) NOT NULL,
  `sw_cversion` varchar(32) NOT NULL,
  `sw_nversion` varchar(32) NOT NULL,
  `sw_npkgid` varchar(32) NOT NULL,
  `on_line` varchar(32) NOT NULL,
  `os_name` varchar(32) CHARACTER SET utf32 NOT NULL,
  `os_arch` varchar(32) NOT NULL,
  `os_bit` varchar(32) NOT NULL,
  `hostname` varchar(32) NOT NULL,
  `vm_server` varchar(32) NOT NULL,
  `vm_port` varchar(32) NOT NULL,
  `clt_ip` varchar(32) NOT NULL,
  `clt_netmask` varchar(32) NOT NULL,
  `clt_gateway` varchar(32) NOT NULL,
  `clt_dns` varchar(32) NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`clt_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_n_cltinfo` */

insert  into `tbl_n_cltinfo`(`clt_sn`,`sw_ename`,`sw_cversion`,`sw_nversion`,`sw_npkgid`,`on_line`,`os_name`,`os_arch`,`os_bit`,`hostname`,`vm_server`,`vm_port`,`clt_ip`,`clt_netmask`,`clt_gateway`,`clt_dns`,`update_time`) values ('dx0000000001','vdiClient','v1.0.0-Release','v3.0.0-Release','6','no','win7_32','arm','32','hname1','vm01.sanlogic.cloud.com','8080','192.168.1.2','255.255.255.0','192.168.1.1','192.168.1.1','2016-03-22 16:52:01'),('dx0000000002','vdiClient','v1.0.0-Release','v3.0.0-Release','6','no','win7_32','arm','32','','','','','','','','2016-03-22 16:56:45'),('dx0000000003','vdiClient','v1.0.0-Release','v3.0.0-Release','6','no','win7_32','arm','32','','','','','','','','2016-03-22 16:57:03'),('dx0000000004','vdiClient','v1.0.0-Release','v2.0.0-Release','4','no','win7_64','arm','64','','','','','','','','2016-03-22 16:57:57'),('dx0000000005','vdiClient','v1.0.0-Release','v2.0.0-Release','4','no','win7_64','arm','64','','','','','','','','2016-03-22 16:58:12'),('dx0000000006','vdiClient','v1.0.0-Release','v2.0.0-Release','4','no','win7_64','arm','64','','','','','','','','2016-03-22 16:58:28'),('dx0000000007','vdiClient','v2.0.0-Release','','','yes','win7_64','arm','64','','','','','','','','2016-03-22 16:59:25'),('dx0000000008','vdiClient','v2.0.0-Release','','','yes','win7_64','arm','64','','','','','','','','2016-03-22 16:59:39'),('dx0000000009','vdiClient','v2.0.0-Release','','','yes','xp_64','arm','64','','','','','','','','2016-03-22 17:00:27');

/*Table structure for table `tbl_n_cswinfo` */

DROP TABLE IF EXISTS `tbl_n_cswinfo`;

CREATE TABLE `tbl_n_cswinfo` (
  `csw_tk` varchar(64) NOT NULL,
  `csw_ename` varchar(64) NOT NULL,
  `csw_version` varchar(64) NOT NULL,
  `csw_customer_code` varchar(64) NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`csw_tk`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_n_cswinfo` */

insert  into `tbl_n_cswinfo`(`csw_tk`,`csw_ename`,`csw_version`,`csw_customer_code`,`update_time`) values ('e95c2c1e17c70a93d64ecc19be4408c2','vdiClient','v1.0.0-Release','C20150001','2016-03-22 17:04:18'),('b672ff47494647d07c66986f9dbc7e9e','vdiClient','v2.0.0-Release','C20150001','2016-03-22 17:04:18');

/*Table structure for table `tbl_n_delprocess` */

DROP TABLE IF EXISTS `tbl_n_delprocess`;

CREATE TABLE `tbl_n_delprocess` (
  `sn` varchar(32) NOT NULL,
  `pid` varchar(40) NOT NULL,
  PRIMARY KEY (`sn`,`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_n_delprocess` */

insert  into `tbl_n_delprocess`(`sn`,`pid`) values ('dx0000000001','22038'),('dx0000000001','22058');

/*Table structure for table `tbl_n_process` */

DROP TABLE IF EXISTS `tbl_n_process`;

CREATE TABLE `tbl_n_process` (
  `sn` varchar(32) NOT NULL,
  `uid` varchar(32) NOT NULL,
  `pid` varchar(32) NOT NULL,
  `time` varchar(40) NOT NULL,
  `cmd` varchar(40) NOT NULL,
  PRIMARY KEY (`sn`,`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_n_process` */

insert  into `tbl_n_process`(`sn`,`uid`,`pid`,`time`,`cmd`) values ('dx0000000001','root','31278','00:00:07','kworker/0:1'),('dx0000000001','root','29963','00:00:00','sftp-server'),('dx0000000001','root','29950','00:00:01','sshd'),('dx0000000001','root','24181','00:00:00','bash'),('dx0000000001','root','24173','00:00:00','su'),('dx0000000001','root','24172','00:00:00','sudo'),('dx0000000001','root','22058','00:00:00','bash'),('dx0000000001','root','22038','00:00:02','sshd'),('dx0000000001','root','22006','00:00:03','bash'),('dx0000000001','root','21985','00:01:35','sshd'),('dx0000000001','root','7130','00:00:00','ps'),('dx0000000001','root','7129','00:00:00','sh'),('dx0000000001','root','7108','00:00:00','sleep'),('dx0000000001','1000','7101','00:00:00','sleep'),('dx0000000001','root','5866','00:00:00','kworker/0:0'),('6c:90:b1:ff:06:2c','root','5211','00:00:00','sanlogic_client'),('6c:90:b1:ff:06:2c','root','2073','00:00:00','kworker/0:2'),('6c:90:b1:ff:06:2c','1000','982','00:00:00','bash'),('6c:90:b1:ff:06:2c','1000','980','00:00:00','gnome-pty-helpe'),('6c:90:b1:ff:06:2c','1000','979','00:00:03','x-terminal-emul'),('6c:90:b1:ff:06:2c','root','889','00:00:00','bash'),('6c:90:b1:ff:06:2c','root','870','00:00:00','login'),('6c:90:b1:ff:06:2c','root','858','00:02:21','net_check.sh'),('6c:90:b1:ff:06:2c','nobody','764','00:00:00','dnsmasq'),('6c:90:b1:ff:06:2c','root','757','00:00:00','dhclient'),('6c:90:b1:ff:06:2c','1000','755','00:00:01','gconfd-2'),('6c:90:b1:ff:06:2c','root','738','00:00:00','udisksd'),('6c:90:b1:ff:06:2c','1000','734','00:00:00','pulseaudio'),('6c:90:b1:ff:06:2c','1000','730','00:00:00','gvfs-udisks2-vo'),('6c:90:b1:ff:06:2c','1000','727','00:00:20','menu-cached'),('6c:90:b1:ff:06:2c','1000','723','00:00:00','at-spi2-registr'),('6c:90:b1:ff:06:2c','1000','719','00:00:00','dbus-daemon'),('6c:90:b1:ff:06:2c','1000','709','00:00:03','python'),('6c:90:b1:ff:06:2c','1000','708','00:00:00','sanlogic_spicy'),('6c:90:b1:ff:06:2c','1000','706','00:02:27','sanlogic_numloc'),('6c:90:b1:ff:06:2c','1000','704','00:00:00','at-spi-bus-laun'),('6c:90:b1:ff:06:2c','1000','700','00:00:02','nm-applet'),('6c:90:b1:ff:06:2c','1000','694','00:00:00','sanlogic_autost'),('6c:90:b1:ff:06:2c','1000','691','00:00:00','polkit-gnome-au'),('6c:90:b1:ff:06:2c','1000','690','00:00:02','pcmanfm'),('6c:90:b1:ff:06:2c','1000','687','00:04:03','lxpanel'),('6c:90:b1:ff:06:2c','1000','683','00:00:05','openbox'),('6c:90:b1:ff:06:2c','1000','676','00:00:00','gvfsd'),('6c:90:b1:ff:06:2c','1000','654','00:00:00','dbus-daemon'),('6c:90:b1:ff:06:2c','1000','653','00:00:00','dbus-daemon'),('6c:90:b1:ff:06:2c','1000','652','00:00:00','dbus-launch'),('6c:90:b1:ff:06:2c','1000','649','00:00:04','ssh-agent'),('6c:90:b1:ff:06:2c','1000','648','00:00:00','dbus-launch'),('6c:90:b1:ff:06:2c','1000','611','00:00:14','lxsession'),('6c:90:b1:ff:06:2c','root','536','00:00:01','console-kit-dae'),('6c:90:b1:ff:06:2c','root','532','00:00:00','lightdm'),('6c:90:b1:ff:06:2c','root','527','00:00:00','udevd'),('6c:90:b1:ff:06:2c','root','512','00:00:05','polkitd'),('6c:90:b1:ff:06:2c','root','509','00:16:27','Xorg'),('6c:90:b1:ff:06:2c','root','506','00:00:20','NetworkManager'),('6c:90:b1:ff:06:2c','root','464','00:00:01','cron'),('6c:90:b1:ff:06:2c','root','459','00:00:00','getty'),('6c:90:b1:ff:06:2c','root','455','00:00:00','lightdm'),('6c:90:b1:ff:06:2c','root','456','00:00:00','getty'),('6c:90:b1:ff:06:2c','root','457','00:00:00','getty'),('6c:90:b1:ff:06:2c','root','448','00:00:00','getty'),('6c:90:b1:ff:06:2c','root','447','00:14:25','python'),('6c:90:b1:ff:06:2c','root','442','00:00:00','getty'),('6c:90:b1:ff:06:2c','root','445','00:00:00','getty'),('6c:90:b1:ff:06:2c','root','358','00:00:00','upstart-socket-'),('6c:90:b1:ff:06:2c','root','266','00:00:18','flush-93:0'),('6c:90:b1:ff:06:2c','root','258','00:00:00','mali-pmm-wq'),('6c:90:b1:ff:06:2c','root','230','00:00:00','udevd'),('6c:90:b1:ff:06:2c','102','169','00:00:07','dbus-daemon'),('6c:90:b1:ff:06:2c','root','161','00:00:00','udevd'),('6c:90:b1:ff:06:2c','syslog','168','00:00:56','rsyslogd'),('6c:90:b1:ff:06:2c','root','160','00:00:00','sshd'),('6c:90:b1:ff:06:2c','root','144','00:00:00','upstart-udev-br'),('6c:90:b1:ff:06:2c','root','63','00:00:00','ext4-dio-unwrit'),('6c:90:b1:ff:06:2c','root','62','00:00:12','jbd2/nandb-8'),('6c:90:b1:ff:06:2c','root','60','00:00:00','deferwq'),('6c:90:b1:ff:06:2c','root','59','00:01:08','hdmi'),('6c:90:b1:ff:06:2c','root','58','00:00:25','kworker/1:1'),('6c:90:b1:ff:06:2c','root','57','00:00:00','codec_resume'),('6c:90:b1:ff:06:2c','root','56','00:00:00','binder'),('6c:90:b1:ff:06:2c','root','55','00:00:00','cfinteractive'),('6c:90:b1:ff:06:2c','root','54','00:00:00','kmpath_handlerd'),('6c:90:b1:ff:06:2c','root','53','00:00:00','kmpathd'),('6c:90:b1:ff:06:2c','root','46','00:00:00','kworker/u:1'),('6c:90:b1:ff:06:2c','root','45','00:01:13','nfmtd'),('6c:90:b1:ff:06:2c','root','44','00:00:17','nandd'),('6c:90:b1:ff:06:2c','root','30','00:00:00','crypto'),('6c:90:b1:ff:06:2c','root','29','00:00:00','cifsiod'),('6c:90:b1:ff:06:2c','root','28','00:00:00','nfsiod'),('6c:90:b1:ff:06:2c','root','27','00:00:00','fsnotify_mark'),('6c:90:b1:ff:06:2c','root','26','00:00:00','ksmd'),('6c:90:b1:ff:06:2c','root','25','00:00:00','kswapd0'),('6c:90:b1:ff:06:2c','root','24','00:00:00','rpciod'),('6c:90:b1:ff:06:2c','root','23','00:00:00','kfantasy'),('6c:90:b1:ff:06:2c','root','22','00:00:42','usb-hardware-sc'),('6c:90:b1:ff:06:2c','root','21','00:00:00','cfg80211'),('6c:90:b1:ff:06:2c','root','19','00:00:00','cpufreq_uevent'),('6c:90:b1:ff:06:2c','root','17','00:00:00','kblockd'),('6c:90:b1:ff:06:2c','root','18','00:00:00','khubd'),('6c:90:b1:ff:06:2c','root','16','00:00:00','kintegrityd'),('6c:90:b1:ff:06:2c','root','15','00:00:00','bdi-default'),('6c:90:b1:ff:06:2c','root','14','00:00:01','sync_supers'),('6c:90:b1:ff:06:2c','root','12','00:00:00','kdevtmpfs'),('6c:90:b1:ff:06:2c','root','13','00:00:00','netns'),('6c:90:b1:ff:06:2c','root','11','00:00:00','khelper'),('6c:90:b1:ff:06:2c','root','10','00:00:00','cpuset'),('6c:90:b1:ff:06:2c','root','9','00:01:16','ksoftirqd/1'),('6c:90:b1:ff:06:2c','root','8','00:00:00','kworker/1:0'),('6c:90:b1:ff:06:2c','root','7','00:00:02','migration/1'),('6c:90:b1:ff:06:2c','root','6','00:00:03','migration/0'),('6c:90:b1:ff:06:2c','root','5','00:00:00','kworker/u:0'),('6c:90:b1:ff:06:2c','root','3','00:02:47','ksoftirqd/0'),('6c:90:b1:ff:06:2c','root','2','00:00:00','kthreadd'),('6c:90:b1:ff:06:2c','root','1','00:00:08','init');

/*Table structure for table `tbl_n_syscfg` */

DROP TABLE IF EXISTS `tbl_n_syscfg`;

CREATE TABLE `tbl_n_syscfg` (
  `v_k` varchar(32) NOT NULL,
  `v_v` varchar(96) NOT NULL,
  PRIMARY KEY (`v_k`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_n_syscfg` */

insert  into `tbl_n_syscfg`(`v_k`,`v_v`) values ('customer_code','C20150001'),('f_dir','f_down'),('sync_url','http://192.168.3.140:8082'),('onlinetsout','300');

/*Table structure for table `tbl_n_upkgsinfo` */

DROP TABLE IF EXISTS `tbl_n_upkgsinfo`;

CREATE TABLE `tbl_n_upkgsinfo` (
  `id` varchar(64) NOT NULL,
  `arch` varchar(64) NOT NULL,
  `os` varchar(64) NOT NULL,
  `bits` varchar(64) NOT NULL,
  `md5` varchar(64) NOT NULL,
  `customer_code` varchar(64) NOT NULL,
  `status` varchar(64) NOT NULL,
  `pkg_n` varchar(64) NOT NULL,
  `content_type` varchar(64) NOT NULL,
  `content_disposition` varchar(64) NOT NULL,
  `content_md5` varchar(64) NOT NULL,
  `pkg_path` varchar(64) NOT NULL,
  `update_time` datetime NOT NULL,
  `down_time` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_n_upkgsinfo` */

insert  into `tbl_n_upkgsinfo`(`id`,`arch`,`os`,`bits`,`md5`,`customer_code`,`status`,`pkg_n`,`content_type`,`content_disposition`,`content_md5`,`pkg_path`,`update_time`,`down_time`) values ('4','arm','win7_64','64','409ace76198d2fc88b012f3e6d429642','C20150001','yes','pkg64_2.zip','application/octet-stream','attachment; filename=pkg64_2.zip','409ace76198d2fc88b012f3e6d429642','f_down/4/pkg64_2.zip','2016-03-22 17:04:11','2016-03-21 14:27:57'),('6','arm','win7_32','32','b767585b44eb80cdd7bd0a047fd8fc05','C20150001','yes','pk32_3.zip','application/octet-stream','attachment; filename=pk32_3.zip','b767585b44eb80cdd7bd0a047fd8fc05','f_down/6/pk32_3.zip','2016-03-22 17:04:11','2016-03-21 14:32:40'),('2','arm','win7_32','32','cc4d355b553f7dd3345561bc394d9127','C20150001','yes','pk32_2.zip','application/octet-stream','attachment; filename=pk32_2.zip','cc4d355b553f7dd3345561bc394d9127','f_down/2/pk32_2.zip','2016-03-22 17:04:11','2016-03-21 14:42:40');

/*Table structure for table `tbl_n_uswinfo` */

DROP TABLE IF EXISTS `tbl_n_uswinfo`;

CREATE TABLE `tbl_n_uswinfo` (
  `usw_id` varchar(64) NOT NULL,
  `csw_tk` varchar(64) NOT NULL,
  `usw_version` varchar(64) NOT NULL,
  `usw_vnum` varchar(64) NOT NULL,
  `usw_pkgids` varchar(64) NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`usw_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_n_uswinfo` */

insert  into `tbl_n_uswinfo`(`usw_id`,`csw_tk`,`usw_version`,`usw_vnum`,`usw_pkgids`,`update_time`) values ('01b8624373f5870f02b41e1c6ca11de2','e95c2c1e17c70a93d64ecc19be4408c2','v2.0.0-Release','3','2,4','2016-03-22 17:04:11'),('97d99a8d2b99f562e210d1a923877e63','e95c2c1e17c70a93d64ecc19be4408c2','v3.0.0-Release','4','6','2016-03-22 17:04:11'),('4661bff526ffba8995b6a4a0d4509500','b672ff47494647d07c66986f9dbc7e9e','v3.0.0-Release','4','6','2016-03-22 17:04:11');

/*Table structure for table `tbl_n_worklist` */

DROP TABLE IF EXISTS `tbl_n_worklist`;

CREATE TABLE `tbl_n_worklist` (
  `clt_sn` varchar(32) NOT NULL,
  `hostname` varchar(32) NOT NULL,
  `vm_server` varchar(32) NOT NULL,
  `vm_port` varchar(32) CHARACTER SET utf8 COLLATE utf8_estonian_ci NOT NULL,
  `clt_ip` varchar(32) NOT NULL,
  `clt_netmask` varchar(32) NOT NULL,
  `clt_gateway` varchar(32) NOT NULL,
  `clt_dns` varchar(32) NOT NULL,
  `u_hostname` varchar(32) NOT NULL,
  `u_vm` varchar(32) NOT NULL,
  `u_net` varchar(32) NOT NULL,
  `u_version` varchar(32) NOT NULL,
  `shutdown` varchar(32) NOT NULL,
  `c_ts` varchar(32) NOT NULL,
  PRIMARY KEY (`clt_sn`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_n_worklist` */

insert  into `tbl_n_worklist`(`clt_sn`,`hostname`,`vm_server`,`vm_port`,`clt_ip`,`clt_netmask`,`clt_gateway`,`clt_dns`,`u_hostname`,`u_vm`,`u_net`,`u_version`,`shutdown`,`c_ts`) values ('dx0000000001','h1','vm01.sanlogic.cloud.com','8080','192.168.1.2','255.255.255.0','192.168.1.1','192.168.1.1','on','on','on','on','on','2016-04-01 15:44:12'),('dx0000000002','h2','vm02.sanlogic.cloud','8080','192.168.1.3','255.255.255.255','192.168.1.1','192.168.1.1','on','on','on','on','on','2016-04-01 15:38:04');

/*Table structure for table `tbl_process` */

DROP TABLE IF EXISTS `tbl_process`;

CREATE TABLE `tbl_process` (
  `mac` varchar(20) NOT NULL,
  `uid` varchar(40) NOT NULL,
  `pid` int(40) unsigned NOT NULL,
  `time` varchar(40) NOT NULL,
  `cmd` varchar(40) NOT NULL,
  PRIMARY KEY (`mac`,`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tbl_process` */

insert  into `tbl_process`(`mac`,`uid`,`pid`,`time`,`cmd`) values ('6c:90:b1:ff:06:2c','root',31278,'00:00:07','kworker/0:1'),('6c:90:b1:ff:06:2c','root',29963,'00:00:00','sftp-server'),('6c:90:b1:ff:06:2c','root',29950,'00:00:01','sshd'),('6c:90:b1:ff:06:2c','root',24181,'00:00:00','bash'),('6c:90:b1:ff:06:2c','root',24173,'00:00:00','su'),('6c:90:b1:ff:06:2c','root',24172,'00:00:00','sudo'),('6c:90:b1:ff:06:2c','root',22058,'00:00:00','bash'),('6c:90:b1:ff:06:2c','root',22038,'00:00:02','sshd'),('6c:90:b1:ff:06:2c','root',22006,'00:00:03','bash'),('6c:90:b1:ff:06:2c','root',21985,'00:01:35','sshd'),('6c:90:b1:ff:06:2c','root',7130,'00:00:00','ps'),('6c:90:b1:ff:06:2c','root',7129,'00:00:00','sh'),('6c:90:b1:ff:06:2c','root',7108,'00:00:00','sleep'),('6c:90:b1:ff:06:2c','1000',7101,'00:00:00','sleep'),('6c:90:b1:ff:06:2c','root',5866,'00:00:00','kworker/0:0'),('6c:90:b1:ff:06:2c','root',5211,'00:00:00','sanlogic_client'),('6c:90:b1:ff:06:2c','root',2073,'00:00:00','kworker/0:2'),('6c:90:b1:ff:06:2c','1000',982,'00:00:00','bash'),('6c:90:b1:ff:06:2c','1000',980,'00:00:00','gnome-pty-helpe'),('6c:90:b1:ff:06:2c','1000',979,'00:00:03','x-terminal-emul'),('6c:90:b1:ff:06:2c','root',889,'00:00:00','bash'),('6c:90:b1:ff:06:2c','root',870,'00:00:00','login'),('6c:90:b1:ff:06:2c','root',858,'00:02:21','net_check.sh'),('6c:90:b1:ff:06:2c','nobody',764,'00:00:00','dnsmasq'),('6c:90:b1:ff:06:2c','root',757,'00:00:00','dhclient'),('6c:90:b1:ff:06:2c','1000',755,'00:00:01','gconfd-2'),('6c:90:b1:ff:06:2c','root',738,'00:00:00','udisksd'),('6c:90:b1:ff:06:2c','1000',734,'00:00:00','pulseaudio'),('6c:90:b1:ff:06:2c','1000',730,'00:00:00','gvfs-udisks2-vo'),('6c:90:b1:ff:06:2c','1000',727,'00:00:20','menu-cached'),('6c:90:b1:ff:06:2c','1000',723,'00:00:00','at-spi2-registr'),('6c:90:b1:ff:06:2c','1000',719,'00:00:00','dbus-daemon'),('6c:90:b1:ff:06:2c','1000',709,'00:00:03','python'),('6c:90:b1:ff:06:2c','1000',708,'00:00:00','sanlogic_spicy'),('6c:90:b1:ff:06:2c','1000',706,'00:02:27','sanlogic_numloc'),('6c:90:b1:ff:06:2c','1000',704,'00:00:00','at-spi-bus-laun'),('6c:90:b1:ff:06:2c','1000',700,'00:00:02','nm-applet'),('6c:90:b1:ff:06:2c','1000',694,'00:00:00','sanlogic_autost'),('6c:90:b1:ff:06:2c','1000',691,'00:00:00','polkit-gnome-au'),('6c:90:b1:ff:06:2c','1000',690,'00:00:02','pcmanfm'),('6c:90:b1:ff:06:2c','1000',687,'00:04:03','lxpanel'),('6c:90:b1:ff:06:2c','1000',683,'00:00:05','openbox'),('6c:90:b1:ff:06:2c','1000',676,'00:00:00','gvfsd'),('6c:90:b1:ff:06:2c','1000',654,'00:00:00','dbus-daemon'),('6c:90:b1:ff:06:2c','1000',653,'00:00:00','dbus-daemon'),('6c:90:b1:ff:06:2c','1000',652,'00:00:00','dbus-launch'),('6c:90:b1:ff:06:2c','1000',649,'00:00:04','ssh-agent'),('6c:90:b1:ff:06:2c','1000',648,'00:00:00','dbus-launch'),('6c:90:b1:ff:06:2c','1000',611,'00:00:14','lxsession'),('6c:90:b1:ff:06:2c','root',536,'00:00:01','console-kit-dae'),('6c:90:b1:ff:06:2c','root',532,'00:00:00','lightdm'),('6c:90:b1:ff:06:2c','root',527,'00:00:00','udevd'),('6c:90:b1:ff:06:2c','root',512,'00:00:05','polkitd'),('6c:90:b1:ff:06:2c','root',509,'00:16:27','Xorg'),('6c:90:b1:ff:06:2c','root',506,'00:00:20','NetworkManager'),('6c:90:b1:ff:06:2c','root',464,'00:00:01','cron'),('6c:90:b1:ff:06:2c','root',459,'00:00:00','getty'),('6c:90:b1:ff:06:2c','root',455,'00:00:00','lightdm'),('6c:90:b1:ff:06:2c','root',456,'00:00:00','getty'),('6c:90:b1:ff:06:2c','root',457,'00:00:00','getty'),('6c:90:b1:ff:06:2c','root',448,'00:00:00','getty'),('6c:90:b1:ff:06:2c','root',447,'00:14:25','python'),('6c:90:b1:ff:06:2c','root',442,'00:00:00','getty'),('6c:90:b1:ff:06:2c','root',445,'00:00:00','getty'),('6c:90:b1:ff:06:2c','root',358,'00:00:00','upstart-socket-'),('6c:90:b1:ff:06:2c','root',266,'00:00:18','flush-93:0'),('6c:90:b1:ff:06:2c','root',258,'00:00:00','mali-pmm-wq'),('6c:90:b1:ff:06:2c','root',230,'00:00:00','udevd'),('6c:90:b1:ff:06:2c','102',169,'00:00:07','dbus-daemon'),('6c:90:b1:ff:06:2c','root',161,'00:00:00','udevd'),('6c:90:b1:ff:06:2c','syslog',168,'00:00:56','rsyslogd'),('6c:90:b1:ff:06:2c','root',160,'00:00:00','sshd'),('6c:90:b1:ff:06:2c','root',144,'00:00:00','upstart-udev-br'),('6c:90:b1:ff:06:2c','root',63,'00:00:00','ext4-dio-unwrit'),('6c:90:b1:ff:06:2c','root',62,'00:00:12','jbd2/nandb-8'),('6c:90:b1:ff:06:2c','root',60,'00:00:00','deferwq'),('6c:90:b1:ff:06:2c','root',59,'00:01:08','hdmi'),('6c:90:b1:ff:06:2c','root',58,'00:00:25','kworker/1:1'),('6c:90:b1:ff:06:2c','root',57,'00:00:00','codec_resume'),('6c:90:b1:ff:06:2c','root',56,'00:00:00','binder'),('6c:90:b1:ff:06:2c','root',55,'00:00:00','cfinteractive'),('6c:90:b1:ff:06:2c','root',54,'00:00:00','kmpath_handlerd'),('6c:90:b1:ff:06:2c','root',53,'00:00:00','kmpathd'),('6c:90:b1:ff:06:2c','root',46,'00:00:00','kworker/u:1'),('6c:90:b1:ff:06:2c','root',45,'00:01:13','nfmtd'),('6c:90:b1:ff:06:2c','root',44,'00:00:17','nandd'),('6c:90:b1:ff:06:2c','root',30,'00:00:00','crypto'),('6c:90:b1:ff:06:2c','root',29,'00:00:00','cifsiod'),('6c:90:b1:ff:06:2c','root',28,'00:00:00','nfsiod'),('6c:90:b1:ff:06:2c','root',27,'00:00:00','fsnotify_mark'),('6c:90:b1:ff:06:2c','root',26,'00:00:00','ksmd'),('6c:90:b1:ff:06:2c','root',25,'00:00:00','kswapd0'),('6c:90:b1:ff:06:2c','root',24,'00:00:00','rpciod'),('6c:90:b1:ff:06:2c','root',23,'00:00:00','kfantasy'),('6c:90:b1:ff:06:2c','root',22,'00:00:42','usb-hardware-sc'),('6c:90:b1:ff:06:2c','root',21,'00:00:00','cfg80211'),('6c:90:b1:ff:06:2c','root',19,'00:00:00','cpufreq_uevent'),('6c:90:b1:ff:06:2c','root',17,'00:00:00','kblockd'),('6c:90:b1:ff:06:2c','root',18,'00:00:00','khubd'),('6c:90:b1:ff:06:2c','root',16,'00:00:00','kintegrityd'),('6c:90:b1:ff:06:2c','root',15,'00:00:00','bdi-default'),('6c:90:b1:ff:06:2c','root',14,'00:00:01','sync_supers'),('6c:90:b1:ff:06:2c','root',12,'00:00:00','kdevtmpfs'),('6c:90:b1:ff:06:2c','root',13,'00:00:00','netns'),('6c:90:b1:ff:06:2c','root',11,'00:00:00','khelper'),('6c:90:b1:ff:06:2c','root',10,'00:00:00','cpuset'),('6c:90:b1:ff:06:2c','root',9,'00:01:16','ksoftirqd/1'),('6c:90:b1:ff:06:2c','root',8,'00:00:00','kworker/1:0'),('6c:90:b1:ff:06:2c','root',7,'00:00:02','migration/1'),('6c:90:b1:ff:06:2c','root',6,'00:00:03','migration/0'),('6c:90:b1:ff:06:2c','root',5,'00:00:00','kworker/u:0'),('6c:90:b1:ff:06:2c','root',3,'00:02:47','ksoftirqd/0'),('6c:90:b1:ff:06:2c','root',2,'00:00:00','kthreadd'),('6c:90:b1:ff:06:2c','root',1,'00:00:08','init');

/*Table structure for table `tbl_worklist` */

DROP TABLE IF EXISTS `tbl_worklist`;

CREATE TABLE `tbl_worklist` (
  `os_type` varchar(10) DEFAULT NULL,
  `vm_server` varchar(60) DEFAULT NULL,
  `vm_port` varchar(10) DEFAULT NULL,
  `vm_sport` varchar(10) DEFAULT NULL,
  `vm_domain` varchar(60) DEFAULT NULL,
  `client_sn` varchar(40) NOT NULL,
  `client_mac` varchar(20) NOT NULL,
  `client_ip` varchar(40) DEFAULT NULL,
  `client_netmask` varchar(40) DEFAULT NULL,
  `client_gateway` varchar(40) DEFAULT NULL,
  `client_dns` varchar(40) DEFAULT NULL,
  `update_vm` varchar(3) DEFAULT NULL COMMENT '是否修改虚拟机设置',
  `update_net` varchar(3) DEFAULT NULL,
  `update_version` varchar(3) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL COMMENT '操作，如shutdown',
  `create_time` datetime NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`client_mac`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='工作列表';

/*Data for the table `tbl_worklist` */

insert  into `tbl_worklist`(`os_type`,`vm_server`,`vm_port`,`vm_sport`,`vm_domain`,`client_sn`,`client_mac`,`client_ip`,`client_netmask`,`client_gateway`,`client_dns`,`update_vm`,`update_net`,`update_version`,`action`,`create_time`) values ('arm','192.168.20.204','','','','','6c:90:b1:ff:03:a4','192.168.20.160','','','',NULL,NULL,'yes','','2016-01-11 16:14:05'),('arm','192.168.20.203','','','','','6c:90:b1:ff:03:a3','192.168.20.161','','','',NULL,NULL,'',NULL,'0000-00-00 00:00:00'),('arm','192.168.20.201','','','','','6c:90:b1:ff:03:96','192.168.20.124','','','',NULL,NULL,'','shutdown','2016-01-11 16:14:21');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
