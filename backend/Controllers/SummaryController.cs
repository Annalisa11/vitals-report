using backend.Clients;
using backend.Mappings;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [ApiController]
    public class SummaryController(IOpenAiClient client) : ControllerBase
    {
        [Route("v1/summary")]
        [HttpGet]
        public async Task<IActionResult> GetSummary()
        {
            var vitalsToConvert = await DavidApiClient.GetDavidVitalsAsync();
            var vitalsDto = Mapper.MapToVitalsDto(vitalsToConvert);

            var history = await DavidApiClient.GetHistoryAsync();
            var historyDto = history.Select(x => Mapper.MapToVitalsDto(x)).ToArray();

            var jokeFromJokeApi = await JokeApiClient.GetJokeAsync();
            var jokeDto = Mapper.MapToJokeDto(jokeFromJokeApi);

            string prompt =
                "Generate a message in raw JSON with no formatting and two properties 'headline' and 'comment'. " +
                "Headline should contain a fitting emoji. And comment should contain a short, " +
                $"funny and sarcastic text that comments on these diabetes vitals: {vitalsToConvert.ValueInMgPerDl} mg/dL, " +
                $"and take into account time {vitalsToConvert.Timestamp}. And complements Target Blood Sugar Ranges: " +
                $"Before Meals (Preprandial): 80-130 mg/dL\n1-2 Hours After Meals (Postprandial): Less than 180 mg/dL\nBedtime: 100-140 mg/dL"
                ;
            var openAiResponse = await client.SendRequestAsync(prompt);
            var summary = new SummaryResponseDto()
            {
                Vitals = vitalsDto,
                CommentHeadline = openAiResponse.Headline,
                Comment = openAiResponse.Comment,
                History = historyDto,
                Joke = jokeDto
            };

            return Ok(summary);
        }
    }
}
