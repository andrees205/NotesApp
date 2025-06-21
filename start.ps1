# PowerShell script to start backend and frontend in separate terminals

# Set relative paths
$backendPath = ".\backend"
$frontendPath = ".\frontend"

# Start backend (Spring Boot)
Start-Process powershell -ArgumentList "cd `"$backendPath`"; mvn spring-boot:run"

# Start frontend (React)
Start-Process powershell -ArgumentList "cd `"$frontendPath`"; npm start"
