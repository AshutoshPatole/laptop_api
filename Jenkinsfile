pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo "Building..$BUILD_NUMBER";
                sh 'sudo docker-compose build';
                sh 'sudo docker-compose up -d';
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