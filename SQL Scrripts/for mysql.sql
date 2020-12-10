create database if not exists abinvoice;
USE abinvoice;

CREATE TABLE Login(
	ID int AUTO_INCREMENT primary key,
	Email nvarchar(50) NOT NULL unique,
	Password varchar(300) NOT NULL,
    Salt varchar(60) not null,
	Temp nvarchar(15) NULL,
    is_assistant bit default 0
 );

CREATE TABLE PersonalInformation(
	ID int AUTO_INCREMENT primary key,
	Name varchar(50) NOT NULL,
	Company varchar(150) NOT NULL,
	Email varchar(50) NOT NULL,
	Mobile varchar(10) NULL,
	Address nvarchar(500) NULL,
	GST nvarchar(50) NULL,
	Logo varchar(100) Null,
	Landline varchar(15) Null,
	Website varchar(50) Null,
	AccountNumber varchar(15) Null,
	Branchname varchar(20) Null,
	Bankname varchar(20) Null,
	Ifsc varchar(15) Null
);

CREATE TABLE Customer(
	ID int AUTO_INCREMENT primary key,
	Name varchar(20) not null,
	Address varchar(50) NULL,
	Mobile varchar(10) NULL,
	GST varchar(15) NULL,
	Email varchar(50) NULL,
	Comments varchar(50) NULL,
	owner_email varchar(50) references personalinformation(Email),
	created_date timestamp default current_timestamp,
	modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
	ON UPDATE CURRENT_TIMESTAMP   
);

CREATE TABLE Invoice(
	ID int AUTO_INCREMENT primary key,
	Name varchar(20) not null,
	Address varchar(50) NULL,
	Mobile varchar(10) NULL,
	GST varchar(15) NULL,
	Email varchar(50) NULL,
	Comments varchar(50) NULL,
	owner_email varchar(50) references personalinformation(Email),
	created_date timestamp default current_timestamp,
	modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
	ON UPDATE CURRENT_TIMESTAMP   
);

CREATE TABLE Invoice_Product(
	ID int AUTO_INCREMENT primary key,
	Description varchar(50) not null,
	Rate varchar(10) NULL,
	Quantity varchar(3) NULL,
	Price varchar(10) NULL,
	Email varchar(50) NULL,
	Comments varchar(50) NULL,
	Invoice_Number bigint(20) references Invoice(ID),
	created_date timestamp default current_timestamp,
	modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
	ON UPDATE CURRENT_TIMESTAMP   
);