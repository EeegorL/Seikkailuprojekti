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
INSERT INTO huone (id,pohjoinen,etela,ita,lansi,nimi)VALUES ('2-3','2-4',NULL,NULL,'1-3','Ovi');
INSERT INTO huone (id,pohjoinen,etela,ita,lansi,nimi)VALUES ('1-3',NULL,NULL,'2-3',NULL,'Vartijan koppi');