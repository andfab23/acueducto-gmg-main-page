pipeline {

    agent any

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
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}