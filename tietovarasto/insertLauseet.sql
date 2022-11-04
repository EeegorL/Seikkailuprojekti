use seikkailupeli;


INSERT INTO huone (id,pohjoinen,etela,lansi,ita,nimi) VALUES ('4-1','4-2',NULL,NULL,NULL,'Tallinnanaukio');

INSERT INTO vihollinen (hp,dmg,huone,nimi,x,y,nopeus,vari2,vari1,elossa,kuva) VALUES (100,10,'4-1','Itiksen Irmeli',400,250,1,'darkkhaki','brown',1,'irmeli.png')
-- Vihollisen kuva pitää ekana ladata pelikansioon, eli mulle vaa discordin vaik discordin kautta nii pistän


-- Joosen huoneet
INSERT INTO huone (id,pohjoinen,etela,ita,lansi,nimi)VALUES ('4-1','4-2',NULL,NULL,NULL,'Tallinnanaukio');
INSERT INTO huone (id,pohjoinen,etela,ita,lansi,nimi)VALUES ('4-2','4-3','4-1','5-2','3-2','Aula');
INSERT INTO huone (id,pohjoinen,etela,ita,lansi,nimi)VALUES ('5-2',NULL,NULL,NULL,'4-2','Kentucky Fried Chicken');
INSERT INTO huone (id,pohjoinen,etela,ita,lansi,nimi)VALUES ('3-2',NULL,NULL,'4-2','2-2','Käytävä');
INSERT INTO huone (id,pohjoinen,etela,ita,lansi,nimi)VALUES ('2-2','2-3',NULL,'3-2',NULL,'Henkilökunnan tilat');
INSERT INTO huone (id,pohjoinen,etela,ita,lansi,nimi)VALUES ('2-3','2-4',"2-2",NULL,'1-3','Ovi');
INSERT INTO huone (id,pohjoinen,etela,ita,lansi,nimi)VALUES ('1-3',NULL,NULL,'2-3',NULL,'Vartijan koppi');
-- Joosen viholliset
INSERT INTO vihollinen (hp,dmg,huone,nimi,x,y,nopeus,vari2,vari1,elossa,kuva,leveys,korkeus) VALUES (50,1,'4-2','Risumies',400,250,1,'darkkhaki','brown',1,'risumies.png',40,70);
INSERT INTO vihollinen (hp,dmg,huone,nimi,x,y,nopeus,vari2,vari1,elossa,kuva,leveys,korkeus) VALUES (150,2,'5-2','Päivi',400,250,1,'green','brown',1,'Paivi.png',40,70);
INSERT INTO vihollinen (hp,dmg,huone,nimi,x,y,nopeus,vari2,vari1,elossa,kuva,leveys,korkeus) VALUES (300,3,'3-2','Karen',400,250,1,'red','brown',1,'Karen.png',40,70);
INSERT INTO vihollinen (hp,dmg,huone,nimi,x,y,nopeus,vari2,vari1,elossa,kuva,leveys,korkeus) VALUES (350,2,'1-3','Bull Mentula',400,250,1,'black','brown',1,'BullMentula.png',40,70);