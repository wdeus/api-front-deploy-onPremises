# Usar a imagem oficial do Jenkins como base
FROM jenkins/jenkins:lts

# Definir que as operações abaixo sejam executadas como root para poder instalar pacotes
USER root

# Instalar Node.js (incluindo npm) na versão 18.19
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g @angular/cli@latest

# Definir o usuário de volta para Jenkins para manter as permissões corretas
USER jenkins

# Expor a porta padrão do Jenkins
EXPOSE 8080

# Inicializar o Jenkins
CMD ["bash", "-c", "/usr/local/bin/jenkins.sh"]
