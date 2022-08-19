using System.ComponentModel.DataAnnotations;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.Entities
{
    public class UsuarioInformacao
    {
        [Key]
        public int UsuarioInformacaoId { get; set; }

        // Fk (De lá pra cá);
        public int UsuarioId { get; set; }

        public int Genero { get; set; }
        public DateTime DataAniversario { get; set; }
        public string? CPF { get; set; } = null;
        public string? Telefone { get; set; } = null;
        public string? Rua { get; set; } = null;
        public string? NumeroResidencia { get; set; } = null;
        public string? CEP { get; set; } = null;
        public string? Bairro { get; set; } = null;

        public string? TituloLojinha { get; set; } = null;
        public double? QtdEstrelas { get; set; } = 0;

        public DateTime? DataUltimaAlteracao { get; set; } = HorarioBrasilia();
    }
}
