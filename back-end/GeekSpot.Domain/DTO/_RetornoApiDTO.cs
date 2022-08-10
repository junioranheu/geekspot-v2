namespace GeekSpot.Domain.DTO
{
    public class _RetornoApiDTO
    {
        public bool Erro { get; set; } = false;
        public int CodigoErro { get; set; } = 0;
        public string? Mensagem { get; set; } = string.Empty;
    }
}
