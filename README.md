# Angular-SpringBoot-Charity
This is a full-stack web application built using Angular (frontend) and Spring Boot (backend). The platform is designed to support charity organizations, volunteers, donors, and refugees by facilitating assistance, donations, and communication




## Features
- User authentication (JWT-based login, register, logout)
- Forgot password and reset password functionality
- Role-based access control (Admin/User)
- Event management with location selection
- Integration with Google Maps for event location display

## Technologies Used
- **Backend:** Spring Boot, Spring Security, Spring Data JPA
- **Database:** MySQL/PostgreSQL
- **Authentication:** JWT, OAuth2 (Google, GitHub)
- **Frontend (Optional):** Angular 16
- **Other:** Lombok, MapStruct, Swagger for API documentation

## Prerequisites
- Java 17+
- Maven 3+
- MySQL database
- Postman/swagger (for API testing, optional)

## Installation
### 1. Clone the Repository
```sh
git clone https://github.com/your-repo.git
cd your-project
```

### 2. Configure Database
Update `application.properties` or `application.yml` with your database configuration:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 3. Build and Run
```sh
mvn clean install
mvn spring-boot:run
```
The application will start on `http://localhost:8082`.

## API Endpoints
### Authentication
| Method | Endpoint                 | Description          |
|--------|--------------------------|----------------------|
| POST   | `/api/auth/register`     | User registration   |
| POST   | `/api/auth/login`        | User login          |
| POST   | `/api/auth/forgot-password` | Send reset link |
| POST   | `/api/auth/reset-password` | Reset password |


## Running with Docker
1. Build the Docker image:
```sh
docker build -t springboot-app .
```
2. Run the container:
```sh
docker run -p 8082:8082 springboot-app
```

## Swagger API Documentation
Once the app is running, access Swagger UI at:
```
http://localhost:8082/swagger-ui/index.html
```

## Contributing
Feel free to submit issues or pull requests.


Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

Running unit tests
Run ng test to execute the unit tests via Karma.

Running end-to-end tests
Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

Further help
To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.









