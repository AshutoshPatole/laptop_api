pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo "Building..$BUILD_NUMBER";
                sh 'docker-compose build';
                sh 'docker-compose up -d';
                echo "Built..."
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