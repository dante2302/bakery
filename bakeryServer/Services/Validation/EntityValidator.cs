using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection;

namespace Services.Validation
{
    public class EntityValidator<T>
    {
        private PropertyInfo[] requieredFields = typeof(T).GetProperties();
        
        public bool AssertFields(T entity)
        {
            PropertyInfo[] fields = entity.GetType().GetProperties();
            return requieredFields.All(
                requieredField =>
                    fields.Any(field => field.Name == requieredField.Name));
        }
    }
}
