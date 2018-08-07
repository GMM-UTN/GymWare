using System;

namespace GymWare.Entities
{
    public class Rutina
    {
        public int RutinaId { get; set; }
        public string Nombre { get; set; }
        public string Tipo { get; set; }
        public string EdadMinima { get; set; }
        public string EdadMaxima { get; set; }
        public string Sexo { get; set; }
        public string Descripcion { get; set; }
    }
}
