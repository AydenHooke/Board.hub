package up.board.backend;

import java.util.Date;
import java.util.HashMap;

import javax.crypto.SecretKey;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import up.board.backend.Entity.Account;

public class JwtUtil {

  private int expiration = 3600000; // 1 hour
  private SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

  //
  public String generateToken(Account account) {

    var claimsMap = new HashMap<String, Integer>();
    claimsMap.put("id", account.getAccountId());

    return Jwts
        .builder()
        .setClaims(claimsMap)
        .setSubject(account.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(key)
        .compact();
  }

  //
  public String validateTokenAndGetUsername(String token) {
    try {
      var claims = Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token)
          .getBody();
      return claims.getSubject();
    } catch (JwtException | IllegalArgumentException e) {
      throw new RuntimeException("Invalid JWT Token");
    }
  }

}
