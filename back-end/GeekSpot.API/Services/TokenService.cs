using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GeekSpot.API.Services
{
    public static class TokenService
    {
        private static readonly byte[] chave = Encoding.ASCII.GetBytes(Chave.chave);

        public static string ServicoGerarToken(int usuarioId, string nomeUsuarioSistema, int usuarioTipoid)
        {
            var tokenHandler = new JwtSecurityTokenHandler
            {
                SetDefaultTimesOnTokenCreation = false
            };

            // Aqui em específico, o Token NÃO pode ter a data no formato/fuso brasileiro;
            DateTime horarioExpiracao = DateTime.UtcNow.AddHours(720);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, nomeUsuarioSistema),
                    new Claim(ClaimTypes.Role, usuarioTipoid.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, usuarioId.ToString())
                }),
                Expires = horarioExpiracao,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(chave), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
