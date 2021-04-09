import React, { useState, useEffect } from 'react'
import { Form, Row, Col, FormGroup, Label, Button, Input} from 'reactstrap'
import { useTranslation }       from 'react-i18next'

function TestContainer(props){

    const { t } = useTranslation(['translation', 'identite']); 

    const [holderFirstNames, setHolderFirstNames] = useState('')
    const [holderLastName, setHolderLastName] = useState('')
    const [holderBirthDate, setHolderBirthDate] = useState('')

    console.log(props.location.state)



    useEffect(() => {
        setHolderFirstNames('Julio Cesar'); 
        setHolderLastName('Torres dos Santos');
        setHolderBirthDate(retrieveToday());
    });


    function retrieveISODate(){
        return new Date().toISOString(); 
    }

    function retrieveToday(){
        return retrieveISODate().substring(0,10); 
    }

    function handleRequest(){
        let hoje = new Date().toISOString(); 
        console.log(hoje.substring(0,10)); 
        setHolderBirthDate(hoje);
    }

    return(
        <Form className="text-center FormBox">
        <h1 className="mb-5 pb-4 mt-3 header">Mandat de Curatelle</h1>
            <br />
            <h3>Données de la personne responsable</h3>
            <hr/>
            <Row form>
                <Col md={4}>
                    <FormGroup>
                        <Label for="holderFirstNames">{t('identite:credentialSubject.firstNames')}</Label>
                        <Input type="text" className="inputField rounded-pill" name="holderFirstNames" id="holderFirstNames" onChange={(e) => setHolderFirstNames(e.target.value)} placeholder={t('identite:credentialSubject.firstNames')} value={holderFirstNames} disabled/>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="holderLastName">{t('identite:credentialSubject.lastName')}</Label>
                        <Input type="text" className="inputField rounded-pill" name="holderLastName" id="holderLastName" onChange={(e) => setHolderLastName(e.target.value)} placeholder={t('identite:credentialSubject.lastName')} value={holderLastName} disabled/>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="holderBirthDate">{t('identite:credentialSubject.birthDate')}</Label>
                        <Input type="date" className="inputField rounded-pill" name="holderBirthDate" id="holderBirthDate" onChange={(e) => setHolderBirthDate(e.target.value)} placeholder={t('identite:credentialSubject.birthDate')} value={holderBirthDate} disabled/>
                    </FormGroup>
                </Col>
            </Row>
            <br />
            <Button onClick={handleRequest} outline color="primary" className="m-3">{t('identite:btnIssue')}</Button>
        </Form>
    );
}

export default TestContainer; 