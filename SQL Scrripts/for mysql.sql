create database if not exists Adrominds_invoice;
USE Adrominds_invoice;

CREATE TABLE login(
	ID int AUTO_INCREMENT primary key,
	Email nvarchar(50) NOT NULL unique,
	Password varchar(300) NOT NULL,
    Salt varchar(60) not null,
	Temp nvarchar(15) NULL,
    is_assistant bit default 0
 );

CREATE TABLE personalinformation(
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

CREATE TABLE customer(
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
	ON UPDATE CURRENT_TIMESTAMP,
	unique (Name)
);

CREATE TABLE invoice(
	ID int AUTO_INCREMENT primary key,
	InvoiceId bigint(20) not null,
	Name varchar(20) not null,
	DeliveryNotes varchar(50) NULL,
	BuyerOrderNumber varchar(15) NULL,
	VehicleNumber varchar(15) NOT NULL,
	otherNotes varchar(50) NULL,
	mode varchar(10) not null, 
	Dated date not null, 
	model varchar(40) not null,
	km int not null, 
	sgst int not null, 
	csgt int not null, 
	discount int null,
	discount_option varchar(4) null,
	amount decimal not null, 
	amountwithdiscount decimal not null,
	Email varchar(50) references personalinformation(Email),
	created_date timestamp default current_timestamp,
	modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
	ON UPDATE CURRENT_TIMESTAMP   
);

CREATE TABLE invoice_product(
	ID int AUTO_INCREMENT primary key,
	Description varchar(150) not null,
	Rate varchar(10) not null,
	Quantity varchar(3) not NULL,
	Price varchar(10) not NULL,
	Invoice_Number bigint(20) not null references InvoiceId(ID),
	created_date timestamp default current_timestamp,
	modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
	ON UPDATE CURRENT_TIMESTAMP   
);

CREATE TABLE expense(
	id int AUTO_INCREMENT primary key,	
	dated date not null, 
	category varchar(25) not null, 
	price decimal not null, 
	notes varchar(50) not null, 
	isactive bit default 1,
	owner_email varchar(50) references personalinformation(Email),
	created_date timestamp default current_timestamp,
	modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
	ON UPDATE CURRENT_TIMESTAMP   
);