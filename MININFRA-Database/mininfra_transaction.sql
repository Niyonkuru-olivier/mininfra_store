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
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `itemId` int NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `type` enum('add','remove','update') NOT NULL,
  `quantity` int NOT NULL,
  `user` varchar(255) NOT NULL,
  `reason` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'2025-05-08 02:03:49',14,'Cup-board','add',0,'admin@example.com','Asset added'),(2,'2025-05-08 02:04:56',7,'Mouse','add',0,'admin@example.com','Inventory created'),(3,'2025-05-08 02:06:21',1,'HDMI Cable','update',55,'admin@example.com','Asset updated'),(4,'2025-05-08 02:07:28',2,'igisheke','update',50,'admin@example.com','Inventory updated'),(5,'2025-05-08 02:12:29',3,'ikijumba ','update',0,'admin@example.com','Inventory updated'),(6,'2025-05-08 03:43:46',1,'HDMI Cable','update',55,'admin@example.com','Asset updated'),(7,'2025-05-09 00:14:42',2,'igisheke','update',50,'admin@example.com','Inventory updated'),(8,'2025-05-09 02:21:19',8,'Bic','add',0,'admin@example.com','Inventory created'),(9,'2025-05-10 01:38:38',1,'HDMI Cable','update',65,'admin@example.com','Asset updated'),(10,'2025-05-12 02:00:06',9,'Paints','add',0,'admin@example.com','Inventory created'),(11,'2025-05-14 00:36:16',15,'Chair','add',0,'admin@example.com','Asset added'),(12,'2025-05-14 00:37:34',10,'Cup Tea','add',0,'admin@example.com','Inventory created'),(13,'2025-05-14 03:29:23',11,'sugar','add',1,'admin@example.com','Inventory created'),(14,'2025-05-14 03:31:01',3,'ikijumba ','update',2,'admin@example.com','Inventory updated'),(15,'2025-05-14 07:42:09',1,'Printer','update',45,'admin@example.com','Inventory updated'),(16,'2025-05-14 20:06:12',12,'Battery','add',0,'admin@example.com','Inventory created'),(17,'2025-05-14 20:08:18',16,'Bag','add',0,'admin@example.com','Asset added'),(18,'2025-05-14 20:08:56',9,'telephone','update',0,'admin@example.com','Asset updated'),(19,'2025-05-14 20:19:11',12,'Battery','update',0,'admin@example.com','Inventory updated'),(20,'2025-05-14 20:27:01',1,'HDMI Cable','update',75,'admin@example.com','Asset updated'),(21,'2025-05-14 20:27:24',1,'HDMI Cable','update',75,'admin@example.com','Asset updated'),(22,'2025-05-14 20:27:55',1,'Printer','update',145,'admin@example.com','Inventory updated'),(23,'2025-05-14 21:38:58',19,'printer','add',0,'admin@example.com','Asset added'),(24,'2025-05-14 21:39:47',13,'coffee','add',0,'admin@example.com','Inventory created'),(25,'2025-05-14 21:40:23',13,'coffee','update',0,'admin@example.com','Inventory updated'),(26,'2025-05-15 06:20:47',1,'Printer','update',146,'admin@example.com','Inventory updated'),(27,'2025-05-15 20:31:44',19,'Printer1','add',0,'admin@example.com','Inventory created'),(28,'2025-05-15 20:52:52',20,'Cartouche','add',0,'admin@example.com','Inventory created'),(29,'2025-05-15 20:53:21',1,'Printer','update',146,'admin@example.com','Inventory updated'),(30,'2025-05-15 20:54:12',20,'Cartouche','update',100,'admin@example.com','Inventory updated'),(31,'2025-05-15 20:54:28',20,'Cartouche','update',100,'admin@example.com','Inventory updated'),(32,'2025-05-15 21:54:08',6,'Telephone','update',4,'admin@example.com','Inventory updated'),(33,'2025-05-15 21:54:31',3,'ikijumba ','update',2,'admin@example.com','Inventory updated'),(34,'2025-05-15 22:01:14',2,'igisheke','update',50,'admin@example.com','Inventory updated'),(35,'2025-05-15 22:01:46',2,'igisheke','update',50,'admin@example.com','Inventory updated'),(36,'2025-05-15 22:16:09',20,'Agraffeuse','add',0,'admin@example.com','Asset added'),(37,'2025-05-15 22:40:03',6,'ikijumba','update',6,'admin@example.com','Asset updated'),(38,'2025-05-15 22:40:20',6,'ikijumba','update',6,'admin@example.com','Asset updated'),(39,'2025-05-15 22:41:14',6,'ikijumba','update',6,'admin@example.com','Asset updated'),(40,'2025-05-15 22:41:32',6,'ikijumba','update',6,'admin@example.com','Asset updated'),(41,'2025-05-15 22:48:00',2,'igisheke','update',50,'admin@example.com','Inventory updated'),(42,'2025-05-15 22:48:09',2,'igisheke','update',50,'admin@example.com','Inventory updated'),(43,'2025-05-15 22:48:28',2,'igisheke','update',11,'admin@example.com','Asset updated'),(44,'2025-05-15 22:48:45',2,'igisheke','update',11,'admin@example.com','Asset updated'),(45,'2025-05-15 22:52:09',3,'ikijumba ','update',2,'admin@example.com','Inventory updated'),(46,'2025-05-15 22:57:28',6,'ikijumba','update',6,'admin@example.com','Asset updated'),(47,'2025-05-15 23:04:53',6,'ikijumba','update',16,'admin@example.com','Asset updated'),(48,'2025-05-16 00:24:02',2,'igisheke','update',51,'admin@example.com','Inventory updated'),(49,'2025-05-16 01:17:46',7,'Machine','update',10,'admin@example.com','Asset updated'),(50,'2025-05-16 23:06:48',9,'telephone','update',5,'admin@example.com','Asset updated'),(51,'2025-05-16 23:07:04',9,'telephone','update',6,'admin@example.com','Asset updated'),(52,'2025-05-22 02:57:20',3,'ikijumba ','update',12,'admin@example.com','Inventory updated'),(53,'2025-05-22 02:58:29',21,'Sports T-shirt','add',0,'admin@example.com','Inventory created');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
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
