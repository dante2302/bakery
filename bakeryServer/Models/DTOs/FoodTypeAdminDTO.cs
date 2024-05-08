using System.Reflection.Metadata.Ecma335;

namespace bakeryServer.Models
{
    public class FoodTypeAdminDTO(FoodType f)
    {
        public string Name = f.Name;
    }
}