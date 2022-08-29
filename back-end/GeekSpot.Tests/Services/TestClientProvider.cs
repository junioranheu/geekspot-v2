using Microsoft.AspNetCore.Mvc.Testing;

namespace GeekSpot.Tests.Services
{
    // Tutoriais de como criar um "test client provider", para que os testes unitários funcionem rodando em local host:
    // 1 - Tutorial de como criar o "test client provider": https://www.youtube.com/watch?v=p5l7x_pFjmI&ab_channel=DotNetCoreCentral;
    // 2 - Tutorial de como "migrar" para o .NET 6 (já que não existe Startup, e sim Program): https://docs.microsoft.com/en-us/aspnet/core/migration/50-to-60-samples?view=aspnetcore-6.0#test-with-webapplicationfactory-or-testserver;
    public class TestClientProvider : IDisposable
    {
        private readonly WebApplicationFactory<Program> application;

        public HttpClient Client { get; private set; }

        public TestClientProvider()
        {
            application = new WebApplicationFactory<Program>().WithWebHostBuilder(builder => { builder.ConfigureServices(services => { }); });
            Client = application.CreateClient();
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Usage", "CA1816:Os métodos Dispose devem chamar SuppressFinalize", Justification = "<Pendente>")]
        public void Dispose()
        {
            application?.Dispose();
            Client?.Dispose();
        }
    }
}
