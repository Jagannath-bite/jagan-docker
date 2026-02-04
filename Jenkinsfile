pipeline {

    agent any

    environment {
        DOCKER_USER = "jagannath239"
        BACKEND_IMAGE = "fullstack-backend"
        FRONTEND_IMAGE = "fullstack-frontend"
        TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/Jagannath-bite/jagan-docker.git'
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                echo "Building Backend Image..."
                docker build -t $DOCKER_USER/$BACKEND_IMAGE:$TAG ./backend

                echo "Building Frontend Image..."
                docker build -t $DOCKER_USER/$FRONTEND_IMAGE:$TAG ./frontend
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhubcred',
                    usernameVariable: 'DOCKER_USER_NAME',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER_NAME" --password-stdin
                    '''
                }
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                docker push $DOCKER_USER/$BACKEND_IMAGE:$TAG
                docker push $DOCKER_USER/$FRONTEND_IMAGE:$TAG
                '''
            }
        }

        stage('Deploy') {
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
            echo "✅ CI/CD Pipeline Completed Successfully"
        }

        failure {
            echo "❌ CI/CD Pipeline Failed"
        }

        always {
            sh 'docker logout || true'
        }
    }
}
