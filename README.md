# Adoppet API

Adoppet API is a next-generation backend system designed for facilitating pet adoptions. Built with **NestJS** and **Prisma**, the API integrates modern technologies, such as blockchain for transparent and immutable adoption tracking, while supporting comprehensive user and pet management.

---

## Features

### Blockchain Integration
- **Transparent Adoption Records**:
  - Each pet adoption is securely recorded on the blockchain for immutable tracking.
  - Provides a transparent and verifiable history of adoptions for users and administrators.
- **Tokenized Ownership**:
  - Adoption records can be tokenized for proof of adoption or special privileges.

### Structured Adoption Process
- **Adoption Stages**:
  - Multi-step adoption workflows, from application submission to final approval.
  - Status management through predefined states like `Pending`, `Approved`, or `Completed`.
- **Adoption History**:
  - Track all user and pet adoptions over time.
  - Detailed information for administrators to audit and manage the process.

### User Features
- **Secure User Management**:
  - Registration and login using hashed passwords (bcrypt) and JWT-based session handling.
- **Favorites and Posts**:
  - Users can bookmark pets as favorites for easy access.
  - Share updates or stories about pets through posts with text and image content.

### Pet Management
- **Comprehensive Pet Profiles**:
  - Manage details such as name, description, age, height, weight, gender, and type.
  - Attach multiple images and posts to create a rich profile for each pet.
- **Health and Background Details**:
  - Maintain a detailed record of pet history, including vaccinations and previous owners.

### Geolocation and Address System
- **Precise Location Data**:
  - Each user can provide an address linked to countries, cities, and districts.
  - Integration of geographic coordinates (latitude/longitude) for mapping and search.

### Modern API Features
- **RESTful API Design**:
  - Clean and structured endpoints for managing users, pets, adoptions, and more.
- **Real-Time Notifications** (optional):
  - Notify users about adoption updates, new pets, or post interactions.

---

## Tech Stack

### Core Technologies
- **NestJS**: Framework for building scalable and maintainable server-side applications.
- **Prisma ORM**: Database toolkit for PostgreSQL with type-safe schema generation.

### Blockchain
- **Ethereum or Polygon** (recommended): Leveraged for decentralized and immutable adoption records.
- **Smart Contracts**:
  - Custom smart contracts manage adoption data and tokenized ownership records.

### Database
- **PostgreSQL**: High-performance relational database for structured data.

### Authentication
- **JWT (JSON Web Tokens)**: Stateless authentication for secure user sessions.
- **bcrypt**: Password hashing for enhanced security.

---

## Adoption Process Workflow

1. **Pet Listing**:
   - Admins or users can list pets for adoption with detailed profiles.
   
2. **Adoption Application**:
   - Users apply for adoption, providing necessary details and preferences.

3. **Review Process**:
   - Admins evaluate applications and update the adoption process status (`Pending`, `Under Review`, etc.).

4. **Blockchain Confirmation**:
   - Approved adoptions are recorded on the blockchain for transparency and proof.

5. **Completion**:
   - Users receive a certificate or token representing the finalized adoption.

---

## Installation

### Prerequisites
- Node.js (v16+)
- PostgreSQL database
- Blockchain wallet (e.g., MetaMask) for blockchain integrations

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/tayyipozr/adoppet-api.git
   cd adoppet-api
