-- MariaDB dump 10.19  Distrib 10.6.5-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: seikkailupeli
-- ------------------------------------------------------
-- Server version	10.6.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `seikkailupeli`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `seikkailupeli` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `seikkailupeli`;

--
-- Table structure for table `huone`
--

DROP TABLE IF EXISTS `huone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4; /*miksi ääkköset eivät toimi aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa*/
CREATE TABLE `huone` (
  `id` varchar(10) NOT NULL,
  `pohjoinen` varchar(10) DEFAULT NULL,
  `etela` varchar(10) DEFAULT NULL,
  `lansi` varchar(10) DEFAULT NULL,
  `ita` varchar(10) DEFAULT NULL,
  `nimi` varchar(100) DEFAULT NULL,
  `onNPCeita` bit(1) DEFAULT NULL,
  `vari` varchar(20) DEFAULT NULL,
  `kuvaus` nvarchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huone`
--

LOCK TABLES `huone` WRITE;
/*!40000 ALTER TABLE `huone` DISABLE KEYS */;
INSERT INTO `huone` VALUES ('0-0',NULL,NULL,NULL,NULL,'Testihuone (miten helvetissä pääsit tänne???)','\0','#000000',''),('1-3',NULL,NULL,NULL,'2-3','Vartijan koppi','\0','#fcba03',''),('2-2','2-3',NULL,NULL,'3-2','Henkilokunnan tilat','\0','#fcba03','Huhhuh mikä tungos. Ihan kuin olisi ollut norsuja tömistelemässä,\nkun seisoi sellainen melu. Voisin ehkä levätä hetken… ei helvetti kuka nyt tuolta vielä tulee.\nVaikuttaa olevan jokin äkäinen rouva. Huitoo vielä nyrkkiäkin.'),('2-3','2-4','2-2','1-3',NULL,'Ovi','\0','#fcba03',''),('2-4',NULL,'2-3',NULL,'3-4','Aukio','\0','#037bfc',''),('3-2',NULL,NULL,'2-2','4-2','Kaytava','\0','#fcba03','Huhhuh mikä tungos. Ihan kuin olisi ollut norsuja tömistelemässä, kun seisoi sellainen melu.\nVoisin ehkä levätä hetken.\n..ei helvetti kuka nyt tuolta vielä tulee. Vaikuttaa olevan jokin äkäinen rouva.\nHuitoo vielä nyrkkiäkin.'),('3-4','3-5',NULL,'2-4',NULL,'Jack&Jones','\0','#037bfc',''),('3-5','3-6','3-4',NULL,NULL,'Kaytava','\0','#037bfc',''),('3-6',NULL,'3-5',NULL,'4-6','Minibossi','\0','#037bfc',''),('4-1','4-2',NULL,NULL,NULL,'Tallinnanaukio','\0','#fcba03','Heräät mutalammikosta, ja pyyhit silmäsi mudasta. Tunnet tyhjät taskusi.\nSe ei muuten olisi ihmeellistä, tyhjiähän ne ovat suurimman osan ajasta\n,mutta muistat, että taskussasi oli tuntemattomalta \'lainaamasi\' lompakko.\nMihin se mahtasi kadota?'),('4-2','4-3','4-1','3-2','5-2','Aula','','#fcba03','Aulassa on melkoinen tungos.\nKuulet, että muiltakin on kadonnut heidän lompakkonsa. Jokin lompakkovaras on kuulemma\npäässyt luikahtamaan Itäkeskuksen tantereille.\nJuuri kun oli itselläkin ostokset mielessä. Kai tässä joutuu itse hoitamaan etsivän työ,\n kun ei kerran vartijat siihen pysty.'),('4-3','4-4','4-2',NULL,NULL,'Prisma','\0','#037bfc',''),('4-4',NULL,'4-3',NULL,NULL,'Varastotilat','\0','#037bfc',''),('4-6',NULL,NULL,'3-6','5-6','Kaytava (taas kerran)','','#00e61f',''),('5-2',NULL,NULL,'4-2',NULL,'Kentucky Fried Chicken','\0','#fcba03','Vanha kunnon KFC, ja tuo kahviläikkäkin on säilynyt.\nHetki… ei helvetti tuohan on Mannermaan Päivi!\nNyt saa Päivi kyllä maksaa velkansa koroilla, kun päätti olla maksamatta ajoissa!'),('5-4','5-5',NULL,NULL,'6-4','Parkkihalli - Etela','\0','#00e61f',''),('5-5','5-6','5-4',NULL,NULL,'Liukuportaat parkkihalliin','\0','#00e61f',''),('5-6',NULL,'5-5','4-6','6-6','K-Market','\0','#00e61f',''),('6-4',NULL,NULL,'5-4',NULL,'Parkkihalli - Ita','\0','#00e61f',''),('6-6','6-7',NULL,'5-6',NULL,'K-Marketin lihatiski','\0','#00e61f',''),('6-7','6-8','6-6',NULL,NULL,'K-Marketin takahuoneet','\0','#00e61f',''),('6-8',NULL,'6-7',NULL,NULL,'LOMPAKKOVARAS','\0','#2e1d10','');
/*!40000 ALTER TABLE `huone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `huonekalut`
--

DROP TABLE IF EXISTS `huonekalut`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huonekalut`
--

LOCK TABLES `huonekalut` WRITE;
/*!40000 ALTER TABLE `huonekalut` DISABLE KEYS */;
INSERT INTO `huonekalut` VALUES (1,'4-1','kaappi',200,100,'darkbrown',400,75,0),(3,'4-4','kaappi',600,40,'green',75,350,0),(4,'4-4','kaappi',400,40,'green',75,350,0),(36,'0-0','kaappi',0,30,'red',1000,10,1),(37,'0-0','kaappi',0,60,'red',1000,10,1),(38,'0-0','kaappi',0,90,'red',1000,10,1),(39,'0-0','kaappi',0,120,'red',1000,10,1),(40,'0-0','kaappi',0,150,'red',1000,10,1),(41,'0-0','kaappi',0,180,'red',1000,10,1),(42,'0-0','kaappi',0,210,'red',1000,10,1),(43,'0-0','kaappi',0,240,'red',1000,10,1),(44,'0-0','kaappi',0,270,'red',1000,10,1),(45,'0-0','kaappi',0,300,'red',1000,10,1),(46,'0-0','kaappi',0,330,'red',1000,10,1),(47,'0-0','kaappi',0,360,'red',1000,10,1),(48,'0-0','kaappi',0,390,'red',1000,10,1),(49,'0-0','kaappi',0,420,'red',1000,10,1),(50,'0-0','kaappi',0,450,'red',1000,10,1),(51,'0-0','kaappi',0,480,'red',1000,10,1),(52,'0-0','kaappi',0,510,'red',1000,10,1),(53,'0-0','kaappi',0,540,'red',1000,10,1),(54,'0-0','kaappi',0,570,'red',1000,10,1),(55,'0-0','kaappi',0,600,'red',1000,10,1),(56,'0-0','kaappi',0,630,'red',1000,10,1),(57,'0-0','kaappi',0,660,'red',1000,10,1),(58,'0-0','kaappi',0,690,'red',1000,10,1),(59,'0-0','kaappi',300,300,'red',200,200,1),(64,'5-2','kaappi',150,150,'red',125,125,0),(70,'5-2','kaappi',120,175,'white',15,75,1),(74,'5-2','kaappi',290,175,'white',15,75,1),(75,'5-2','kaappi',300,450,'red',125,125,0),(76,'5-2','kaappi',270,475,'white',15,75,1),(77,'5-2','kaappi',430,475,'white',15,75,1),(78,'5-2','kaappi',600,300,'red',125,125,0),(83,'5-2','kaappi',570,325,'white',15,75,1),(84,'5-2','kaappi',730,325,'white',15,75,1);
/*!40000 ALTER TABLE `huonekalut` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pelaaja`
--

DROP TABLE IF EXISTS `pelaaja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pelaaja` (
  `pelaajaId` int(11) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(100) NOT NULL,
  `hp` int(11) NOT NULL DEFAULT 100,
  `huone` int(11) NOT NULL DEFAULT 1,
  `raha` int(11) DEFAULT NULL,
  PRIMARY KEY (`pelaajaId`),
  UNIQUE KEY `nimi` (`nimi`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pelaaja`
--

LOCK TABLES `pelaaja` WRITE;
/*!40000 ALTER TABLE `pelaaja` DISABLE KEYS */;
INSERT INTO `pelaaja` VALUES (1,'p1',100,1,NULL);
/*!40000 ALTER TABLE `pelaaja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vihollinen`
--

DROP TABLE IF EXISTS `vihollinen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vihollinen`
--

LOCK TABLES `vihollinen` WRITE;
/*!40000 ALTER TABLE `vihollinen` DISABLE KEYS */;
INSERT INTO `vihollinen` VALUES (29,300,1,'4-2','Risumies',400,250,1,'darkkhaki','brown',1,'risumies.png',40,70),(30,300,2,'5-2','Paivi',400,250,1,'green','brown',1,'Paivi.png',40,70),(31,300,3,'3-2','Karen',400,250,1,'red','brown',1,'Karen.png',40,70),(32,300,2,'1-3','Bull Mentula',400,250,1,'black','brown',1,'BullMentula.png',40,70),(33,10,2,'4-1','Test Mentula',400,250,1,'black','brown',1,'BullMentula.png',40,70),(41,200,100,'4-3','Prisman Eliitti',400,250,1,'brown','darkkhaki',1,'BullMentula.png',40,70),(42,230,7,'2-4','Itiksen Irmeli',400,250,1,'brown','darkkhaki',1,'irmeli.png',40,70),(43,220,6,'2-4','Itiksen Aapeli',400,250,2,'brown','darkkhaki',1,'aapeli.png',40,70),(44,200,5,'2-4','Jari the Man',400,250,2,'brown','darkkhaki',1,'jari.png',40,70),(45,240,6,'3-5','Teppo',400,250,1,'brown','darkkhaki',1,'risumies.png',40,70),(46,235,5,'3-5','Veikko',400,250,2,'brown','darkkhaki',1,'verstappen.png',40,70),(47,800,8,'3-6','Varkaan Hamsteri',400,250,2,'brown','darkkhaki',1,'hamsteri.png',40,70),(48,250,2,'4-6','Rami',400,250,1,'darkkhaki','brown',1,'rami.png',40,70),(49,250,2,'4-6','Sami',600,250,1,'darkkhaki','brown',1,'sami.png',40,70),(50,1,2,'6-7','Lokkiveljekset',400,250,1,'darkkhaki','brown',1,'lokkiveljekset.png',40,70),(51,100,5,'5-5','Raksa-Risto',400,250,1,'darkkhaki','brown',1,'Raksa-Risto.png',40,70),(52,50,0,'5-4','Maisa-Mummeli',400,250,1,'darkkhaki','brown',1,'Maisa-Mummeli.png',40,70),(53,125,2,'6-4','Aapo-Alakoukku',400,250,1,'darkkhaki','brown',1,'Aapo-Alakoukku.png',40,70),(54,125,2,'6-4','Ylermi-Ylakoukku',600,250,1,'darkkhaki','brown',1,'Ylermi-Ylakoukku.png',40,70),(57,3000,1,'6-8','LOMPAKKOVARAS',400,250,2,'black','black',1,'LOMPAKKOVARAS.png',80,140);
/*!40000 ALTER TABLE `vihollinen` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-09  9:14:55
