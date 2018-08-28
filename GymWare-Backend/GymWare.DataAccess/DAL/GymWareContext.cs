using System;
using System.Data.Entity;
using GymWare.Entities;

namespace GymWare.DataAccess.DAL
{
    public class GymWareContext : DbContext
    {
        public GymWareContext() : base("name=GymWareAndy")
        {
            var instancia = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<GymWareContext>());
        }

        public DbSet<Rutina> Rutinas { get; set; }
        public DbSet<Ejercicio> Ejercicios { get; set; }
        public DbSet<RutinaEjercicio> RutinaEjercicio { get; set; }
        public DbSet<Comida> Comidas { get; set; }
        public DbSet<Dieta> Dietas { get; set; }
        public DbSet<DietaComida> DietaComida { get; set; }
        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<DietaCliente> DietaCliente { get; set; }
        public DbSet<EmpleadoClienteRutina> EmpleadoClienteRutina { get; set; }
        public DbSet<Asistencia> Asistencias { get; set; }
        public DbSet<Membresia> Membresias { get; set; }
        public DbSet<Cuota> Cuotas { get; set; }
    }
}
