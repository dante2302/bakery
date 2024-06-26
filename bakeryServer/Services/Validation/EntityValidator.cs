﻿using System.Reflection;

namespace Services.Validation;

public class EntityValidator<T>
{
    private readonly PropertyInfo[] requieredProperties = typeof(T).GetProperties();

    public bool AssertFields(T entity)
    {
        foreach (PropertyInfo prop in requieredProperties)
        {
            if (prop.GetValue(entity) == null)
            {
                return false;
            }
        }
        return true;
    }
}
