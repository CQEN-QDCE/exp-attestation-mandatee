/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                                      from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent                            from '../components/HeaderComponent'
import FooterComponent                            from '../components/FooterComponent'
import MainContainer                              from '../containers/MainContainer'
import LoginContainer                             from '../containers/LoginContainer'
import NoAuthContainer                            from '../containers/NoAuthContainer'
import HomeContainer                              from '../containers/HomeContainer'
import ErrorContainer                             from '../containers/ErrorContainer'

import RegistreIdentiteContainer                  from '../RegistreIdentite/containers/RegistreIdentiteContainer'
import QRRegistreIdentiteContainer                from '../RegistreIdentite/containers/QRRegistreIdentiteContainer'
import ProofRegistreIdentiteContainer             from '../RegistreIdentite/containers/ProofRegistreIdentiteContainer'
import VerificationIdentiteContainer              from '../RegistreIdentite/containers/VerificationIdentiteContainer'

import QRPresentationResponsable                  from '../RegistreMandat/containers/QRPresentationResponsable'
import VerificationResponsable                    from '../RegistreMandat/containers/VerificationResponsable'
import QRPresentationCuratelle                    from '../RegistreMandat/containers/QRPresentationCuratelle'
import VerificationMandat                         from '../RegistreMandat/containers/VerificationMandat'
import EmissionParMandat                          from '../RegistreMandat/containers/EmissionParMandat'
import PresentationEmission                       from '../RegistreMandat/containers/PresentationEmission'

import Auth                                       from '../helpers/Auth'


const PrivateRoute = ({ component, ...options }) => {
	const finalComponent = Auth.getAuth() ? component : NoAuthContainer;
	return <Route {...options} component={finalComponent} />;
};

function Routes() {
	return (
		<Router>
			<div>
				<Route component={HeaderComponent}/>
				<Switch>

					{ /* Routes attestation - Registre Identité */ }
					<PrivateRoute path="/registreidentite" component={RegistreIdentiteContainer} />
					<PrivateRoute path="/qrregistreidentite" component={QRRegistreIdentiteContainer} />
					<PrivateRoute path="/verificationidentite" component={VerificationIdentiteContainer} />
					<PrivateRoute path="/proofregistreidentite" component={ProofRegistreIdentiteContainer} />

                    {/* Routes attestation - Identité par mandat de curatelle */}
                    <PrivateRoute path="/qrmandatresp" component={QRPresentationResponsable} />
                    <PrivateRoute path="/verificationresp" component={VerificationResponsable} />
                    <PrivateRoute path="/qrmandatcuratelle" component={QRPresentationCuratelle} />
                    <PrivateRoute path="/verificationmandat" component={VerificationMandat} />
                    <PrivateRoute path="/emissionmandat" component={EmissionParMandat} />
                    <PrivateRoute path="/presentationemission" component={PresentationEmission} />
                    <PrivateRoute path="/emissionerror" component={ErrorContainer} />
                    
					{ /* Routes de base de l'app */ }
					<PrivateRoute path="/home"   component={HomeContainer} />
					<Route        path="/noauth" component={NoAuthContainer} />
					<Route        path="/login"  component={LoginContainer} />
					<Route        path="/" exact component={MainContainer} />

				</Switch>
				<FooterComponent />
			</div>
		</Router>
	)
}

export default Routes
