pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..';
                sh 'pwd && sudo docker-compose up --build'
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