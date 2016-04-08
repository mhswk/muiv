<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<link rel='stylesheet' type='text/css' href='/res/com/css/font-awesome.css' />
<link rel='stylesheet' type='text/css' href='/res/com/css/mui.css' />
<link rel='stylesheet' type='text/css' href='/res/theme/tm_1/css/adm.css' />
<script src='/res/com/js/jquery.js'></script>
<script src='/res/com/js/underscore.js'></script>
<script src='/res/com/js/mv.js'></script>
<script src='/res/com/js/mui.js'></script>
<script src='/res/bus/js/p_n_cltlist.js'></script>
<script src='/res/bus/js/p_n_worklist.js'></script>
<script src='/res/bus/js/p_n_syscfg.js'></script>
<script src='/res/bus/js/adm.js'></script>
<!--script src='/resource/common/js/jquery.min.js' async="async"></script>
<script src='/resource/common/js/bttp.min.js' async="async"></script>
<script src='/resource/business/main.js' async="async"></script-->
<title>MUIV</title>
</head>
<body>
<header>
    <div class='hd-l logo'>
        <span class='title'>MUIV</span>
    </div>
    <div class='hd-r'>
        <a class="logout" href="/index.php/adm/logout"></a>
        <span>欢迎您：<span><?php echo $usr;?></span></span>
    </div>
</header>
<main>
    <div class='mi-l' id='mvtgt_navl'></div>
    <div class='mi-r'>
        <div class='mi-r-bnav'></div>
        <div class='mi-r-mbox' id='mvtgt_mbox'></div>
    </div>
</main>
<footer>
    <span>mui view</span>
</footer>
<div class='mui-winbox'></div>
</body>
</html>