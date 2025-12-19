/*DROP DATABASE IF EXISTS room911;
CREATE DATABASE room911
    WITH OWNER = postgres
    ENCODING = 'UTF8';
	
DROP TABLE IF EXISTS department CASCADE;
CREATE TABLE department (
    idDepartment SERIAL PRIMARY KEY,
    name_ VARCHAR(40) NOT NULL,
    description VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    identificationNumber BIGINT PRIMARY KEY,
    usertype VARCHAR(20) NOT NULL,
    firstName VARCHAR(40) NOT NULL,
    lastName VARCHAR(40) NOT NULL,
    idDepartment INT,
    password_ VARCHAR(100) NOT NULL,
    allow BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_department
        FOREIGN KEY (idDepartment)
        REFERENCES department (idDepartment)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

DROP TABLE IF EXISTS access_ CASCADE;
CREATE TABLE access_ (
    idAccess SERIAL PRIMARY KEY,
    date_ DATE DEFAULT CURRENT_DATE NOT NULL,
    hour_ TIME DEFAULT LOCALTIME NOT NULL,
    identification BIGINT NOT NULL
);

INSERT INTO department (name_, description)
VALUES
('DMA', 'Departamento de medicamentos para el Alzheimer'),
('TI', 'Tecnología de la información'),
('ADMIN', 'Administración general');

INSERT INTO users (
    identificationNumber,
    usertype,
    firstName,
    lastName,
    idDepartment,
    password_,
    allow
) VALUES (
    1147484290,
    'administrador',
    'Diego',
    'Soler',
    1,
    '12345',
    TRUE
);

INSERT INTO access_ (identification)
VALUES (1147484290);
*/
INSERT INTO department (name_, description)
VALUES
('DNI', 'Departamento de investigacion de narcoticos e infecciones'),
('ET', 'Experimentos de transplante'),
('EF', 'Efe be y');
--SELECT * FROM USERS;
--SELECT * FROM ACCESS_;
SELECT * FROM DEPARTMENT;