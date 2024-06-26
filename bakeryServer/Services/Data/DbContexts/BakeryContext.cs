﻿using Microsoft.EntityFrameworkCore;
using Models;

namespace Data.DbContexts
{
    public class BakeryContext : DbContext
    {
        public virtual DbSet<Filling> Fillings { get; set; }
        public virtual DbSet<Topping> Toppings { get; set; }
        public virtual DbSet<FoodType> FoodTypes { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Base> Bases { get; set; }
        public virtual DbSet<ContactMessage> ContactMessages { get; set; }

        public BakeryContext()
        {

        }

        public BakeryContext(DbContextOptions<BakeryContext> options): base(options)
        {

        }
    }
}
