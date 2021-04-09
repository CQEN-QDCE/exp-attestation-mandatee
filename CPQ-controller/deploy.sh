oc new-project curateur-qc --display-name="PES Curateur Public" --description="Issuer d'attestation de mandat pour le Curateur public du Québec" 

oc new-build --image-stream nodejs --strategy source --binary=true --name=curateur-qc 

tar -zcvf deploy.tar.gz --exclude 'node_modules' --exclude 'build' --exclude 'deploy.tar.gz' .

oc start-build curateur-qc --from-archive=deploy.tar.gz

oc logs curateur-qc-1-build -f

oc new-app curateur-qc --allow-missing-imagestream-tags 

oc expose svc curateur-qc --name=emetteur

oc patch svc curateur-qc --patch '{"spec":{"ports":[{"name": "8080-tcp", "port": 8080, "targetPort": 16000 }]}}'

oc get route

rm deploy.tar.gz