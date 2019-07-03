<?php
define('LOG_FILE_PATH', __DIR__ . '/tmp/main.log');
define('PHANTOMJS_PATH', '/Path/to/phantomjs/bin/phantomjs');
define('PROXY', "tcp://ip.add.re.ss:port");
const DB_SETTINGS = [
    'driver' => 'mysql',
    'host' => 'localhost',
    'database' => 'bcdirectory_seminar',
    'username' => 'seminar_admin',
    'password' => 'tekitou',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'unix_socket' => '/tmp/mysql.sock'
];
const TEST_DB_SETTINGS = [
    'driver' => 'mysql',
    'host' => 'localhost',
    'database' => 'test_seminar',
    'username' => 'seminar_admin',
    'password' => 'tekitou',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'unix_socket' => '/tmp/mysql.sock'
];
