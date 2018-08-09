using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class Cuota
    {
        public int CuotaId { get; set; }
        public virtual Membresia Membresia { get; set; }
        public int CantidadMeses { get; set; }
        public int ImportePago { get; set; }
        public DateTime FechaPago { get; set; }
    }
}
