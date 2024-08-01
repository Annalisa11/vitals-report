using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using backend.Configuration;
using backend.Models;
using Microsoft.Extensions.Options;
using OpenAI.Chat;

namespace backend.Clients
{
    public class OpenAiClient : IOpenAiClient
    {
        private readonly ChatClient _client;

        public OpenAiClient(IOptions<OpenAiClientSettings> settings)
        {
            string? apiKey = settings.Value.ApiKey;

            if (apiKey == null)
            {
                throw new InvalidOperationException("API key not found.");
            }

            _client = new ChatClient("gpt-4o", apiKey);
        }

        public async Task<OpenAiResponseDto> SendRequestAsync(string prompt)
        {
            ChatCompletion completion = await _client.CompleteChatAsync(prompt);
            var message = completion.ToString();
            var response = JsonSerializer.Deserialize<OpenAiResponseDto>(message);

            return response!;
        }
    }
}
