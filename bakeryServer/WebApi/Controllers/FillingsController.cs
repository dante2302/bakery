using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace WebApi.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class FillingsController
    (IEntityService<Filling> service) : BasicEntityControllerBase<Filling>(service) 
{
}
