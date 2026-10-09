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
                sh 'npm ci'
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