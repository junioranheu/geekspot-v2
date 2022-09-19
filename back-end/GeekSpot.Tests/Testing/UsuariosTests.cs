using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;
using GeekSpot.Tests.Services;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Xunit;

namespace GeekSpot.Tests.Testing
{
    public class UsuariosTests
    {
        private readonly TestClientProvider _testProvider;
        private const string caminhoApi = "/api/Usuarios";

        public UsuariosTests()
        {
            _testProvider = new TestClientProvider();
        }

        [Fact]
        public async Task Test_GetTodos()
        {
            using var client = _testProvider.Client;

            // Autenticar;
            var autenticar = await client.PostAsJsonAsync("/api/Autenticar/login", new UsuarioSenhaDTO
            {
                NomeUsuarioSistema = "adm",
                Senha = "123"
            });

            autenticar.EnsureSuccessStatusCode();
            var autenticarContentStr = await autenticar.Content.ReadAsStringAsync(); // Conteúdo da resposta em string (JSON "bagunçado");
            var autenticarContent = JsonConvert.DeserializeObject<UsuarioSenhaDTO>(autenticarContentStr); // Converter string para a classe em si;

            // Teste unitário;
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", autenticarContent?.Token);
            var response = await client.GetAsync($"{caminhoApi}/todos");
            response.EnsureSuccessStatusCode();

            var contentStr = await response.Content.ReadAsStringAsync(); // Conteúdo da resposta em string (JSON "bagunçado");
            var content = JsonConvert.DeserializeObject<List<UsuarioDTO>>(contentStr); // Converter string para a classe em si;

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.True(content?.Count > 0);
        }

        [Theory]
        [InlineData(1, HttpStatusCode.OK)]
        [InlineData(2, HttpStatusCode.OK)]
        [InlineData(100, HttpStatusCode.NotFound)]
        public async Task Test_GetById(int usuarioId, HttpStatusCode resultadoEsperado)
        {
            using var client = _testProvider.Client;
            var response = await client.GetAsync($"{caminhoApi}/{usuarioId}");
            // response.EnsureSuccessStatusCode();

            var contentStr = await response.Content.ReadAsStringAsync();
            var content = JsonConvert.DeserializeObject<Usuario>(contentStr);

            Assert.Equal(resultadoEsperado, response.StatusCode);
        }
    }
}
