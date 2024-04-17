using Microsoft.AspNetCore.Mvc;
using bakeryServer.Models;
using Exceptions;
using Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController(IEntityService<Order> orderService, IExtendedUserService userService, OrderDTOMapper orderDTOMapper) : ControllerBase
    {
        private readonly IExtendedUserService _userService;
        private readonly IEntityService<Order> _orderService;
        private readonly OrderDTOMapper _orderDTOMapper = orderDTOMapper;

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var orders = await _orderService.ReadAll();
                List<OrderDTO> orderDTOs = [];    
                foreach(Order order in orders)
                {
                    orderDTOs.Add(await _orderDTOMapper.MapDTO(order));
                }
                return Ok(orderDTOs);
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
                var order = await _orderService.ReadOne(id);
                var odto = _orderDTOMapper.MapDTO(order);
                return Ok(odto);
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
        public async Task<IActionResult> Create([FromBody] OrderSubmission orderSubmission)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new ArgumentException($"Invalid Entity: {ModelState}");
                }
            
                User existingUser  = _userService.CheckIfUserExists(orderSubmission.User);
                int newOrderUserId;
                if(existingUser is not null)
                {
                    if
                    (
                     string.Compare(
                        existingUser.FirstName,
                        orderSubmission.User.FirstName,
                        StringComparison.OrdinalIgnoreCase) != 0
                     ||
                     string.Compare(
                        existingUser.LastName,
                        orderSubmission.User.LastName,
                        StringComparison.OrdinalIgnoreCase) != 0
                    )
                    {
                        orderSubmission.User.Id = existingUser.Id;
                        await _userService.Update(orderSubmission.User);
                    }
                    newOrderUserId = existingUser.Id;
                }
                else
                {
                    User newUser = await _userService.Create(orderSubmission.User);
                    newOrderUserId = newUser.Id;
                }

                orderSubmission.Order.UserId = newOrderUserId;
                Order result = await _orderService.Create(orderSubmission.Order);
                return CreatedAtAction(nameof(GetOne), new { id = result.Id }, result);
            }

            catch(ArgumentException ex)
            {
                return BadRequest(ex);
            }

            catch(Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Order updatedOrder)
        {
            try
            {
                await _orderService.Update(updatedOrder);
                return Ok();
            }
            catch(NotFoundException)
            {
                return NotFound();
            }
            catch (ArgumentException ex)
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
                await _orderService.Delete(id);
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
