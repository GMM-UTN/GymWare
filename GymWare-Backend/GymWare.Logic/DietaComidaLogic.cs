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
    public class DietaComidaLogic
    {
        private DietaComidaRepository _dc = new DietaComidaRepository();
        private DietaRepository _di = new DietaRepository();
        public List<DietaComidaDTO> GetAllDietasConComidas()
        {
            var grouped = _dc.GetAll().GroupBy(x => x.Dieta).Select(g => new {
                DietaComida = g.ToList(),
                Dieta = g.Select(site => new {
                    site.Dieta,
                }).FirstOrDefault()
            }).ToList();

            List<DietaComidaDTO> r = new List<DietaComidaDTO>();
            foreach (var g in grouped)
            {
                DietaComidaDTO dietaComidaDTO = new DietaComidaDTO();
                dietaComidaDTO.Dieta = g.Dieta.Dieta;
                dietaComidaDTO.DietaComidas = g.DietaComida;
                r.Add(dietaComidaDTO);
            }
            return r;
        }

        public List<DietaComida> GetDietaConComidas(int id)
        {
            return _dc.GetOne(id);
        }

        public string Update(int idDieta, DietaComidaDTO dietaComida)
        {
            string resultado = _di.Update(idDieta, dietaComida.Dieta);
            if (resultado == "Dieta modificada correctamente")
            {
                return _dc.Update(idDieta, dietaComida.DietaComidas);
            }
            else
            {
                return resultado;
            }            
        }

        public string Insert(DietaComidaDTO dietaComida)
        {
            Dieta dieta = _di.Insert(dietaComida.Dieta);
            if(dieta != null)
            {
                return _dc.Insert(dieta, dietaComida.DietaComidas);
            }
            else
            {
                return "Error al intentar crear la Dieta";
            }            
        }

        public string InsertDietaCliente(DietaCliente dietaCliente)
        {
            return _di.InsertDietaCliente(dietaCliente);
        }

        public string Delete(int idDieta)
        {
            return _di.Delete(idDieta);
        }
    }
}
