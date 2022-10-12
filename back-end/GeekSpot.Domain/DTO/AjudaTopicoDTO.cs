using System.ComponentModel.DataAnnotations;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.DTO
{
    public class AjudaTopicoDTO
    {
        [Key]
        public int AjudaTopicoId { get; set; }
        public string? Topico { get; set; } = null;
        public string? Descricao { get; set; } = null;
        public bool IsAtivo { get; set; } = true;
        public DateTime? DataRegistro { get; set; } = HorarioBrasilia();
    }
}
