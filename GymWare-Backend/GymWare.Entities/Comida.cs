using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class Comida
    {
        public int ComidaId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int Calorias { get; set; }
    }
}
