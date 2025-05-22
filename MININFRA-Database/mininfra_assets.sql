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
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `sku` varchar(50) NOT NULL,
  `condition` enum('Fair','Good','Very Good') NOT NULL,
  `qty_in` int NOT NULL DEFAULT '0',
  `qty_out` int NOT NULL DEFAULT '0',
  `balance_qty` int GENERATED ALWAYS AS ((`qty_in` - `qty_out`)) STORED,
  `unit_price` decimal(10,2) DEFAULT '0.00',
  `total_price` decimal(10,2) GENERATED ALWAYS AS ((`qty_in` * `unit_price`)) STORED,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `threshold` int DEFAULT '5',
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`number`),
  UNIQUE KEY `sku` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
INSERT INTO `assets` (`id`, `number`, `name`, `description`, `sku`, `condition`, `qty_in`, `qty_out`, `unit_price`, `created_at`, `updated_at`, `threshold`) VALUES (1,'A-1005','HDMI Cable','High quality HDMI cable','HDMI-0001','Very Good',75,25,10.00,'2025-05-01 17:08:14','2025-05-14 07:27:24',5),(2,'AST002664','igisheke','hhhhhhhhhhhhhhh','vvvvvvvvvv','Fair',11,1,1200.00,'2025-05-02 09:35:22','2025-05-05 18:14:34',5),(6,'AST006748','ikijumba','hhhhhhhhhhhh','111111111111','Fair',16,1,0.00,'2025-05-02 09:38:26','2025-05-15 10:04:53',5),(7,'AST002909','Machine','Machine using in bureau','MA-123','Fair',10,0,0.00,'2025-05-02 09:45:02','2025-05-15 12:17:46',5),(8,'A-100','Cable','High quality HDMI cable','0001','Good',160,5,10.00,'2025-05-02 10:56:06','2025-05-05 18:14:19',5),(9,'AST003473','telephone','222222222222','telephone','Very Good',6,0,100.00,'2025-05-02 10:57:13','2025-05-16 10:07:04',5),(10,'AST003798','hello','hello','hello','Fair',0,0,0.00,'2025-05-02 11:31:53','2025-05-02 11:31:53',5),(11,'AST001723','Bottle','nnnnnnnnnnnnnnnnnnn','bbbbbbbbb','Fair',0,0,0.00,'2025-05-05 15:12:41','2025-05-05 15:12:41',5),(13,'AST009612','plug','High quality HDMI cable','000100','Good',60,0,10.00,'2025-05-07 12:53:49','2025-05-07 12:53:49',5),(14,'AST009548','Cup-board','used for storing different things in the office','cup-board','Good',0,0,100.00,'2025-05-07 13:03:49','2025-05-07 13:03:49',5),(15,'AST006924','Chair','Chair for office','Chair','Good',0,0,1000.00,'2025-05-13 11:36:16','2025-05-13 11:36:16',5),(16,'AST008530','Bag','Bag used by packing the important things','bag','Good',0,0,300.00,'2025-05-14 07:08:18','2025-05-14 07:08:18',5),(19,'AST008380','printer','printer','printer','Fair',0,0,15000.00,'2025-05-14 08:38:58','2025-05-14 08:38:58',5),(20,'AST009724','Agraffeuse','Agraffeuse','Agra-111','Fair',0,0,100.00,'2025-05-15 09:16:09','2025-05-15 09:16:09',5);
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22 19:33:52
