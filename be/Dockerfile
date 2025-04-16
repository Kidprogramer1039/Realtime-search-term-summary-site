# 1) Gradle 빌드용 이미지
FROM gradle:7.6.0-jdk17 AS builder
WORKDIR /app

# Gradle Wrapper 및 설정 파일 복사
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# 실행 권한 부여
RUN chmod +x gradlew

# 소스 코드 복사
COPY src src

# Gradle 캐시 정리 (옵션)
RUN ./gradlew --stop
RUN rm -rf /home/gradle/.gradle/caches/

# Gradle 빌드 (상세 로그 포함)
RUN ./gradlew clean build -x test --stacktrace --info

# 2) 실제 실행 이미지
FROM eclipse-temurin:17-jdk
WORKDIR /app

# 빌드된 JAR 파일 복사
COPY --from=builder /app/build/libs/*.jar app.jar

# 포트 열기
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java","-jar","app.jar"]
