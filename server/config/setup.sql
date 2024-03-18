-- Use POS;
CREATE TABLE category(
	categoryID int PRIMARY KEY,
    categName varchar(50)
);

CREATE TABLE product(
	productID int,
    productName varchar(50),
    productDesc varchar(100),
    productPrice int,
    stockQuantity int,
    categoryID int,
    PRIMARY KEY (productID),
    FOREIGN KEY (categoryID) REFERENCES category(categoryID)
	ON DELETE SET NULL
);

CREATE TABLE employee(
	empID int primary key,
    empName varchar(100),
    jobTitle varchar(50),
    phoneNumber int,
    empEmail varchar(100),
    empPassword binary(5)
);

CREATE TABLE customerProfile(
	customerID int PRIMARY KEY,
    cusName varchar(200),
    cusEmail varchar(100),
    cusPhone int,
    cusAddress varchar(200)
);

CREATE TABLE membership(
	membershipID int PRIMARY KEY,
    customerID int,
    membershipType varchar(50),
    membershipStatus varchar(50),
    startDate date,
    endDate date,
    renewalDate date,
    FOREIGN KEY (customerID) REFERENCES customerProfile(customerID)
    ON DELETE CASCADE
);

CREATE TABLE mbshipPayment(
	mbPaymentID int PRIMARY KEY,
    membershipID int,
    amount decimal(10,2),
    paymentDate date,
    paymentMethod varchar(50),
    paymentStatus varchar(50),
    startDate date,
    endDate date,
    autoRenewal boolean,
    priorityShipping boolean,
    FOREIGN KEY (membershipID) REFERENCES membership(membershipID)
    ON DELETE SET NULL
);

CREATE TABLE purchaseOrder (
	orderID int PRIMARY KEY,
    customerID int,
    orderDate date,
    tax decimal(10,2),
    totalAmount decimal(10,2),
    FOREIGN KEY (customerID) REFERENCES customerProfile(customerID)
    ON DELETE SET NULL
);

CREATE TABLE payment(
	paymentID int PRIMARY KEY,
    orderID int,
    paymentDate date,
    expeditedShipping boolean,
    totalAmount decimal(10,2),
    paymentMethod varchar(50),
    paymentStatus varchar(50),
    FOREIGN KEY (orderID) REFERENCES purchaseOrder(orderID)
    ON DELETE SET NULL
);

CREATE TABLE orderLine(
	orderLineID int PRIMARY KEY,
    orderID int,
    productID int,
    quantity int,
    unitPrice decimal(10,2),
    tax decimal(10,2),
    totalAmount decimal(10,2),
    FOREIGN KEY (orderID) REFERENCES purchaseOrder(orderID)
    ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES product(productID)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE shipping(
	shippingID int PRIMARY KEY,
    membershipID int,
    orderID int,
    paymentID int,
    cost decimal(6,2),
    trackingNum int,
    carrier varchar(100),
    shippingDate date,
    estimatedDel date,
    actualDel date,
    shippingStatus varchar(50),
    FOREIGN KEY (membershipID) REFERENCES membership(membershipID)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    FOREIGN KEY (orderID) REFERENCES purchaseOrder(orderID)
    ON DELETE CASCADE,
    FOREIGN KEY (paymentID) REFERENCES payment(paymentID)
    ON DELETE CASCADE
);

CREATE TABLE refund(
	refundID int PRIMARY KEY,
    paymentID int,
    refundDate date,
    amount decimal(10,2),
    refundMethod varchar(50),
    refundStatus varchar(50),
    FOREIGN KEY (paymentID) REFERENCES payment(paymentID)
    ON DELETE CASCADE
);

CREATE TABLE supplier(
	supplierID int PRIMARY KEY,
    name varchar(100),
    phoneNum int,
    address varchar(200)
);

CREATE TABLE inventory(
	inventoryID int PRIMARY KEY,
    productID int,
    supplierID int,
    quantity int,
    purchasePrice decimal(10,2),
    retailPrice decimal(10,2),
    FOREIGN KEY (productID) REFERENCES product(productID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (supplierID) REFERENCES supplier(supplierID)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE totalInventory(
	totalInventoryID int,
    inventoryValue decimal(10,2),
    inventoryQuantity int,
    totalValueChange decimal(10,2),
    totalQuantityChange int,
    PRIMARY KEY(totalInventoryID)
);