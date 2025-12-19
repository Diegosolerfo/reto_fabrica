package room911.soler.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import room911.soler.entity.Access;
import room911.soler.entity.User;
import room911.soler.repository.AccessRepository;
import room911.soler.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccessService {
    private final AccessRepository accessRepository;
    private final UserRepository userRepository;

    public List<Access> getAllAccess() {
        return accessRepository.findAll();
    }
    public void generateAccessPdf(Long identification, HttpServletResponse response) throws Exception {

        if (!userRepository.existsById(identification)) {
            throw new RuntimeException("Usuario no existe");
        }

        List<Access> accesses = accessRepository.findByUser(identification);
        User user = userRepository.findById(identification)
                .orElseThrow(() -> new RuntimeException("Usuario no existe"));


        Document document = new Document();
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition",
                "attachment; filename=historial_" + identification + "_" + user.getFirstName() + " " + user.getLastName() +".pdf");

        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        document.add(new Paragraph("Historial de accesos"));
        document.add(new Paragraph("Usuario: " + identification + " " + user.getFirstName() + " " + user.getLastName()));
        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(3);
        table.addCell("ID");
        table.addCell("Fecha");
        table.addCell("Hora");

        for (Access a : accesses) {
            table.addCell(String.valueOf(a.getIdAccess()));
            table.addCell(a.getDate().toString());
            table.addCell(a.getHour().toString());
        }

        document.add(table);
        document.close();
    }
}
