using GeekSpot.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.Infraestructure.Data.Seed
{
    public class SeedEstados
    {
        public static async Task Seed(Context context)
        {
            #region seed_estados
            if (!await context.Estados.AnyAsync())
            {
                await context.Estados.AddAsync(new Estado() { EstadoId = 1, Nome = "Acre", Sigla = "AC", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 2, Nome = "Alagoas", Sigla = "AL", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 3, Nome = "Amapá", Sigla = "AP", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 4, Nome = "Amazonas", Sigla = "AM", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 5, Nome = "Bahia", Sigla = "BA", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 6, Nome = "Ceará", Sigla = "CE", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 7, Nome = "Espírito Santo", Sigla = "ES", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 8, Nome = "Goiás", Sigla = "GO", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 9, Nome = "Maranhão", Sigla = "MA", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 10, Nome = "Mato Grosso", Sigla = "MT", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 11, Nome = "Mato Grosso do Sul", Sigla = "MS", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 12, Nome = "Minas Gerais", Sigla = "MG", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 13, Nome = "Pará", Sigla = "PA", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 14, Nome = "Paraíba", Sigla = "PB", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 15, Nome = "Paraná", Sigla = "PR", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 16, Nome = "Pernambuco", Sigla = "PE", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 17, Nome = "Piauí", Sigla = "PI", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 18, Nome = "Rio de Janeiro", Sigla = "RJ", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 19, Nome = "Rio Grande do Norte", Sigla = "RN", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 20, Nome = "Rio Grande do Sul", Sigla = "RS", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 21, Nome = "Rondônia", Sigla = "RO", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 22, Nome = "Roraima", Sigla = "RR", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 23, Nome = "Santa Catarina", Sigla = "SC", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 24, Nome = "São Paulo", Sigla = "SP", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 25, Nome = "Sergipe", Sigla = "SE", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 26, Nome = "Tocantins", Sigla = "TO", IsAtivo = 1 });
                await context.Estados.AddAsync(new Estado() { EstadoId = 27, Nome = "Distrito Federal", Sigla = "DF", IsAtivo = 1 });
            }
            #endregion
        }
    }
}
