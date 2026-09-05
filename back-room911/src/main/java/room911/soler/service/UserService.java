package room911.soler.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import room911.soler.dto.UserRequest;
import room911.soler.entity.User;
import room911.soler.repository.DepartmentRepository;
import room911.soler.repository.UserRepository;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;


    public Page<User> getUsersPage(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public User createUser(UserRequest request) {

        if (userRepository.existsById(request.getIdentificationNumber())) {
            System.out.println("hola mk eso ya existe");
            throw new RuntimeException("El usuario ya existe");
        }

        if (request.getIdDepartment() != null &&
                !departmentRepository.existsById(request.getIdDepartment())) {
            throw new RuntimeException("El departamento no existe");
        }

        User user = new User(
                request.getIdentificationNumber(),
                request.getUsertype(),
                request.getFirstName(),
                request.getLastName(),
                request.getIdDepartment(),
                request.getPassword(),
                request.getAllow()
        );

        return userRepository.save(user);
    }

    public User updateUser(Long id, UserRequest request) {
        User user = getUserById(id);

        if (request.getIdDepartment() != null &&
                !departmentRepository.existsById(request.getIdDepartment())) {
            throw new RuntimeException("El departamento no existe");
        }

        user.setUsertype(request.getUsertype());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setIdDepartment(request.getIdDepartment());
        user.setPassword(request.getPassword());
        user.setAllow(request.getAllow());

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    public void importUsersFromCSV(MultipartFile file) {

        if (file.isEmpty()) {
            throw new RuntimeException("Archivo CSV vacío");
        }

        try (
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8)
                );

                CSVParser csvParser = CSVFormat.DEFAULT
                        .withFirstRecordAsHeader()
                        .withIgnoreHeaderCase()
                        .withTrim()
                        .parse(reader)
        ) {

            for (CSVRecord record : csvParser) {

                Long identificationNumber = Long.parseLong(record.get("identificationNumber"));

                if (userRepository.existsById(identificationNumber)) {
                    continue;
                }

                Long idDepartment = Long.parseLong(record.get("idDepartment"));

                if (!departmentRepository.existsById(Math.toIntExact(idDepartment))) {
                    throw new RuntimeException("Departamento no existe: " + idDepartment);
                }

                User user = new User();
                user.setIdentificationNumber(identificationNumber);
                user.setUsertype(record.get("usertype"));
                user.setFirstName(record.get("firstName"));
                user.setLastName(record.get("lastName"));
                user.setIdDepartment(Math.toIntExact(idDepartment));
                user.setPassword(record.get("password"));
                user.setAllow(Boolean.parseBoolean(record.get("allow")));

                userRepository.save(user);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error procesando CSV: " + e.getMessage(), e);
        }
    }


    public void importUsersFromExcel(MultipartFile file) throws Exception {

        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            Long id = (long) row.getCell(0).getNumericCellValue();
            if (userRepository.existsById(id)) continue;

            User user = new User();
            user.setIdentificationNumber(id);
            user.setUsertype(row.getCell(1).getStringCellValue());
            user.setFirstName(row.getCell(2).getStringCellValue());
            user.setLastName(row.getCell(3).getStringCellValue());
            user.setIdDepartment((int) row.getCell(4).getNumericCellValue());
            user.setPassword(row.getCell(5).getStringCellValue());
            user.setAllow(row.getCell(6).getBooleanCellValue());

            userRepository.save(user);
        }

        workbook.close();
    }
}
