# AppNotes

AppNotes is a full-stack web application for creating and managing personal notes, organized by categories.

---

## 📁 Project Structure

AppNotes/
├── frontend/ # React + TypeScript + Bootstrap
├── backend/ # Spring Boot + JPA + MySQL + Liquibase
└── README.md

---

## 🧩 Requirements

- Node.js >= 18
- Java >= 17
- Maven >= 3.6
- MySQL or MariaDB >= 10

---

## 🛠️ Configuration for Another PC

To run this app on a different machine, make sure to:

### 🔐 1. Update MySQL Credentials

Edit the following file:
backend/src/main/resources/application.properties

Update this section:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dbnotes
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

Make sure to also update the database name and port if needed.

CORS must be enabled to allow your frontend (e.g., http://localhost:3000) to make API requests to the backend.

Go to: backend/src/main/java/com/webnotes/NotesApp/config/CorsConfig.java

Example configuration:
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }
}

If you move to production or use a different frontend origin, update "http://localhost:3000" accordingly.

🚀 How to Run

cd backend
mvn spring-boot:run
Runs at: http://localhost:8080

cd frontend
npm install
npm run dev
Runs at: http://localhost:3000


