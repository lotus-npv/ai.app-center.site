-- Active: 1709140861283@@45.252.251.108@3306@lotusocean_jp_app
drop database if exists lotusocean_jp_app;
create database lotusocean_jp_app default character set utf8 collate utf8_unicode_ci;
use lotusocean_jp_app;

-- tao bang danh sach cac doi tuong nguoi dung
-- create table if not exists users_type (
--     id int primary key auto_increment,
--     key_license_id INT,
--     name VARCHAR(50),
--     description VARCHAR(200),
--     create_at DATETIME,
--     create_by INT,
--     update_at DATETIME,
--     update_by INT,
--     delete_at DATETIME,
--     flag BOOLEAN,
--     foreign key (key_license_id) references key_license(id)
-- );
create table if not exists intern
(
    id int primary key auto_increment,
    key_license_id int,
    syndication_id INT,
    type VARCHAR(20) DEFAULT 'intern',
    avata VARCHAR(100),
    avata_update_at DATETIME,
    first_name_jp VARCHAR(20),
    middle_name_jp VARCHAR(20),
    last_name_jp VARCHAR(20),
    first_name_en VARCHAR(20),
    middle_name_en VARCHAR(20),
    last_name_en VARCHAR(20),
    gender VARCHAR(20),
    dob DATE,
    career_id INT,
    passport_code VARCHAR(50),
    passport_license_date DATE,
    passport_expiration_date DATE,
    alert BOOLEAN,
    phone_domestically VARCHAR(20),
    phone_abroad VARCHAR(20),
    receiving_factory_id INT,
    dispatching_company_id INT,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);

create table if not exists syndication  (
    id int primary key auto_increment,
    key_license_id INT,
    type VARCHAR(20) DEFAULT 'syndication',
    receiving_factory_id INT,
    logo VARCHAR(100),
    name_jp VARCHAR(50),
    name_en VARCHAR(50),
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);

-- tao bang danh sach cong ty tiep nhan
create table if not exists receiving_factory (
    id int primary key auto_increment,
    key_license_id INT,
    type VARCHAR(20) DEFAULT 'receiving_factory',
    syndication_id INT,
    logo VARCHAR(100),
    name_jp VARCHAR(50),
    name_en VARCHAR(50),
    tax_code VARCHAR(50),
    date_of_joining_syndication DATE,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id)
);

create table if not exists connect_user (
    id int primary key auto_increment,
    key_license_id INT,
    syndication_id INT,
    object_type ENUM('receiving_factory','dispatching_company'),
    object_id INT,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id)
);

-- tao bang danh sach cong ty phai cu
create table if not exists dispatching_company (
    id int primary key auto_increment,
    key_license_id INT,
    type VARCHAR(20) DEFAULT 'dispatching_company',
    syndication_id INT,
    logo VARCHAR(100),
    name_jp VARCHAR(50),
    name_en VARCHAR(50),
    tax_code VARCHAR(50),
    date_of_joining_syndication DATETIME,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id)
);

create table if not exists address (
    id int primary key auto_increment,
    key_license_id INT,
    user_type ENUM('syndication','receiving_factory','dispatching_company','intern', 'employee'),
    object_id INT,  -- có thể là id của tts, công ty phái cử, xí nghiệp .
    nation_id INT,
    province_id INT,
    district_id INT,
    commune_id INT,
    detail VARCHAR(200),
    phone_number VARCHAR(20),
    email VARCHAR(50),
    fax VARCHAR(50),
    is_default BOOLEAN,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id)
);

-- tao bang cho danh sach nganh nghe
create table if not exists career (
    id int primary key auto_increment,
    key_license_id INT,
    name VARCHAR(50),
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id)
);

create table if not exists alien_registration_card (
    id int primary key auto_increment,
    key_license_id INT,
    intern_id INT,
    card_number VARCHAR(50),
    status_of_residence_id INT,
    license_date DATETIME,
    expiration_date DATETIME,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id),
    -- foreign key (intern_id) references intern(id)
);

create table if not exists status_of_residence (
    id int primary key auto_increment,
    key_license_id INT,
    name VARCHAR(50),
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id)
);

create table if not exists status (
    id int primary key auto_increment,
    key_license_id INT,
    name VARCHAR(50),
    colors VARCHAR(30),
    status_type ENUM('manual', 'automatic'),
    condition_date ENUM('before', 'after'), -- điều kiện : truowc ngay, sau ngay
    condition_milestone VARCHAR(50), -- mốc điều kiện từ ngày  (Ngay nhap canh, Ngay het han visa, Ngay sinh nhat, Ngay ve nuoc)
    condition_value INT,  -- số ngày 
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id)
);

-- bang luu trang thai cua tts
create table if not exists status_detail (
    id int primary key auto_increment,
    key_license_id INT,
    intern_id INT,
    status_id INT, 
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id),
    -- foreign key (intern_id) references intern(id),
    -- foreign key (status_id) references status(id)
);

create table if not exists violate_list  (
    id int primary key auto_increment,
    key_license_id INT,
    violate_type_id INT,
    violate_date DATE,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);

