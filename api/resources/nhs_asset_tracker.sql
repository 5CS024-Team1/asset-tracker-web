-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2020 at 11:34 AM
-- Server version: 10.4.11-MariaDB
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
-- Database: `nhs_asset_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `Dept_ID` int(3) NOT NULL,
  `Dept_Name` varchar(15) NOT NULL,
  `Hosp_ID` varchar(10) NOT NULL,
  `Hosp_Floor` varchar(2) NOT NULL,
  `Hosp_Ward` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`Dept_ID`, `Dept_Name`, `Hosp_ID`, `Hosp_Floor`, `Hosp_Ward`) VALUES
(1, 'Neurology', '1', '2', '2B'),
(2, 'Cardiology', '2', '3', '3A'),
(3, 'ICU', '3', '1', '1A'),
(4, 'Oncology', '4', '2', '2A');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `Equi_ID` varchar(15) NOT NULL,
  `Equi_Barcode` varchar(12) NOT NULL,
  `Equi_Name` varchar(20) NOT NULL,
  `Equi_Category` varchar(25) NOT NULL,
  `Equi_Latittude` decimal(10,7) NOT NULL,
  `Equi_Longitude` decimal(10,7) NOT NULL,
  `Equi_Timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Equi_Assigned_Pats_IDs` int(10) DEFAULT NULL,
  `Equi_Loaned` datetime DEFAULT NULL,
  `Equi_Return_due` datetime DEFAULT NULL,
  `Equi_Dept` int(3) DEFAULT NULL,
  `Equi_Main_Last_Cleaned` datetime DEFAULT NULL,
  `Equi_Zone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`Equi_ID`, `Equi_Barcode`, `Equi_Name`, `Equi_Category`, `Equi_Latittude`, `Equi_Longitude`, `Equi_Timestamp`, `Equi_Assigned_Pats_IDs`, `Equi_Loaned`, `Equi_Return_due`, `Equi_Dept`, `Equi_Main_Last_Cleaned`, `Equi_Zone`) VALUES
('1', '1', 'Respirator', 'Emergency', '52.5086710', '-2.0873400', '2020-05-10 12:27:23', 1, '2020-04-01 00:29:05', '2020-05-31 00:29:05', 3, NULL, 'West Midlands'),
('2', '2', 'Walking Stick', 'Non Emergency', '52.5024000', '-2.1191000', '2020-05-10 12:06:45', NULL, NULL, NULL, 2, NULL, 'West Midlands'),
('3', '3', 'ECG Machine', 'Non Emergency', '52.5834430', '-2.0148730', '2020-05-11 09:32:42', 3, '2020-05-09 00:00:00', '2020-05-28 00:00:00', 2, NULL, 'West Midlands'),
('4', '4', 'Syringe Driver', 'Emergency', '52.5546460', '-2.1160230', '2020-05-11 09:32:52', 4, '2020-05-11 00:00:00', '2020-05-10 00:00:00', 2, NULL, 'West Midlands'),
('5', '5', 'Varian TrueBeam', 'Non Emergency', '52.4871180', '-1.9123110', '2020-05-11 09:33:14', NULL, NULL, NULL, 4, NULL, 'West Midlands');

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

CREATE TABLE `hospital` (
  `Hosp_ID` varchar(10) NOT NULL,
  `Hosp_Name` varchar(20) NOT NULL,
  `Hosp_Address` varchar(35) NOT NULL,
  `Hosp_Town` varchar(15) DEFAULT NULL,
  `Hosp_County` varchar(30) NOT NULL,
  `Hosp_Floor` varchar(2) NOT NULL,
  `Hosp_Ward` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`Hosp_ID`, `Hosp_Name`, `Hosp_Address`, `Hosp_Town`, `Hosp_County`, `Hosp_Floor`, `Hosp_Ward`) VALUES
('1', 'Russells Hall', 'DY1 2HQ', 'Dudley', 'West Midlands', '2', '2B'),
('2', 'Russells Hall', 'DY1 2HQ', 'Dudley', 'West Midlands', '3', '3A'),
('3', 'Birmingham Child', 'B4 6NH', 'Birmingham', 'West Midlands', '1', '1A'),
('4', 'New Cross', 'WV10 0QP', 'Wolverhampton', 'West Midlands', '2', '2A'),
('5', 'Sandwell General', 'B71 4HJ', 'West Bromwich', 'West Midlands', '2', '2B');

-- --------------------------------------------------------

--
-- Table structure for table `ids`
--

