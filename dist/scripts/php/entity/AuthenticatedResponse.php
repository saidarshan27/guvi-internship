<?php
    namespace entity;
    require_once "../../../vendor/autoload.php";

    class AuthenticatedResponse extends Response{
        var $accessToken;
        var $uuid;

        function __construct($code,$accessToken,$uuid,$message=""){
            $this->code = $code;
            $this->message = $message;
            $this->accessToken = $accessToken;
            $this->uuid = $uuid;
        }

        function responseAsJson(){
            return json_encode(array("code"=>$this->code,"message"=>$this->message,"accessToken"=>$this->accessToken,"uuid"=>$this->uuid));
        }
    }
?>