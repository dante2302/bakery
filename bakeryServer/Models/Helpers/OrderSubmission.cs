namespace bakeryServer.Models;

public class OrderSubmission
{
    public required Order Order { get; set; }
    public required User User { get; set; }
}
