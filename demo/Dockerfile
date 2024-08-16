# Use a base image with Java 21 installed
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot application will run on
EXPOSE 8082

# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
