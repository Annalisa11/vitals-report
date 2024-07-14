using System.Text.Json;
using backend.Models;

namespace backend.Clients
{
    public class DavidApiClient
    {
        public static async Task<VitalsFromDavidDto> GetDavidVitalsAsync()
        {
            var httpClient = new HttpClient();
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, "https://legendary-api.davidpenn.de/cgm?type=current");
            var responseMessage = await httpClient.SendAsync(httpRequestMessage);
            var responseBody = await responseMessage.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<VitalsFromDavidDto>(responseBody)!;
        }
    }
}
