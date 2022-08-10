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
            //var signingCredentials = new SigningCredentials(
            //        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret ?? "")), algorithm: SecurityAlgorithms.HmacSha256
            //    );

            //var claims = new[] {
            //    new Claim(type: JwtRegisteredClaimNames.Sub, usuario.UsuarioId.ToString()),
            //    new Claim(type: JwtRegisteredClaimNames.Name, usuario.NomeCompleto ?? ""),
            //    new Claim(type: JwtRegisteredClaimNames.Typ, usuario.UsuarioTipoId.ToString() ?? ""),
            //    new Claim(type: JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            //};

            //var securityToken = new JwtSecurityToken(
            //        issuer: _jwtSettings.Issuer, // Emissor do token;
            //        audience: _jwtSettings.Audience,
            //        expires: _dateTimeProvider.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes),
            //        claims: claims,
            //        signingCredentials: signingCredentials
            //    );

            //return new JwtSecurityTokenHandler().WriteToken(securityToken);

            var tokenHandler = new JwtSecurityTokenHandler
            {
                SetDefaultTimesOnTokenCreation = false
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _jwtSettings.Issuer, // Emissor do token;
                Audience = _jwtSettings.Audience,
                Expires = _dateTimeProvider.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes),
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(type: ClaimTypes.Name, usuario.NomeCompleto ?? ""),
                    new Claim(type: ClaimTypes.Role, usuario.UsuarioTipoId.ToString()),
                    new Claim(type: ClaimTypes.NameIdentifier, usuario.UsuarioId.ToString())
                }),

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret ?? "")), algorithm: SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
