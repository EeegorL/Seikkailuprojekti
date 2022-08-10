create table pelaaja(
    pelaajaId integer not null primary key auto_increment,
    nimi varchar(100) not null unique,
    hp integer default 100 not null
);