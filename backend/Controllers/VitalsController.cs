using backend.Models;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    
    [ApiController]
    public class VitalsController : ControllerBase
    {
        [Route("v1/vitals")]
        [HttpGet]
        public async Task<IActionResult> GetVitals()
        {
            var vitalsToConvert = await DavidApiClient.GetDavidVitalsAsync();

            return this.Ok(new VitalsDto
            {
                GlucoseUnits = vitalsToConvert.GlucoseUnits,
                MeasurementColor = vitalsToConvert.MeasurementColor,
                Timestamp = vitalsToConvert.Timestamp,
                TrendArrow = vitalsToConvert.TrendArrow,
                TrendMessage = vitalsToConvert.TrendMessage,
                Value = vitalsToConvert.Value,
                ValueInMgPerDl = vitalsToConvert.ValueInMgPerDl
            });
        }
    }
}
