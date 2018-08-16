using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        [Column(TypeName = "date")]
        public DateTime FechaPago { get; set; }
    }
}
