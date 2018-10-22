using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GymWare.Entities;

namespace GymWare.Entities.DTO
{
    public class UsuarioLogeadoDTO
    {
        public Cliente Cliente { get; set; }
        public Empleado Empleado { get; set; }
        public List<Dieta> Dietas { get; set; }
        public List<Rutina> Rutinas { get; set; }
    }
}
