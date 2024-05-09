using Microsoft.AspNetCore.Mvc;
using Models;
using Exceptions;
using Services;

namespace WebApi;

public abstract class BasicEntityControllerBase<T>
    (IEntityService<T> service) : ControllerBase where T : class, IEntity
{
    private readonly IEntityService<T> _service = service;

    [HttpGet("all")]
    public virtual async Task<IActionResult> GetAll()
    {
        try
        {
            var entities= await _service.ReadAll();
            return Ok(entities);
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

    [HttpGet("{id}")]
    public virtual async Task<IActionResult> GetOne(int id)
    {
        try
        {
            var entity = await _service.ReadOne(id);
            return Ok(entity);
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
    public virtual async Task<IActionResult> Create([FromBody] T entity)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                throw new ArgumentException($"{ModelState}");
            }
            T result = await _service.Create(entity);

            return CreatedAtAction(nameof(GetOne), new { id = result.Id }, result);
        }

        catch (ArgumentException ex)
        {
            return BadRequest(ex);
        }

        catch (Exception)
        {
            return StatusCode(500, "Internal Server Error.");
        }
    }

    [HttpPut]
    public virtual async Task<IActionResult> Update([FromBody] T updatedEntity)
    {
        try
        {
            await _service.Update(updatedEntity);
            return Ok();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex);
        }

        catch (Exception)
        {
            return StatusCode(500, $"Internal Server Error");
        }
    }

    [HttpDelete("{id}")]
    public virtual async Task<IActionResult> Delete(int id)
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
