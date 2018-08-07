using System;
using System.Data.Entity;
using GymWare.Entities;

namespace GymWare.DataAccess.DAL
{
    public class GymWareContext : DbContext
    {
        public GymWareContext() : base("name=GymWare")
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<GymWareContext>());
        }

        public DbSet<Rutina> Rutinas { get; set; }
        public DbSet<Ejercicio> Ejercicios { get; set; }
        public DbSet<RutinaEjercicio> RutinaEjercicio { get; set; }
    }
}
