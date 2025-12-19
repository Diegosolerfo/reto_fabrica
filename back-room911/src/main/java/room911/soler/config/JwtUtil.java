package room911.soler.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_STRING = "room911_secret_key_super_segura_2025";
    private final long EXPIRATION_TIME = 5 * 60 * 1000;
    private final java.security.Key SECRET_KEY = Keys.hmacShaKeyFor(
            SECRET_STRING.getBytes(java.nio.charset.StandardCharsets.UTF_8)
    );

    public String generateToken(Long identificationNumber, String role) {
        return Jwts.builder()
                .setSubject(String.valueOf(identificationNumber))
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token) {
        try {
            extractClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public String extractIdentification(String token) {
        return extractClaims(token).getSubject();
    }
}
