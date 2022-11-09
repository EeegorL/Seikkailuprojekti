USE `seikkailupeli`;

--   `id`
--   `pohjoinen` ylös
--   `etela` alas
--   `lansi` vasen
--   `ita` oikea
--   `nimi`

INSERT INTO `huone` VALUES ('4-3','4-4','4-2',NULL,NULL,'Prisma')
INSERT INTO `huone` VALUES ('4-4',NULL,'4-3',NULL,NULL,'Varastotilat')
INSERT INTO `huone` VALUES ('3-4','3-5',NULL,'2-4',NULL,'Jack&Jones')
INSERT INTO `huone` VALUES ('2-4',NULL,'2-3',NULL,'3-4','Aukio')
INSERT INTO `huone` VALUES ('3-5','3-6','3-4',NULL,NULL,'Käytävä')
INSERT INTO `huone` VALUES ('3-6',NULL,'3-5',NULL,'4-6','Minibossi')


-- id` int(11) NOT NULL,
--   `hp` int(11) NOT NULL DEFAULT 100,
--   `dmg` int(11) NOT NULL,
--   `huone` varchar(100) DEFAULT NULL,
--   `nimi` varchar(100) DEFAULT NULL,
--   `x` int(11) DEFAULT NULL,
--   `y` int(11) DEFAULT NULL,
--   `nopeus` int(11) DEFAULT NULL,
--   `vari2` varchar(50) DEFAULT NULL,
--   `vari1` varchar(50) DEFAULT NULL,
--   `elossa` tinyint(1) DEFAULT NULL,
--   `kuva` varchar(100) DEFAULT NULL,

INSERT INTO `vihollinen` VALUES (1,200,100,'4-3','Prisman Eliitti',400,250,1,'darkkhaki','brown',1,'BullMentula.png'); --prisma
INSERT INTO `vihollinen` VALUES (1,130,7,'2-4','Itiksen Irmeli',400,250,1,'darkkhaki','brown',1,'irmeli.png'); --aukio
INSERT INTO `vihollinen` VALUES (1,120,6,'2-4','Itiksen Aapeli',400,250,1.5,'darkkhaki','brown',1,'aapeli.png'); --aukio
INSERT INTO `vihollinen` VALUES (1,100,5,'2-4','Jari the Man',400,250,2,'darkkhaki','brown',1,'jari.png'); --aukio
INSERT INTO `vihollinen` VALUES (1,140,6,'3-5','Teppo',400,250,1,'darkkhaki','brown',1,'risumies.png'); --käytävä
INSERT INTO `vihollinen` VALUES (1,135,5,'3-5','Veikko',400,250,2,'darkkhaki','brown',1,'verstappen.png'); --käytävä
INSERT INTO `vihollinen` VALUES (1,300,8,'3-6','Varkaan Hamsteri',400,250,2,'darkkhaki','brown',1,'hamsteri.png'); --miniboss