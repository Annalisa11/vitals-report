using backend.Configuration;
using backend.Factories;
using backend.Models;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace backend.Controllers
{
    [ApiController]
    public class OpenAiController : ControllerBase
    {
        private readonly OpenAiClient _client;

        public OpenAiController(IOpenAiClientFactory factory, IOptions<OpenAiClientSettings> settings)
        {
            string? apiKey = settings.Value.ApiKey;

            if (apiKey == null)
            {
                throw new InvalidOperationException("API key not found.");
            }

            _client = factory.Create(apiKey);
        }

        [Route("v1/openai")]
        [HttpPost]
        public async Task<IActionResult> GetResponseAsync([FromBody] OpenAiRequestDto? request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            if (request.Prompt == null)
            {
                return BadRequest("No prompt was set.");
            }

            OpenAiResponseDto response =  await _client.SendRequestAsync(request.Prompt);

            return Ok(response);
        }
    }
}
