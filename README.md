# Proyecto Next.js - Gestión de Graduados

## Requisitos para ejecutar el proyecto

1. Instalar dependencias:
```bash
npm install
```
2. Instalar dependencias:

```bash
npx prisma generate
```
3. Crear un archivo .env en la raíz del proyecto con el siguiente contenido:
```bash
DATABASE_URL="postgresql://graduados_user:oCpZhue1dXCY49sGekiumkaQa8fpw70M@dpg-d17maq6mcj7s73c0u2o0-a.oregon-postgres.render.com/graduados"
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
## Usuarios de prueba

Puedes iniciar sesión con los siguientes usuarios para acceder a las diferentes vistas:

| Rol          | Usuario  | Contraseña  |
|--------------|----------|-------------|
| **Administrador** | `analu123` | `secure123` |
| **Graduado**      | `reyner`   | `1234`      |
