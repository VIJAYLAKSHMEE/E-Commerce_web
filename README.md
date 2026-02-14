# E-commerce Frontend Website with DevOps

This is a frontend E-commerce website built with modern web technologies and DevOps practices.

## Features
- Product catalog display
- Shopping cart functionality
- Checkout simulation
- Responsive design

## DevOps Features
- Docker containerization
- CI/CD pipeline with GitHub Actions
- Automated deployment scripts

## Quick Start

### Using Docker
```
bash
docker build -t ecommerce-app .
docker run -p 8080:80 ecommerce-app
```

### Using Docker Compose
```
bash
docker-compose up
```

### Local Development
Simply open `index.html` in your browser or use a local server:
```
bash
npx serve .
```

## Tech Stack
- HTML5
- CSS3 (Modern with Flexbox/Grid)
- Vanilla JavaScript
- Docker
- GitHub Actions (CI/CD)

## Project Structure
```
E-commerce/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   └── app.js          # JavaScript logic
├── docker/
│   ├── Dockerfile      # Docker container definition
│   └── nginx.conf      # Nginx configuration
├── docker-compose.yml  # Docker Compose configuration
├── .github/
│   └── workflows/
│       └── deploy.yml  # CI/CD pipeline
└── README.md           # This file
