using Microsoft.AspNetCore.Mvc;
using Models;
using Exceptions;
using Services;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class OrdersController(
        IEntityService<Order> orderService,
        IUserService userService,
        OrderDTOMapper orderDTOMapper
        ) : BasicEntityControllerBase<Order>(orderService)
    {
        private readonly IUserService _userService = userService;
        private readonly IEntityService<Order> _orderService = orderService;
        private readonly OrderDTOMapper _orderDTOMapper = orderDTOMapper;

        [HttpGet("all")]
        public override async Task<IActionResult> GetAll()
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
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public override async Task<IActionResult> GetOne([FromQuery] int id)
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
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async override Task<IActionResult> Create([FromBody] Order o)
        {
            const string message =
                    @"Endpoint does not work!
                    Send a request to /submit 
                    Note: requires an OrderSubmission Input: 
                    {
                        Order Order { get; set; }
                        User User { get; set; }
                    }";
            return BadRequest(message);
        }

        [AllowAnonymous]
        [HttpPost("submit")]
        public async Task<IActionResult> Create([FromBody] OrderSubmission orderSubmission)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new ArgumentException($"Invalid Entity: {ModelState}");
                }
            
                User? existingUser  = await _userService.CheckIfUserExists(orderSubmission.User);
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
                orderSubmission.Order.IsCompleted = false;
                orderSubmission.Order.Date = DateTime.Now;
                Order result = await _orderService.Create(orderSubmission.Order);
                return Ok();
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
    }
}
