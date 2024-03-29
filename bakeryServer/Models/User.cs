﻿using System.ComponentModel.DataAnnotations;

namespace bakeryServer.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ?Email { get; set; }
    }
}
