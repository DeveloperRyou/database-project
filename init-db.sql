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

CREATE TABLE IF NOT EXISTS `importance` (
  `importance_id` int(11) NOT NULL AUTO_INCREMENT,
  `value` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`importance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `article` (
  `article_id` int(11) NOT NULL AUTO_INCREMENT,
  `writer_id` int(11) NOT NULL,
  `importance_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `like_count` int(11) NOT NULL DEFAULT 0,
  `view_count` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_article_writer` FOREIGN KEY (`writer_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_article_importance` FOREIGN KEY (`importance_id`) REFERENCES `importance` (`importance_id`) ON DELETE RESTRICT,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `writer_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `importance_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `like_count` int(11) NOT NULL DEFAULT 0,
  `view_count` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_comment_writer` FOREIGN KEY (`writer_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_comment_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_comment_importance` FOREIGN KEY (`importance_id`) REFERENCES `importance` (`importance_id`) ON DELETE RESTRICT,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `like_article_relation` (
  `user_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  CONSTRAINT `fk_like_article_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_like_article_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE RESTRICT,
  PRIMARY KEY (`user_id`, `article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `like_comment_relation` (
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  CONSTRAINT `fk_like_comment_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_like_comment_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE RESTRICT,
  PRIMARY KEY (`user_id`, `comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
