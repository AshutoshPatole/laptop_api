pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..';
                sh 'npm i';
                sh 'npm start'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}