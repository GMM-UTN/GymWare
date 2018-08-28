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
    public class AsistenciaLogic
    {
        private AsistenciaRepository _as = new AsistenciaRepository();

        public string CreateAsistencia(string dni)
        {
            return _as.InsertAsistencia(dni);
        }
    }
}
