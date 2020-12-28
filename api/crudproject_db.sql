-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 02, 2020 at 12:13 PM
-- Server version: 5.7.26
-- PHP Version: 7.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crudproject_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `your_name` varchar(50) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `date_of_birth` varchar(100) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id_user`, `your_name`, `gender`, `date_of_birth`, `email_address`, `password`, `created_at`) VALUES
(1, 'Ashish', 'male', '2012-09-02T13:21:34.708+05:30', 'ashish@gmail.com', '7b69ad8a8999d4ca7c42b8a729fb0ffd', '20-09-02 07:51:54'),
(2, 'sumit', 'male', '2012-09-02T13:41:17.123+05:30', 'sumit@gmail.com', '7225ff71e8821b24fd72b4c8fda95b9a', '20-09-02 08:11:34'),
(3, 'sumit', 'male', '2012-09-02T13:41:17.123+05:30', 'sumit2@gmail.com', '7225ff71e8821b24fd72b4c8fda95b9a', '20-09-02 08:11:34'),
(6, 'asd', 'male', '2012-09-02T13:41:17.123+05:30', 'sumit9@gmail.com', '7225ff71e8821b24fd72b4c8fda95b9a', '20-09-02 08:11:34'),
(7, 'sumit', 'male', '2012-09-02T13:41:17.123+05:30', 'sumit5@gmail.com', '7225ff71e8821b24fd72b4c8fda95b9a', '20-09-02 08:11:34');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
