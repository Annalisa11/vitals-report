using System.Text;
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
            var headline = GetHeadlineFromMessage(message);

            return new OpenAiResponseDto
            {
                Message = message,
                Headline = headline
            };
        }

        private static string GetHeadlineFromMessage(string message)
        {
            string[] split = message.Split(" ", StringSplitOptions.TrimEntries);
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < split.Length; i++)
            {
                builder.Append(split[i]).Append(' ');

                if (i >= 2)
                {
                    break;
                }
            }

            return builder.ToString();
        }
    }
}
