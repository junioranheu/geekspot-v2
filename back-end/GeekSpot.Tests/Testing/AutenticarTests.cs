using GeekSpot.Domain.DTO;
using GeekSpot.Tests.Services;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Json;
using Xunit;
using Xunit.Abstractions;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Tests.Testing
{
    public class AutenticarTests
    {
        private readonly TestClientProvider _testProvider;
        private readonly ITestOutputHelper _output; // https://xunit.net/docs/capturing-output;
        private const string caminhoApi = "/api/Autenticar";

        public AutenticarTests(ITestOutputHelper output)
        {
            _testProvider = new TestClientProvider();
            _output = output;
        }

        // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Login =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
        public static IEnumerable<object[]> Test_Login_Data()
        {
            yield return new object[] { new UsuarioSenhaDTO { Email = "", NomeUsuarioSistema = "junioranheu", Senha = "123" } };
            yield return new object[] { new UsuarioSenhaDTO { Email = "adm@hotmail.com", NomeUsuarioSistema = "", Senha = "123" } };
            yield return new object[] { new UsuarioSenhaDTO { Email = "", NomeUsuarioSistema = "", Senha = "" } };
            yield return new object[] { new UsuarioSenhaDTO { Email = "", NomeUsuarioSistema = "junioranheu", Senha = "" } };
        }

        [Theory]
        [MemberData(nameof(Test_Login_Data))]
        public async Task Test_Login(UsuarioSenhaDTO dto)
        {
            using var client = _testProvider.Client;

            var response = await client.PostAsJsonAsync($"{caminhoApi}/login", dto);
            // response.EnsureSuccessStatusCode();

            var contentStr = await response.Content.ReadAsStringAsync();
            var content = JsonConvert.DeserializeObject<UsuarioDTO>(contentStr);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.True(content is not null);

            if (content.Erro == true)
            {
                _output.WriteLine($"O objeto que tem o e-mail: \"{dto.Email}\", usuário: \"{dto.NomeUsuarioSistema}\" e senha: \"{dto.Senha}\" não é válido.");
                _output.WriteLine(content.MensagemErro);
            }
        }

        // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Registrar =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
        public static IEnumerable<object[]> Test_Registrar_Data()
        {
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = "Ju", Email = "junior@gmail.com", NomeUsuarioSistema = "junior1", Senha = "Potinha123@" } };
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = "Junior Roberto", Email = "email_invalido", NomeUsuarioSistema = "junior2", Senha = "Potinha123@" } };
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = "Junior Roberto", Email = "junioranheu111@hotmail.com", NomeUsuarioSistema = "ju111", Senha = "Junior30" } };
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = "Junior Roberto", Email = "junioranheu3@hotmail.com", NomeUsuarioSistema = "ju3", Senha = "Potinha123@" } };
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = "Junior Roberto", Email = "junioranheu4@hotmail.com", NomeUsuarioSistema = "junioranheu4", Senha = "123" } };
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = "Junior Roberto", Email = "junioranheu5@hotmail.com", NomeUsuarioSistema = "junioranheu5", Senha = "Potinha123@" } };
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = "Junior Roberto", Email = "junioranheu@hotmail.com", NomeUsuarioSistema = "junioranheu6", Senha = "Potinha123@" } };
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = "Junior Roberto", Email = "junioranheu7@hotmail.com", NomeUsuarioSistema = "junioranheu", Senha = "Potinha123@" } };
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = $"{GerarStringAleatoria(5, false)} {GerarStringAleatoria(5, false)}", Email = $"{GerarStringAleatoria(5, false)}@hotmail.com", NomeUsuarioSistema = GerarStringAleatoria(7, false), Senha = "Potinha123@" } };
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = $"{GerarStringAleatoria(5, false)} {GerarStringAleatoria(5, false)}", Email = $"{GerarStringAleatoria(5, false)}@hotmail.com", NomeUsuarioSistema = GerarStringAleatoria(7, false), Senha = "Potinha123@" } };
            yield return new object[] { new UsuarioSenhaDTO { NomeCompleto = $"{GerarStringAleatoria(5, false)} {GerarStringAleatoria(5, false)}", Email = $"{GerarStringAleatoria(5, false)}@hotmail.com", NomeUsuarioSistema = GerarStringAleatoria(7, false), Senha = "Potinha123@" } };
        }

        [Theory]
        [MemberData(nameof(Test_Registrar_Data))]
        public async Task Test_Registrar(UsuarioSenhaDTO dto)
        {
            using var client = _testProvider.Client;

            var response = await client.PostAsJsonAsync($"{caminhoApi}/registrar", dto);
            // response.EnsureSuccessStatusCode();

            var contentStr = await response.Content.ReadAsStringAsync();
            var content = JsonConvert.DeserializeObject<UsuarioDTO>(contentStr);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.True(content is not null);

            if (content.Erro == true)
            {
                _output.WriteLine(content.MensagemErro);
            } else
            {
                _output.WriteLine("Ok");
            }
        }
    }
}
