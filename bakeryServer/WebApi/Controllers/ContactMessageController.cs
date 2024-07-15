using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace WebApi.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class ContactMessagesController
    (IEntityService<ContactMessage> service) : BasicEntityControllerBase<ContactMessage>(service) 
{
    [AllowAnonymous]
    [HttpPost]
    public override async Task<IActionResult> Create([FromBody] ContactMessage cm)
    {
        return await base.Create(cm);
    }
}

