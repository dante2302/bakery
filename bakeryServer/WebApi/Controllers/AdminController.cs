using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using bakeryServer.Models;
using Exceptions;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> LogIn([FromBody]LoginDetails loginDetails)
        {
            try
            {
                var adminKey = Authenticate(loginDetails);
                string jwt = Generate(adminKey);
                return Ok(jwt);
            }
            catch(NotFoundException)
            {
                return Unauthorized();
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private string Generate(string adminKey)
        {
            JwtSecurityTokenHandler handler = new();
            byte[] key = Encoding.UTF8.GetBytes(Configuration.Manager["JwtSettings:Key"]);
            if (key is null)
            {
                throw new Exception();
            }

            List<Claim> claims = [
                new ("adminKey", adminKey),
        ];
            var tokenD = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(2),
                Issuer = "http://localhost:5279",
                Audience = "http://localhost:5279",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            SecurityToken token = handler.CreateToken(tokenD);
            string jwt = handler.WriteToken(token);
            return jwt;
        }

        private string Authenticate(LoginDetails loginDetails)
        {
            if(loginDetails.Username == "asdadmin" && loginDetails.Password == "123123"){
               return "123123";
            }
            else {
                throw new NotFoundException();
            }
        }
    }
}