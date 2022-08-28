using GeekSpot.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Domain.DTO
{
    public class ItemImagemDTO
    {
        [Key]
        public int ItemImagemId { get; set; }

        public string? CaminhoImagem { get; set; } = null;

        // Fk (De lá pra cá);
        public int ItemId { get; set; }

        public int IsAtivo { get; set; } = 1;
        public DateTime? DataRegistro { get; set; } = HorarioBrasilia();
    }
}
