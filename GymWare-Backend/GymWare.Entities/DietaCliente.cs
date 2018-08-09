using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class DietaCliente
    {
        public int DietaClienteId { get; set; }
        public virtual Dieta Dieta { get; set; }
        public virtual Cliente Cliente { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
    }
}
