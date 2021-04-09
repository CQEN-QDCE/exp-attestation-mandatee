/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
export function GET_ISSUER_HOST_URL() {
    let ISSUER_HOST_URL = process.env.REACT_APP_ISSUER_HOST_URL;
    if (ISSUER_HOST_URL === undefined || ISSUER_HOST_URL === '')
        return 'NONE'
    else
        return ISSUER_HOST_URL
}