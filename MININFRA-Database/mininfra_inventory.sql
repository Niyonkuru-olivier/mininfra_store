-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mininfra
-- ------------------------------------------------------
-- Server version	8.4.4

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
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `condition` enum('Fair','Good','Very Good') DEFAULT NULL,
  `qtyIn` int DEFAULT NULL,
  `qtyOut` int DEFAULT NULL,
  `balanceQty` int DEFAULT NULL,
  `unitPrice` decimal(10,2) DEFAULT NULL,
  `totalPrice` decimal(12,2) DEFAULT NULL,
  `threshold` int DEFAULT '5',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'INV001','Printer','HP LaserJet Printer','Good',146,45,101,125.00,18250.00,5),(2,'INV002','igisheke','wwwwwww','Good',51,20,31,130.00,6630.00,5),(3,'INV003','ikijumba ','hhhhhhhhhhh','Good',12,1,11,100.00,1200.00,5),(4,'INV004','Ikirayi','used for Lunch','Good',100,100,0,750.00,75000.00,5),(5,'INV005','Pen','pen used in office','Very Good',100,40,60,100.00,10000.00,5),(6,'INV006','Telephone','Telephone used in Bureau','Good',4,0,4,20000.00,80000.00,3),(7,'INV007','Mouse','Mouse used for replace the old ones','Good',0,0,0,100.00,0.00,5),(8,'INV008','Bic','Bic (Pen)','Good',0,0,0,100.00,0.00,5),(9,'INV009','Paints','Paints for prepare the office','Good',0,0,0,1000.00,0.00,5),(10,'INV0010','Cup Tea','Cup Tea for Milk, Coffee and Porridge','Good',0,0,0,100.00,0.00,5),(11,'INV0011','sugar','Sugar for tea','Good',1,0,1,100.00,100.00,5),(12,'INV0012','Battery','Battery for charging a Computer','Good',0,0,0,500.00,0.00,5),(13,'INV0013','coffee','coffee','Good',0,0,0,300.00,0.00,5),(19,'INV0014','Printer1','HP LaserJet Printer1','Fair',0,0,0,125.00,0.00,5),(20,'INV0020','Cartouche','Cartouche 312 A cyan, Magenta, yellow, black','Good',100,20,80,1000.00,100000.00,5),(21,'INV0021','Sports T-shirt','T-shirt for Sports','Good',0,0,0,2000.00,0.00,5);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22 19:33:53
