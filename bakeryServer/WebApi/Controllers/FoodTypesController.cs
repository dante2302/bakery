using Microsoft.AspNetCore.Mvc;
using bakeryServer.Models;
using Exceptions;
using Microsoft.AspNetCore.Authorization;
using Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FoodTypesController(
        IEntityService<FoodType> foodService,
        IEntityService<Filling> fillingService,
        IEntityService<Topping> toppingService,
        IEntityService<Base> baseService) : ControllerBase
    {
        private readonly IEntityService<FoodType> _foodService = foodService;
        private readonly IEntityService<Filling> _fillingService = fillingService;
        private readonly IEntityService<Topping> _toppingService = toppingService;
        private readonly IEntityService<Base> _baseService = baseService;

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var foodType = await _foodService.ReadAll();
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
                var foodType = await _foodService.ReadOne(id);
                List<Filling> fillings = await MapExternalEntity(_fillingService, foodType.Fillings);
                List<Topping> toppings = await MapExternalEntity(_toppingService, foodType.Toppings);
                List<Base> bases = await MapExternalEntity(_baseService, foodType.Bases);
                FoodTypeExtras extras = new(fillings, toppings, bases);
                FoodTypeDTO fDTO = new(foodType, extras);
                return Ok(fDTO);
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
                FoodType result = await _foodService.Create(foodType);

                return CreatedAtAction(nameof(GetOne), new { id = result.Id }, result);
            }

            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error.");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] FoodType updatedFoodType)
        {
            try
            {
                await _foodService.Update(updatedFoodType);
                return Ok();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            catch (Exception)
            {
                return StatusCode(500, $"Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _foodService.Delete(id);
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

        private async Task<List<T>> MapExternalEntity<T>(IEntityService<T> _service, List<int> ids)
        {
            List<T> entityList = [];
            try
            {
                foreach (int id in ids)
                {
                    T entity = await _service.ReadOne(id);
                    entityList.Add(entity);
                }
                return entityList;
            }
            catch
            {
                // log missing entity
                // cleanup function
                return  [];
            }
        }
    }
}


