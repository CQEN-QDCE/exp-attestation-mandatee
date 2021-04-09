/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React         from 'react';
import { Col,  
         FormGroup, 
         Input, 
         Label }     from 'reactstrap';

export default function ProofCuratelleForm(props) {
    
    const{
        context,
        id,
        type,
        schema,
        issuanceDate,
        expirationDate,
        issuer,
        trustFramework,
        auditURI,
        appealURI,
        holderType,
        holderRole,
        holderRationale,
        holderFirstNames,
        holderLastName,
        holderBirthDate,
        holderBirthplace,
        holderGender,
        holderFatherFullName,
        holderMotherFullName,
        constBoundaries,
        constPointOfOrigin,
        constRadiusKm,
        constJurisdictions,
        constTrigger,
        constCircumstances,
        depType,
        depFirstNames,
        depLastName,
        depBirthDate,
        depBirthplace,
        depGender,
        depFatherFullName,
        depMotherFullName,
        depNativeLanguage,
        depIdentifyingMarks,
        depPhoto,
        depIris,
        depFingerprint
    } = props.data.mandat;

    return (
        <Col lg={5}>
            <h5 className="mb-4 pb-4 mt-2 text-center">Informations sur le responsable du mandat</h5>
            <hr /> 
            <FormGroup row>
                <Label for="fname" sm={3}>
                Prénom
                </Label>
                <Col sm={10}>
                <Input type="text" value={holderFirstNames} disabled />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="nom" sm={3}>
                Nom 
                </Label>
                <Col sm={10}>
                <Input type="text" value={holderLastName} disabled />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="dateNaissance" sm={3}>
                Date de naissance
                </Label>
                <Col sm={10}>
                <Input type="text" value={holderBirthDate} disabled />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="dateNaissance" sm={3}>
                Rôle du responsable
                </Label>
                <Col sm={10}>
                <Input type="text" value={holderRole} disabled />
                </Col>
            </FormGroup>
            <br />

            <h5 className="mb-4 pb-4 mt-2 text-center">Informations sur la personne dépendante </h5>
            <hr /> 
            <FormGroup row>
                <Label for="fname" sm={3}>
                Prénom
                </Label>
                <Col sm={10}>
                <Input type="text" value={depFirstNames} disabled />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="nom" sm={3}>
                Nom 
                </Label>
                <Col sm={10}>
                <Input type="text" value={depLastName} disabled />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="dateNaissance" sm={3}>
                Date de naissance
                </Label>
                <Col sm={10}>
                <Input type="text" value={depBirthDate} disabled />
                </Col>
            </FormGroup>
            <br />

            <h5 className="mb-4 pb-4 mt-2 text-center">Informations sur le mandat émis </h5>
            <hr /> 
            <FormGroup row>
                <Label for="fname" sm={3}>
                Date d'émission
                </Label>
                <Col sm={10}>
                <Input type="text" value={issuanceDate} disabled />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="nom" sm={3}>
                Date d'expiration 
                </Label>
                <Col sm={10}>
                <Input type="text" value={expirationDate} disabled />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="dateNaissance" sm={3}>
                Juridiction
                </Label>
                <Col sm={10}>
                <Input type="text" value={constJurisdictions} disabled />
                </Col>
            </FormGroup>
            <br />
        </Col>
    );
}
