using Microsoft.AspNetCore.Mvc;
using bakeryServer.Models;
using Exceptions;
using Microsoft.AspNetCore.Authorization;
using Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class FoodTypesController(IEntityService<FoodType> service) : ControllerBase
    {
        private readonly IEntityService<FoodType> _service = service;

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var foodType = await _service.ReadAll();
                return Ok(foodType);
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
                var foodType = await _service.ReadOne(id);
                return Ok(foodType);
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
        public async Task<IActionResult> Create([FromBody] FoodType foodType)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new ArgumentException($"Invalid Entity: {ModelState}");
                }
                FoodType result = await _service.Create(foodType);

                return CreatedAtAction(nameof(GetOne), new { id = result.Id }, result);
            }

            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            catch(Exception)
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] FoodType updatedFoodType)
        {
            try
            {
                await _service.Update(updatedFoodType);
                return Ok();
            }
            catch(NotFoundException)
            {
                return NotFound();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
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


