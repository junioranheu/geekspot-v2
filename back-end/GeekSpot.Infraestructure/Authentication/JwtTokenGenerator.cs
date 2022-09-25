using GeekSpot.Application.Common.Interfaces.Authentication;
using GeekSpot.Domain.DTO;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Infraestructure.Authentication
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly JwtSettings _jwtSettings;

        public JwtTokenGenerator(IOptions<JwtSettings> jwtOptions)
        {
            _jwtSettings = jwtOptions.Value;
        }

        public string GerarToken(UsuarioSenhaDTO usuario)
        {
            JwtSecurityTokenHandler tokenHandler = new();

            SigningCredentials signingCredentials = new(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret ?? "")),
                algorithm: SecurityAlgorithms.HmacSha256Signature
            );

            ClaimsIdentity claims = new(
                new Claim[]
                {
                    new Claim(type: ClaimTypes.Name, usuario.NomeCompleto ?? ""),
                    new Claim(type: ClaimTypes.Role, usuario.UsuarioTipoId.ToString()),
                    new Claim(type: ClaimTypes.NameIdentifier, usuario.UsuarioId.ToString())
                }
            );

            // DateTime horarioBrasiliaJWT = Debugger.IsAttached ? HorarioBrasilia().AddHours(-3) : HorarioBrasilia();
            DateTime horarioBrasiliaJWT = HorarioBrasilia();

            SecurityTokenDescriptor tokenDescriptor = new()
            {
                Issuer = _jwtSettings.Issuer, // Emissor do token;
                IssuedAt = horarioBrasiliaJWT,
                Audience = _jwtSettings.Audience,
                NotBefore = horarioBrasiliaJWT,
                Expires = horarioBrasiliaJWT.AddMinutes(_jwtSettings.TokenExpiryMinutes),
                Subject = claims,
                SigningCredentials = signingCredentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);
            return jwt;
        }

        // Como gerar um refresh token: https://www.youtube.com/watch?v=HsypCNm56zs&t=1021s&ab_channel=balta.io;
        public string GerarToken(IEnumerable<Claim> claims)
        {
            JwtSecurityTokenHandler tokenHandler = new();

            SigningCredentials signingCredentials = new(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret ?? "")),
                algorithm: SecurityAlgorithms.HmacSha256Signature
            );

            // DateTime horarioBrasiliaJWT = Debugger.IsAttached ? HorarioBrasilia().AddHours(-3) : HorarioBrasilia();
            DateTime horarioBrasiliaJWT = HorarioBrasilia();

            SecurityTokenDescriptor tokenDescriptor = new()
            {
                Issuer = _jwtSettings.Issuer, // Emissor do token;
                IssuedAt = horarioBrasiliaJWT,
                Audience = _jwtSettings.Audience,
                NotBefore = horarioBrasiliaJWT,
                Expires = horarioBrasiliaJWT.AddMinutes(_jwtSettings.TokenExpiryMinutes),
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = signingCredentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);
            return jwt;
        }

        public string GerarRefreshToken()
        {
            var numeroAleatorio = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(numeroAleatorio);
            var refreshToken = Convert.ToBase64String(numeroAleatorio);

            return refreshToken;
        }

        public ClaimsPrincipal? GetInfoTokenExpirado(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret ?? "")),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Token inválido");
            }

            return principal;
        }
    }
}
