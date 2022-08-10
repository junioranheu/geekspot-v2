using System.ComponentModel.DataAnnotations;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.DTO
{
    public class UsuarioSenhaDTO : _RetornoApiDTO
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

        public string? Token { get; set; } = null;
        public int UsuarioTipoId { get; set; }
        public string? Foto { get; set; } = null;
        public DateTime DataRegistro { get; set; } = HorarioBrasilia();
        public DateTime DataOnline { get; set; }
        public int IsAtivo { get; set; } = 1;
        public int IsPremium { get; set; } = 0;
        public int IsVerificado { get; set; } = 0;
    }
}
