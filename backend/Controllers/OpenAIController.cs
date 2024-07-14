using backend.Clients;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    public class OpenAiController : ControllerBase
    {
        private readonly IOpenAiClient _client;

        public OpenAiController(IOpenAiClient client)
        {
            _client = client;
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
