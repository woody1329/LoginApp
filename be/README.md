To be able to start the project, make sure you have docker desktop installed.
Clone the repo locally.
Open a terminal in the repos root folder (same directory as 'docker-compose.yml') and run:
    'docker-compose up --build'

To create NEW migrations, you need to run makemigrations from the backend containers terminal.
Existing migrations are applied by the Dockerfile.