﻿using Microsoft.AspNetCore.Mvc;
using bakeryServer.Services;
using bakeryServer.Models;
using Exceptions;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class FillingsController(FillingService service) : ControllerBase
    {
        private readonly FillingService _service = service;

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var fillings = await _service.ReadAll();
                return Ok(fillings);
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
                var filling = await _service.ReadOne(id);
                return Ok(filling);
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
        public async Task<IActionResult> Create([FromBody] Filling filling)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new ValidationException($"{ModelState}");
                }
                Filling result = await _service.Create(filling);

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
        public async Task<IActionResult> Update([FromBody] Filling updatedFilling)
        {
            try
            {
                await _service.Update(updatedFilling);
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
