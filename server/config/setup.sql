DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS membership;
DROP TABLE IF EXISTS mbshipPayment;
DROP TABLE IF EXISTS purchaseOrder;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS orderLine;
DROP TABLE IF EXISTS shipping;
DROP TABLE IF EXISTS refund;
DROP TABLE IF EXISTS supplier;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS totalInventory;

-- @block
CREATE TABLE category(
	categoryID int PRIMARY KEY AUTO_INCREMENT,
    categName varchar(50)
);

-- @block
CREATE TABLE product(
	productID int PRIMARY KEY AUTO_INCREMENT,
    productName varchar(50),
    productDesc varchar(100),
    productPrice decimal(10,2),
    stockQuantity int,
    categoryID int,
    FOREIGN KEY (categoryID) REFERENCES category(categoryID)
	ON DELETE SET NULL
);

-- @block
CREATE TABLE employee(
	empID int PRIMARY KEY AUTO_INCREMENT,
    fname varchar(100) NOT NULL,
    lName varchar(100) NOT NULL,
    jobTitle varchar(50),
    phoneNumber varchar(10),
    empEmail varchar(100),
    empPassword binary(64)
);

-- @block
CREATE TABLE customer(
	customerID int PRIMARY KEY AUTO_INCREMENT,
    fName varchar(100) NOT NULL,
    lName varchar(100) NOT NULL,
    email varchar(100),
    phoneNumber varchar(10),
    streetAddress varchar(100),
    city varchar(50),
    state varchar(50),
    zipcode varchar(20)
);
-- @block
CREATE TABLE membership(
	membershipID int PRIMARY KEY AUTO_INCREMENT,
    customerID int,
    membershipType varchar(50),
    membershipStatus varchar(50),
    startDate date,
    endDate date,
    renewalDate date,
    FOREIGN KEY (customerID) REFERENCES customer(customerID)
    ON DELETE CASCADE
);

-- @block
CREATE TABLE mbshipPayment(
	mbPaymentID int PRIMARY KEY AUTO_INCREMENT,
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

-- @block
CREATE TABLE purchaseOrder (
	orderID int PRIMARY KEY AUTO_INCREMENT,
    customerID int,
    orderDate date,
    tax decimal(10,2),
    totalAmount decimal(10,2),
    FOREIGN KEY (customerID) REFERENCES customer(customerID)
    ON DELETE SET NULL
);

-- @block
CREATE TABLE payment(
	paymentID int PRIMARY KEY AUTO_INCREMENT,
    orderID int,
    paymentDate date,
    expeditedShipping boolean,
    totalAmount decimal(10,2),
    paymentMethod varchar(50),
    paymentStatus varchar(50),
    FOREIGN KEY (orderID) REFERENCES purchaseOrder(orderID)
    ON DELETE SET NULL
);

-- @block
CREATE TABLE orderLine(
	orderLineID int PRIMARY KEY AUTO_INCREMENT,
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

-- @block
CREATE TABLE shipping(
	shippingID int PRIMARY KEY AUTO_INCREMENT,
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

-- @block
CREATE TABLE refund(
	refundID int PRIMARY KEY AUTO_INCREMENT,
    paymentID int,
    refundDate date,
    amount decimal(10,2),
    refundMethod varchar(50),
    refundStatus varchar(50),
    FOREIGN KEY (paymentID) REFERENCES payment(paymentID)
    ON DELETE CASCADE
);

-- @block
CREATE TABLE supplier(
	supplierID int PRIMARY KEY AUTO_INCREMENT,
    fName varchar(100) NOT NULL,
    lName varchar(100) NOT NULL,
    phoneNumber varchar(10),
    streetAddress varchar(100),
    city varchar(50),
    state varchar(50),
    zipcode varchar(20)
);

-- @block
CREATE TABLE inventory(
	inventoryID int PRIMARY KEY AUTO_INCREMENT,
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

-- @block
CREATE TABLE totalInventory(
	totalInventoryID int PRIMARY KEY AUTO_INCREMENT,
    inventoryValue decimal(10,2),
    inventoryQuantity int,
    totalValueChange decimal(10,2),
    totalQuantityChange int
);