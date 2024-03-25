using Microsoft.AspNetCore.Mvc;
using bakeryServer.Services;
using bakeryServer.Models;
using Exceptions;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

[ApiController]
[Route("[controller]")]
public class AdminController : ControllerBase 
{
    [HttpPost]
    public async Task<IActionResult> LogIn()
    {
        return Ok();
    }
    public string Generate(){
        var handler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes("asdasd12939939%129-21809410925%)(12094)");
        var claims = new List<Claim>{
            new (JwtRegisteredClaimNames.Jti, "asd"),
        };
        var tokenD = new SecurityTokenDescriptor(){
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(2),
            Issuer = "http://localhost:5279",
            Audience = "http://localhost:5279",
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        };
        var token = handler.CreateToken(tokenD);
        var jwt = handler.WriteToken(token);
        return jwt;
    }
}
