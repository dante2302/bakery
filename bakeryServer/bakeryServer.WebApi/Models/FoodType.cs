namespace bakeryServer.Models
{
    public class FoodType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int[] Fillings { get; set; }
        public int[] Toppings { get; set; }
        public bool ContainsLettering { get; set; }
    }
}
