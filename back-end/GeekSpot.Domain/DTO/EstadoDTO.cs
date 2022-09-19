using System.ComponentModel.DataAnnotations;

namespace GeekSpot.Domain.DTO
{
    public class EstadoDTO : _RetornoApiDTO
    {
        [Key]
        public int EstadoId { get; set; } = 0;
        public string? Nome { get; set; } = null;
        public string? Sigla { get; set; } = null;
        public bool IsAtivo { get; set; } = true;
    }
}
