using Microsoft.AspNetCore.Mvc;
using Models;
using Exceptions;
using Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FoodTypesController(
        IEntityService<FoodType> foodService,
        IEntityService<Filling> fillingService,
        IEntityService<Topping> toppingService,
        IEntityService<Base> baseService
        ) : BasicEntityControllerBase<FoodType>(foodService)
    {
        private readonly IEntityService<FoodType> _foodService = foodService;
        private readonly IEntityService<Filling> _fillingService = fillingService;
        private readonly IEntityService<Topping> _toppingService = toppingService;
        private readonly IEntityService<Base> _baseService = baseService;

        [HttpGet("{id}/detailed")]
        [Route("{id}/detailed")]
        public async Task<IActionResult> GetOneDetailed(int id)
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

        [HttpGet]
        [Route("withName/{name}")]
        public async Task<IActionResult> GetOneByName(string name)
        {
            try
            {
                var foodType = await _foodService.ReadOneByCondition(
                    (FoodType f) => f.Name == name);

                List<Filling> fillings = await MapExternalEntity(_fillingService, foodType.Fillings);
                List<Topping> toppings = await MapExternalEntity(_toppingService, foodType.Toppings);
                List<Base> bases = await MapExternalEntity(_baseService, foodType.Bases);
                FoodTypeExtras extras = new(fillings, toppings, bases);
                FoodTypeDTO fDTO = new(foodType, extras);
                return Ok(fDTO);
            }
            catch(NotFoundException)
            {
                return NotFound();
            }
            catch(Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpPut]
        [Route("dto")]
        public async Task<IActionResult> UpdateByDTO([FromBody] FoodTypeDTO fDto)
        {
            FoodType ft = new(fDto);
            return await Update(ft);
        }

        private async Task<List<T>> MapExternalEntity<T>(IEntityService<T> _service, List<int> ids)
            where T : class, IEntity
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


