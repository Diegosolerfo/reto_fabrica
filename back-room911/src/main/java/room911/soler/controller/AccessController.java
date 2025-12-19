package room911.soler.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import room911.soler.entity.Access;
import room911.soler.service.AccessService;

import java.util.List;

@RestController
@RequestMapping("/api/access")
@CrossOrigin(origins = "http://localhost:3000")
public class AccessController {

    private final AccessService accessService;
    @GetMapping
    public List<Access> getAllAccess() {
        return accessService.getAllAccess();
    }

    public AccessController(AccessService accessService) {
        this.accessService = accessService;
    }

    @GetMapping("/pdf/{id}")
    public void generatePdf(
            @PathVariable Long id,
            HttpServletResponse response
    ) throws Exception {

        response.setContentType("application/pdf");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=historial_" + id + ".pdf"
        );

        accessService.generateAccessPdf(id, response);
    }
}
