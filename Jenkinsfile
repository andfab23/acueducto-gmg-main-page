pipeline {

    agent any

    environment {
        // Ajusta la ruta según la ubicación de Chromium en tu servidor (ej. /usr/bin/chromium o /usr/bin/chromium-browser)
        CHROME_BIN = '/usr/bin/chromium'
    }

    tools{
        nodejs 'NodeJS'
    }
    stages{

        stage('Security Scan with Snyk'){
            steps{
                script{
                    withCredentials([string(credentialsId: 'SNYK_API_TOKEN', variable: 'SNYK_TOKEN')]){
                        try{
                            // 1. Instalar Snyk CLI
                            sh 'npm install -g snyk'
                            // 2. Autenticación
                            sh 'snyk auth ${SNYK_TOKEN}'
                            // 3. Test de vulnerabilidades (fail-on si hay vulnerabilidades altas/críticas)
                            sh 'snyk test --all-projects --severity-threshold=high'
                            // 4. Monitoreo continuo (opcional)
                            sh 'snyk monitor --all-projects'
                            // 5. Generar reporte HTML (opcional)
                            sh 'snyk test --all-projects --json-file-output=snyk_results.json'
                            sh '''
                            npm install -g snyk-to-html
                            snyk-to-html -i snyk_results.json -o snyk_report.html
                            '''
                            // Publicar reporte Snyk
                            publishHTML target: [
                            allowMissing: true,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: '.',
                            reportFiles: 'snyk_report.html',
                            reportName: 'Snyk Security Report'
                            ]
                        }catch (err){
                            echo "Snyk scan failed: ${err}"
                            // Marcar build como inestable si hay vulnerabilidades
                            currentBuild.result = 'UNSTABLE'
                        }
                    }
                }
            }
        }
        stage('Checkout') {
            steps {
                git(
                    branch: 'main',
                    url: 'https://github.com/andfab23/acueducto-gmg-main-page.git'
                )
            }
        }
        // Etapa 2: Instalar dependencias, construir y generar cobertura
        stage('Environments') {
            steps {
                sh 'npm i'
            }
        }
        // Etapa 3: Lint
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        // Etapa 4: Test
        stage('Test'){
            steps {
                sh 'npm run test:ci'
            }
        }
        // Etapa 5: construir 
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }

    post{
        always {
            echo 'Pipeline finalizado.'
        }

        success {
            echo 'Pipeline completado satisfactoriamente!'
        }

        failure {
            echo 'Pipeline falló. Por favor, revisa los logs para más detalles.'
        }
    }
}