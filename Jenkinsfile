pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/<your-username>/devops-fullstack.git'
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                docker-compose down
                docker-compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful"
        }
        failure {
            echo "❌ Deployment Failed"
        }
    }
}
