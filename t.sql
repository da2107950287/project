-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.6.21-log - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.5.0.5220
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 xqhz 的数据库结构
CREATE DATABASE IF NOT EXISTS `xqhz` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `xqhz`;

-- 导出  表 xqhz.admin 结构
CREATE TABLE IF NOT EXISTS `admin` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='管理员表';

-- 正在导出表  xqhz.admin 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`aid`, `username`, `password`) VALUES
	(1, 'admin', '123456');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- 导出  表 xqhz.company 结构
CREATE TABLE IF NOT EXISTS `company` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '0',
  `password` varchar(50) NOT NULL DEFAULT '0',
  `personal_username` varchar(50) DEFAULT '1',
  `personal_tel` varchar(50) DEFAULT '1',
  `personal_email` varchar(50) DEFAULT '2',
  `rec_name` varchar(50) DEFAULT '2',
  `rec_kind` varchar(50) DEFAULT '2',
  `rec_class` varchar(50) DEFAULT '2',
  `rec_scale` varchar(50) DEFAULT '2',
  `rec_page` varchar(50) DEFAULT '2',
  `rec_intro` varchar(50) DEFAULT '2',
  `rec_tel` varchar(50) DEFAULT '2',
  `rec_address` varchar(50) DEFAULT '2',
  `rec_email` varchar(50) DEFAULT '2',
  `status` varchar(50) DEFAULT '0' COMMENT '0待审核1审核通过2审核驳回',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='企业表';

-- 正在导出表  xqhz.company 的数据：~6 rows (大约)
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` (`cid`, `username`, `password`, `personal_username`, `personal_tel`, `personal_email`, `rec_name`, `rec_kind`, `rec_class`, `rec_scale`, `rec_page`, `rec_intro`, `rec_tel`, `rec_address`, `rec_email`, `status`) VALUES
	(2, '2', '2', '2', '2', '2', '2', '国有企业', '50人-100人', '机关单位', '2', '2', '2', '2', '2', '1'),
	(3, '0', '0', '1', '1', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '0'),
	(4, '0', '0', '1', '1', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '0'),
	(5, '0', '0', '1', '1', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '0'),
	(6, '0', '0', '1', '1', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '0'),
	(7, '15729839319', '123456', '1', '1', '1', '7', '科研设计单位', '500人以上', '机关单位', '1', '1', '1', '1', '1', '1');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;

-- 导出  表 xqhz.delivery 结构
CREATE TABLE IF NOT EXISTS `delivery` (
  `did` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  `delivery_time` date DEFAULT NULL,
  PRIMARY KEY (`did`),
  KEY `rid` (`rid`),
  KEY `sid` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  xqhz.delivery 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `delivery` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery` ENABLE KEYS */;

-- 导出  表 xqhz.entry 结构
CREATE TABLE IF NOT EXISTS `entry` (
  `eid` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  PRIMARY KEY (`eid`),
  KEY `tid` (`tid`),
  KEY `sid` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='培训报名表';

-- 正在导出表  xqhz.entry 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `entry` DISABLE KEYS */;
INSERT INTO `entry` (`eid`, `tid`, `sid`) VALUES
	(1, 2, 4);
/*!40000 ALTER TABLE `entry` ENABLE KEYS */;

-- 导出  表 xqhz.recruitment 结构
CREATE TABLE IF NOT EXISTS `recruitment` (
  `rid` int(11) NOT NULL AUTO_INCREMENT COMMENT '招聘信息id',
  `cid` int(11) NOT NULL COMMENT '企业id',
  `rec_position` varchar(50) NOT NULL,
  `rec_degree` varchar(50) NOT NULL COMMENT '学历要求',
  `rec_work_place` varchar(100) NOT NULL COMMENT '工作地点',
  `rec_time` varchar(50) NOT NULL COMMENT '招聘时间',
  `rec_place_name` varchar(100) NOT NULL COMMENT '招聘描述',
  `rec_content` varchar(1000) NOT NULL COMMENT '职位描述',
  `status` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`rid`),
  KEY `cid` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='招聘信息';

-- 正在导出表  xqhz.recruitment 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `recruitment` DISABLE KEYS */;
INSERT INTO `recruitment` (`rid`, `cid`, `rec_position`, `rec_degree`, `rec_work_place`, `rec_time`, `rec_place_name`, `rec_content`, `status`) VALUES
	(1, 7, '1', '1', '1', '1', '1', '9999999999999999999', '1'),
	(2, 7, '2', '2', '2', '2', '2', '<p>2222222222222222222222</p>', '0');
/*!40000 ALTER TABLE `recruitment` ENABLE KEYS */;

-- 导出  表 xqhz.score 结构
CREATE TABLE IF NOT EXISTS `score` (
  `score_id` int(11) NOT NULL,
  `tid` int(11) DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`score_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  xqhz.score 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
/*!40000 ALTER TABLE `score` ENABLE KEYS */;

-- 导出  表 xqhz.student 结构
CREATE TABLE IF NOT EXISTS `student` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `sno` varchar(50) NOT NULL DEFAULT '0',
  `username` varchar(50) NOT NULL DEFAULT 'admin',
  `password` varchar(50) NOT NULL DEFAULT '123456' COMMENT '密码',
  `academy` varchar(50) DEFAULT '数学与计算机学院',
  `major` varchar(50) DEFAULT '计算机科学与技术',
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='学生表';

-- 正在导出表  xqhz.student 的数据：~7 rows (大约)
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` (`sid`, `sno`, `username`, `password`, `academy`, `major`) VALUES
	(4, '201610801020', 'admin', '123456', '数学与计算机学院', '计算机科学与技术'),
	(5, '0', 'admin', '123456', '数学与计算机学院', '计算机科学与技术'),
	(7, '0', 'admin', '123456', '数学与计算机学院', '计算机科学与技术'),
	(8, '0', 'admin', '123456', '数学与计算机学院', '计算机科学与技术'),
	(9, '0', 'admin', '123456', '数学与计算机学院', '计算机科学与技术'),
	(10, '0', 'admin', '123456', '数学与计算机学院', '计算机科学与技术'),
	(11, '0', 'admin', '888888', '数学与计算机学院', '计算机科学与技术');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;

-- 导出  表 xqhz.training 结构
CREATE TABLE IF NOT EXISTS `training` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `class_name` varchar(50) DEFAULT NULL,
  `class_teacher` varchar(50) DEFAULT NULL,
  `class_time` varchar(50) DEFAULT NULL,
  `class_place` varchar(50) DEFAULT NULL,
  `class_content` varchar(500) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0未通过1通过',
  PRIMARY KEY (`tid`),
  KEY `cid` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- 正在导出表  xqhz.training 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `training` DISABLE KEYS */;
INSERT INTO `training` (`tid`, `cid`, `class_name`, `class_teacher`, `class_time`, `class_place`, `class_content`, `status`) VALUES
	(2, 7, '2', '2', '2020-03-13 00:00:00,2020-04-17 00:00:00', '2', '<p>2222222222222222222222</p>', 1),
	(3, 7, '3', '3', '2020-03-07 00:00:00,2020-04-10 00:00:00', '3', '<p>sASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSDSASAsSS</p>', 0),
	(4, 7, '测试', '测试', '2020-03-05 00:00:00-2020-04-09 00:00:00', '测试', '<p>测试</p>', 0);
/*!40000 ALTER TABLE `training` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
