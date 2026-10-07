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
                sh 'npm run test'
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
}