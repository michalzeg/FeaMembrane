Set-Location ./src/FeaMembrane.Web/ClientApp
npm install
Set-Location ../

# Start the .NET application using dotnet run
Start-Process -FilePath "cmd" -ArgumentList "/c", "dotnet run"

# Start the Angular application using ng serve
Start-Process -FilePath "cmd" -ArgumentList "/c", "cd ./ClientApp && ng serve"