CREATE TABLE `ids` (
  `IDs_Patient` int(10) DEFAULT NULL,
  `IDs_Staff` varchar(10) DEFAULT NULL,
  `IDs_Inpatient` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ids`
--

INSERT INTO `ids` (`IDs_Patient`, `IDs_Staff`, `IDs_Inpatient`) VALUES
(NULL, 'AD1', NULL),
(NULL, 'STF1', NULL),
(1, NULL, NULL),
(2, NULL, NULL),
(3, NULL, NULL),
(4, NULL, NULL),
(5, NULL, NULL),
(NULL, 'MGMT1', NULL),
(NULL, 'STF2', NULL),
(NULL, 'MGMT2', NULL),
(NULL, 'AD2', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `Issue #` varchar(2) NOT NULL,
  `Details` varchar(60) NOT NULL,
  `Cleaning_Record` datetime NOT NULL,
  `Hosp_ID` varchar(10) NOT NULL,
  `Main_Last_Cleaned` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `Pers_Surname` varchar(15) NOT NULL,
  `Pers_Forename` varchar(15) NOT NULL,
  `Pers_Address` varchar(25) NOT NULL,
  `Pers_Town` varchar(15) DEFAULT NULL,
  `Pers_County` varchar(30) NOT NULL,
  `IDs_Patient` int(10) NOT NULL,
  `IDs_Staff` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`Pers_Surname`, `Pers_Forename`, `Pers_Address`, `Pers_Town`, `Pers_County`, `IDs_Patient`, `IDs_Staff`) VALUES
('Goodyear', 'Jane', '9 Snowshill', 'Dudley', 'West Midlands', 1, 'AD1'),
('Samson', 'Joe', '9 Brownhill', 'Dudley', 'West Midlands', 2, 'AD2'),
('Whitehouse', 'Sarah', '12 Bromsgrove', 'Stourbridge', 'West Midlands', 3, 'STF1'),
('Blakesly', 'Luke', '342 Himley Road', 'Dudley', 'West Midlands', 4, 'STF1'),
('Ward', 'Uric', '8 Testdrive', 'Dudley', 'West Midlands', 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Username` varchar(15) NOT NULL,
  `User_Pass` varchar(100) NOT NULL,
  `STAFF_ID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Username`, `User_Pass`, `STAFF_ID`) VALUES
('admin', '$2y$10$lYGv2.KwHD0SOApxBSXuc./jEw0rZ9Pde3w1OR7yvJSM3lSl77Jca', 'AD1'),
('admin123', '$2y$10$yESELTCOPSSXWrO2tg1bwOY1psrJctYTc7nlDjDksHUBizTy3Ftci', 'AD2'),
('Bob1', '$2y$10$ndfzIgJnabohAoNkBMaLuuM.ZVY7AgciimPagjePpt1CAMO.zqRQq', 'STF1'),
('MGMT1', '$2y$10$.v92JzS8qPlndqUewcQV4OrIDa0oWub435FkedG018uujnTeNdJsy', 'MGMT1'),
('newuser1', '$2y$10$DseX6x.P0RM5cmIFOaHJye4xrBR0BeTTMazgSKgZFs3NWfFWwh6oq', 'MGMT2'),
('user2', '$2y$10$YFtGSzbboy3MXmrfqJw9h.L9x.iMosIk2o7p.dO4lzCPz1X3aXAGy', 'STF2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`Dept_ID`),
  ADD KEY `Dept_Hosp` (`Hosp_ID`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`Equi_ID`),
  ADD KEY `Equi_Dept` (`Equi_Dept`),
  ADD KEY `Equi_Main` (`Equi_Main_Last_Cleaned`),
  ADD KEY `Equi_Assigned_Pats_IDs` (`Equi_Assigned_Pats_IDs`);

--
-- Indexes for table `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`Hosp_ID`);

--
-- Indexes for table `ids`
--
ALTER TABLE `ids`
  ADD UNIQUE KEY `IDs_Staff` (`IDs_Staff`),
  ADD UNIQUE KEY `IDs_Patient` (`IDs_Patient`);

--
-- Indexes for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`Cleaning_Record`),
  ADD UNIQUE KEY `Main_Last_Cleaned` (`Main_Last_Cleaned`),
  ADD KEY `Main_Hosp` (`Hosp_ID`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD UNIQUE KEY `IDs_Patient` (`IDs_Patient`),
  ADD KEY `IDs_Staff` (`IDs_Staff`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `IDs_Staff` (`STAFF_ID`) USING BTREE,
  ADD KEY `User_Pass` (`User_Pass`) USING BTREE;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `Dept_Hosp` FOREIGN KEY (`Hosp_ID`) REFERENCES `hospital` (`Hosp_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `Equi_Assigned_Pats_IDs` FOREIGN KEY (`Equi_Assigned_Pats_IDs`) REFERENCES `ids` (`IDs_Patient`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Equi_Dept` FOREIGN KEY (`Equi_Dept`) REFERENCES `department` (`Dept_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Equi_Main` FOREIGN KEY (`Equi_Main_Last_Cleaned`) REFERENCES `maintenance` (`Main_Last_Cleaned`) ON UPDATE CASCADE;

--
-- Constraints for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD CONSTRAINT `Main_Hosp` FOREIGN KEY (`Hosp_ID`) REFERENCES `hospital` (`Hosp_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `Pers_Pats_ID` FOREIGN KEY (`IDs_Patient`) REFERENCES `ids` (`IDs_Patient`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Pers_Staf_ID` FOREIGN KEY (`IDs_Staff`) REFERENCES `ids` (`IDs_Staff`) ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `IDs_Staff` FOREIGN KEY (`STAFF_ID`) REFERENCES `ids` (`IDs_Staff`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
