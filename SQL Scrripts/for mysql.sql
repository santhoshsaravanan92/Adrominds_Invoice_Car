create database if not exists billingapi;
USE billingapi;

CREATE TABLE Login(
	ID int AUTO_INCREMENT primary key,
	Email nvarchar(50) NOT NULL unique,
	Password varchar(300) NOT NULL,
    Salt varchar(60) not null,
	Temp nvarchar(15) NULL,
    is_assistant bit default 0
 );
-- dummy data must insert
insert into login (email, password, temp) values('', '12345', 'dont delete');

CREATE TABLE PersonalInformation(
	ID int AUTO_INCREMENT primary key,
	Name varchar(50) NOT NULL,
	Company varchar(150) NOT NULL,
	Email varchar(50) NOT NULL,
	Mobile varchar(10) NULL,
	Address nvarchar(500) NULL,
	GST nvarchar(50) NULL,
	Logo varchar(100) Null
);

select * from personalInformation;

CREATE TABLE  AssistantInformation (
ID int AUTO_iNCREMENT primary key,
MasterEmail varchar(50) NOT NULL,
UserName nvarchar(50) NOT NULL,
Password nvarchar(50) NOT NULL,
Salt varchar(60) not null,
IsDashboard_read bit NULL default 0,
IsDashboard_write bit NULL default 0,
IsDashboard_update bit NULL default 0,
IsDashboard_delete bit NULL default 0,
IsPlots_read bit NULL default 0,
IsPlots_write bit NULL default 0,
IsPlots_update bit NULL default 0,
IsPlots_delete bit NULL default 0,
IsExecutives_read bit NULL default 0,
IsExecutives_write bit NULL default 0,
IsExecutives_update bit NULL default 0,
IsExecutives_delete bit NULL default 0,
IsSales_read bit NULL default 0,
IsSales_write bit NULL default 0,
IsSales_update bit NULL default 0,
IsSales_delete bit NULL default 0,
IsReports_read bit NULL default 0,
IsReports_write bit NULL default 0,
IsReports_update bit NULL default 0,
IsReports_delete bit NULL default 0,
IsCustomers_read bit NULL default 0,
IsCustomers_write bit NULL default 0,
IsCustomers_update bit NULL default 0,
IsCustomers_delete bit NULL default 0
);
