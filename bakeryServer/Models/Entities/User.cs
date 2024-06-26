﻿using System.ComponentModel.DataAnnotations;

namespace Models;

public class User : IEntity
{
    [Key]
    public int Id { get; set; }
    public required string PhoneNumber { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? Email { get; set; }
}