using backend.Clients;
using backend.Mappings;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class JokeController(JokeApiClient client) : ControllerBase
    {
        [Route("v1/joke")]
        [HttpGet]
        public async Task<IActionResult> GetJoke()
        {
            var jokeFromJokeApi = await JokeApiClient.GetJokeAsync();
            var joke = Mapper.MapToJokeDto(jokeFromJokeApi);

            return Ok(joke);
        }
    }
}
