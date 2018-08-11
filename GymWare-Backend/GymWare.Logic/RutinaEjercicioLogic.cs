using GymWare.DataAccess.DAL;
using GymWare.Entities;
using GymWare.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Logic
{
    public class RutinaEjercicioLogic
    {
        private RutinaEjercicioRepository _re = new RutinaEjercicioRepository();
        private RutinaRepository _ru = new RutinaRepository();
        public List<RutinaEjercicio> GetAllRutinasConEjercicios()
        {
            return _re.GetAll();
        }

        public RutinaEjercicio GetRutinaConEjercicio(int id)
        {
            return _re.GetOne(id);
        }

        public bool Update(int idRutina, RutinaEjerciciosDTO rutinaEjercicio)
        {
            return _ru.Update(idRutina, rutinaEjercicio.Rutina) == _re.Update(idRutina, rutinaEjercicio.RutinaEjercicios);
        }
    }
}
