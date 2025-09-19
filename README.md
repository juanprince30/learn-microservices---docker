## ECOMMERCE-MICROSERVICES

An E-commerce app to illustrate microservices concepts by using docker and docker-compose to simplify container creation and orchestration!

## FEATURES

- An **API Gateway**  
- Microservices (**user-service, product-service, order-service**)  
- A **React frontend**  
- An **Nginx reverse proxy**  
- Optional **monitoring setup**


## Tree

```
ecommerce-microservices
├─ .env
├─ api-gateway
│  ├─ Dockerfile
│  ├─ package.json
│  └─ src
│     └─ index.js
├─ docker-compose.monitoring.yml
├─ docker-compose.override.yml
├─ docker-compose.yml
├─ frontend
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ public
│  │  └─ index.html
│  └─ src
│     └─ index.js
├─ nginx
│  ├─ Dockerfile
│  └─ nginx.conf
├─ order-service
│  ├─ Dockerfile
│  ├─ package.json
│  └─ src
│     └─ index.js
├─ product-service
│  ├─ app
│  │  └─ main.py
│  ├─ Dockerfile
│  ├─ init.sql
│  └─ requirements.txt
├─ README.md
├─ script
│  ├─ backup.sh
│  ├─ deploy.sh
│  └─ text.sh
└─ user-service
   ├─ Dockerfile
   ├─ package.json
   └─ src
      └─ index.js

```

## Requirements

Make sure you have installed:  
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)  
- [Node.js](https://nodejs.org/) & [npm](https://www.npmjs.com/) (if you want to run services locally without Docker)  
- [Python 3](https://www.python.org/downloads/) (for the product service)



## Dev

- Clone the repo

```bash
    git clone https://github.com/juanprince30/learn-microservices---docker.git
    cd learn-react-js-Faso-market
```

- BUILD AND START CONTAINERS 

```bash
    docker-compose up --build
```

- Use the script to build and start Containers 

```bash
    ./script/deploy.sh
```

- Test if everything is Okay

```bash
    ./script/test.sh
```
