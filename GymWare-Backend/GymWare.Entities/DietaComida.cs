using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class DietaComida
    {
        public int DietaComidaId { get; set; }
        public virtual Dieta Dieta { get; set; }
        public virtual Comida Comida { get; set; }
        public int DiasSemana { get; set; }
    }
}
