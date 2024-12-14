node -v > .nvmrc;
cd ../
npm create vite@latest frontend -y

# -----------------------------------------------------------------------------------------------------------
# Scaffold a new react project based on TypeScript using vite

cd frontend
npm i
npm i react-router-dom
npm install @mui/material @emotion/react @emotion/styled
