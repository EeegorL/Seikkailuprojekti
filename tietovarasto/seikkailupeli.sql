DROP DATABASE IF EXISTS seikkailupeli;
CREATE DATABASE `seikkailupeli`;

USE `seikkailupeli`;


DROP USER IF EXISTS "kayttajaSeikkailupeliin";
CREATE USER kayttajaSeikkailupeliin IDENTIFIED BY "abc";
GRANT ALL PRIVILEGES ON seikkailupeli.* to kayttajaSeikkailupeliin;

DROP TABLE IF EXISTS `huone`;

CREATE TABLE `huone` (
  `id` varchar(10) NOT NULL,
  `pohjoinen` varchar(10) DEFAULT NULL,
  `etela` varchar(10) DEFAULT NULL,
  `lansi` varchar(10) DEFAULT NULL,
  `ita` varchar(10) DEFAULT NULL,
  `nimi` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

LOCK TABLES `huone` WRITE;
INSERT INTO `huone` VALUES ('4-1','4-2',NULL,NULL,NULL,'Tallinnanaukio'),('4-2','4-3','4-1','3-2','5-2','Aula'),('4-6',NULL,NULL,'3-6','5-6','K├ñyt├ñv├ñ'),('5-2',NULL,NULL,'4-2',NULL,'KFC'),('5-4','5-5',NULL,NULL,'6-4','Parkkihalli - Etel├ñ'),('5-5','5-6','5-4',NULL,NULL,'Liukuportaat parkkihalliin'),('5-6',NULL,'5-5','4-6','6-6','K-Market'),('6-4',NULL,NULL,'5-4',NULL,'Parkkihalli - It├ñ'),('6-6','6-7',NULL,'5-6',NULL,'K-Marketin lihatiski'),('6-7','6-8','6-6',NULL,NULL,'K-Marketin takahuoneet'),('6-8',NULL,'6-7',NULL,NULL,'*pit├ñ├ñ keksii joku eeppinen nimi*');
UNLOCK TABLES;



DROP TABLE IF EXISTS `pelaaja`;

CREATE TABLE `pelaaja` (
  `pelaajaId` int(11) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(100) NOT NULL,
  `hp` int(11) NOT NULL DEFAULT 100,
  `huone` int(11) NOT NULL DEFAULT 1,
  `raha` int(11) DEFAULT NULL,
  PRIMARY KEY (`pelaajaId`),
  UNIQUE KEY `nimi` (`nimi`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;


LOCK TABLES `pelaaja` WRITE;
INSERT INTO `pelaaja` VALUES (1,'p1',100,1,NULL);
UNLOCK TABLES;

DROP TABLE IF EXISTS `vihollinen`;


CREATE TABLE `vihollinen` (
  `id` int(11) NOT NULL,
  `hp` int(11) NOT NULL DEFAULT 100,
  `dmg` int(11) NOT NULL,
  `huone` varchar(100) DEFAULT NULL,
  `nimi` varchar(100) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `nopeus` int(11) DEFAULT NULL,
  `vari2` varchar(50) DEFAULT NULL,
  `vari1` varchar(50) DEFAULT NULL,
  `elossa` tinyint(1) DEFAULT NULL,
  `kuva` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

LOCK TABLES `vihollinen` WRITE;
INSERT INTO `vihollinen` VALUES (1,100,10,'4-1','Itiksen Irmeli',400,250,1,'darkkhaki','brown',1,'irmeli.png'),
                                (2,100,2,'4-1','Irmelin ylikasvanut hamsteri',600,300,3,'orange','orange',1,'hamsteri.png'),(3,100,2,'4-2','Aulan Aapeli',600,300,3,'purple','red',1,'aapeli.png');
UNLOCK TABLES;
