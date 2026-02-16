# ---- Build Frontend ----
FROM node:22-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Setup Backend ----
FROM python:3.11-slim
WORKDIR /app

# Install Python dependencies
COPY server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY server ./server

# Copy built frontend
COPY --from=frontend /app/dist ./static

# Expose port
EXPOSE 8080

# Run with static file serving
CMD ["python", "-m", "uvicorn", "server.app:app", "--host", "0.0.0.0", "--port", "8080"]
