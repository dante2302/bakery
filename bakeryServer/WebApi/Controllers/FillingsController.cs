using Microsoft.AspNetCore.Mvc;
using bakeryServer.Models;
using Microsoft.AspNetCore.Authorization;
using Services;

namespace WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class FillingsController
    (IEntityService<Filling> service) : BasicEntityControllerBase<Filling>(service) 
{
}
