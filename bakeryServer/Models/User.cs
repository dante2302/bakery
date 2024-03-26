using System.ComponentModel.DataAnnotations;

namespace bakeryServer.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public required string PhoneNumber { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public string ?Email { get; set; }
    }
}
