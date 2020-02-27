-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2020 at 04:24 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assets_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `last_ping_time` float DEFAULT NULL,
  `purchase_cost` decimal(10,0) NOT NULL,
  `origin` varchar(100) NOT NULL,
  `category` varchar(25) DEFAULT NULL,
  `owner_name` varchar(100) DEFAULT NULL,
  `owner_address` varchar(250) DEFAULT NULL,
  `owner_date_recieved` varchar(100) DEFAULT NULL,
  `owner_date_return` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `display_name`, `location`, `last_ping_time`, `purchase_cost`, `origin`, `category`, `owner_name`, `owner_address`, `owner_date_recieved`, `owner_date_return`) VALUES
(1, 'Item Has Return', NULL, NULL, '8', 'New Cross Hospital', 'Unknown', 'David Schwimmer', 'Great Russell St, Bloomsbury, London WC1B 3DG', '2020-02-20 12:00', '2020-06-20 14:00'),
(3, 'Walking Stick', NULL, NULL, '6', 'New Cross Hospital', 'Unknown', NULL, NULL, NULL, NULL),
(5, 'Item No Return', NULL, NULL, '10', 'New Cross Hospital', 'Unknown', 'John Smith', 'Studio Tour Dr, Leavesden, Watford , Greater London, WD25 7LR', '2020-02-11', NULL),
(10, 'Catheter', NULL, NULL, '11', 'Russells Hall Hospital', 'Unknown', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=494;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
