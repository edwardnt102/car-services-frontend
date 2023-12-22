node ('slave01'){
    try {
    checkout scm
    // To change
    def image="webapp"
    def FullWS = "./dist/car-service"
    def DockerComoseName = "docker-compose.dev.yml"
    def ComposePath  = '/usr/local/bin/docker-compose'
    def registry = "iteinfrastructure/${image}"
    def Workspace = "/usr/src/workspace/${env.JOB_NAME}"

    stage('Build') {
        checkout scm
        sh "npm install"
        sh "npm i gzipper -g"
        sh 'rm -rf node_modules/@angular/compiler-cli/ngcc/__ngcc_lock_file__'
        sh "npm run build"
        docker.build(registry + ":$BUILD_NUMBER" + " --build-arg SourceLink=${FullWS}", "-f Dockerfile .")
    }

    stage('Deploy to DevelopEnv') {
      withEnv(["VERSION=$BUILD_NUMBER"]) {
             sh "cd ${Workspace} && ${ComposePath} -f ${DockerComoseName} down"
             sh "cd ${Workspace} && ${ComposePath} -f ${DockerComoseName} -p ${image} up -d"
      }
    }

    }catch (e) {
    throw e
    } finally {
    }
}
