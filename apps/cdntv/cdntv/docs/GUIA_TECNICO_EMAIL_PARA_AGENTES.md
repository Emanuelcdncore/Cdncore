# Guia Técnico: Implementação de Envio de Email (SMTP) com Backend Dedicado

**Destinatário:** Dev Team / Agentes IA de outros projetos
**Objetivo:** Replicar a solução de formulário de contacto seguro usando Node.js + Nodemailer.

---

## 1. O Problema e a Solução
**Problema:** Sites estáticos (Next.js output: export) ou SPAs não têm servidor para processar segredos de email (SMTP password) com segurança.
**Solução:** Criar um micro-serviço (Backend) simples em Node.js/Express que recebe o JSON do frontend e envia o email via SMTP.

**Arquitetura:**
```mermaid
[Frontend (Site)] --> (JSON) --> [Backend (Node API)] --> (SMTP) --> [Servidor de Email]
```

---

## 2. Implementação do Backend (Node.js)

### 2.1 Dependências Necessárias
```bash
npm install express nodemailer cors helmet express-rate-limit dotenv
```

### 2.2 Estrutura do Servidor (`server.js`)
O servidor deve ter **CORS** restrito ao domínio do site e **Rate Limiting** para evitar spam.

```javascript
/* server.js simplificado */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app = express();
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// 1. Segurança: CORS (Apenas o site pode chamar)
app.use(cors({ origin: ['https://teu-site.com', 'http://localhost:3000'] }));

// 2. Segurança: Rate Limiting (5 pedidos por 15 min)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, 
    message: { error: "Vá com calma! Tente novamente mais tarde." }
});
app.use('/api/contact', limiter);

// 3. Rota de Envio
app.post('/api/contact', async (req, res) => {
    const { nome, email, mensagem } = req.body;
    
    // Sanitização básica (remover HTML)
    const cleanMsg = mensagem.replace(/<[^>]*>/g, ''); 

    // Configuração SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: `"Site Contact" <${process.env.SMTP_USER}>`, // Quem envia (autenticado)
            to: process.env.SMTP_USER, // Para onde vai (ti mesmo)
            replyTo: email, // Responder ao cliente
            subject: `Novo Contacto de ${nome}`,
            text: `Email: ${email}\n\nMensagem:\n${cleanMsg}`
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao enviar email." });
    }
});

app.listen(4000, () => console.log('Backend na porta 4000'));
```

### 2.3 Variáveis de Ambiente (`.env`)
**CRÍTICO:** Nunca commitar este ficheiro.
```ini
SMTP_HOST=mail.teudominio.com
SMTP_PORT=587
SMTP_USER=social@teudominio.com
SMTP_PASS=password_segura
```

---

## 3. Implementação do Frontend

### 3.1 Chamada API
O frontend deve apenas enviar o JSON para o endpoint do backend.

```javascript
/* contactApi.ts */
// Em produção usar o domínio real, em dev usar localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function sendForm(data) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### 3.2 Segurança no Frontend
1.  **Loading State:** Desabilitar o botão "Enviar" enquanto processa.
2.  **Validação:** Garantir que o email tem formato válido antes de enviar.
3.  **Feedback:** Mostrar mensagem de Sucesso ou Erro baseada na resposta da API.

---

## 4. Dockerização (Para Deploy)

Para isolar o backend, usar um `Dockerfile` multi-stage:

```dockerfile
# Dockerfile Backend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
# Utilizador não-root por segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 4000
CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
services:
  backend:
    build: ./Server
    ports: ["4000:4000"]
    env_file: .env   # Passar as credenciais SMTP aqui
    restart: always
```

---

## 5. Resumo das Boas Práticas (Checklist)

*   [x] **Separar responsabilidades:** Frontend mostra, Backend processa.
*   [x] **Rate Limiting:** Essencial para evitar spam/ataques DDoS.
*   [x] **Sanitização:** Remover tags HTML (`<script>`) da mensagem.
*   [x] **Hardcoded Destination:** O email de destino (`to`) é definido no servidor, nunca confie no `to` vindo do frontend (evita relay de spam).
*   [x] **Security Headers:** Usar `helmet` no Express.
*   [x] **Docker:** Correr como utilizador não-root.
