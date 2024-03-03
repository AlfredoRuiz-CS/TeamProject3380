CREATE DATABASE  IF NOT EXISTS `anothertest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `anothertest`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: anothertest
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryID` int NOT NULL,
  `categName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerprofile`
--

DROP TABLE IF EXISTS `customerprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerprofile` (
  `customerID` int NOT NULL,
  `cusName` varchar(200) DEFAULT NULL,
  `cusEmail` varchar(100) DEFAULT NULL,
  `cusPhone` int DEFAULT NULL,
  `cusAddress` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerprofile`
--

LOCK TABLES `customerprofile` WRITE;
/*!40000 ALTER TABLE `customerprofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `customerprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `empID` int NOT NULL,
  `empName` varchar(100) DEFAULT NULL,
  `jobTitle` varchar(50) DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL,
  `empEmail` varchar(100) DEFAULT NULL,
  `empPassword` binary(5) DEFAULT NULL,
  PRIMARY KEY (`empID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `inventoryID` int NOT NULL,
  `productID` int DEFAULT NULL,
  `supplierID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `purchasePrice` decimal(10,2) DEFAULT NULL,
  `retailPrice` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`inventoryID`),
  KEY `productID` (`productID`),
  KEY `supplierID` (`supplierID`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`supplierID`) REFERENCES `supplier` (`supplierID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mbshippayment`
--

DROP TABLE IF EXISTS `mbshippayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mbshippayment` (
  `mbPaymentID` int NOT NULL,
  `membershipID` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `paymentDate` date DEFAULT NULL,
  `paymentMethod` varchar(50) DEFAULT NULL,
  `paymentStatus` varchar(50) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `autoRenewal` tinyint(1) DEFAULT NULL,
  `priorityShipping` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`mbPaymentID`),
  KEY `membershipID` (`membershipID`),
  CONSTRAINT `mbshippayment_ibfk_1` FOREIGN KEY (`membershipID`) REFERENCES `membership` (`membershipID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mbshippayment`
--

LOCK TABLES `mbshippayment` WRITE;
/*!40000 ALTER TABLE `mbshippayment` DISABLE KEYS */;
/*!40000 ALTER TABLE `mbshippayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership`
--

DROP TABLE IF EXISTS `membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membership` (
  `membershipID` int NOT NULL,
  `customerID` int DEFAULT NULL,
  `membershipType` varchar(50) DEFAULT NULL,
  `membershipStatus` varchar(50) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `renewalDate` date DEFAULT NULL,
  PRIMARY KEY (`membershipID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `membership_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customerprofile` (`customerID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership`
--

LOCK TABLES `membership` WRITE;
/*!40000 ALTER TABLE `membership` DISABLE KEYS */;
/*!40000 ALTER TABLE `membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderline`
--

DROP TABLE IF EXISTS `orderline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderline` (
  `orderLineID` int NOT NULL,
  `orderID` int DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unitPrice` decimal(10,2) DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  `totalAmount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`orderLineID`),
  KEY `orderID` (`orderID`),
  KEY `productID` (`productID`),
  CONSTRAINT `orderline_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `purchaseorder` (`orderID`) ON DELETE CASCADE,
  CONSTRAINT `orderline_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderline`
--

LOCK TABLES `orderline` WRITE;
/*!40000 ALTER TABLE `orderline` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `paymentID` int NOT NULL,
  `orderID` int DEFAULT NULL,
  `paymentDate` date DEFAULT NULL,
  `expeditedShipping` tinyint(1) DEFAULT NULL,
  `totalAmount` decimal(10,2) DEFAULT NULL,
  `paymentMethod` varchar(50) DEFAULT NULL,
  `paymentStatus` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`paymentID`),
  KEY `orderID` (`orderID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `purchaseorder` (`orderID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productID` int NOT NULL,
  `productName` varchar(50) DEFAULT NULL,
  `productDesc` varchar(100) DEFAULT NULL,
  `productPrice` int DEFAULT NULL,
  `stockQuantity` int DEFAULT NULL,
  `categoryID` int DEFAULT NULL,
  PRIMARY KEY (`productID`),
  KEY `categoryID` (`categoryID`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchaseorder`
--

DROP TABLE IF EXISTS `purchaseorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchaseorder` (
  `orderID` int NOT NULL,
  `customerID` int DEFAULT NULL,
  `orderDate` date DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  `totalAmount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `purchaseorder_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customerprofile` (`customerID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseorder`
--

LOCK TABLES `purchaseorder` WRITE;
/*!40000 ALTER TABLE `purchaseorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchaseorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refund`
--

DROP TABLE IF EXISTS `refund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refund` (
  `refundID` int NOT NULL,
  `paymentID` int DEFAULT NULL,
  `refundDate` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `refundMethod` varchar(50) DEFAULT NULL,
  `refundStatus` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`refundID`),
  KEY `paymentID` (`paymentID`),
  CONSTRAINT `refund_ibfk_1` FOREIGN KEY (`paymentID`) REFERENCES `payment` (`paymentID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refund`
--

LOCK TABLES `refund` WRITE;
/*!40000 ALTER TABLE `refund` DISABLE KEYS */;
/*!40000 ALTER TABLE `refund` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping`
--

DROP TABLE IF EXISTS `shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping` (
  `shippingID` int NOT NULL,
  `membershipID` int DEFAULT NULL,
  `orderID` int DEFAULT NULL,
  `paymentID` int DEFAULT NULL,
  `cost` decimal(6,2) DEFAULT NULL,
  `trackingNum` int DEFAULT NULL,
  `carrier` varchar(100) DEFAULT NULL,
  `shippingDate` date DEFAULT NULL,
  `estimatedDel` date DEFAULT NULL,
  `actualDel` date DEFAULT NULL,
  `shippingStatus` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`shippingID`),
  KEY `membershipID` (`membershipID`),
  KEY `orderID` (`orderID`),
  KEY `paymentID` (`paymentID`),
  CONSTRAINT `shipping_ibfk_1` FOREIGN KEY (`membershipID`) REFERENCES `membership` (`membershipID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `shipping_ibfk_2` FOREIGN KEY (`orderID`) REFERENCES `purchaseorder` (`orderID`) ON DELETE CASCADE,
  CONSTRAINT `shipping_ibfk_3` FOREIGN KEY (`paymentID`) REFERENCES `payment` (`paymentID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping`
--

LOCK TABLES `shipping` WRITE;
/*!40000 ALTER TABLE `shipping` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `supplierID` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phoneNum` int DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`supplierID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `totalinventory`
--

DROP TABLE IF EXISTS `totalinventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `totalinventory` (
  `totalInventoryID` int NOT NULL,
  `inventoryValue` decimal(10,2) DEFAULT NULL,
  `inventoryQuantity` int DEFAULT NULL,
  `totalValueChange` decimal(10,2) DEFAULT NULL,
  `totalQuantityChange` int DEFAULT NULL,
  PRIMARY KEY (`totalInventoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `totalinventory`
--

LOCK TABLES `totalinventory` WRITE;
/*!40000 ALTER TABLE `totalinventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `totalinventory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-02  1:06:50
