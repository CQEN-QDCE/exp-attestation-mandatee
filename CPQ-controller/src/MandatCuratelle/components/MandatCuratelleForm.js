/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState, useEffect }  from 'react';
import { Col, 
         Row, 
         Button, 
         Form, 
         FormGroup, 
         Label, 
         Input, 
         Modal, 
         ModalHeader, 
         ModalBody, 
         ModalFooter,
         Dropdown, 
         DropdownToggle, 
         DropdownMenu, 
         DropdownItem }                from 'reactstrap';
import { useHistory }                  from 'react-router-dom'
import { useTranslation }              from 'react-i18next'
import                                      '../../assets/styles/Forms.css'


function MandatCuratelleForm(props){
  
    /**
     * Fais toggle entre le modal et le mode normal. 
     */
    const toggle               = () => setModal(!modal);
    const [modal, setModal]    = useState(false);

    const history              = useHistory();

    /**
     * Set la librairie d'internationalisation
     */
    const { t } = useTranslation(['translation','identite']);

    // Controle toggle de dropdown pour gender 
    const [genderdropdownOpen, setGenderOpen] = useState(false)
    const gendertoggle = () => setGenderOpen( !genderdropdownOpen)

    /**
     * Définition des constantes 
     */
    const credContext  = '["https://www.w3.org/2018/credentials/v1","https://github.com/hyperledger/aries-rfcs/concepts/0103-indirect-identity-control"]';
    const credId       = 'https://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/delegation/v1/MandatCuratelle.json';
    const credType     = '["VerifiableCredential", "Proxy.G/IQNTrustFramework/1.0/delegation]';
    const credSchema   =  process.env.REACT_APP_CRED_DEF_ID_RQC; 
    const credIssuer   =  window.env && window.env.AGENT_DID ? window.env.AGENT_DID : process.env.REACT_APP_SCHEMA_ISSUER_DID_IDENTITE; 
    const credTrustFw  = 'http://iqn-trustframework.apps.exp.lab.pocquebec.org/'; 
    const auditURI     = 'https://audit.org/report';
    const appealURI    = 'did:sov:U86Z58d6TV7PB';
    const credHoldType = 'http://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/identite/v1/RegistreIdentite.json'
    const credDepType  = 'http://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/identite/v1/RegistreIdentite.json'


    /**
     * Définition des variables du formulaire 
     */

    // Données du holder
    const [holderFirstNames,    setHolderFirstNames]     = useState('')
    const [holderLastName,      setHolderLastName]       = useState('')
    const [holderBirthDate,     setHolderBirthDate]      = useState('')
    const [holderBirthplace,    setHolderBirthplace]     = useState('')
    const [holderFatherFullName,setHolderFatherFullName] = useState('')
    const [holderMotherFullName,setHolderMotherFullName] = useState('')
    const [holderGender,        setHolderGender]         = useState('')
    const [holderPhoto,         setHolderPhoto]          = useState('')
    const [issuanceDate,        setIssuanceDate]         = useState('')
    const [expirationDate,      setExpirationDate]       = useState('2030-12-31')
    const [holderRole,          setHolderRole]           = useState('Curateur')
    const [holderRationale,     setHolderRationale]      = useState('Décision procès nr. 63554/2020')
    const [constBoundaries,     setConstBoundaries]      = useState('Canada')
    const [constPointOfOrigin,  setConstPointOfOrigin]   = useState('Québec')
    const [constRadiusKm,       setConstRadiusKm]        = useState('2000')
    const [constJurisdictions,  setConstJurisdictions]   = useState('Canada, toutes les provinces')
    const [constTrigger,        setConstTrigger]         = useState('Événement déclancheur')
    const [constCircumstances,  setConstCircumstances]   = useState('Toutes les circonstances')
    const [depPermissions,      setDepPermissions]       = useState('')
    // Données du dépendent \
    const [depFirstNames,       setDepFirstNames]        = useState('Solange')
    const [depLastName,         setDepLastName]          = useState('Robitaille')
    const [depBirthDate,        setDepBirthDate]         = useState('1936-12-25')
    const [depBirthplace,       setDepBirthplace]        = useState('Chibougamau, Québec')
    const [depFatherFullName,   setDepFatherFullName]    = useState('Jean Robitaille')
    const [depMotherFullName,   setDepMotherFullName]    = useState('Marie Tremblay')
    const [depGender,           setDepGender]            = useState('')
    const [depNativeLanguage,   setDepNativeLanguage]    = useState('Français')
    const [depIdentifyingMarks, setDepIdentifyingMarks]  = useState('S/O')
    const [depPhoto,            setDepPhoto]             = useState('S/O')
    const [depIris,             setDepIris]              = useState('S/O')
    const [depFingerprint,      setDepFingerprint]       = useState('S/O')
    // Définition de connectionId 
    const [connectionId,        setConnectionId]         = useState('')

    // Permissions 
    const [inventaire,          setInventaire]           = useState(false)
    const [allocations,         setAllocations]          = useState(false)
    const [argent,              setArgent]               = useState(false)
    const [declRevenu,          setDeclRevenu]           = useState(false)
    const [contrats,            setContrats]             = useState(false)


    useEffect(() => {
        setConnectionId        (props.data.connection_id); 
        setHolderFirstNames    (props.data.data.subjectFirstNames); 
        setHolderLastName      (props.data.data.subjectLastName); 
        setHolderBirthDate     (props.data.data.subjectBirthDate); 
        setHolderBirthplace    (props.data.data.subjectBirthplace); 
        setHolderGender        (props.data.data.subjectGender); 
        setHolderFatherFullName(props.data.data.subjectFatherFullName); 
        setHolderMotherFullName(props.data.data.subjectMotherFullName); 
        setHolderPhoto         (props.data.data.subjectPhoto); 
        setIssuanceDate(retrieveToday()); 
        setDepGender(t('translation:gender.female'));
    });

    function retrieveISODate(){
        return new Date().toISOString(); 
    }

    function retrieveToday(){
        return retrieveISODate().substring(0,10); 
    }

    function handleChange(e, seta) {
        let isChecked = e.target.checked;
        /*console.log("Is button checked? " + isChecked); 
        console.log(e.target.name); 
        console.log(e.target.value); */
        seta(e.target.checked);
    }

    function validerEntree(){
        if(depFirstNames     ==='' | 
           depLastName       ==='' | 
           depBirthDate      ==='' | 
           depBirthplace     ==='' | 
           depFatherFullName ==='' | 
           depMotherFullName ==='' | 
           depGender         ==='' | 
           issuanceDate      ==='' | 
           expirationDate    ==='' | 
           holderRole        ===''
        ){
            toggle();
            return false;
        } else {
            return true;
        }
    }
    
    function handleRequest(){

        const mandat = {
            context             : credContext, 
            id                  : credId, 
            type                : credType, 
            schema              : credSchema,
            issuanceDate        : issuanceDate, 
            expirationDate      : expirationDate, 
            issuer              : credIssuer,
            trustFramework      : credTrustFw,
            auditURI            : auditURI,
            appealURI           : appealURI,
            holderType          : credHoldType,
            holderRole          : holderRole, 
            holderRationale     : holderRationale, 
            holderFirstNames    : holderFirstNames, 
            holderLastName      : holderLastName, 
            holderBirthDate     : holderBirthDate, 
            holderBirthplace    : holderBirthplace, 
            holderGender        : holderGender, 
            holderFatherFullName: holderFatherFullName, 
            holderMotherFullName: holderMotherFullName, 
            constBoundaries     : constBoundaries, 
            constPointOfOrigin  : constPointOfOrigin, 
            constRadiusKm       : constRadiusKm, 
            constJurisdictions  : constJurisdictions, 
            constTrigger        : constTrigger, 
            constCircumstances  : constCircumstances, 
            depType             : credDepType,
            depFirstNames       : depFirstNames, 
            depLastName         : depLastName, 
            depBirthDate        : depBirthDate, 
            depBirthplace       : depBirthplace, 
            depGender           : depGender, 
            depFatherFullName   : depFatherFullName, 
            depMotherFullName   : depMotherFullName, 
            depNativeLanguage   : depNativeLanguage, 
            depIdentifyingMarks : depIdentifyingMarks, 
            depPhoto            : depPhoto, 
            depIris             : depIris, 
            depFingerprint      : depFingerprint, 
            /*[Symbol.iterator]: function* () {
                let properties = Object.keys(this);
                for (let i of properties) {
                    yield [i, this[i]];
                }
            } */ 
        }
        if(validerEntree()){
            history.push('/emissioncuratelle', {
                connectionId: connectionId,
                mandat: mandat
            });
        }
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


                <Col md={4}>
                    <FormGroup>
                        <Label for="holderBirthplace">{t('identite:credentialSubject.birthplace')}</Label>
                        <Input type="text" className="inputField rounded-pill" name="holderBirthplace" id="holderBirthplace" onChange={(e) => setHolderBirthplace(e.target.value)} placeholder={t('identite:credentialSubject.birthplace')} value={holderBirthplace} disabled/>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="holderFatherFullName">{t('identite:credentialSubject.fatherFullName')}</Label>
                        <Input type="text" className="inputField rounded-pill" name="holderFatherFullName" id="holderFatherFullName" onChange={(e) => setHolderFatherFullName(e.target.value)} placeholder={t('identite:credentialSubject.fatherFullName')} value={holderFatherFullName} disabled/>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="holderMotherFullName">{t('identite:credentialSubject.motherFullName')}</Label>
                        <Input type="text" className="inputField rounded-pill" name="holderMotherFullName" id="holderMotherFullName" onChange={(e) => setHolderMotherFullName(e.target.value)} placeholder={t('identite:credentialSubject.motherFullName')} value={holderMotherFullName} disabled/>
                    </FormGroup>
                </Col>


                <Col md={4}>
                    <FormGroup>
                        <Label for="holderGender">{t('identite:credentialSubject.gender')}</Label>
                        <Input type="text" className="inputField rounded-pill" name="holderGender" id="holderGender"  onChange={(e) => setHolderGender(e.target.value)} value={holderGender} disabled/>
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={4}>
                    <FormGroup>
                        <div id="preview">
                            <Label for="photoPreview">Photo</Label>
                            <img src={holderPhoto} id="photoImage" width="200" />   
                        </div>
                    </FormGroup>
                </Col>
            </Row>
            <br />
            <h3>Données de la personne dépendante</h3>
            <hr/>
            <Row form>
                <Col md={4}>
                    <FormGroup>
                        <Label for="depFirstNames">{t('identite:credentialSubject.firstNames')}*</Label>
                        <Input type="text" className="inputField rounded-pill" name="depFirstNames" id="depFirstNames" onChange={(e) => setDepFirstNames(e.target.value)} placeholder={t('identite:credentialSubject.firstNames')} value={depFirstNames} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="depLastName">{t('identite:credentialSubject.lastName')}*</Label>
                        <Input type="text" className="inputField rounded-pill" name="depLastName" id="depLastName" onChange={(e) => setDepLastName(e.target.value)} placeholder={t('identite:credentialSubject.lastName')} value={depLastName} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="birthDate">{t('identite:credentialSubject.birthDate')}*</Label>
                        <Input type="date" className="inputField rounded-pill" name="depBirthDate" id="depBirthDate" onChange={(e) => setDepBirthDate(e.target.value)} placeholder={t('identite:credentialSubject.birthDate')} value={depBirthDate} />
                    </FormGroup>
                </Col>


                <Col md={4}>
                    <FormGroup>
                        <Label for="depBirthplace">{t('identite:credentialSubject.birthplace')}*</Label>
                        <Input type="text" className="inputField rounded-pill" name="depBirthplace" id="depBirthplace" onChange={(e) => setDepBirthplace(e.target.value)} placeholder={t('identite:credentialSubject.birthplace')} value={depBirthplace} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="depFatherFullName">{t('identite:credentialSubject.fatherFullName')}*</Label>
                        <Input type="text" className="inputField rounded-pill" name="depFatherFullName" id="depFatherFullName" onChange={(e) => setDepFatherFullName(e.target.value)} placeholder={t('identite:credentialSubject.fatherFullName')} value={depFatherFullName} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="depMotherFullName">{t('identite:credentialSubject.motherFullName')}*</Label>
                        <Input type="text" className="inputField rounded-pill" name="depMotherFullName" id="depMotherFullName" onChange={(e) => setDepMotherFullName(e.target.value)} placeholder={t('identite:credentialSubject.motherFullName')} value={depMotherFullName} />
                    </FormGroup>
                </Col>


                <Col md={4}>
                    <FormGroup>
                        <Label for="depGender">{t('identite:credentialSubject.gender')}*</Label>
                        <Dropdown isOpen={genderdropdownOpen} toggle={gendertoggle}  className="inputField rounded-pill">
                            <DropdownToggle caret color="light" className="inputField rounded-pill">
                                {depGender}
                            </DropdownToggle>
                            <DropdownMenu value={depGender} name="gender">
                                <DropdownItem name="male"   onClick={(e) => { setDepGender(e.target.innerText) }} >{t('translation:gender.male')}  </DropdownItem>
                                <DropdownItem name="female" onClick={(e) => { setDepGender(e.target.innerText) }} >{t('translation:gender.female')}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="depNativeLanguage">{t('identite:credentialSubject.depNativeLanguage')}</Label>
                        <Input type="text" className="inputField rounded-pill" name="depNativeLanguage" id="depNativeLanguage" onChange={(e) => setDepNativeLanguage(e.target.value)} placeholder={t('identite:credentialSubject.depNativeLanguage')} value={depNativeLanguage} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="depIdentifyingMarks">{t('identite:credentialSubject.depIdentifyingMarks')}</Label>
                        <Input type="text" className="inputField rounded-pill" name="depIdentifyingMarks" id="depIdentifyingMarks" onChange={(e) => setDepIdentifyingMarks(e.target.value)} placeholder={t('identite:credentialSubject.depIdentifyingMarks')} value={depIdentifyingMarks} />
                    </FormGroup>
                </Col>
            </Row>
            

            <br />
            <h3>Caractéristiques du mandat</h3>
            <hr/>

            <Row form>
                <Col md={4}>
                    <FormGroup>
                        <Label for="issuanceDate">Date d'émission*</Label>
                        <Input type="date" className="inputField rounded-pill" name="issuanceDate" id="issuanceDate" onChange={(e) => setIssuanceDate(e.target.value)} placeholder="Date d'émission" value={issuanceDate} disabled/>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="expirationDate">Date d'expiration*</Label>
                        <Input type="date" className="inputField rounded-pill" name="expirationDate" id="expirationDate" onChange={(e) => setExpirationDate(e.target.value)} placeholder="Date d'éxpiration" value={expirationDate} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="holderRole">Rôle du responsable*</Label>
                        <Input type="text" className="inputField rounded-pill" name="holderRole" id="holderRole" onChange={(e) => setHolderRole(e.target.value)} placeholder="Role" value={holderRole} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="holderRationale">Explication du rôle </Label>
                        <Input type="text" className="inputField rounded-pill" name="holderRationale" id="holderRationale" onChange={(e) => setHolderRationale(e.target.value)} placeholder="Rationale" value={holderRationale} />
                    </FormGroup>
                </Col>
                
            </Row>
            <br />
            <h3>Limites de la personne responsable</h3>
            <hr/>
            <Row form>
                <Col md={4}>
                    <FormGroup>
                        <Label for="constBoundaries">Frontières</Label>
                        <Input type="text" className="inputField rounded-pill" name="constBoundaries" id="constBoundaries" onChange={(e) => setConstBoundaries(e.target.value)} placeholder="Frontières" value={constBoundaries} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="constPointOfOrigin">Point d'origine</Label>
                        <Input type="text" className="inputField rounded-pill" name="constPointOfOrigin" id="constPointOfOrigin" onChange={(e) => setConstPointOfOrigin(e.target.value)} placeholder="Point d'origine" value={constPointOfOrigin} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="constRadiusKm">Rayon en km</Label>
                        <Input type="text" className="inputField rounded-pill" name="constRadiusKm" id="constRadiusKm" onChange={(e) => setConstRadiusKm(e.target.value)} placeholder="Rayon en km" value={constRadiusKm} />
                    </FormGroup>
                </Col>

                <Col md={4}>
                    <FormGroup>
                        <Label for="constRadiusKm">Juridictions</Label>
                        <Input type="text" className="inputField rounded-pill" name="constJurisdictions" id="constJurisdictions" onChange={(e) => setConstJurisdictions(e.target.value)} placeholder="Juridictions" value={constJurisdictions} />
                    </FormGroup>
                </Col>                
                <Col md={4}>
                    <FormGroup>
                        <Label for="constCircumstances">Circonstances</Label>
                        <Input type="text" className="inputField rounded-pill" name="constCircumstances" id="constCircumstances" onChange={(e) => setConstCircumstances(e.target.value)} placeholder="Circonstances" value={constCircumstances} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="constTrigger">Déclancheur </Label>
                        <Input type="text" className="inputField rounded-pill" name="constTrigger" id="constTrigger" onChange={(e) => setConstTrigger(e.target.value)} placeholder="Trigger" value={constTrigger} />
                    </FormGroup>
                </Col>

            </Row>
            <br />
            <h3>Droits exercés par le responsable</h3>
            <hr/>
            <Row form>
            <Col md={4}>
                    <FormGroup>
                        <Input type="checkbox" name="allocations" id="allocations" onChange={(e) => handleChange(e, setAllocations)} value={allocations} /> Percevoir allocations et indemnités
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Input type="checkbox" name="inventaire" id="inventaire" onChange={(e) => handleChange(e, setInventaire)} value={inventaire} /> Faire inventaire  
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Input type="checkbox" name="argent" id="argent" onChange={(e) => handleChange(e, setArgent)} value={argent} /> Gérer argent et placements
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Input type="checkbox" name="contrats" id="contrats" onChange={(e) => handleChange(e, setContrats)} value={contrats} /> Gérer contrats signés avant mandat
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Input type="checkbox" name="declRevenu" id="declRevenu" onChange={(e) => handleChange(e, setDeclRevenu)} value={declRevenu} /> Préparer déclaration de revenus
                    </FormGroup>
                </Col>
            </Row>

            <br />
            <Button onClick={handleRequest} outline color="primary" className="m-3">{t('identite:btnIssue')}</Button>
            <br />
            <br />
            <br />
            <br />
            <div>
                <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>{t('identite:ANIGIdentity')}</ModalHeader>
                <ModalBody>{t('identite:modalMessage')}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>{t('identite:ok')}</Button>{' '}
                </ModalFooter>
                </Modal>
            </div>
        </Form>
    );
}

export default MandatCuratelleForm;