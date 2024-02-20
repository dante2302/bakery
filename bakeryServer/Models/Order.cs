namespace bakeryServer.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int FoodId { get; set; }
        public DateTime Date { get; set; }
        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ?Email { get; set; }
    }
}
