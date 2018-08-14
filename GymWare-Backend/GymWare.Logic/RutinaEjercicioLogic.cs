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
        public RutinaEjerciciosDTO GetAllRutinasConEjercicios()
        {
            RutinaEjerciciosDTO reDTO = new RutinaEjerciciosDTO();
            reDTO.RutinaEjercicios = _re.GetAll();
            reDTO.Rutina = reDTO.RutinaEjercicios.Count > 0 ? reDTO.RutinaEjercicios[0].Rutina : null;
            return reDTO;
        }

        public RutinaEjercicio GetRutinaConEjercicios(int id)
        {
            return _re.GetOne(id);
        }

        public bool Update(int idRutina, RutinaEjerciciosDTO rutinaEjercicio)
        {
            Rutina rutina = _ru.Update(idRutina, rutinaEjercicio.Rutina);
            return _re.Update(rutina, rutinaEjercicio.RutinaEjercicios);
        }

        public bool Insert(RutinaEjerciciosDTO rutinaEjercicio)
        {
            Rutina rutina = _ru.Insert(rutinaEjercicio.Rutina);
            return _re.Insert(rutina, rutinaEjercicio.RutinaEjercicios);
        }

        public bool Delete(int idRutina)
        {
            return _re.Delete(idRutina) == _ru.Delete(idRutina);
        }
    }
}
