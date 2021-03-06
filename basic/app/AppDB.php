<?php
declare(strict_types=1);
namespace approot;



/**
*
*
*/
class AppDB
{



    public static $connection = [];

    private $mysqli;
    private $servername;
    private $db_name;
    private $username;    
    private $password;
    private $port = 3306;
    private $socket = '';
    private $flags = '';
    private $charset = '';
    private $ssl_set;
    


    function __construct(string $db_name){
        $config = \approot\App::getConfig();
        $path_config = $config["app"]["dbs"][$db_name];

        $arr = require __DIR__ . $path_config;
        $this->servername = $arr["servername"];
        $this->db_name = $arr["db_name"];
        $this->username = $arr["username"];       
        $this->password = $arr["password"];
        $this->port = $arr["port"];
        $this->charset = $arr["charset"];

        if(array_key_exists("socket", $arr)){
            $this->socket = $arr["socket"];
        }

        if(array_key_exists("flags", $arr)){
            $this->flags = $arr["flags"];
        }

        if(array_key_exists("ssl_set", $arr)){
            $this->ssl_set = $arr["ssl_set"];
        }
        

        // connect check db
        if(array_key_exists($db_name, self::$connection) !== false) {
            \approot\classes\Logger::sendToLog("Connection exists: ".$db_name);
            return;
        }

        // Create connection to db
        $this->createConnection($db_name);
    }    



    /**
    *
    *
    */
    private function createConnection(string $db_name){
        // Create connection
        $this->mysqli = mysqli_init();

        if (!$this->mysqli) {
            $msg = "Connection to db failed: mysqli_init failed. ";
            trigger_error($msg, E_USER_WARNING);
            return;            
        }

        if($this->ssl_set !== NULL){
            $this->mysqli->ssl_set( 
                $this->ssl_set['MYSQL_SSL_KEY'], 
                $this->ssl_set['MYSQL_SSL_CERT'], 
                $this->ssl_set['MYSQL_SSL_CA'],
                $this->ssl_set['MYSQL_SSL_CAPATH'],
                $this->ssl_set['MYSQL_SSL_CIPHER']
            );
        }

        $this->mysqli->real_connect(
            $this->servername, 
            $this->username, 
            $this->password, 
            $this->db_name, 
            (int) $this->port,
            $this->socket,
            $this->flags
        );

        $this->mysqli->set_charset($this->charset);

        // Check connection
        if ($this->mysqli->connect_errno) {
            $msg = "Connection to db failed. ";
            $msg .= "Error number: " . $this->mysqli->connect_errno . " ";
            $msg .= "Error: " . $this->mysqli->connect_error . " ";
            trigger_error($msg, E_USER_WARNING);
            return;
        } 

        self::$connection[$db_name] = $this->mysqli;
    }



    /**
    *
    *
    */
    public static function use(string $db_name){
        return self::$connection[$db_name];
    }



    /**
    *
    *
    */
    public static function closeConnections(){
        foreach(self::$connection as $key => $value) { 
            self::$connection[$key]->close();
        }         
    }



}

