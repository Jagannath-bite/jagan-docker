pipeline {

    agent any

    environment {
        DOCKER_USER = "jagannath239"
        BACKEND_IMAGE = "jagannath-backend"
        FRONTEND_IMAGE = "jagannath-frontend"
        TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/Jagannath-bite/jagan-docker.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                echo "Building Backend Image..."
                docker build -t $DOCKER_USER/$BACKEND_IMAGE:$TAG ./backend

                echo "Building Frontend Image..."
                docker build -t $DOCKER_USER/$FRONTEND_IMAGE:$TAG ./frontend
                '''
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhubcred',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {

                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    '''
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh '''
                docker push $DOCKER_USER/$BACKEND_IMAGE:$TAG
                docker push $DOCKER_USER/$FRONTEND_IMAGE:$TAG
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                docker-compose down || true
                docker-compose pull
                docker-compose up -d
                '''
            }
        }
    }

    post {

        success {
            echo "✅ Pipeline Completed Successfully!"
        }

        failure {
            echo "❌ Pipeline Failed. Check logs."
        }

        always {
            sh 'docker logout || true'
        }
    }
}
