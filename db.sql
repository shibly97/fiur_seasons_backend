CREATE DATABASE four_seasons

CREATE TABLE role (
    role_id bigserial primary key, 
    role_name varchar(20)
    );

CREATE TABLE hotel (
    hotel_id bigserial primary key, 
    name varchar(20), 
    email varchar(50), 
    address text,
    mobile varchar(20)
);
 
CREATE TABLE staff (
    staff_id bigserial primary key, 
    firstname varchar(20), 
    lastname varchar(20), 
    email varchar(50), 
    password text,
    username text unique,
    dob date, 
    join_date date default now(), 
    mobile varchar(20),
    hotel_id int references hotel(hotel_id),
    role_id int references role(role_id)
);


CREATE TABLE room_category (
    room_category_id bigserial primary key, 
    name varchar(20) unique, 
    bed_count int, 
    description text
);

CREATE TABLE room (
    room_id bigserial primary key, 
    hotel_id int references hotel(hotel_id),
    room_category_id int references room_category(room_category_id)
);

CREATE TABLE travel_company (
    travel_company_id bigserial primary key, 
    name varchar(30),
    address text
);

CREATE TABLE reservation (
    reservation_id bigserial primary key, 
    room_id int references room(room_id), 
    check_in_date date, 
    check_in_time time,
    check_out_date date, 
    check_out_time time,
    restaurant_charge boolean default false, 
    room_service boolean default false, 
    laundry boolean default false, 
    club_facility boolean default false, 
    telephone_service boolean default false, 
    payed boolean default false, 
    payment_method varchar(20) not null,
    customer_identification varchar(30),
    customer_name text,
    customer_mobile varchar(20),
    travel_comapny_id int references travel_company(travel_company_id)
);