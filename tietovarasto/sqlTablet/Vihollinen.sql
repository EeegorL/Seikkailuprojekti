create table Vihollinen(
    id integer primary key not null,
    hp integer default 100 not null,
    dmg integer not null,
    huone integer not null
);

insert into Vihollinen(id,hp,dmg,huone) values(1,100,10,2);