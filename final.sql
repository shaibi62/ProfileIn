
-- --------------------------------------------------------
-- Database: `dbprofilein`
-- --------------------------------------------------------

-- -------------------------------
-- Table: tblUser
-- -------------------------------
CREATE TABLE `tblUser` (
  `usrId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`usrId`),
  UNIQUE KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------
-- Table: tblTemplate
-- -------------------------------
CREATE TABLE `tblTemplate` (
  `tmpId` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(50) NOT NULL,
  `Category` varchar(50) NOT NULL,
  `Feature1` varchar(255) DEFAULT NULL,
  `Feature2` varchar(255) DEFAULT NULL,
  `Feature3` varchar(255) DEFAULT NULL,
  `Image` varchar(255) NOT NULL,
  PRIMARY KEY (`tmpId`),
  UNIQUE KEY (`Title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------
-- Table: tblPortfolio
-- -------------------------------
CREATE TABLE `tblPortfolio` (
  `prtId` int(11) NOT NULL AUTO_INCREMENT,
  `usrId` int(11) NOT NULL,
  `tmpId` int(11) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`prtId`),
  KEY (`usrId`),
  KEY (`tmpId`),
  CONSTRAINT `portfolio_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tblUser` (`usrId`),
  CONSTRAINT `portfolio_fk_template` FOREIGN KEY (`tmpId`) REFERENCES `tblTemplate` (`tmpId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------
-- Table: tblAnalytics
-- -------------------------------
CREATE TABLE `tblAnalytics` (
  `atcId` int(11) NOT NULL AUTO_INCREMENT,
  `tmpId` int(11) NOT NULL,
  `Views` int(11) NOT NULL,
  `Downloads` int(11) NOT NULL,
  PRIMARY KEY (`atcId`),
  KEY (`tmpId`),
  CONSTRAINT `analytics_fk_template` FOREIGN KEY (`tmpId`) REFERENCES `tblTemplate` (`tmpId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------
-- Table: tblCertification
-- -------------------------------
CREATE TABLE `tblCertification` (
  `crtId` int(11) NOT NULL AUTO_INCREMENT,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Institution` varchar(255) NOT NULL,
  `issueDate` date NOT NULL,
  PRIMARY KEY (`crtId`),
  KEY (`usrId`),
  CONSTRAINT `certification_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tblUser` (`usrId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------
-- Table: tblEducation
-- -------------------------------
CREATE TABLE `tblEducation` (
  `eduId` int(11) NOT NULL AUTO_INCREMENT,
  `usrId` int(11) NOT NULL,
  `Degree_Name` varchar(100) NOT NULL,
  `Institution` varchar(255) NOT NULL,
  `Grades` varchar(255) NOT NULL,
  `Start_Year` date NOT NULL,
  `Completion_Year` date NOT NULL,
  PRIMARY KEY (`eduId`),
  KEY (`usrId`),
  CONSTRAINT `education_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tblUser` (`usrId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------
-- Table: tblFeedback
-- -------------------------------
CREATE TABLE `tblFeedback` (
  `fdbId` int(11) NOT NULL AUTO_INCREMENT,
  `usrId` int(11) NOT NULL,
  `Star` int(11) NOT NULL,
  `Content` text NOT NULL,
  `DateSubmitted` date NOT NULL,
  PRIMARY KEY (`fdbId`),
  KEY (`usrId`),
  CONSTRAINT `feedback_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tblUser` (`usrId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------
-- Table: tblPersonalinfo
-- -------------------------------
CREATE TABLE `tblPersonalinfo` (
  `infoId` int(11) NOT NULL AUTO_INCREMENT,
  `usrId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Profession` varchar(100) NOT NULL,
  `Tagline` varchar(255) NOT NULL,
  `ProfilePic` varchar(255) NOT NULL,
  PRIMARY KEY (`infoId`),
  KEY (`usrId`),
  CONSTRAINT `personalinfo_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tblUser` (`usrId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------
-- Table: tblProject
-- -------------------------------
CREATE TABLE `tblProject` (
  `prjId` int(11) NOT NULL AUTO_INCREMENT,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Link` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY (`prjId`),
  KEY (`usrId`),
  CONSTRAINT `project_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tblUser` (`usrId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -------------------------------
-- Table: tblSkill
-- -------------------------------
CREATE TABLE `tblSkill` (
  `sklId` int(11) NOT NULL AUTO_INCREMENT,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Experience` int(11) NOT NULL,
  PRIMARY KEY (`sklId`),
  KEY (`usrId`),
  CONSTRAINT `skill_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tblUser` (`usrId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
