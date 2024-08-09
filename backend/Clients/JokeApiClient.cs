using backend.Models;
using System.Text.Json;

namespace backend.Clients
{
    public class JokeApiClient
    {
        public static async Task<JokeFromJokeApiDto> GetJokeAsync()
        {
            var httpClient = new HttpClient();
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, "https://official-joke-api.appspot.com/jokes/random");
            var responseMessage = await httpClient.SendAsync(httpRequestMessage);
            var responseBody = await responseMessage.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<JokeFromJokeApiDto>(responseBody)!;
        }
    }
}
