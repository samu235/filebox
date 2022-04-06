CREATE DATABASE  IF NOT EXISTS `filebox` ;
USE `filebox`;





CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(45) NOT NULL,
  `pass` varchar(124) DEFAULT NULL,
  `typeuser` int(11) DEFAULT NULL,
  `mail` varchar(244) DEFAULT NULL,
  `idSesion` varchar(45) DEFAULT NULL,
  `lastSesion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_UNIQUE` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

LOCK TABLES `user` WRITE;

UNLOCK TABLES;