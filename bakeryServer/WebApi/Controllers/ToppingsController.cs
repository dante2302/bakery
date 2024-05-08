using Microsoft.AspNetCore.Mvc;
using bakeryServer.Models;
using Exceptions;
using Microsoft.AspNetCore.Authorization;
using Services;

namespace WebApi.Controllers;
[ApiController]
[Route("[controller]")]
public class ToppingsController(IEntityService<Topping> service) 
    : BasicEntityControllerBase<Topping>(service)
{
}
