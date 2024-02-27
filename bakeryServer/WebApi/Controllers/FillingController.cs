using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FillingsController : Controller
    {
        [HttpGet]
        [Produces("application/json")]
        public Task<IActionResult> GetAll()
        {
                
        }
    }
}
