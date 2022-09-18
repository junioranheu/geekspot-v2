using GeekSpot.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Xunit;
using Xunit.Abstractions;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Tests.Testing
{
    public class BibliotecaTests
    {
        private readonly ITestOutputHelper _output; // https://xunit.net/docs/capturing-output;

        public BibliotecaTests(ITestOutputHelper output)
        {
            _output = output;
        }

        [Fact]
        public void Test_HorarioBrasilia()
        {
            Assert.True(HorarioBrasilia() > DateTime.MinValue);
        }

        [Theory]
        [InlineData("123")]
        [InlineData("12345")]
        [InlineData("teste")]
        [InlineData("teste@")]
        public void Test_Criptografar(string senha)
        {
            Assert.True(!String.IsNullOrEmpty(Criptografar(senha)));
        }

        [Fact]
        public void Test_CriptografarEValidarSenha()
        {
            List<string[]> listaSenhas = new() {
                new[] { "TesteTesteTeste", "Usuário Prueba", "chaleco", "chaleco@hotmail.com" },
                new[] { "testetesteteste1", "Usuário Prueba", "chaleco", "usuario@hotmail.com" },
                new[] { "T1", "Usuário teste", "junioranheu", "usuario@hotmail.com" },
                new[] { "Mariana300", "Mariana Scalzaretto", "elfamscal", "elfamscal@hotmail.com" },
                new[] { "Mariana300", "Mariana", "elfamscal", "elfamscal@hotmail.com" },
                new[] { "Chaleco300", "Israel Cabrera", "chaleco", "chaleco@hotmail.com" },
                new[] { "Chaleco300", "Israel Cabrera", "aweonao", "chaleco@hotmail.com" },
                new[] { "Potinha500", "Junior de Souza", "junioranheu", "junior@hotmail.com" }
            };

            foreach (var obj in listaSenhas)
            {
                string senha = obj[0];
                string nomeCompleto = obj[1];
                string nomeUsuarioSistema = obj[2];
                string email = obj[3];

                var validarSenha = ValidarSenha(senha, nomeCompleto, nomeUsuarioSistema, email);

                if (validarSenha.Item1)
                {
                    string senhaCriptografada = Criptografar(senha);
                    Assert.True(!String.IsNullOrEmpty(senhaCriptografada));
                    _output.WriteLine($"A senha \"{senha}\" é válida e foi criptografada: \"{senhaCriptografada}\"");
                }
                else
                {
                    _output.WriteLine($"A senha \"{senha}\" não é válida. {validarSenha.Item2}");
                }
            }
        }
    }
}
