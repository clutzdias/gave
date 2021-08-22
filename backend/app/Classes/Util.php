<?php

namespace App\Classes;

use Hamcrest\Type\IsNumeric;

class Util {

    public static function newGUID()
    {
        if (function_exists('com_create_guid') === true) {
            return trim(com_create_guid(), '{}');
        }

        $data = openssl_random_pseudo_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    public static function checkValidPassword($password){

        $senhaConvertida = trim(strtolower($password));

        $msg = '';

        if ($senhaConvertida === ''){
            $msg = "Por favor, informe uma senha de 8 dígitos.";
        }

        if (strlen($senhaConvertida) != 8){
            $msg = "Sua senha deve ter 8 dígitos.";
        }

        if (is_numeric($senhaConvertida)){
            $msg = "Sua senha deve ter ao menos uma letra.";
        }

        if (ctype_alpha($senhaConvertida)){
            $msg = "Sua senha deve ter ao menos um número.";
        }

        return $msg;

    }

}

?>