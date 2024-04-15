using Microsoft.AspNetCore.Mvc;
using bakeryServer.Models;
using Exceptions;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class ToppingsController(IEntityService<Topping> service) : ControllerBase
    {
        private readonly IEntityService<Topping> _service = service;

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var toppings = await _service.ReadAll();
                return Ok(toppings);
            }
            catch (NotFoundException)
            {
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetOne([FromQuery] int id)
        {
            try
            {
                var topping = await _service.ReadOne(id);
                return Ok(topping);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Topping topping)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new ValidationException($"{ModelState}");
                }
                Topping result = await _service.Create(topping);

                return CreatedAtAction(nameof(GetOne), new { id = result.Id }, result);
            }

            catch(ValidationException ex)
            {
                return BadRequest(ex);
            }

            catch(Exception)
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Topping updatedTopping)
        {
            try
            {
                await _service.Update(updatedTopping);
                return Ok();
            }
            catch(NotFoundException)
            {
                return NotFound();
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex);
            }

            catch(Exception)
            {
                return StatusCode(500,$"Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.Delete(id);
                return Ok();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(500, $"Internal Server Error");
            }
        }
    }
}

