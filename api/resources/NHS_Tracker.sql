-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2020 at 12:04 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

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
  `Equi_Main_Last_Cleaned` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `ids`
--

CREATE TABLE `ids` (
  `IDs_Patient` int(10) NOT NULL,
  `IDs_Staff` varchar(10) NOT NULL,
  `IDs_Inpatient` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `IDs_Staff` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Username` varchar(15) NOT NULL,
  `User_Pass` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD UNIQUE KEY `IDs_Staff` (`IDs_Staff`),
  ADD UNIQUE KEY `IDs_Patient` (`IDs_Patient`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `User_Pass` (`User_Pass`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
