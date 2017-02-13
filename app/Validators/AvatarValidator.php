<?php

namespace App\Validators;

class AvatarValidator
{

    public function validate($attribute, $value, $parameters, $validator) {

        $b64 = '/^(data:image\/(jpeg|png|jpg|gif|bmp);base64)/';
        $url = '/(http(s?):)|([\/|.|\w|\s])*\.(?:jpg|gif|png)/';

        if($value != null){
            return preg_match($b64, $value) || preg_match($url, $value);
        }else{
            return true;
        }
    }

}