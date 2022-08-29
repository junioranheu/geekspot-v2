using Microsoft.Extensions.Configuration;
using System.ComponentModel;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using TimeZoneConverter;

namespace GeekSpot.Utils
{
    public static class Biblioteca
    {
        // Pegar informações do appsettings: https://stackoverflow.com/a/58432834
        static readonly string encriptionKey = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("EncryptionSettings")["EncryptionKey"];

        // Converter para o horário de Brasilia: https://blog.yowko.com/timezoneinfo-time-zone-id-not-found/;
        public static DateTime HorarioBrasilia()
        {
            TimeZoneInfo timeZone = TZConvert.GetTimeZoneInfo("E. South America Standard Time");
            return TimeZoneInfo.ConvertTime(DateTime.UtcNow, timeZone);
        }

        // Criptografar e decriptografar senha: https://stackoverflow.com/questions/10168240/encrypting-decrypting-a-string-in-c-sharp;
        public static string Criptografar(string clearText)
        {
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);

            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new(password: encriptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);

                using MemoryStream ms = new();
                using (CryptoStream cs = new(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(clearBytes, 0, clearBytes.Length);
                    cs.Close();
                }

                clearText = Convert.ToBase64String(ms.ToArray());
            }

            return clearText;
        }

        public static string Descriptografar(string cipherText)
        {
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);

            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new(password: encriptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);

                using MemoryStream ms = new();
                using (CryptoStream cs = new(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(cipherBytes, 0, cipherBytes.Length);
                    cs.Close();
                }

                cipherText = Encoding.Unicode.GetString(ms.ToArray());
            }

            return cipherText;
        }

        // Pegar a descrição de um enum: https://stackoverflow.com/questions/50433909/get-string-name-from-enum-in-c-sharp;
        public static string GetDescricaoEnum(Enum enumVal)
        {
            MemberInfo[] memInfo = enumVal.GetType().GetMember(enumVal.ToString());
            DescriptionAttribute attribute = CustomAttributeExtensions.GetCustomAttribute<DescriptionAttribute>(memInfo[0]);
            return attribute.Description;
        }

        // Validar se a senha do usuário é forte o sufiuciente verificando requisitos de senha;
        public static bool ValidarSenha(string senha)
        {
            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasMinimum8Chars = new Regex(@".{8,}");

            var isValidated = hasNumber.IsMatch(senha) && hasUpperChar.IsMatch(senha) && hasMinimum8Chars.IsMatch(senha);

            return isValidated;
        }

        // Gerar um número aleatório com base na em um valor mínimo e máximo;
        public static int GerarNumeroAleatorio(int min, int max)
        {
            Random random = new();
            int numeroAleatorio = random.Next(min, max - 1);

            return numeroAleatorio;
        }

        // Gerar uma string aleatória com base na quantidade de caracteres desejados;
        public static string GerarStringAleatoria(int qtdCaracteres, bool isApenasMaiusculas)
        {
            Random random = new();
            string caracteres = (isApenasMaiusculas ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
            string? stringAleatoria = new(Enumerable.Repeat(caracteres, qtdCaracteres).Select(s => s[random.Next(s.Length)]).ToArray());

            return stringAleatoria;
        }

        // Gerar um código hash para o usuário com base no usuarioId + string aleatória;
        public static string GerarHashUsuario(int usuarioId)
        {
            string palavraAleatoria = $"{usuarioId}_{GerarStringAleatoria(GerarNumeroAleatorio(10, 15), false)}";
            string hash = Criptografar(palavraAleatoria);

            return hash;
        }
    }
}
