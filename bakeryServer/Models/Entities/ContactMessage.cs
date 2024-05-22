namespace Models;

public class ContactMessage : IEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public string Message { get; set; }
}
