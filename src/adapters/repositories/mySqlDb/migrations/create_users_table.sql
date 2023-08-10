CREATE TABLE IF NOT EXISTS `users`
(
    `id` VARCHAR(65) NOT NULL,
    `name` VARCHAR(65) NOT NULL,
    `email` VARCHAR(65) NOT NULL,
    `password` VARCHAR(65) NOT NULL,
    `role` VARCHAR(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


