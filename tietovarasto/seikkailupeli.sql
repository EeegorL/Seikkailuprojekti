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
INSERT INTO `huone` VALUES ('1-3',NULL,NULL,NULL,'2-3','Vartijan koppi'),('2-2','2-3',NULL,NULL,'3-2','Henkilökunnan tilat'),('2-3','2-4','2-2','1-3',NULL,'Ovi'),('2-4',NULL,'2-3',NULL,'3-4','Aukio'),('3-2',NULL,NULL,'2-2','4-2','Käytävä'),('3-4','3-5',NULL,'2-4',NULL,'Jack&Jones'),('3-5','3-6','3-4',NULL,NULL,'Käytävä'),('3-6',NULL,'3-5',NULL,'4-6','Minibossi'),('4-1','4-2',NULL,NULL,NULL,'Tallinnanaukio'),('4-2','4-3','4-1','3-2','5-2','Aula'),('4-3','4-4','4-2',NULL,NULL,'Prisma'),('4-4',NULL,'4-3',NULL,NULL,'Varastotilat'),('4-6',NULL,NULL,'3-6','5-6','Käytävä (taas kerran)'),('5-2',NULL,NULL,'4-2',NULL,'Kentucky Fried Chicken'),('5-4','5-5',NULL,NULL,'6-4','Parkkihalli - Etelä'),('5-5','5-6','5-4',NULL,NULL,'Liukuportaat parkkihalliin'),('5-6',NULL,'5-5','4-6','6-6','K-Market'),('6-4',NULL,NULL,'5-4',NULL,'Parkkihalli - Itä'),('6-6','6-7',NULL,'5-6',NULL,'K-Marketin lihatiski'),('6-7','6-8','6-6',NULL,NULL,'K-Marketin takahuoneet'),('6-8',NULL,'6-7',NULL,NULL,'LOMPAKKOVARAS');
UNLOCK TABLES;



DROP TABLE IF EXISTS `huonekalut`;

CREATE TABLE `huonekalut` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `huone` varchar(100) DEFAULT NULL,
  `tyyppi` varchar(100) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `vari` varchar(100) DEFAULT NULL,
  `leveys` int(11) DEFAULT NULL,
  `korkeus` int(11) DEFAULT NULL,
  `koriste` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;



LOCK TABLES `huonekalut` WRITE;
INSERT INTO `huonekalut` VALUES (1,'4-1','kaappi',200,100,'darkbrown',400,75,0);
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `leveys` int(11) DEFAULT NULL,
  `korkeus` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;

LOCK TABLES `vihollinen` WRITE;
INSERT INTO `vihollinen` VALUES (29,300,1,'4-2','Risumies',400,250,1,'darkkhaki','brown',1,'risumies.png',40,70),(30,300,2,'5-2','Päivi',400,250,1,'green','brown',1,'Paivi.png',40,70),(31,300,3,'3-2','Karen',400,250,1,'red','brown',1,'Karen.png',40,70),(32,300,2,'1-3','Bull Mentula',400,250,1,'black','brown',1,'BullMentula.png',40,70),(33,10,2,'4-1','Test Mentula',400,250,1,'black','brown',1,'BullMentula.png',40,70);
UNLOCK TABLES;

