oc new-project registre-qc --display-name="PES Registre Quebec" --description="Émetteur d'attestation d'Identité fondamentale pour Registre Québec"

oc new-build --image-stream nodejs --strategy source --binary=true --name=registre-qc 

tar -zcvf deploy.tar.gz --exclude 'node_modules' --exclude 'build' --exclude 'deploy.tar.gz' .

oc start-build registre-qc --from-archive=deploy.tar.gz

echo "Avant de dormir 240 sec."
sleep 240 

oc logs registre-qc-1-build -f

oc new-app registre-qc --allow-missing-imagestream-tags

oc expose svc registre-qc --name=emetteur

oc patch svc registre-qc --patch '{"spec":{"ports":[{"name": "8080-tcp", "port": 8080, "targetPort": 11000 }]}}'

oc get route

rm deploy.tar.gz