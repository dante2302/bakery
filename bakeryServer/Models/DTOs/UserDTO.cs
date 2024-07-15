namespace Models;

public class UserDTO(User u)
{
    public string FirstName = u.FirstName;
    public string LastName = u.LastName;
    public string ?Email = u.Email;
    public string PhoneNumber = u.PhoneNumber;
}
