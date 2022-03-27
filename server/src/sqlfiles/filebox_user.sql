CREATE DATABASE  IF NOT EXISTS `filebox` ;
USE `filebox`;


DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` varchar(45) NOT NULL,
  `pass` varchar(124) DEFAULT NULL,
  `typeuser` int(11) DEFAULT NULL,
  `mail` varchar(244) DEFAULT NULL,
  `idSesion` varchar(45) DEFAULT NULL,
  `lastSesion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user` WRITE;

UNLOCK TABLES;
