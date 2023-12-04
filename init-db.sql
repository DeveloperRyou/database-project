CREATE DATABASE IF NOT EXISTS `database_project_202302`;
USE `database_project_202302`;

-- users 테이블 생성
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `type` int(11) DEFAULT 0,
  `birth` datetime DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

INSERT INTO `users` (`user_id`, `email_id`, `password`, `name`, `type`, `birth`, `sex`, `address`, `phone`) VALUES
	(1, 'admin', 'admin', '관리자계정', 1, NULL, NULL, NULL, NULL),
	(2, 'user1', '1234', 'user계정1', 0, NULL, NULL, NULL, NULL),
	(3, 'user2', '1234', 'user계정2', 0, NULL, NULL, NULL, NULL),
	(4, 'user3', '1234', 'user계정3', 0, NULL, NULL, NULL, NULL),
	(5, 'user4', '1234', 'user계정4', 0, NULL, NULL, NULL, NULL),
	(6, 'user5', '1234', 'user계정5', 0, NULL, NULL, NULL, NULL);
