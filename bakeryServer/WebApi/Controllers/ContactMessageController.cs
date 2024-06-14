using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ContactMessagesController
    (IEntityService<ContactMessage> service) : BasicEntityControllerBase<ContactMessage>(service) 
{
}

