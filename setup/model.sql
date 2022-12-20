drop database if exists pressa;

create database pressa;

\c pressa;

create extension pgcrypto;


drop table if exists admins;
create table admins(
  admin_id serial primary key,
  admin_name varchar(64) unique not null,
  admin_avatar varchar(128),
  password varchar(64) not null,
  create_at timestamp default current_timestamp
);


drop table if exists users;
create table users(
  user_id serial primary key,
  username varchar(64) unique not null,
  password varchar(64) not null,
  create_at timestamp default current_timestamp
);



drop table if exists categories;
create table categories(
  category_id serial primary key,
  category_name varchar(64) unique not null,
  status varchar(16) default 'active',
  create_at timestamp default current_timestamp
);



drop table if exists sub_categories;
create table sub_categories(
  sub_category_id serial primary key,
  sub_category_name varchar(64) not null,
  category_id int references categories(category_id),
  status varchar(16) default 'active',
  create_at timestamp default current_timestamp
);



drop table if exists organizers;
create table organizers(
  organizer_id serial primary key,
  organizer_name varchar(64) not null,
  organizer_profession varchar(64) not null,
  organizer_type varchar(16) default 'jismoniy',
  organizer_phone varchar(12) not null,
  organizer_phone_stuck varchar(12) not null,
  user_id int references users(user_id),
  create_at timestamp default current_timestamp
);



drop table if exists organizations;
create table organizations(
  organization_id serial primary key,
  organization_name varchar(64) not null,
  organizer_id int references organizers(organizer_id),
  create_at timestamp default current_timestamp
);



drop table if exists conferences;
create table conferences(
  conference_id serial primary key,
  conference_date timestamp not null,
  conference_type varchar(12) default 'online',
  organizer_id int references organizers(organizer_id),
  category_id int references categories(category_id),
  sub_category_id int references sub_categories(sub_category_id),
  status varchar(16) default 'waiting',
  create_at timestamp default current_timestamp
);



drop table if exists conference_links;
create table conference_links(
  conference_link_id serial primary key,
  conference_link varchar(256) not null,
  conference_id int references conferences(conference_id),
  create_at timestamp default current_timestamp
);



drop table if exists posts;
create table posts(
  post_id serial primary key,
  post_title varchar(128) not null,
  post_description varchar(512) not null,
  conference_id int references conferences(conference_id),
  create_at timestamp default current_timestamp
);



drop table if exists post_bodys;
create table post_bodys(
  post_body_id serial primary key,
  post_body_text varchar(1024) not null,
  post_id int references posts(post_id),
  create_at timestamp default current_timestamp
);



drop table if exists post_images;
create table post_images(
  post_image_id serial primary key,
  post_image_link varchar(256) not null,
  post_id int references posts(post_id),
  create_at timestamp default current_timestamp
);