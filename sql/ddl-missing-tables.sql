-- Missing tables for CI environment

-- Table structure for table `email_templates`
CREATE TABLE `email_templates` (
  `id` bigint(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  `subject` varchar(300) NOT NULL,
  `template` mediumtext NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `email_templates`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `email_templates`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

-- Insert default email templates
INSERT INTO `email_templates` (`id`, `name`, `subject`, `template`, `created`) VALUES
(1, 'Welcome', 'Welcome to DigiBot 🐶🚀 {{name}}!', '<p>Hi there, {{name}},</p><p>DigiBot here, your trusty AI assistant and faithful companion at DigiBot! 🐾🚀 I\'m wagging my tail with excitement because you\'ve officially joined our pack, and let me tell you, it\'s going to be a pawsome journey!</p>', '2023-08-22 13:51:49'),
(2, 'Confirmation', '⚡ Confirm Your Email Address to Get Started! ⚡', '<p>Hey {{name}},</p><p>You and DigiBot are on the brink of some pretty cool stuff, but first things first – we need to make sure we\'re connected!</p>', '2023-08-22 13:51:49'),
(3, 'Invitation', 'Join Our Pack on DigiBot 🐶🚀, {{usermail}}!', '<p>Hey there, {{usermail}},</p><p>I\'m barking up your inbox to extend a paw-some invitation: Join our team workspace on DigiBot! 🐾🚀</p>', '2023-08-22 13:51:49'),
(4, 'Reset Password', '🐾 Paws Up for a Password Reset! 🐾', '<p>Hey there {{name}},</p><p>Bark bark! It\'s your furry friend DigiBot here with a wagging tail and a helping paw! Looks like your password\'s been doing some tricks – but no worries, we\'re on the case!</p><p>Here is your token to change your password: <strong>{{token}}</strong></p>', '2023-08-22 13:51:49'),
(5, 'Cancel Subscription', '🐾 Woof! Your Subscription is Taking a Paws 🐾', '<p>Hey {{name}},</p><p>Woof woof! It\'s me, your friendly neighborhood pup DigiBot, with some news: Your subscription is officially taking a paws. 🐾</p>', '2023-08-22 13:51:49'),
(6, 'Account Locked', 'Important Security Notice from Your DigiBot Pal, DigiBot! 🚀🐾', '<p>Woof woof, {{name}}! 🐾</p><p>I just wanted to let you know that something a bit ruff happened with your DigiBot account.</p>', '2023-08-22 13:51:49'),
(7, 'Invitation Accepted', 'Woof-tastic News: Your DigiBot Pack Just Got Bigger! 🚀🐾', '<p>Hey there, DigiBot pal! 🐾</p><p>I\'ve got paws-itively awesome news to share with you!</p>', '2023-08-22 13:51:49'),
(8, 'Invitation Declined', 'A Paws for Thought: Your DigiBot Invite Update 🐾', '<p>Hey there, DigiBot friend! 🐾</p><p>Just a quick woof to let you know that we\'ve received an update on your recent invite.</p>', '2023-08-22 13:51:49'),
(9, 'OTP', 'Your DigiBot One-Time Password (OTP) 🚀🔑', '<p>Hey there, DigiBot pal! 🐾</p><p>We\'re sending you a special woof to ensure your account stays safe and secure. Below, you\'ll find your one-time password (OTP):</p><p>OTP: {{otp}}</p>', '2023-08-22 13:51:49'),
(10, 'Super Admin Created', 'Important Announcement: You\'re Now a Super Admin in DigiBot! 🚀🐾', '<p>Hey there, {{name}}! 🐾</p><p>We\'re thrilled to share some truly exciting news with you. You\'ve been appointed as a Super Admin in DigiBot!</p>', '2023-08-22 13:51:49'),
(11, 'Transcription Generated', 'File Transcription of {{name}} successfully generate at DigiBot!', '<p>DigiBot here, your trusty AI assistant and faithful companion at DigiBot! 🐾🚀</p>', '2024-04-19 19:03:23'),
(12, 'Team Invitation', 'Join Digibot 🐶🚀, {{usermail}}!', '<p>Hey there, {{reciever}},</p><p>We hope you are doing well! We are excited to let you know that {{sender}} has granted you access to an exclusive team on Digibot!</p>', '2023-08-22 14:51:49');

-- Table structure for table `notification`
CREATE TABLE `notification` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `userId` bigint(11) NOT NULL,
  `message` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `objectId` bigint(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `isViewed` tinyint(1) NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `user_tokens`
CREATE TABLE IF NOT EXISTS `user_tokens` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `userId` bigint(11) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `isUsed` tinyint(1) NOT NULL DEFAULT 1,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
