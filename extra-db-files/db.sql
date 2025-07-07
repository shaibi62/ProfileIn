
--
-- Database: `dbprofilein`
--

-- --------------------------------------------------------
--
-- Table structure for table `portfolio`
--
--
-- Table structure for table `user`
--

CREATE TABLE `tblUser` (
  `usrId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Table structure for table `template`
--

CREATE TABLE `tblTemplate` (
  `tmpId` int(11) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Category` varchar(50) NOT NULL,
  `Feature1` varchar(255) DEFAULT NULL,
  `Feature2` varchar(255) DEFAULT NULL,
  `Feature3` varchar(255) DEFAULT NULL,
  `Image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tblPortfolio` (
  `prtId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `tmpId` int(11) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `analytics`
--

CREATE TABLE `tblAnalytics` (
  `atcId` int(11) NOT NULL,
  `tmpId` int(11) NOT NULL,
  `Views` int(11) NOT NULL,
  `Downloads` int(11) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `certification`
--

CREATE TABLE `tblCertification` (
  `crtId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Institution` varchar(255) NOT NULL,
  `issueDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `tblEducation` (
  `eduId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Degree_Name` varchar(100) NOT NULL,
  `Institution` varchar(255) NOT NULL,
  `Grades` varchar(255) NOT NULL,
  `Start_Year` date NOT NULL,
  `Completion_Year` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `tblFeedback` (
  `fdbId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Star` int(11) NOT NULL,
  `Content` text NOT NULL,
  `DateSubmitted` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personalinfo`
--

CREATE TABLE `tblPersonalinfo` (
  `infoId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Profession` varchar(100) NOT NULL,
  `Tagline` varchar(255) NOT NULL,
  `ProfilePic` varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

----------------------------------------------------------


--
-- Table structure for table `project`
--

CREATE TABLE `tblProject` (
  `prjId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Link` varchar(100) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `tblSkill` (
  `sklId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Experience` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Indexes for table `analytics`
--
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`Analytics_Id`),
  ADD KEY `tmpId` (`tmpId`);

--
-- Indexes for table `certification`
--
ALTER TABLE `certification`
  ADD PRIMARY KEY (`Certification_Id`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`Education_Id`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`Feedback_Id`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `personalinfo`
--
ALTER TABLE `personalinfo`
  ADD PRIMARY KEY (`PersonalInfo_Id`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`Portfolio_Id`),
  ADD KEY `usrId` (`usrId`),
  ADD KEY `tmpId` (`tmpId`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`Project_Id`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`Skill_Id`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`tmpId`),
  ADD UNIQUE KEY `Title` (`Title`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`usrId`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `analytics`
--
ALTER TABLE `analytics`
  MODIFY `Analytics_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `certification`
--
ALTER TABLE `certification`
  MODIFY `Certification_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `Education_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `Feedback_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personalinfo`
--
ALTER TABLE `personalinfo`
  MODIFY `PersonalInfo_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `Portfolio_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `Project_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `Skill_Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `template`
--
ALTER TABLE `template`
  MODIFY `tmpId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `usrId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `analytics`
--
ALTER TABLE `analytics`
  ADD CONSTRAINT `analytics_ibfk_1` FOREIGN KEY (`tmpId`) REFERENCES `template` (`tmpId`);

--
-- Constraints for table `certification`
--
ALTER TABLE `certification`
  ADD CONSTRAINT `certification_fk_user` FOREIGN KEY (`usrId`) REFERENCES `user` (`usrId`);

--
-- Constraints for table `education`
--
ALTER TABLE `education`
  ADD CONSTRAINT `education_fk_user` FOREIGN KEY (`usrId`) REFERENCES `user` (`usrId`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`usrId`) REFERENCES `user` (`usrId`);

--
-- Constraints for table `personalinfo`
--
ALTER TABLE `personalinfo`
  ADD CONSTRAINT `personalinfo_fk_user` FOREIGN KEY (`usrId`) REFERENCES `user` (`usrId`);

--
-- Constraints for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`tmpId`) REFERENCES `template` (`tmpId`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_fk_user` FOREIGN KEY (`usrId`) REFERENCES `user` (`usrId`);

--
-- Constraints for table `skill`
--
ALTER TABLE `skill`
  ADD CONSTRAINT `skill_fk_user` FOREIGN KEY (`usrId`) REFERENCES `user` (`usrId`);


