create table Huone (
    id varchar(100) primary key not null,
    pohjoinen integer default null,
    etela integer default null,
    lansi integer default null,
    ita integer default null
);

insert into Huone(id,pohjoinen,etela,lansi,ita) values(1,2,null,null,null);
insert into Huone(id,pohjoinen,etela,lansi,ita) values(2,null,null,null,3);
insert into Huone(id,pohjoinen,etela,lansi,ita) values(3,null,null,null,null);