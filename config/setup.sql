CREATE TABLE category(
    categoryID int PRIMARY KEY AUTO_INCREMENT,
    categName varchar(50)
);

CREATE TABLE product(
    productID int PRIMARY KEY AUTO_INCREMENT,
    productName varchar(255),
    productDesc text,
    productPrice decimal(10, 2),
    stockQuantity int,
    categoryID int,
    image varchar(255),
	supplier varchar(255),
	supplierStock int,
	portion varchar(50),
    supplierPrice decimal(10, 2),
    active boolean default 1,
    FOREIGN KEY (categoryID) REFERENCES category(categoryID) ON DELETE
    SET NULL
);

CREATE TABLE employee(
    email varchar(100) PRIMARY KEY,
    fName varchar(100) NOT NULL,
    lName varchar(100) NOT NULL,
    jobTitle varchar(50),
    phoneNumber varchar(10),
    empPassword binary(64),
    streetAddress varchar(100),
    city varchar(50),
    state varchar(50),
    zipcode varchar(20)
);

CREATE TABLE customer(
    email varchar(100) PRIMARY KEY,
    fName varchar(100) NOT NULL,
    lName varchar(100) NOT NULL,
    phoneNumber varchar(10),
    streetAddress varchar(100),
    city varchar(50),
    state varchar(50),
    zipcode varchar(20),
    password binary(64),
    active boolean default 1
);

CREATE TABLE membership(
    membershipID int PRIMARY KEY AUTO_INCREMENT,
    customerEmail varchar(100),
    membershipStatus boolean,
    startDate date,
    endDate date,
    renewalDate date,
    FOREIGN KEY (customerEmail) REFERENCES customer(email) ON DELETE CASCADE
);

-- CREATE TABLE mbshipPayment(
--     mbPaymentID int PRIMARY KEY AUTO_INCREMENT,
--     membershipID int,
--     amount decimal(10, 2),
--     paymentDate date,
--     paymentMethod varchar(50),
--     paymentStatus varchar(50),
--     startDate date,
--     endDate date,
--     autoRenewal boolean,
--     priorityShipping boolean,
--     FOREIGN KEY (membershipID) REFERENCES membership(membershipID) ON DELETE
--     SET NULL
-- );

CREATE TABLE purchaseOrder (
    orderID int PRIMARY KEY AUTO_INCREMENT,
    customerEmail varchar(100),
    orderDate date,
    total decimal(10, 2),
    FOREIGN KEY (customerEmail) REFERENCES customer(email) ON DELETE
    SET NULL
);

CREATE TABLE payment(
    paymentID int PRIMARY KEY AUTO_INCREMENT,
    orderID int,
    paymentDate date,
    totalAmount decimal(10, 2),
    paymentMethod varchar(50),
    paymentStatus varchar(50),
    FOREIGN KEY (orderID) REFERENCES purchaseOrder(orderID) ON DELETE
    SET NULL
);

CREATE TABLE paymentInfo(
    customerEmail varchar(100) PRIMARY KEY,
    cardtype varchar(50),
    cardnumber varchar(16),
    cvv INT,
    expiration DATE
);

CREATE TABLE orderLine(
    orderLineID int PRIMARY KEY AUTO_INCREMENT,
    orderID int,
    productID int,
    quantity int,
    unitPrice decimal(10, 2),
    subTotal decimal(10, 2),
    active boolean default 1,
    FOREIGN KEY (orderID) REFERENCES purchaseOrder(orderID) ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES product(productID) ON DELETE
    SET NULL ON UPDATE CASCADE
);

CREATE TABLE shipping(
    shippingID int PRIMARY KEY AUTO_INCREMENT,
    membershipID int,
    orderID int,
    paymentID int,
    cost decimal(6, 2),
    trackingNum varchar(20),
    -- carrier varchar(100),
    -- shippingDate date,
    estimatedDel date,
    -- actualDel date,
    shippingStatus varchar(50),
    FOREIGN KEY (membershipID) REFERENCES membership(membershipID) ON DELETE
    SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (orderID) REFERENCES purchaseOrder(orderID) ON DELETE CASCADE,
        FOREIGN KEY (paymentID) REFERENCES payment(paymentID) ON DELETE CASCADE
);

CREATE TABLE refund(
    refundID int PRIMARY KEY AUTO_INCREMENT,
    paymentID int,
    refundDate date,
    amount decimal(10, 2),
    refundMethod varchar(50),
    refundStatus varchar(50),
    FOREIGN KEY (paymentID) REFERENCES payment(paymentID) ON DELETE CASCADE
);

CREATE TABLE supplier(
    supplierID int PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    phoneNumber varchar(10),
    streetAddress varchar(100),
    city varchar(50),
    state varchar(50),
    zipcode varchar(20)
);

CREATE TABLE inventory(
    inventoryID int PRIMARY KEY AUTO_INCREMENT,
    productID int,
    supplierID int,
    quantity int,
    purchasePrice decimal(10, 2),
    retailPrice decimal(10, 2),
    FOREIGN KEY (productID) REFERENCES product(productID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (supplierID) REFERENCES supplier(supplierID) ON DELETE
    SET NULL ON UPDATE CASCADE
);

CREATE TABLE totalInventory(
    totalInventoryID int PRIMARY KEY AUTO_INCREMENT,
    inventoryValue decimal(10, 2),
    inventoryQuantity int,
    totalValueChange decimal(10, 2),
    totalQuantityChange int
);

CREATE TABLE notifications (
    notificationID int PRIMARY KEY AUTO_INCREMENT,
    message varchar(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE nutritionFacts(
    productID int,
    servingSize varchar(100),
    servingsPerContainer varchar(100),
    calories int,
    totalFat varchar(100),
    cholesterol varchar(100),
    sodium varchar(100),
    totalCarbohydrates varchar(100),
    dietaryFiber varchar(100),
    sugars varchar(100),
    protein varchar(100),
    potassium varchar(100),
    vitaminA varchar(100),
    vitaminC varchar(100),
    vitaminD varchar(100),
    vitaminE varchar(100),
    calcium varchar(100),
    iron varchar(100),
    FOREIGN KEY (productID) REFERENCES product(productID) ON DELETE CASCADE
);

CREATE TABLE shippingDetails(
    productID int,
    dimensionsLength varchar(100),
    dimensionsWidth varchar(100),
    dimensionsHeight varchar(100),
    weight varchar(100),
    FOREIGN KEY (productID) REFERENCES product(productID) ON DELETE CASCADE
);
