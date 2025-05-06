
-- --------------------------------------------------------
-- Table structure for table `template`
-- --------------------------------------------------------

CREATE TABLE `template` (
  `Template_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL UNIQUE,
  `Category` VARCHAR(50) NOT NULL,
  `Description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Template_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table structure for table `user`
-- --------------------------------------------------------

CREATE TABLE `user` (
  `User_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(100) NOT NULL UNIQUE,
  `Password` VARCHAR(255) NOT NULL,
  `Created_At` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------
-- Table structure for table `portfolio`
-- --------------------------------------------------------

CREATE TABLE `portfolio` (
  `Portfolio_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `User_ID` INT(11) NOT NULL,
  `Template_ID` INT(11) NOT NULL,
  `Title` VARCHAR(100) NOT NULL,
  `Content` TEXT NOT NULL,
  `Created_At` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Portfolio_ID`),
  KEY `User_ID` (`User_ID`),
  KEY `Template_ID` (`Template_ID`),
  CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`Template_ID`) REFERENCES `template` (`Template_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table structure for table `analytics`
-- --------------------------------------------------------

CREATE TABLE `analytics` (
  `Analytics_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Template_ID` INT(11) NOT NULL,
  `Views` INT(11) NOT NULL,
  `Downloads` INT(11) NOT NULL,
  `AvgSessionTime` FLOAT NOT NULL,
  PRIMARY KEY (`Analytics_ID`),
  KEY `Template_ID` (`Template_ID`),
  CONSTRAINT `analytics_ibfk_1` FOREIGN KEY (`Template_ID`) REFERENCES `template` (`Template_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table structure for table `certification`
-- --------------------------------------------------------

CREATE TABLE `certification` (
  `Certification_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Portfolio_ID` INT(11) NOT NULL,
  `Name` VARCHAR(100) NOT NULL,
  `Institution` VARCHAR(255) NOT NULL,
  `Description` TEXT NOT NULL,
  PRIMARY KEY (`Certification_ID`),
  KEY `Portfolio_ID` (`Portfolio_ID`),
  CONSTRAINT `certification_ibfk_1` FOREIGN KEY (`Portfolio_ID`) REFERENCES `portfolio` (`Portfolio_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table structure for table `education`
-- --------------------------------------------------------

CREATE TABLE `education` (
  `Education_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Portfolio_ID` INT(11) NOT NULL,
  `Degree_Name` VARCHAR(100) NOT NULL,
  `Description` TEXT NOT NULL,
  `Completion_Year` DATE NOT NULL,
  PRIMARY KEY (`Education_ID`),
  KEY `Portfolio_ID` (`Portfolio_ID`),
  CONSTRAINT `education_ibfk_1` FOREIGN KEY (`Portfolio_ID`) REFERENCES `portfolio` (`Portfolio_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table structure for table `feedback`
-- --------------------------------------------------------

CREATE TABLE `feedback` (
  `Feedback_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `User_ID` INT(11) NOT NULL,
  `Content` TEXT NOT NULL,
  `DateSubmitted` DATE NOT NULL,
  PRIMARY KEY (`Feedback_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table structure for table `personalinfo`
-- --------------------------------------------------------

CREATE TABLE `personalinfo` (
  `PersonalInfo_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Portfolio_ID` INT(11) NOT NULL,
  `Name` VARCHAR(100) NOT NULL,
  `Profession` VARCHAR(100) NOT NULL,
  `Tagline` TEXT NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Phone` VARCHAR(20) NOT NULL,
  `Location` VARCHAR(255) NOT NULL,
  `ProfilePic` TEXT NOT NULL,
  PRIMARY KEY (`PersonalInfo_ID`),
  KEY `Portfolio_ID` (`Portfolio_ID`),
  CONSTRAINT `personalinfo_ibfk_1` FOREIGN KEY (`Portfolio_ID`) REFERENCES `portfolio` (`Portfolio_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------
-- Table structure for table `project`
-- --------------------------------------------------------

CREATE TABLE `project` (
  `Project_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Portfolio_ID` INT(11) NOT NULL,
  `Name` VARCHAR(100) NOT NULL,
  `Description` TEXT NOT NULL,
  PRIMARY KEY (`Project_ID`),
  KEY `Portfolio_ID` (`Portfolio_ID`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`Portfolio_ID`) REFERENCES `portfolio` (`Portfolio_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table structure for table `skill`
-- --------------------------------------------------------

CREATE TABLE `skill` (
  `Skill_ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Portfolio_ID` INT(11) NOT NULL,
  `Name` VARCHAR(100) NOT NULL,
  `Description` TEXT NOT NULL,
  `Experience` INT(11) NOT NULL,
  PRIMARY KEY (`Skill_ID`),
  KEY `Portfolio_ID` (`Portfolio_ID`),
  CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`Portfolio_ID`) REFERENCES `portfolio` (`Portfolio_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
