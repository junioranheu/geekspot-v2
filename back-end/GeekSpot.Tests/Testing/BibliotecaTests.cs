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
            List<string> listaSenhas = new() { "123", "Teste300", "TesteTeste", "TesteTeste1" };

            foreach (var senha in listaSenhas)
            {
                bool isOk = ValidarSenha(senha);

                if (isOk)
                {
                    string senhaCriptografada = Criptografar(senha);
                    Assert.True(!String.IsNullOrEmpty(senhaCriptografada));
                    _output.WriteLine($"A senha \"{senha}\" é valida, e foi criptografada: \"{senhaCriptografada}\"");
                }
                else
                {
                    _output.WriteLine($"A senha \"{senha}\" não é valida, portanto não será criptografada");
                }
            }
        }
    }
}
