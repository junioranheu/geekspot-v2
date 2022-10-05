using ImageProcessor;
using ImageProcessor.Plugins.WebP.Imaging.Formats;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Security.Claims;

// Como criar um BaseController: https://stackoverflow.com/questions/58735503/creating-base-controller-for-asp-net-core-to-do-logging-but-something-is-wrong-w;
// Como fazer os metódos da BaseController não bugar a API ([NonAction]): https://stackoverflow.com/questions/35788911/500-error-when-setting-up-swagger-in-asp-net-core-mvc-6-app
// Ou então usar "protected";
namespace GeekSpot.API.Controllers
{
    public abstract class BaseController<T> : Controller
    {
        protected async Task<bool> IsUsuarioSolicitadoMesmoDoToken(int id)
        {
            var token = await HttpContext.GetTokenAsync("access_token");

            if (token != null)
            {
                // var nomeUsuarioSistema = User.FindFirstValue(ClaimTypes.Name);          
                // var usuarioTipoid = User.FindFirstValue(ClaimTypes.Role);
                var usuarioId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (usuarioId != id.ToString())
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }

            return false;
        }

        // arquivo = o arquivo em si, a variável IFormFile;
        // id = o id do objeto em questão. Por exemplo, ao mudar a foto de perfil de um usuário, envie o id dele;
        // nomePasta = nome do caminho do arquivo, da pasta. Por exemplo: /upload/usuario/. "usuario" é o caminho;
        // arquivoAtual = o nome do arquivo atual, caso exista;
        // hostingEnvironment = o caminho até o wwwroot. Ele deve ser passado por parâmetro, já que não funcionaria aqui diretamente no BaseController;
        protected async Task<string> UparImagem(IFormFile arquivo, string id, string nomePasta, string? arquivoAtual, IWebHostEnvironment hostingEnvironment)
        {
            return await Task.Run(() =>
            {
                // Procedimento de inicialização para salvar nova imagem;
                string webRootPath = hostingEnvironment.ContentRootPath; // Vai até o wwwwroot;
                string restoCaminho = "/upload/" + nomePasta + "/"; // Acesso à pasta referente; 
                string nomeNovo = id + ".webp"; // Nome novo do arquivo;
                string caminhoDestino = webRootPath + restoCaminho + nomeNovo; // Caminho de destino para upar;

                // Copiar o novo arquivo para o local de destino;
                if (arquivo.Length > 0)
                {
                    // Verificar se já existe uma foto caso exista, delete-a;
                    if (!String.IsNullOrEmpty(arquivoAtual))
                    {
                        string caminhoArquivoAtual = webRootPath + restoCaminho + arquivoAtual;

                        // Verificar se o arquivo existe;
                        if (System.IO.File.Exists(caminhoArquivoAtual))
                        {
                            // Se existe, apague-o; 
                            System.IO.File.Delete(caminhoArquivoAtual);
                        }
                    }

                    // Então salve a imagem no servidor no formato WebP - https://blog.elmah.io/convert-images-to-webp-with-asp-net-core-better-than-png-jpg-files/;
                    using (var webPFileStream = new FileStream(caminhoDestino, FileMode.Create))
                    {
                        ImageFactory imageFactory = new(preserveExifData: false);
                        imageFactory.Load(arquivo.OpenReadStream())
                                    .Format(new WebPFormat())
                                    .Quality(10)
                                    .Save(webPFileStream);
                    }

                    return nomeNovo;
                }
                else
                {
                    return "";
                }
            });
        }
    }
}
