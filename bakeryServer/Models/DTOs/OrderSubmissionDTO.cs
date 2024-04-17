using bakeryServer.Models;

namespace Models;

public class OrderSubmissionDTO(OrderDTO o, UserDTO u)
{
   public OrderDTO Order =  o;
   public UserDTO User = u;
}
