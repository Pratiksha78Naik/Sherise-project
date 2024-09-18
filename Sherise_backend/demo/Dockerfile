# Use Maven image to build the project
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy project files
COPY pom.xml pom.xml
COPY src src

# Run the Maven build to create the JAR file
RUN mvn clean package -DskipTests

# Use the OpenJDK runtime image for the final image
FROM openjdk:17-jdk-slim

# Set the working directorydocker images

WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar /app/demo.jar

# Expose the port the application runs on
EXPOSE 8080

# Specify the command to run the JAR file
ENTRYPOINT ["java", "-jar", "demo.jar"]