package com.search.be.postboard.common;

public interface ResponseCode {

    //HTTP Status 200
    String SUCCESS = "SU";
    // HTTP STATUS 400
    String VALIDATION_FAILED = "VF";
    String DUPLICATE_EMAIL = "DE";
    String DUPLICATE_TEL_NUMBER = "DT";
    String DUPLICATE_NICKNAME = "DN";
    String NOT_EXISTED_USER = "NU";
    String NOT_EXISTED_BOARD = "NB";
    // HTTP STATUS 401
    String SIGN_IN_FAILED = "SF";
    String AUTHORIZATION_FAILED = "AF";
    // HTTP STATUS 403
    String NO_PERMISSION = "NP";
    // HTTP STATUS 500
    String DATABASE_ERROR = "DBE";
}
