[![img](https://img.shields.io/badge/Cycle%20de%20Vie-Phase%20d%C3%A9couverte-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--R-blue)](LICENSE)

# Émettre une attestation d'identité dont le détenteur n'est pas le sujet, par un organisme qui se base sur l'émission d'une attestation de mandat d'un autre organisme
Voici les travaux réalisés dans le cadre d'une expérimentation basée sur le concept de l\'identité numérique. Le sujet: l\'émission d'une attestation par mandat de curatelle émis par le Curateur Publique du Québec dans le but d\'explorer les concepts techniques de la relation vérifiable et évaluer des modèles permettant de soutenir la relation mandataire-mandant pour l'attestation d'identité gouvernementale. 
## Table des matières

1. [Objectifs](#10-objectifs)

2. [Contexte](#20-contexte)

3. [Environnement d\'expérimentation](#30-environnement-dexpérimentation)

   1. [Conditions initiales et prémisses](#31-conditions-initiales-et-prémisses)

   2. [Médias standard disponibles](#32-médias-standard-disponibles)

4. [Démarche](#40-démarche)

5. [Attestation d'identité numérique](#50-le-contenu-de-lattestation)

6. [Résultats attendus](#60-résultats-attendus)

7. [Analyse](#70-analyse)

8. [Conclusion](#80-conclusion)

# 1.0 Objectifs

- Explorer les concepts techniques de la relation vérifiable.

- Évaluer des modèles permettant de soutenir la relation
  mandataire-mandant pour l'attestation d'identité gouvernementale.

# 2.0 Contexte

Le contrôle indirect de l'identité est complexe. Un cas d'utilisation
minimal a été élaboré afin de permettre la mise en place de toutes les
composantes nécessaires pour expérimenter le concept sans toutefois
régler les contraintes et particularités d'un cas d'affaires concret.

> _Solange est atteinte d'une maladie dégénérative. Ses enfants
> s'entendent afin que Luc, l'ainé de la famille, soit celui qui veille
> au bien-être et aux affaires de Solange. Luc fait donc une demande
> auprès du tribunal afin d'être nommé officiellement curateur de
> Solange. Une fois le mandat homologué, Luc fait une demande auprès du
> Registre d'identité Québec (ou organisme responsable du)_ ~~DEC~~ > _pour obtenir l'attestation d'identité de sa mère afin de l'aider à
> obtenir les différents services au nom de cette dernière._

<p align="center">
  <img src="Images/Contexte1.png" label="Contexte d'Alice" />

  <br>
  <b>Contexte de l'histoire de Luc et Solange</b>
</p>


1.  Luc fait une demande pour une attestation de mandat auprès du
    tribunal;

2.  Le tribunal requiert l'attestation numérique d'identité de Luc et
    les documents permettant au tribunal de statuer.

3.  Luc consent à présenter son attestation numérique d'identité et la
    documentation;

4.  Le tribunal valide l'attestation et la documentation;

5.  Le tribunal émet l'attestation du mandat à ~~la~~ Luc;

6.  Le tribunal consigne l'émission dans le dépôt de clé sécurisé de son agent.

7.  Luc fait une demande pour l'attestation numérique d'identité de
    Solange auprès du Registre d'identité Québec ~~DEC~~;

8.  Le RIQ ~~DEC~~ requiert l'attestation numérique d'identité de Luc et
    l'attestation de mandat;

9.  Luc consent à présenter son attestation numérique d'identité et
    l'attestation de mandat;

10. Le RIQ ~~DEC~~ valide les attestations;

11. Le RIQ ~~DEC~~ émet l'attestation numérique d'identité de Solange à
    la Luc;

12. Le RIQ ~~DEC~~ consigne l'émission dans le dépôt de clé sécurisé de son agent.

# 3.0 Environnement d\'expérimentation

L\'environnement d\'expérimentation peut être créé et reproduit en suivant la
documentation se retrouvant sur ce lien [procédure d\'installation](openshift/templates/README.md). Elle permet l/'installation et l/'exécution de l\'expérimentation.

## 3.1 Conditions initiales et prémisses

- Un (1) portefeuille numérique appartenant à Luc est disponible;

- Un répertoire distribué identitaire se conformant au _W3C -- VC Data
  Model 1.0_ est en place et permet d'émettre des attestations ainsi
  que les schémas associés;

- Un émetteur et consommateur d'attestations d'identité ~~représentant
  le DEC~~ est en place;

- Un émetteur et consommateur d'attestations de mandat représentant le
  Tribunal est en place;

- Luc n'a pas besoin de faire une vérification d'identité pour obtenir
  une attestation certifiant son identité;

- La documentation permettant d'identifier Solange et les preuves
  permettant d'établir la validité du mandat n'a pas besoin d'être
  vérifiée;

- Les notifications et publications entre les intervenants ne sont pas
  de la portée de l\'expérimentation. On assume qu'elles sont
  exécutées de manière appropriée lorsque mentionnées;

-   Quelques médias d'image standards ont été crées et déposées dans le 
    répertoire [d'Avatars](./Images/Avatar). Ces images peuvent être 
    utilisées dans les formulaires d'entrée de données de la PES d'émission 
    d'attestation. 
## 3.2 Médias standard disponibles 

Quelques médias d'image standards ont été crées et déposées dans le répertoire [d'Avatars](./images/Avatar). Ces images peuvent être utilisées dans les formulaires d'entrée de données de la PES d'émission d'attestation.
# 4.0 Démarche

<p align="center">
  <img src="images/FluxGardEtape1.png" label="Émission d'une attestation dont le sujet n'est pas le détenteur" />

  <br>
  <b>Diagramme de séquence - Émission d'attestation</b>
</p>

<p align="center">
  <img src="images/FluxGardEtape2.png" label="Émission d'une attestation dont le sujet n'est pas le détenteur" />

  <br>
  <b>Diagramme de séquence - Vérification d'attestation</b>
</p>
--- Image de la démarche. En attente de Phil. --- 

## 5.0 Le contenu des Attestations

Voici le schéma de données utilisé pour l\'attestation d\'identité numérique ainsi que pour sa délégation:

```json
{
  "schema_name": "Identité Gouvernementale",
  "schema_version": "1.1",
  "attributes": [
    "@context", 
    "id", 
    "type",
    "credentialSchema",
    "issuanceDate",
    "expirationDate", 
    "issuer",
    "trustFramework",
    "credentialSubject.id",
    "credentialSubject.firstNames",
    "credentialSubject.lastName",
    "credentialSubject.birthDate",
    "credentialSubject.birthplace",
    "credentialSubject.gender",
    "credentialSubject.fatherFullName",
    "credentialSubject.motherFullName", 
    "credentialSubject.photo"
  ]
}
```

Par exemple, l\'attestation d\'identité de luc pourrait être composée des valeurs suivantes:

|Nom de l'attribut | Valeurs |
|----------|---------|
| \@context | \[\"https://www.w3.org/2018/credentials/v1\", \"https://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/identite/v1\"\] |
| id  | http://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/identite/v1/RegistreIdentite.json |
| type | \[\"VerifiableCredential\",\"IdentityCredential\"\] |
| credentialSchema | V4SGRU86Z58d6TV7PBUe6f:3:CL:1573: Registre_Identite_Qc |
| issuanceDate | 2020-11-04T15:40:00Z |
| expirationDate | 2020-11-04T15:40:00Z |
| issuer | did:sov: V4SGRU86Z58d6TV7PBUe6f |
| trustFramework | http://iqn-trustframework.apps.exp.lab.pocquebec.org |
| credentialSubject.id | DID de Luc |
| credentialSubject.firstNames | Luc |
| credentialSubject.lastName | Plante |
| credentialSubject.birthDate | 1976-01-01T20:00:00Z |
| credentialSubject.birthplace | Ville de Québec |
| credentialSubject.gender | Masculin |
| credentialSubject.fatherFullName | Nom complet du père |
| credentialSubject.motherFullName | Solange Plante (nom complet de la mère) |

---

<b>Tableau 1 - Données de l\'attestation d\'identité de Luc</b>

Autre exemple, l\'attestation d\'identité de la mère de luc, Solange pourrait être composée des valeurs suivantes:

|Nom de l'attribut | Valeurs |
|----------|---------|
| \@context | \[\"https://www.w3.org/2018/credentials/v1\",\"https://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/identite/v1/\"\] |
| id | http://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/identite/v1/RegistreIdentite.json |
| type | \[\"VerifiableCredential\",\"IdentityCredential\"\] |
| credentialSchema | V4SGRU86Z58d6TV7PBUe6f:3:CL:1573: Registre_Identite_Qc |
| issuanceDate | 2020-11-04T15:40:00Z |
| expirationDate | 2020-11-04T15:40:00Z |
| issuer | did:sov: V4SGRU86Z58d6TV7PBUe6f |
| trustFramework | http://iqn-trustframework.apps.exp.lab.pocquebec.org |
| credentialSubject.id | DID de la mère |
| credentialSubject.firstNames | Solange |
| credentialSubject.lastName | Plante |
| credentialSubject.birthDate | 1950-01-01T20:00:00Z |
| credentialSubject.birthplace | Ville de Québec |
| credentialSubject.gender | Féminin |
| credentialSubject.fatherFullName | Nom du père |
| credentialSubject.motherFullName | Nom de la mère |

---

<b>Tableau 2 - Données de l\'attestation d\'identité de Solange</b>

Voici le 2e type de schéma de données utilisé cette fois-ci pour le mandat :

```json
{
  "schema_name": "Mandat de Curatelle",
  "schema_version": "1.0",
  "attributes": [
    "@context", 
    "id", 
    "type", 
    "credentialSchema",
    "issuanceDate", 
    "expirationDate",
    "issuer", 
    "trustFramework", 
    "auditURI",
    "appealURI",
    "credentialSubject.holder.type",
    "credentialSubject.holder.role",
    "credentialSubject.holder.rationaleURI",
    "credentialSubject.holder.firstNames",
    "credentialSubject.holder.lastName",
    "credentialSubject.holder.birthDate",
    "credentialSubject.holder.birthplace",
    "credentialSubject.holder.gender",
    "credentialSubject.holder.fatherFullName",
    "credentialSubject.holder.motherFullName",
    "credentialSubject.holder.constraints.boundaries",
    "credentialSubject.holder.constraints.pointOfOrigin",
    "credentialSubject.holder.constraints.radiusKm",
    "credentialSubject.holder.constraints.jurisdictions",
    "credentialSubject.holder.constraints.trigger",
    "credentialSubject.holder.constraints.circumstances",
    "credentialSubject.proxied.type",
    "credentialSubject.proxied.permissions",
    "credentialSubject.proxied.firstNames",
    "credentialSubject.proxied.lastName",
    "credentialSubject.proxied.birthDate",
    "credentialSubject.proxied.birthplace",
    "credentialSubject.proxied.gender",
    "credentialSubject.proxied.fatherFullName",
    "credentialSubject.proxied.motherFullName",
    "credentialSubject.proxied.nativeLanguage",
    "credentialSubject.proxied.identifyingMarks",
    "credentialSubject.proxied.photo",
    "credentialSubject.proxied.iris",
    "credentialSubject.proxied.fingerprint"
  ]
}
```
En exemple, l\'attestation du mandat délivré à luc (détenteur) pour sa mère Solange (sujet) pourrait être composée des valeurs suivantes:

|Nom de l'attribut | Valeurs |
|----------|---------|
| \@context | \[\"https://www.w3.org/2018/credentials/v1\", \"https://github.com/hyperledger/aries-rfcs/concepts/0103-indirect-identity-control\"\] |
| id | http://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/delegation/v1/MandatCuratelle.json |
| type | \[\"VerifiableCredential\",\"Proxy.G/IQNTrustFrameWork/1.0/AdultGuardaniship\"\] |
| credentialSchema | V4SGRU86Z58d6TV7PBUe6f:3:CL:1565:IQN-AdultGuardianship |
| issuanceDate | 2020-11-04T15:40:00Z |
| expirationDate | 2020-11-04T15:40:00Z |
| issuer | did:sov: V4SGRU86Z58d6TV7PBUe6f |
| trustFramework | http://iqn-trustframework.apps.exp.labs.pocquebec.org |
| auditURI | <https://audit.org/report> |
| appealURI | did:sov:defghijkl |
| credentialSubject.holder.type | http://iqn-trustframework.apps.exp.lab.Pocquebec.org/2020/credentials/iqn/identite/v1/RegistreIdentite.json |
| credentialSubject.holder.role | \"parent\" or \"grandparent\" or \"nextofkin\"\ etc |
| credentialSubject.holder.rationaleURI | N/A |
| credentialSubject.holder.firstNames | Luc |
| credentialSubject.holder.lastName | Plante |
| credentialSubject.holder.birthDate | 1976-01-01T20:00:00Z |
| credentialSubject.holder.birthplace | Ville de Québec |
| credentialSubject.holder.gender | Masculin |
| credentialSubject.holder.fatherFullName | Nom complet du père |
| credentialSubject.holder.motherFullName | Solange Plante (nom complet dela mère) |
| credentialSubject.holder.constraints.boundaries | N/A |
| credentialSubject.holder.constraints.pointOfOrigin | N/A |
| credentialSubject.holder.radiusKM | N/A |
| credentialSubject.holder.constraints.jurisdictions | N/A |
| credentialSubject.holder.constraints.trigger | N/A |
| credentialSubject.holder.constraints.circumstances | N/A |
| credentialSubject.holder.constraints.startTime | N/A |
| credentialSubject.holder.constraints.endTime | N/A |
| credentialSubject.proxied.type | http://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/identite/v1/RegistreIdentite.json |
| credentialSubject.proxied.permissions | {\"grant\": privileges, \"when\": condition} |
| credentialSubject.proxied.firstNames | Solange |
| credentialSubject.proxied.lastName | Plante |
| credentialSubject.proxied.birthDate | 1950-01-01T20:00:00Z |
| credentialSubject.proxied.birthplace | Ville de Québec |
| credentialSubject.proxied.gender | Féminin |
| credentialSubject.proxied.fatherFullName | Nom complet du père |
| credentialSubject.proxied.motherFullName | Nom complet de la mère |
| credentialSubject.proxied.nativeLanguage | Français |
| credentialSubject.proxied.identifyingMarks | N/A |
| credentialSubject.proxied.photo | N/A |
| credentialSubject.proxied.iris | N/A |
| credentialSubject.proxied.fingerprint | N/A |

---

<b>Tableau 3 - Données de l\'attestation du mandat</b>

#

# 6.0 Résultats attendus

Deux schemas d'attestation se retrouvent dans le répertoire de schemas. Ils doivent permettre:

a) Attestation d\'identité

- d\'identifier le sujet de l\'attestation;

b) Attestation de mandat

- d\'identifier la personne responsable dans le mandat de curatelle

- d\'identifier la personne dépendante dans le mandat de curatelle

- d\'établir le lien entre la personne responsable et la personne
  dépendante selon les termes consignés dans le mandat

- d\'identifier implicitement la personne responsable comme la
  détentrice de l'attestation d'identité de la personne dépendante
  émise par Registre Québec.

# 7.0 Analyse
ToDo

# 8.0 Conclusion
ToDo
