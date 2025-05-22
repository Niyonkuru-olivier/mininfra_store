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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `reset_token_expires` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `resetToken` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jane@example.com','newPassword123','admin',NULL,'2025-04-29 13:52:20','','Jane Doe','Inactive'),(2,'oniyonkuru233@gmail.com','$2b$10$rKhGlKDFATlpVREK5yWMZ.1s3JDwPyEj2yVH.K5/3doDIgN9h3CFK','admin',NULL,'2025-04-29 17:26:04','','Konde Boy','Activated'),(4,'oniyonkuru44@gmail.com','$2b$10$Fvf494x5qqw6Ket7bU.ZbOAov6A6Kq/buyU9MppitfwR4MqMBfZDi','user',NULL,'2025-04-29 17:26:59','','Olivier Niyonkuru','Activated'),(7,'ishimwerosine1999@gmail.com','$2b$10$XCwJAAlU5K3JKY/0f.K4X.LEku2CTSeVT1d2/nZtr/ljaa6.bfPoK','user',NULL,'2025-04-30 17:38:36','','Rosine Ishimwe','Activate'),(8,'nayiturikitheophile42gmail.com','Da1wi2d$','user',NULL,'2025-04-30 17:41:58',NULL,'Theophile Nayituriki','Activate'),(9,'john@example.com','Da1wi2d$','user',NULL,'2025-05-01 10:30:00',NULL,'jado','Activated'),(11,'alain@example.com','hashedPassword123','user',NULL,'2025-05-01 14:12:15',NULL,'John',NULL),(12,'jule@example.com','hashedPassword123','admin',NULL,'2025-05-01 14:12:56',NULL,'John','Activated'),(13,'mukondoetienne96@gmail.com','mukondomaze','user',NULL,'2025-05-05 18:59:58','oa9e6i25','etienne','Activated');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
