CREATE TABLE user (
    user_name VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    user_bio TEXT,
    date_of_birth DATE,
    user_type INT,
    user_email VARCHAR(255)
);

INSERT INTO user (user_name, password, user_bio, date_of_birth, user_type, user_email) 
VALUES ('michael', 'pswd123', 'test user bio', '2000-01-01', 0, 'shijun.sui@mail.utoronto.ca');

INSERT INTO user (user_name, password, user_bio, date_of_birth, user_type, user_email) 
VALUES ('shijun', 'pswd123', 'test user bio 2', '2000-02-02', 0, 'michael.sui@mail.utoronto.ca');


select * from user;

CREATE TABLE event (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(255),
    category_id INT,
    holder_name VARCHAR(255),
    event_time DATETIME,
    event_location VARCHAR(255),
    holder_type INT
);

select * from event;

CREATE TABLE friend(
friend_id INT PRIMARY KEY auto_increment, 
user_name_1 varchar(255), 
user_name_2 varchar(255)
);

insert into friend(friend_id, user_name_1, user_name_2) values(1, "michael", "shijun");

select * from friend;

create table category(
category_id INT, 
category_name VARCHAR(255)
);

insert into category(category_id, category_name) values(1, "computer science");

select * from category;

