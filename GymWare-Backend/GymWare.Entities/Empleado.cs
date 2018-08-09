using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class Empleado : Usuario
    {
        public int EmpleadoId { get; set; }
        public string Rol { get; set; }
        public virtual ICollection<Dieta> Dietas { get; set; }
    }
}
