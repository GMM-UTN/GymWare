using System;

namespace GymWare.Entities
{
    public class RutinaEjercicio
    {
        public int RutinaEjercicioId { get; set; }
        public virtual Ejercicio Ejercicio { get; set; }
        public virtual Rutina Rutina { get; set; }
        public int Series { get; set; }
        public int Repeticiones { get; set; }
    }
}