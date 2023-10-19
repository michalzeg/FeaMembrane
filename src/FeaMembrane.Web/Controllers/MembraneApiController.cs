using Microsoft.AspNetCore.Mvc;
using StruCal.Membrane.App;
using StruCal.Membrane.App.DTO;

namespace StruCal.Membrane.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembraneApiController : ControllerBase
    {
        private readonly MembraneService _membraneService;

        public MembraneApiController(MembraneService membraneService)
        {
            _membraneService = membraneService;
        }

        [HttpPost]
        public IActionResult PerformCalculations(MembraneInputDataDTO membraneData)
        {
            var result = _membraneService.GetResults(membraneData);

            return result.Match<IActionResult>(
                some: value => Ok(value),
                none: () => BadRequest());
        }
    }
}