/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                            from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { useTranslation }               from 'react-i18next'

export default function PresentationEmissionForm(props) {

    const { 
        subjectFirstNames,
        subjectLastName, 
        subjectGender, 
        subjectBirthplace, 
        subjectBirthDate, 
        subjectFatherFullName, 
        subjectMotherFullName
    } = props.data.mandat

    const { t } = useTranslation(['translation', 'identite']);
  
    return (
        <Col lg={5}>
        <h5 className="mb-4 pb-4 mt-2 text-center">{t('identite:infoANIGIdentity')}</h5>
        <FormGroup row>
            <Label for="firstNames" sm={3}>
            {t('identite:credentialSubject.firstNames')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="firstNames" id="firstNames" value={subjectFirstNames} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="lastName" sm={3}>
            {t('identite:credentialSubject.lastName')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="lastName" id="lastName" value={subjectLastName} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="gender" sm={3}>
            {t('identite:credentialSubject.gender')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="gender" id="gender" value={subjectGender} disabled />
            </Col>
        </FormGroup>
        
        <FormGroup row>
            <Label for="birthplace" sm={3}>
            {t('identite:credentialSubject.birthplace')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="birthplace" id="birthplace" value={subjectBirthplace} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="birthDate" sm={3}>
            {t('identite:credentialSubject.birthDate')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="birthDate" id="birthDate" value={subjectBirthDate} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="fatherFullName" sm={3}>
            {t('identite:credentialSubject.fatherFullName')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="fatherFullName" id="fatherFullName" value={subjectFatherFullName} disabled />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="motherFullName" sm={3}>
            {t('identite:credentialSubject.motherFullName')}
            </Label>
            <Col sm={10}>
            <Input type="text" name="motherFullName" id="motherFullName" value={subjectMotherFullName} disabled />
            </Col>
        </FormGroup>
        <br />
        </Col>
    );
}
