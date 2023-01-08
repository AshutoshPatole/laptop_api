pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..';
                sh 'npm i';
                sh 'pwd && sudo docker-compose up -d '
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