create table if not exists violate  (
    id int primary key auto_increment,
    key_license_id INT,
    intern_id INT,
    violate_list_id INT,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);

create table if not exists violate_type  (
    id int primary key auto_increment,
    key_license_id INT,
    name VARCHAR(50),
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);

create table if not exists ticket (
    id int primary key auto_increment,
    key_license_id INT,
    send_date DATETIME,
    title VARCHAR(100),
    sender_type ENUM('syndication','receiving_factory','dispatching_company','intern'),
    sender_id INT, -- id user nguoi gui
    receiver_type ENUM('syndication','receiving_factory','dispatching_company','intern'),
    receiver_id INT, -- id user nguoi nhan
    priority ENUM('Low', 'Medium', 'High'),
    ticket_status ENUM('new', 'processing', 'done')
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id),
    -- foreign key (sender_id) references users(id),
    -- foreign key (receiver_id) references users(id)
);


create table if not exists ticket_detail (
    id int primary key auto_increment,
    key_license_id INT,
    ticket_id INT,
    sender_type ENUM('syndication','receiving_factory','dispatching_company','intern'),
    sender_id INT, -- id user nguoi gui
    send_date DATETIME,
    content VARCHAR(1000),
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);

create table if not exists positions (
    id int primary key auto_increment,
    key_license_id INT,
    name varchar(50),
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id)
);

-- tao bang nhan vien
create table if not exists employee (
    id int primary key auto_increment,
    key_license_id INT,
    first_name VARCHAR(20),
    middle_name VARCHAR(20),
    last_name VARCHAR(20),
    gender VARCHAR(10),
    dob DATE,
    avata VARCHAR(200),
    user_type ENUM('syndication','receiving_factory','dispatching_company'),
    office_id INT, -- (id cu nghiep doan, xi nghiep hay cong ty phai cu nao do)
    positions_id INT,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id),
    -- foreign key (address_id) references address(id),
    -- foreign key (positions_id) references positions(id)
);

-- tao bang phan quyen
create table if not exists permission (
    id int primary key auto_increment,
    key_license_id INT,
    user_type ENUM('syndication','receiving_factory','dispatching_company','intern'),
    can_read BOOLEAN,
    can_edit BOOLEAN,
    can_delete BOOLEAN,
    can_create BOOLEAN,
    can_create_user BOOLEAN,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
    -- foreign key (key_license_id) references key_license(id)
);


-- tao bang người dùng 
create table if not exists users (
    id int primary key auto_increment,
    key_license_id INT,
    role ENUM('admin','managers','user'),
    -- is_employee BOOLEAN, -- neu la employee thi truy van vao bang employee, khong thi truy van vao bang intern
    object_type ENUM('syndication','receiving_factory','dispatching_company','intern'),
    object_id INT,  -- (employee, intern)
    username VARCHAR(50),
    password_hash VARCHAR(100),
    active BOOLEAN,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);

-- tao bang phan quyen người dùng




CREATE TABLE if not exists key_license (
    id int primary key auto_increment,
    key_license VARCHAR(50) UNIQUE,
    key_type VARCHAR(50),
    object_id INT,
    active BOOLEAN,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);

CREATE TABLE IF NOT EXISTS avata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_license_id INT,
    user_type ENUM('syndication','receiving_factory','dispatching_company','intern', 'employee'),
    object_id INT,  -- dua vao user_type de xac dinh id cua doi tuong 
    path VARCHAR(255) NOT NULL,
    originalname VARCHAR(255) NOT NULL,
    mimetype VARCHAR(255) NOT NULL,
    size INT NOT NULL,
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);

CREATE TABLE if not exists notification (
    id int primary key auto_increment,
    key_license_id INT,
    type_noti VARCHAR(50), -- kieu thong bao
    user_id VARCHAR(50),  -- id user nguoi nhan thong bao
    date_noti DATETIME, -- ngay se gui thong bao
    title VARCHAR(100), -- tieu de thong bao
    content VARCHAR(500), -- noi dung tong bao
    watched BOOLEAN,  -- kiem tra trang thai da xem
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);


CREATE TABLE if not exists send_notification (
    id int primary key auto_increment,
    key_license_id INT,
    -- type_noti ENUM('all', 'group', 'individual'), -- kieu thong bao: gui cho ca nhan, tap the hay toan bo
    sender_id VARCHAR(50),  -- id user nguoi nhan thong bao
    date_noti DATETIME, -- ngay se gui thong bao
    title VARCHAR(200), -- tieu de thong bao
    content VARCHAR(1500), -- noi dung tong bao
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);

CREATE TABLE if not exists receiver_notification (
    id int primary key auto_increment,
    key_license_id INT,
    send_notification_id INT,
    receiver_id INT,  -- id user nguoi nhan thong bao
    description VARCHAR(200),
    create_at DATETIME,
    create_by INT,
    update_at DATETIME,
    update_by INT,
    delete_at DATETIME,
    flag BOOLEAN
);












