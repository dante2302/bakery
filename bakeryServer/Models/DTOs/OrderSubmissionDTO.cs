using bakeryServer.Models;

namespace Models;

public class OrderSubmissionDTO(OrderSubmission os)
{
   public OrderDTO Order =  new (os.Order);
   public UserDTO User = new (os.User);
}
