-- --------------------------------------------------------

--
-- Table structure for table `tbladmin`
--

CREATE TABLE `tbladmin` (
  `admId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL DEFAULT 'ProfileIn-Admin',
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbladmin`
--

INSERT INTO `tbladmin` (`admId`, `Name`, `Email`, `Password`, `Created_At`) VALUES
(1, 'ProfileIn-Admin', 'admin@profilein.com', '$2y$10$ly.lacaY64arD4IxTuAaVeOB2egJ7ow8QS3267wes6G2n/LTUZQDi', '2025-06-15 05:43:56');

-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Table structure for table `tblcertification`
--

CREATE TABLE `tblcertification` (
  `crtId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Institution` varchar(255) NOT NULL,
  `issueDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblcertification`
--

INSERT INTO `tblcertification` (`crtId`, `usrId`, `Title`, `Institution`, `issueDate`) VALUES
(20, 2, 'wksw', ',s', '2025-06-16'),
(37, 4, 'Database', 'coursera.org', '2024-06-01'),
(54, 1, 'Web Design', 'coursera.org', '2025-06-05'),
(55, 1, 'Databases', 'coursera.org', '2025-06-01'),
(56, 1, 'Video editing', 'digiskills', '2025-06-01'),
(57, 1, 'CCA', 'Scholars Computer College ', '2025-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `tblcontact`
--

CREATE TABLE `tblcontact` (
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblcontact`
--

INSERT INTO `tblcontact` (`Name`, `Email`, `Message`, `Created_At`) VALUES
('Shaibi', 'mshoaibarid@gmail.com', 'Very good platform.', '2025-06-15 16:12:04'),
('Muhammad Shoaib', 'mshoaibarid@gmail.com', 'Very nice platform', '2025-06-15 16:55:29');

-- --------------------------------------------------------

--
-- Table structure for table `tbleducation`
--

CREATE TABLE `tbleducation` (
  `eduId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Degree_Name` varchar(100) NOT NULL,
  `Institution` varchar(255) NOT NULL,
  `Grades` varchar(255) NOT NULL,
  `Start_Year` date NOT NULL,
  `Completion_Year` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbleducation`
--

INSERT INTO `tbleducation` (`eduId`, `usrId`, `Degree_Name`, `Institution`, `Grades`, `Start_Year`, `Completion_Year`) VALUES
(20, 2, 'jdfjndf', 'fkdnf', 'a', '2025-06-16', '2025-06-16'),
(33, 4, 'Bs Software Engineering', 'AIS MBDin', 'A+', '2021-07-01', '2025-08-01'),
(46, 1, 'Software Engineering', 'PMAS-AAUR', 'A+', '2021-09-01', '2025-07-01'),
(47, 1, 'Intermediate', 'Aspire College Phalia', 'B', '2019-08-01', '2021-08-01'),
(48, 1, 'Matric', 'HSS Qadirabad', 'A+', '2017-04-01', '2019-07-15');

-- --------------------------------------------------------

--
-- Table structure for table `tblfeedback`
--

CREATE TABLE `tblfeedback` (
  `fdbId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Star` int(11) NOT NULL,
  `Content` text NOT NULL,
  `DateSubmitted` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblfeedback`
--

INSERT INTO `tblfeedback` (`fdbId`, `usrId`, `Star`, `Content`, `DateSubmitted`) VALUES
(5, 1, 5, 'Nice platform', '2025-06-15 16:49:31');

-- --------------------------------------------------------

--
-- Table structure for table `tbljob`
--

CREATE TABLE `tbljob` (
  `jobId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Company` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbljob`
--

INSERT INTO `tbljob` (`jobId`, `usrId`, `Title`, `Company`, `Description`, `startDate`, `endDate`) VALUES
(3, 2, 'sd,', '', ',ss', '2025-06-16', '2025-06-16'),
(12, 4, 'Accounts Manager', 'Nishaat Tea', 'i have worked as accounts manager.', '2024-06-01', '2024-08-01'),
(21, 1, 'Accounts Manager', 'Nishaat Tea', 'Worked as account manager and record keeping', '2023-06-01', '2023-08-01'),
(22, 1, 'Graphic Designer', 'AIS Mandi Bahauddin', 'Worked as graphic designer at AIS M B Din', '2023-08-01', '2025-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `tblpendinguser`
--

CREATE TABLE `tblpendinguser` (
  `pendingId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `expire_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblpendinguser`
--

INSERT INTO `tblpendinguser` (`pendingId`, `name`, `email`, `password`, `otp`, `created_at`, `expire_at`) VALUES
(2, 'm', 'moaibarid@gmail.com', '$2y$10$KMxegeKUTlLLl1AyGvZdEuVpx1/j420Im1GTTM3neX8oxKpjxzFty', '125643', '2025-06-20 12:37:48', '2025-06-20 12:42:48');

-- --------------------------------------------------------

--
-- Table structure for table `tblpersonalinfo`
--

CREATE TABLE `tblpersonalinfo` (
  `infoId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Profession` varchar(100) NOT NULL,
  `Tagline` varchar(255) NOT NULL,
  `AboutMe` text DEFAULT NULL,
  `ProfilePic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblpersonalinfo`
--

INSERT INTO `tblpersonalinfo` (`infoId`, `usrId`, `Name`, `Email`, `Phone`, `Address`, `Profession`, `Tagline`, `AboutMe`, `ProfilePic`) VALUES
(18, 1, 'Muhammad Shoaib', 'mshoaibarid@gmail.com', '03151485465', 'Phalia, Mandi Bahauddin, Punjab, Pakistan', 'Software Engineer', 'being a Software Engineer', 'I am student of software engineering. i love to learn new technologies.', 'http://localhost/Profilein-Backend/uploads/Profile_Pics/profile-1.jpg'),
(20, 4, 'Muhammad Shoaib', 'ali@gmail.com', '03151485465', 'Phalia, Mandi Bahauddin, Punjab, Pakistan', 'Software Engineer', 'Being a Software Engineer', 'I am a student of Software Engineering interested in learning modern technologies of the era such as AI. I believe in continuous learning and implementation of learning. I have done many projects also.', 'http://localhost/Profilein-Backend/uploads/Profile_Pics/Profile-4.jpg'),
(21, 9, 'Muhammad Shoaib', 'shaibi.62batth@gmail.com', NULL, 'Gahray, Tehsil: Phalia, District: Mandi Bahauddin, Province: Punjab', 'study', 's', 'x', 'http://localhost/Profilein-Backend/uploads/Profile_Pics/Profile-9.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tblportfolio`
--

CREATE TABLE `tblportfolio` (
  `prtId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `tmpId` int(11) NOT NULL,
  `portfolioLink` varchar(255) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblportfolio`
--

INSERT INTO `tblportfolio` (`prtId`, `usrId`, `tmpId`, `portfolioLink`, `Created_At`) VALUES
(11, 1, 9, 'http://localhost/Profilein-Backend/uploads/output/portfolio-user1-temp9.html', '2025-06-14 04:07:57'),
(82, 4, 9, 'http://localhost/Profilein-Backend/uploads/output/portfolio-user4-temp9.html', '2025-06-19 07:14:11'),
(92, 1, 14, 'http://localhost/Profilein-Backend/uploads/output/portfolio-user1-temp14.html', '2025-06-23 16:17:32'),
(94, 1, 15, 'http://localhost/Profilein-Backend/uploads/output/portfolio-user1-temp15.html', '2025-06-24 00:47:52');

-- --------------------------------------------------------

--
-- Table structure for table `tblproject`
--

CREATE TABLE `tblproject` (
  `prjId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Link` varchar(100) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblproject`
--

INSERT INTO `tblproject` (`prjId`, `usrId`, `Title`, `Link`, `Description`) VALUES
(10, 2, 'ProfileIn', 's,sm', ',cms'),
(27, 4, 'ProfileIn', 'https://github.com/shaibi62/ProfileIn', 'A web based portfolio builder platform '),
(44, 1, 'ProfileIn', 'https://github.com/shaibi62/ProfileIn', 'A web based platform help individuals to make portfolios'),
(45, 1, 'ProfileIn platform', 'https://profileIn.vercel.app', 'A web based portfolio builder platform'),
(46, 1, 'ProfileIn.online', 'https://github.com/shaibi62/ProfileIn-Backend', 'A web based portfolio builder platform'),
(47, 1, 'ProfileIn.com', 'https://github.com/shaibi62/ProfileIn', 'A web based portfolio builder platform');

-- --------------------------------------------------------

--
-- Table structure for table `tblservice`
--

CREATE TABLE `tblservice` (
  `srvId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblservice`
--

INSERT INTO `tblservice` (`srvId`, `usrId`, `Title`, `Description`) VALUES
(6, 2, ',s,,s', ',sms'),
(23, 4, 'Web Developer', 'I will be your full stack web developer'),
(40, 1, 'Graphic Designer', 'I will serve your business as graphic designer'),
(41, 1, 'Video Editor', 'I will serve your business as Video Editor'),
(42, 1, 'Web Developer', 'I will work with you as Web Developer'),
(43, 1, 'Database Administrator', 'I will serve your business as Database Admin');

-- --------------------------------------------------------

--
-- Table structure for table `tblskill`
--

CREATE TABLE `tblskill` (
  `sklId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Experience` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblskill`
--

INSERT INTO `tblskill` (`sklId`, `usrId`, `Title`, `Experience`) VALUES
(17, 2, 'kds,s', 'Intermediate'),
(42, 4, 'Web Development', 'Expert'),
(67, 1, 'Web Development', 'Expert'),
(68, 1, 'Desktop Application', 'Intermediate'),
(69, 1, 'Graphic Designing', 'Beginner'),
(70, 1, 'Video Editing', 'Beginner'),
(71, 1, 'Database Administrator', 'Intermediate'),
(72, 1, 'dotNet Developer', 'Intermediate'),
(73, 9, 's', 'Beginner');

-- --------------------------------------------------------

--
-- Table structure for table `tblsocials`
--

CREATE TABLE `tblsocials` (
  `sclId` int(11) NOT NULL,
  `usrId` int(11) DEFAULT NULL,
  `fbLink` varchar(255) DEFAULT NULL,
  `instaLink` varchar(255) DEFAULT NULL,
  `xLink` varchar(255) DEFAULT NULL,
  `githubLink` varchar(255) DEFAULT NULL,
  `linkedinLink` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblsocials`
--

INSERT INTO `tblsocials` (`sclId`, `usrId`, `fbLink`, `instaLink`, `xLink`, `githubLink`, `linkedinLink`) VALUES
(1, 4, NULL, 'instagram.com/shaibi.batth', 'x.com/shaibi62', 'linkedin.com/shaibi62', NULL),
(2, 1, '', '', 'https://x.com/shaibi62', 'https://github.com/shaibi62', ''),
(3, 9, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbltemplate`
--

CREATE TABLE `tbltemplate` (
  `tmpId` int(11) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Category` varchar(50) NOT NULL,
  `Feature1` varchar(255) DEFAULT NULL,
  `Feature2` varchar(255) DEFAULT NULL,
  `Feature3` varchar(255) DEFAULT NULL,
  `Image` varchar(255) NOT NULL,
  `Template_Address` varchar(255) NOT NULL,
  `FolderId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbltemplate`
--

INSERT INTO `tbltemplate` (`tmpId`, `Title`, `Category`, `Feature1`, `Feature2`, `Feature3`, `Image`, `Template_Address`, `FolderId`) VALUES
(9, 'My-Dev-Folio', 'Developer', 'skills', 'resume', 'projects', 'http://localhost/Profilein-Backend/uploads/images/img_68512a8e420bc.jpg', 'http://localhost/Profilein-Backend/uploads/templates/Template_1/', 1),
(14, 'Photographer', 'Photography', 'f1', 'f2', 'f3', 'http://localhost/Profilein-Backend/uploads/images/img_68597dd96c618.jpg', 'http://localhost/Profilein-Backend/uploads/templates/Template-2/', 2),
(15, 'Photographer-portfolio', 'Photography', 'f1', 'f2', 'f3', 'http://localhost/Profilein-Backend/uploads/images/img_6859f5a7ed2e7.jpg', 'http://localhost/Profilein-Backend/uploads/templates/Template_3/', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

CREATE TABLE `tbluser` (
  `usrId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`usrId`, `Name`, `Email`, `Password`, `Created_At`) VALUES
(1, 'Shoaib', 'mshoaibarid@gmail.com', '$2y$10$ly.lacaY64arD4IxTuAaVeOB2egJ7ow8QS3267wes6G2n/LTUZQDi', '2025-06-04 04:12:10'),
(2, 'Shaibi', 'shoaibarid@gmail.com', '$2y$10$ly.lacaY64arD4IxTuAaVeOB2egJ7ow8QS3267wes6G2n/LTUZQDi', '2025-06-13 06:40:17'),
(9, 'aw', 'shaibi.62batth@gmail.com', '$2y$10$W6fXuI9C4WWqa4BDDlaFtuy9.hJeFaJ9wv4L8b35s9QtdWDbMiTSm', '2025-06-22 16:30:04');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_otps`
--

CREATE TABLE `tbl_otps` (
  `otpId` int(11) NOT NULL,
  `usrId` int(11) NOT NULL,
  `otp_code` varchar(6) NOT NULL,
  `type` enum('reset') NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `expires_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_otps`
--

INSERT INTO `tbl_otps` (`otpId`, `usrId`, `otp_code`, `type`, `created_at`, `expires_at`) VALUES
(1, 1, '972654', 'reset', '2025-06-22 21:27:01', '2025-06-22 21:32:01'),
(2, 9, '901801', 'reset', '2025-06-22 21:30:18', '2025-06-22 21:35:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbladmin`
--
ALTER TABLE `tbladmin`
  ADD PRIMARY KEY (`admId`),
  ADD UNIQUE KEY `Email` (`Email`);


--
-- Indexes for table `tblcertification`
--
ALTER TABLE `tblcertification`
  ADD PRIMARY KEY (`crtId`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `tbleducation`
--
ALTER TABLE `tbleducation`
  ADD PRIMARY KEY (`eduId`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `tblfeedback`
--
ALTER TABLE `tblfeedback`
  ADD PRIMARY KEY (`fdbId`),
  ADD UNIQUE KEY `usrId_2` (`usrId`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `tbljob`
--
ALTER TABLE `tbljob`
  ADD PRIMARY KEY (`jobId`),
  ADD KEY `job_fk_user` (`usrId`);

--
-- Indexes for table `tblpendinguser`
--
ALTER TABLE `tblpendinguser`
  ADD PRIMARY KEY (`pendingId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tblpersonalinfo`
--
ALTER TABLE `tblpersonalinfo`
  ADD PRIMARY KEY (`infoId`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `tblportfolio`
--
ALTER TABLE `tblportfolio`
  ADD PRIMARY KEY (`prtId`),
  ADD UNIQUE KEY `unique_user_template` (`usrId`,`tmpId`),
  ADD KEY `usrId` (`usrId`),
  ADD KEY `tmpId` (`tmpId`);

--
-- Indexes for table `tblproject`
--
ALTER TABLE `tblproject`
  ADD PRIMARY KEY (`prjId`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `tblservice`
--
ALTER TABLE `tblservice`
  ADD PRIMARY KEY (`srvId`),
  ADD KEY `service_fk_user` (`usrId`);

--
-- Indexes for table `tblskill`
--
ALTER TABLE `tblskill`
  ADD PRIMARY KEY (`sklId`),
  ADD KEY `usrId` (`usrId`);

--
-- Indexes for table `tblsocials`
--
ALTER TABLE `tblsocials`
  ADD PRIMARY KEY (`sclId`),
  ADD KEY `fk_usrId` (`usrId`);

--
-- Indexes for table `tbltemplate`
--
ALTER TABLE `tbltemplate`
  ADD PRIMARY KEY (`tmpId`),
  ADD UNIQUE KEY `Title` (`Title`);

--
-- Indexes for table `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`usrId`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `tbl_otps`
--
ALTER TABLE `tbl_otps`
  ADD PRIMARY KEY (`otpId`),
  ADD KEY `fk_user` (`usrId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbladmin`
--
ALTER TABLE `tbladmin`
  MODIFY `admId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblcertification`
--
ALTER TABLE `tblcertification`
  MODIFY `crtId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `tbleducation`
--
ALTER TABLE `tbleducation`
  MODIFY `eduId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `tblfeedback`
--
ALTER TABLE `tblfeedback`
  MODIFY `fdbId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbljob`
--
ALTER TABLE `tbljob`
  MODIFY `jobId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tblpendinguser`
--
ALTER TABLE `tblpendinguser`
  MODIFY `pendingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tblpersonalinfo`
--
ALTER TABLE `tblpersonalinfo`
  MODIFY `infoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tblportfolio`
--
ALTER TABLE `tblportfolio`
  MODIFY `prtId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `tblproject`
--
ALTER TABLE `tblproject`
  MODIFY `prjId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `tblservice`
--
ALTER TABLE `tblservice`
  MODIFY `srvId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `tblskill`
--
ALTER TABLE `tblskill`
  MODIFY `sklId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `tblsocials`
--
ALTER TABLE `tblsocials`
  MODIFY `sclId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbltemplate`
--
ALTER TABLE `tbltemplate`
  MODIFY `tmpId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `usrId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_otps`
--
ALTER TABLE `tbl_otps`
  MODIFY `otpId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--


--
-- Constraints for table `tblcertification`
--
ALTER TABLE `tblcertification`
  ADD CONSTRAINT `certification_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`) ON DELETE CASCADE;

--
-- Constraints for table `tbleducation`
--
ALTER TABLE `tbleducation`
  ADD CONSTRAINT `education_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`) ON DELETE CASCADE;

--
-- Constraints for table `tblfeedback`
--
ALTER TABLE `tblfeedback`
  ADD CONSTRAINT `feedback_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`) ON DELETE CASCADE;

--
-- Constraints for table `tbljob`
--
ALTER TABLE `tbljob`
  ADD CONSTRAINT `job_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`) ON DELETE CASCADE;

--
-- Constraints for table `tblpersonalinfo`
--
ALTER TABLE `tblpersonalinfo`
  ADD CONSTRAINT `personalinfo_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`) ON DELETE CASCADE;

--
-- Constraints for table `tblportfolio`
--
ALTER TABLE `tblportfolio`
  ADD CONSTRAINT `portfolio_fk_template` FOREIGN KEY (`tmpId`) REFERENCES `tbltemplate` (`tmpId`) ON DELETE CASCADE,
  ADD CONSTRAINT `portfolio_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`) ON DELETE CASCADE;

--
-- Constraints for table `tblproject`
--
ALTER TABLE `tblproject`
  ADD CONSTRAINT `project_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`) ON DELETE CASCADE;

--
-- Constraints for table `tblservice`
--
ALTER TABLE `tblservice`
  ADD CONSTRAINT `service_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`) ON DELETE CASCADE;

--
-- Constraints for table `tblskill`
--
ALTER TABLE `tblskill`
  ADD CONSTRAINT `skill_fk_user` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`) ON DELETE CASCADE;

--
-- Constraints for table `tblsocials`
--
ALTER TABLE `tblsocials`
  ADD CONSTRAINT `fk_usrId` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`);

--
-- Constraints for table `tbl_otps`
--
ALTER TABLE `tbl_otps`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`usrId`) REFERENCES `tbluser` (`usrId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
