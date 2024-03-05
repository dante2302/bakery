using Microsoft.AspNetCore.Mvc;
using bakeryServer.Services;
using bakeryServer.Models;
namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FillingsController(FillingService service) : ControllerBase
    {
        private readonly FillingService _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var fillings = await _service.ReadAll();
            return Ok(fillings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var filling = await _service.ReadOne(id);
            if(filling is null)
            {
                return NoContent();
            }
            return Ok(filling);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Filling filling)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                Filling result = _service.Create(filling);

                return CreatedAtAction(nameof(GetOne), new { id = result });
            }
            catch
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }
    }
}
