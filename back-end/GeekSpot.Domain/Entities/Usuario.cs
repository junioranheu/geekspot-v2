using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.Entities
{
    public class Usuario
    {
        [Key]
        public int UsuarioId { get; set; }

        [Required]
        public string? NomeCompleto { get; set; } = null;

        [Required]
        public string? Email { get; set; } = null;

        [Required]
        public string? NomeUsuarioSistema { get; set; } = null;

        [Required]
        public string? Senha { get; set; } = null;

        // Fk (De lá pra cá);
        public int UsuarioTipoId { get; set; }
        public UsuarioTipo? UsuariosTipos { get; set; }

        public string? Foto { get; set; }
        public DateTime DataRegistro { get; set; } = HorarioBrasilia();
        public DateTime DataOnline { get; set; }
        public int IsAtivo { get; set; } = 1;
        public int IsPremium { get; set; } = 0;
        public int IsVerificado { get; set; } = 0;

        // Fk (De cá pra lá);
        [JsonIgnore]
        public UsuarioInformacao? UsuariosInformacoes { get; set; }
    }
}
