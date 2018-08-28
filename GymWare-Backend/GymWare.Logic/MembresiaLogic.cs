using GymWare.DataAccess.DAL;
using GymWare.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GymWare.Entities.DTO;

namespace GymWare.Logic
{
    public class MembresiaLogic
    {
        private MembresiaRepository _me = new MembresiaRepository();

        public Membresia CreateRenovateMembresia(MembresiaCuotaDTO membresiaCuotaDTO)
        {
            return _me.InsertUpdateMembresia(membresiaCuotaDTO);
        }
    }
}
