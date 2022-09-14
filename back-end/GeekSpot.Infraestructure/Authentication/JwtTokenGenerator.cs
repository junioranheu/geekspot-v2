using GeekSpot.Application.Common.Interfaces.Authentication;
using GeekSpot.Application.Common.Interfaces.Services;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;
using GeekSpot.Utils;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GeekSpot.Infraestructure.Authentication
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly JwtSettings _jwtSettings;
        private readonly IDateTimeProvider _dateTimeProvider;

        public JwtTokenGenerator(IDateTimeProvider dateTimeProvider, IOptions<JwtSettings> jwtOptions)
        {
            _dateTimeProvider = dateTimeProvider;
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

            SecurityTokenDescriptor tokenDescriptor = new()
            {
                Issuer = _jwtSettings.Issuer, // Emissor do token;
                Audience = _jwtSettings.Audience,
                NotBefore = _dateTimeProvider.HorarioBrasilia,
                Expires = _dateTimeProvider.HorarioBrasilia.AddMinutes(_jwtSettings.ExpiryMinutes),
                Subject = claims,
                SigningCredentials = signingCredentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
