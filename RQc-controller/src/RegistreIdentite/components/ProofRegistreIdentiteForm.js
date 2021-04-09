/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                            from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { useTranslation }               from 'react-i18next'

export default function ProofRegistreIdentiteForm(props) {
    const { id,
        issuanceDate,
        expirationDate,
        firstNames,
        lastName, 
        gender, 
        birthplace, 
        birthDate, 
        fatherFullName, 
        motherFullName, 
        registrationNumber
    } = props.data.data

    const { t } = useTranslation(['translation', 'identite']);
    
    return (
        <Col lg={5}>
        <h5 className="mb-4 pb-4 mt-2 text-center">{t('identite:infoANIGIdentity')}</h5>
        <FormGroup row>
            <Label for="firstNames" sm={3}>
            {t('identite:credentialSubject.firstNames')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="firstNames" id="firstNames" value={firstNames} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="lastName" sm={3}>
            {t('identite:credentialSubject.lastName')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="lastName" id="lastName" value={lastName} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="gender" sm={3}>
            {t('identite:credentialSubject.gender')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="gender" id="gender" value={gender} disabled />
            </Col>
        </FormGroup>
        
        <FormGroup row>
            <Label for="birthplace" sm={3}>
            {t('identite:credentialSubject.birthplace')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="birthplace" id="birthplace" value={birthplace} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="birthDate" sm={3}>
            {t('identite:credentialSubject.birthDate')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="birthDate" id="birthDate" value={birthDate} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="fatherFullName" sm={3}>
            {t('identite:credentialSubject.fatherFullName')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="fatherFullName" id="fatherFullName" value={fatherFullName} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="motherFullName" sm={3}>
            {t('identite:credentialSubject.motherFullName')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="motherFullName" id="motherFullName" value={motherFullName} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="registrationNumber" sm={3}>
            {t('identite:credentialSubject.registrationNumber')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="registrationNumber" id="registrationNumber" value={registrationNumber} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="id" sm={3}>
            {t('identite:credentialSubject.id')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="id" id="id" value={id} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="issuanceDate" sm={3}>
            {t('identite:issuanceDate')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="issuanceDate" id="issuanceDate" value={issuanceDate} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="expirationDate" sm={3}>
            {t('identite:expirationDate')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="expirationDate" id="expirationDate" value={expirationDate} disabled />
            </Col>
        </FormGroup>
        <br />
        </Col>
    );
}
