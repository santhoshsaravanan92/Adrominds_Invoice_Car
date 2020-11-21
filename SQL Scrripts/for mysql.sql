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
