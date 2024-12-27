create table if not exists teste (
    teste           integer
);

create table if not exists users (
    id              serial not null unique primary key,
    username        varchar(50),
    password        varchar(255),
    profile_image   bytea  
);

create table if not exists access_tokens (
    id              serial not null unique primary key,
    token           varchar(255),
    status          int default 1,
    user_id         int,
    expiration_date timestamp
);


create table if not exists products (
    id              serial not null unique primary key,
    description     varchar(255),
    status          int default 1,
    user_id         int,
    expiration_date timestamp
);