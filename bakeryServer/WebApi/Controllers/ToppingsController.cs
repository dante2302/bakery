using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace WebApi.Controllers;
[ApiController]
[Authorize]
[Route("[controller]")]
public class ToppingsController(IEntityService<Topping> service) 
    : BasicEntityControllerBase<Topping>(service)
{
}
