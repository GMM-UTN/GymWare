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
        public List<RutinaEjerciciosDTO> GetAllRutinasConEjercicios()
        {
            var grouped = _re.GetAll().GroupBy(x => x.Rutina).Select(g => new {
                RutinaEjercicios = g.ToList(),
                Rutina = g.Select(site => new {
                    site.Rutina,
                }).FirstOrDefault()
            }).ToList();

            List<RutinaEjerciciosDTO> r = new List<RutinaEjerciciosDTO>();
            foreach (var g in grouped)
            {
                RutinaEjerciciosDTO rutinaEjercicioDTO = new RutinaEjerciciosDTO();
                rutinaEjercicioDTO.Rutina = g.Rutina.Rutina;
                rutinaEjercicioDTO.RutinaEjercicios = g.RutinaEjercicios;
                r.Add(rutinaEjercicioDTO);
            }
            return r;
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

        public bool InsertEmpleadoClienteRutina(EmpleadoClienteRutina empleadoClienteRutina)
        {
            if (_ru.InsertEmpleadoClienteRutina(empleadoClienteRutina) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Delete(int idRutina)
        {
            return _re.Delete(idRutina) == _ru.Delete(idRutina);
        }
    }
}
