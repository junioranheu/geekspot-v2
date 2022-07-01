using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GeekSpot.API.Models
{
    public class Usuario
    {
        [Key]
        public int UsuarioId { get; set; }
        public string? NomeCompleto { get; set; }
        public string? Email { get; set; }
        public string? NomeUsuarioSistema { get; set; }
        public string? Senha { get; set; }

        // Fk (De lá pra cá);
        public int UsuarioTipoId { get; set; }
        public UsuarioTipo? UsuariosTipos { get; set; }

        public string? Foto { get; set; }
        public DateTime DataRegistro { get; set; }
        public DateTime DataOnline { get; set; }
        public int IsAtivo { get; set; }
        public int IsPremium { get; set; }
        public int IsVerificado { get; set; }

        // Fk (De cá pra lá);
        [JsonIgnore]
        public UsuarioInformacao? UsuariosInformacoes { get; set; }
    }
}
