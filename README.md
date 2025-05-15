# 📦 Cep Request and User Register

Este é um projeto Full Stack simples desenvolvido com foco em portfólio. Ele consiste em uma aplicação CRUD de cadastro de clientes com preenchimento automático de endereço baseado no CEP, utilizando a API do ViaCep.

---

## 🚀 Tecnologias e Ferramentas

### Front-end

- **Angular**: Estruturação e componentização
- **Tailwind CSS**: Estilização moderna e responsiva

### Back-end

- **Java 21**
- **Spring Boot 3.3.7**
- **MySQL**
- **Maven**
- **Arquitetura MVC**
---

## 🔧 Configurações do Projeto

### application.properties

```properties
spring.application.name=backend

# Configurações do Banco de Dados
spring.datasource.url=jdbc:mysql://localhost:3306/crud_bd?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root

# Configurações do Hibernate
spring.jpa.hibernate.ddl-auto=update
```

### pom.xml (Principais Dependências)

- spring-boot-starter-data-jpa
- spring-boot-starter-web
- spring-boot-starter-validation
- spring-boot-devtools
- mysql-connector-j
- lombok
- spring-boot-starter-test

```xml
<properties>
    <java.version>21</java.version>
</properties>
```

---

## 🎯 Funcionalidades

- Cadastro de usuários com validação de dados
- Preenchimento automático de endereço via **ViaCEP**
- Tabela com funcionalidades de **busca**, **edição** e **remoção**
- Escolha de colunas para busca
- Integração total entre front-end e back-end

---

## 📑 Endpoints REST

```java
@RestController
@RequestMapping("/users")
public interface UserController {

    @PostMapping
    ResponseEntity<UserDto> create(@RequestBody UserDto newUser);

    @PutMapping
    ResponseEntity<UserDto> update(@RequestBody UserDto user);

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable UUID id);

    @GetMapping
    ResponseEntity<List<UserDto>> getAll();
}
```

---

## 🧪 Como rodar o projeto

### Pré-requisitos

- Node.js + Angular CLI
- Java 21+
- MySQL
- Maven

### Rodando o Front-end

```bash
cd frontend
npm install
ng serve
```

### Rodando o Back-end

```bash
cd backend
./mvnw spring-boot:run
```

---

## 🎨 Design

O layout e identidade visual foram projetados no **Figma**, priorizando clareza, responsividade e boa experiência do usuário.

---

## 🧠 Aprendizados

Este projeto permitiu exercitar e demonstrar habilidades práticas com:

- Integração entre front-end e back-end
- Boas práticas RESTful
- Estilização moderna com Tailwind
- Consumo de APIs externas com TypeScript
- Validação de dados em formulários
- Organização de código com arquitetura MVC

---

## 📚 Contribuições e Melhorias Futuras

- Autenticação de usuários
- Paginação e ordenação na tabela
- Testes unitários e de integração
- Deploy com Docker

